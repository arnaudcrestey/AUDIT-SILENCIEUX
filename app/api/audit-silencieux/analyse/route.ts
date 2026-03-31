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

function cleanExtractedText(html: string) {
  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, " ")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, " ")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const bannedPatterns = [
    /mentions légales/gi,
    /politique de confidentialité/gi,
    /cookies/gi,
    /conditions générales/gi,
    /éditeur du site/gi,
    /hébergeur/gi,
    /tous droits réservés/gi
  ];

  let cleaned = text;

  for (const pattern of bannedPatterns) {
    cleaned = cleaned.replace(pattern, " ");
  }

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 45)
    .filter((sentence) => !/javascript|css|http|www\./i.test(sentence))
    .slice(0, 18);

  return sentences.join(" ").slice(0, 3500);
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
  const cleaned = cleanExtractedText(html);

  if (!cleaned || cleaned.length < 120) {
    throw new Error("Contenu exploitable insuffisant.");
  }

  return cleaned;
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

  try {
    const websiteContent = await extractWebsiteContent(trimmedContent);

    return {
      normalizedContent: websiteContent,
      normalizedSourceType: "site"
    };
  } catch (error) {
    console.error("URL extraction error:", error);

    return {
      normalizedContent: `Site fourni : ${trimmedContent}`,
      normalizedSourceType: "site"
    };
  }
}

async function runModelAnalysis(content: string, sourceType = "mixed") {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("OPENAI_API_KEY manquante");
    return null;
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
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
    return null;
  }

  try {
    const text =
      data.output?.[0]?.content?.[0]?.text ||
      data.output_text ||
      "";

    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  }
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

    let finalResult: AuditAnalysisResult = buildFallbackAudit(normalizedContent);

    try {
      const modelOutput = await runModelAnalysis(
        normalizedContent,
        normalizedSourceType
      );

      if (modelOutput) {
        const parsed = parseAuditResult(modelOutput);

        if (parsed) {
          finalResult = parsed;
        }
      }
    } catch (error) {
      console.error("Model analysis error:", error);
    }

    if (sessionId) {
      attachSessionResult(sessionId, finalResult);
    }

    return NextResponse.json(finalResult, { status: 200 });
  } catch (error) {
    console.error("Analyse route error:", error);

    return NextResponse.json(
      {
        error: "Une erreur serveur est survenue pendant l’analyse."
      },
      { status: 500 }
    );
  }
}
