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

  summary:
  "[FALLBACK] Votre activité présente déjà des signaux solides, mais son entrée reste encore un peu dense ou dispersée pour créer une adhésion immédiate.",

  let expressedMessage =
    `Vous montrez surtout votre niveau d’exigence, votre posture et une partie de votre savoir-faire. Extrait détecté : « ${preview} ».`;

  let perceivedMessage =
    "Un visiteur peut comprendre que vous êtes crédible, sans identifier immédiatement ce que vous faites prioritairement, pour qui, ni le bénéfice concret attendu.";

  let mainGap =
    "La valeur perçue existe, mais le point d’entrée ne transforme pas encore clairement votre expertise en choix évident.";

  let recommendation =
    "Clarifiez dès les premiers blocs ce que vous apportez, à quel profil précis, et avec quel résultat visible à court terme.";

  if (signals.hasExpertise && !signals.hasOfferClarity) {
    summary =
      "Votre activité paraît experte et structurée, mais elle reste difficile à saisir rapidement pour un nouveau visiteur.";
    mainGap =
      "L’expertise est visible, mais l’offre d’entrée n’est pas assez formulée pour orienter naturellement la compréhension.";
    recommendation =
      "Formulez en ouverture une phrase simple qui relie votre expertise à un problème précis, un public identifiable et un bénéfice concret.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && !signals.hasOutcome) {
    summary =
      "Votre activité semble claire dans son intention, mais elle n’indique pas encore assez nettement le résultat concret que le client peut attendre.";
    perceivedMessage =
      "Le visiteur comprend votre sérieux et votre logique, mais peut hésiter sur l’intérêt immédiat de passer à l’action.";
    mainGap =
      "Le message existe, mais le bénéfice observable n’est pas assez tangible pour accélérer la décision.";
    recommendation =
      "Ajoutez plus tôt une formulation centrée sur le résultat visible obtenu par le client, plutôt que sur la seule qualité de votre approche.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && signals.hasOutcome) {
    summary =
      "Votre activité présente déjà des signaux solides, mais son entrée reste encore un peu dense ou dispersée pour créer une adhésion immédiate.";
    perceivedMessage =
      "Le visiteur perçoit une offre sérieuse, mais peut avoir besoin d’un cadrage plus direct pour comprendre en quelques secondes pourquoi avancer avec vous.";
    mainGap =
      "La base est bonne, mais le message d’entrée manque encore de netteté pour transformer la compréhension en décision rapide.";
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
