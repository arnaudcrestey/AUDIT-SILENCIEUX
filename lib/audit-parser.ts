import type { AuditAnalysisResult } from "@/lib/audit-types";

export function parseAuditResult(raw: string): AuditAnalysisResult | null {
  try {
    const parsed = JSON.parse(raw) as Partial<AuditAnalysisResult>;

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
      summary: parsed.summary.trim(),
      expressedMessage: parsed.expressedMessage.trim(),
      perceivedMessage: parsed.perceivedMessage.trim(),
      mainGap: parsed.mainGap.trim(),
      recommendation: parsed.recommendation.trim()
    };
  } catch {
    return null;
  }
}

export function buildFallbackAudit(content: string): AuditAnalysisResult {
  const normalized = content.replace(/\s+/g, " ").trim();
  const preview = normalized.slice(0, 170);

  return {
    summary:
      "Votre activité se présente comme experte, mais son entrée manque de cadre explicite. Le fond paraît solide, la lecture reste toutefois dispersée pour un nouveau visiteur.",
    expressedMessage:
      `Vous montrez surtout votre expérience, vos intentions et vos savoir-faire. Extrait détecté : « ${preview}${normalized.length > 170 ? "…" : ""} ».`,
    perceivedMessage:
      "Le client comprend que vous êtes sérieux, mais il peut hésiter sur ce que vous résolvez en premier, pour qui, et avec quel résultat concret.",
    mainGap:
      "Le niveau d’expertise est visible, mais la promesse d’entrée n’est pas assez explicite pour orienter la décision rapidement.",
    recommendation:
      "Clarifiez dès les premiers blocs une phrase de positionnement centrée sur le problème principal traité, le profil client visé et le bénéfice observable à court terme."
  };
}
