import type { AuditAnalysisResult } from "@/lib/audit-types";

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

function sanitizeContent(content: string) {
  return content
    .replace(/\s+/g, " ")
    .replace(/[|•]/g, " ")
    .trim();
}

function buildPreview(content: string, maxLength = 180) {
  const normalized = sanitizeContent(content);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}…`;
}

function detectSignals(content: string) {
  const normalized = sanitizeContent(content).toLowerCase();

  const hasExpertise =
    /expert|expérience|accompagnement|conseil|stratég|audit|analyse|méthode|système/.test(
      normalized
    );

  const hasOfferClarity =
    /pour|j'aide|j’accompagne|j aide|nous aidons|offre|service|solution/.test(normalized);

  const hasOutcome =
    /résultat|bénéfice|transform|clarif|convert|client|visiteur|contact/.test(normalized);

  return {
    hasExpertise,
    hasOfferClarity,
    hasOutcome
  };
}

export function buildFallbackAudit(content: string): AuditAnalysisResult {
  const normalized = sanitizeContent(content);
  const preview = buildPreview(normalized);
  const signals = detectSignals(normalized);

  let summary =
    "Votre activité présente des signaux sérieux, mais son entrée reste encore trop floue ou trop dense pour déclencher une compréhension immédiate.";

  let expressedMessage =
    `Vous montrez surtout votre posture, votre niveau d’exigence et une partie de votre savoir-faire. Extrait détecté : « ${preview} ».`;

  let perceivedMessage =
    "Un visiteur peut percevoir une activité crédible, sans comprendre immédiatement ce que vous apportez en priorité, pour qui, et avec quel résultat concret.";

  let mainGap =
    "Votre expertise existe, mais elle n’est pas encore traduite en message d’entrée assez net pour orienter la décision.";

  let recommendation =
    "Clarifiez dès les premiers blocs le problème traité, le public concerné et le bénéfice concret attendu.";

  if (signals.hasExpertise && !signals.hasOfferClarity) {
    summary =
      "Votre activité paraît experte, mais elle reste difficile à saisir rapidement pour un nouveau visiteur.";
    mainGap =
      "L’expertise est visible, mais l’offre d’entrée n’est pas assez formulée pour guider naturellement la compréhension.";
    recommendation =
      "Formulez en ouverture une phrase simple qui relie clairement votre expertise à un problème précis, un public identifiable et un bénéfice concret.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && !signals.hasOutcome) {
    summary =
      "Votre activité semble structurée dans son intention, mais le résultat concret promis ne ressort pas encore assez nettement.";
    perceivedMessage =
      "Le visiteur comprend votre sérieux, mais peut hésiter sur l’intérêt immédiat de passer à l’action.";
    mainGap =
      "Le message existe, mais le bénéfice observable n’est pas assez tangible pour accélérer la décision.";
    recommendation =
      "Ajoutez plus tôt une formulation centrée sur le résultat visible obtenu par le client.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && signals.hasOutcome) {
    summary =
      "Votre activité présente déjà des éléments solides, mais son entrée manque encore de netteté pour créer une adhésion immédiate.";
    perceivedMessage =
      "Le visiteur perçoit une offre sérieuse, mais peut avoir besoin d’un cadrage plus direct pour comprendre rapidement pourquoi avancer avec vous.";
    mainGap =
      "Le message d’entrée manque encore de précision pour transformer la compréhension en décision rapide.";
    recommendation =
      "Resserrez votre entrée autour d’une promesse plus directe : problème traité, profil concerné et résultat attendu.";
  }

  return {
    summary,
    expressedMessage,
    perceivedMessage,
    mainGap,
    recommendation
  };
}
