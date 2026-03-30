import { NextResponse } from "next/server";
import { buildAuditUserPrompt, AUDIT_SYSTEM_PROMPT } from "@/lib/audit-prompt";
import { buildFallbackAudit, parseAuditResult } from "@/lib/audit-parser";
import { attachSessionResult } from "@/lib/audit-storage";
import { validateAnalysePayload } from "@/lib/validations";
import type { AuditAnalysisResult } from "@/lib/audit-types";

async function runModelAnalysis(content: string, sourceType = "mixed") {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

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
    return null;
  }

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  return payload.choices?.[0]?.message?.content ?? null;
}

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const validation = validateAnalysePayload(json);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { content, sourceType, sessionId } = validation.data;

    let finalResult: AuditAnalysisResult = buildFallbackAudit(content);

    try {
      const modelOutput = await runModelAnalysis(content, sourceType);
      if (modelOutput) {
        const parsed = parseAuditResult(modelOutput);
        if (parsed) {
          finalResult = parsed;
        }
      }
    } catch {
      // fallback déjà défini
    }

    if (sessionId) {
      attachSessionResult(sessionId, finalResult);
    }

    return NextResponse.json(finalResult, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur serveur est survenue pendant l’analyse."
      },
      { status: 500 }
    );
  }
}
