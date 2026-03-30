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

  const text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const cleaned = text
    .split(". ")
    .filter((sentence) => sentence.trim().length > 40)
    .slice(0, 20)
    .join(". ");

  return cleaned.slice(0, 4000);
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

    if (!websiteContent || websiteContent.length < 80) {
      throw new Error("Contenu site trop court ou vide.");
    }

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

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.AUDIT_MODEL ?? "gpt-4.1-mini",
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: AUDIT_SYSTEM_PROMPT },
        { role: "user", content: buildAuditUserPrompt(content, sourceType) }
      ]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI error status:", response.status);
    console.error("OpenAI error body:", errorText);
    return null;
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const modelContent = payload.choices?.[0]?.message?.content ?? null;

  console.log("MODEL RAW OUTPUT:", modelContent);

  return modelContent;
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

    console.log("NORMALIZED SOURCE TYPE:", normalizedSourceType);
    console.log("NORMALIZED CONTENT PREVIEW:", normalizedContent.slice(0, 500));

    let finalResult: AuditAnalysisResult = buildFallbackAudit(normalizedContent);
    console.log("FALLBACK GENERATED");

    try {
      const modelOutput = await runModelAnalysis(
        normalizedContent,
        normalizedSourceType
      );

      if (!modelOutput) {
        console.log("NO MODEL OUTPUT -> USING FALLBACK");
      } else {
        const parsed = parseAuditResult(modelOutput);

        if (!parsed) {
          console.log("MODEL OUTPUT PARSE FAILED -> USING FALLBACK");
        } else {
          console.log("MODEL OUTPUT PARSED SUCCESSFULLY");
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
