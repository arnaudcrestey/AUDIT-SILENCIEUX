export function parseAuditResult(raw: string): AuditAnalysisResult | null {
  try {
    const jsonMatch = raw.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return null;
    }

    const parsed = JSON.parse(jsonMatch[0]) as Partial<AuditAnalysisResult>;

    if (
      typeof parsed.summary !== "string" ||
      typeof parsed.expressedMessage !== "string" ||
      typeof parsed.perceivedMessage !== "string" ||
      typeof parsed.mainGap !== "string" ||
      typeof parsed.recommendation !== "string"
    ) {
      return null;
    }

    return {
      summary: parsed.summary.replace(/^\[(TEST IA|FALLBACK|IA ACTIVE)\]\s*/i, "").trim(),
      expressedMessage: parsed.expressedMessage.trim(),
      perceivedMessage: parsed.perceivedMessage.trim(),
      mainGap: parsed.mainGap.trim(),
      recommendation: parsed.recommendation.trim()
    };
  } catch {
    return null;
  }
}
