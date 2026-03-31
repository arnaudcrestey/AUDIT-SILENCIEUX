import { NextResponse } from "next/server";
import { buildAuditUserPrompt, AUDIT_SYSTEM_PROMPT } from "@/lib/audit-prompt";
import { buildFallbackAudit, parseAuditResult } from "@/lib/audit-parser";
import { attachSessionResult } from "@/lib/audit-storage";
import { validateAnalysePayload } from "@/lib/validations";
import type { AuditAnalysisResult } from "@/lib/audit-types";

function isUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function stripTags(value: string) {
  return value
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractMetaContent(html: string, name: string) {
  const regex = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["'][^>]*>`,
    "i"
  );
  return html.match(regex)?.[1]?.trim() ?? "";
}

function extractTagContents(html: string, tagName: string, limit = 5) {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "gi");
  const results: string[] = [];
  let match: RegExpExecArray | null = null;

  while ((match = regex.exec(html)) !== null && results.length < limit) {
    const text = stripTags(match[1]);
    if (text && text.length > 2) {
      results.push(text);
    }
  }

  return results;
}

function extractMainText(html: string) {
  const cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, " ")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, " ");

  const text = stripTags(cleaned);

  const bannedPatterns = [
    /mentions légales/gi,
    /politique de confidentialité/gi,
    /cookies/gi,
    /conditions générales/gi,
    /éditeur du site/gi,
    /hébergeur/gi,
    /tous droits réservés/gi
  ];

  let normalized = text;

  for (const pattern of bannedPatterns) {
    normalized = normalized.replace(pattern, " ");
  }

  return normalized.replace(/\s+/g, " ").trim().slice(0, 4000);
}

function buildStructuredWebsiteContent(html: string, url: string) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
    ? stripTags(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "")
    : "";

  const metaDescription =
    extractMetaContent(html, "description") ||
    extractMetaContent(html, "og:description");

  const h1 = extractTagContents(html, "h1", 3);
  const h2 = extractTagContents(html, "h2", 6);
  const buttons = [
    ...extractTagContents(html, "button", 6),
    ...extractTagContents(html, "a", 10)
  ]
    .filter((item) => item.length > 1 && item.length < 80)
    .slice(0, 8);

  const bodyText = extractMainText(html);

  const sections = [
    `URL : ${url}`,
    title ? `TITLE : ${title}` : "",
    metaDescription ? `META DESCRIPTION : ${metaDescription}` : "",
    h1.length ? `H1 : ${h1.join(" | ")}` : "",
    h2.length ? `H2 : ${h2.join(" | ")}` : "",
    buttons.length ? `CTA / LIENS VISIBLES : ${buttons.join(" | ")}` : "",
    bodyText ? `TEXTE PRINCIPAL : ${bodyText}` : ""
  ].filter(Boolean);

  return sections.join("\n\n");
}

async function extractWebsiteContent(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 AuditSilencieux/1.0"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Impossible de lire ce site (${response.status}).`);
  }

  const html = await response.text();
  const structured = buildStructuredWebsiteContent(html, url);

  if (!structured || structured.length < 180) {
    throw new Error("Contenu exploitable insuffisant.");
  }

  return structured;
}

async function normalizeContent(content: string, sourceType?: string) {
  const trimmedContent = content.trim();

  const shouldTryUrl =
    sourceType === "url" ||
    sourceType === "website" ||
    sourceType === "site" ||
    isUrl(trimmedContent);

  if (!shouldTryUrl) {
    return {
      normalizedContent: trimmedContent,
      normalizedSourceType: sourceType ?? "mixed"
    };
  }

  const websiteContent = await extractWebsiteContent(trimmedContent);

  return {
    normalizedContent: websiteContent,
    normalizedSourceType: "site"
  };
}

async function runModelAnalysis(content: string, sourceType = "mixed") {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY manquante");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: AUDIT_SYSTEM_PROMPT }]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: buildAuditUserPrompt(content, sourceType) }]
        }
      ]
    })
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("OpenAI error:", data);
    throw new Error("Erreur OpenAI pendant l’analyse.");
  }

  const text =
    data.output_text ||
    data.output?.[0]?.content?.[0]?.text ||
    "";

  if (typeof text !== "string" || !text.trim()) {
    throw new Error("Réponse vide renvoyée par OpenAI.");
  }

  return text.trim();
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const validation = validateAnalysePayload(json);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { content, sourceType, sessionId } = validation.data;

    const { normalizedContent, normalizedSourceType } = await normalizeContent(
      content,
      sourceType
    );

    let finalResult: AuditAnalysisResult | null = null;

    try {
      const modelOutput = await runModelAnalysis(
        normalizedContent,
        normalizedSourceType
      );

      finalResult = parseAuditResult(modelOutput);
    } catch (error) {
      console.error("Model analysis error:", error);
    }

    if (!finalResult) {
      finalResult = buildFallbackAudit(normalizedContent);
    }

    if (sessionId) {
      attachSessionResult(sessionId, finalResult);
    }

    return NextResponse.json(finalResult, { status: 200 });
  } catch (error) {
    console.error("Analyse route error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur serveur est survenue pendant l’analyse."
      },
      { status: 500 }
    );
  }
}
