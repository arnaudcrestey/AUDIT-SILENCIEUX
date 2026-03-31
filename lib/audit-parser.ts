import type { AuditAnalysisResult } from "@/lib/audit-types";

function extractJsonBlock(raw: string) {
  const trimmed = raw.trim();

  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    return trimmed;
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    return null;
  }

  return trimmed.slice(firstBrace, lastBrace + 1);
}

function normalizeText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim();
}

export function parseAuditResult(raw: string): AuditAnalysisResult | null {
  try {
    const jsonBlock = extractJsonBlock(raw);

    if (!jsonBlock) {
      return null;
    }

    const parsed = JSON.parse(jsonBlock) as Partial<AuditAnalysisResult>;

    const summary = normalizeText(parsed.summary);
    const expressedMessage = normalizeText(parsed.expressedMessage);
    const perceivedMessage = normalizeText(parsed.perceivedMessage);
    const mainGap = normalizeText(parsed.mainGap);
    const recommendation = normalizeText(parsed.recommendation);

    if (
      !summary ||
      !expressedMessage ||
      !perceivedMessage ||
      !mainGap ||
      !recommendation
    ) {
      return null;
    }

    return {
      summary,
      expressedMessage,
      perceivedMessage,
      mainGap,
      recommendation
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
    /pour|j'aide|j’aide|j accompagne|j'accompagne|nous aidons|offre|service|solution/.test(
      normalized
    );

  const hasOutcome =
    /résultat|bénéfice|transform|clarif|convert|client|visiteur|contact|gain/.test(
      normalized
    );

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
    "L’activité donne une impression sérieuse, mais son entrée reste encore trop large ou trop floue pour produire une compréhension immédiate.";

  let expressedMessage =
    `Le contenu laisse surtout apparaître une posture, un univers et une intention générale. Extrait détecté : « ${preview} ».`;

  let perceivedMessage =
    "Un visiteur peut sentir une proposition de valeur réelle sans comprendre assez vite ce qui est proposé, pour qui, et avec quel bénéfice direct.";

  let mainGap =
    "Le principal frein vient d’un manque de précision dans la formulation de l’offre d’entrée.";

  let recommendation =
    "Clarifiez dès le début ce que vous proposez concrètement, à qui cela s’adresse et ce que cela change pour la personne concernée.";

  if (signals.hasExpertise && !signals.hasOfferClarity) {
    summary =
      "Le contenu inspire un certain sérieux, mais il ne rend pas encore l’offre assez lisible pour un visiteur qui découvre l’activité.";
    mainGap =
      "L’expertise perçue n’est pas encore traduite en promesse d’entrée suffisamment claire.";
    recommendation =
      "Formulez une phrase d’ouverture simple qui relie votre expertise à un problème précis, un public identifiable et un bénéfice concret.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && !signals.hasOutcome) {
    summary =
      "L’activité semble structurée dans son intention, mais le bénéfice concret promis ne ressort pas encore avec assez de force.";
    perceivedMessage =
      "Le visiteur comprend qu’il existe une offre, mais il peut hésiter sur l’intérêt immédiat de passer à l’action.";
    mainGap =
      "Le message existe, mais le résultat visible attendu n’est pas encore assez tangible.";
    recommendation =
      "Ajoutez plus tôt une formulation centrée sur le résultat concret ou le changement obtenu par le client.";
  }

  if (signals.hasExpertise && signals.hasOfferClarity && signals.hasOutcome) {
    summary =
      "L’activité présente déjà des bases solides, mais l’entrée peut encore gagner en netteté pour accélérer la compréhension et la décision.";
    perceivedMessage =
      "Le visiteur perçoit une offre sérieuse, mais peut avoir besoin d’un cadrage plus direct pour comprendre rapidement pourquoi avancer ici.";
    mainGap =
      "La promesse existe, mais elle manque encore d’un niveau de précision suffisant dans les premiers repères.";
    recommendation =
      "Resserrez l’entrée autour d’une promesse plus directe : problème traité, profil concerné et bénéfice attendu.";
  }

  return {
    summary,
    expressedMessage,
    perceivedMessage,
    mainGap,
    recommendation
  };
}
