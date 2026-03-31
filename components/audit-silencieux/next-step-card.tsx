"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  buttonLabel?: string;
  mainGap?: string;
  recommendation?: string;
  expressedMessage?: string;
  perceivedMessage?: string;
};

function getButtonLabel(mainGap?: string, buttonLabel?: string) {
  if (buttonLabel) return buttonLabel;

  const gap = (mainGap ?? "").toLowerCase();

  if (
    gap.includes("ne sait pas") ||
    gap.includes("ne comprend pas") ||
    gap.includes("ce qui est vendu") ||
    gap.includes("ce qui est proposé") ||
    gap.includes("ce que je peux obtenir") ||
    gap.includes("nature exacte de l'offre") ||
    gap.includes("nature précise des services")
  ) {
    return "Clarifier votre offre";
  }

  if (
    gap.includes("trop large") ||
    gap.includes("abstrait") ||
    gap.includes("générique") ||
    gap.includes("manque de précision") ||
    gap.includes("reste flou")
  ) {
    return "Structurer votre message";
  }

  return "Optimiser votre point d’entrée";
}

function getRedirectPath(mainGap?: string) {
  const gap = (mainGap ?? "").toLowerCase();

  if (
    gap.includes("ne sait pas") ||
    gap.includes("ne comprend pas") ||
    gap.includes("ce qui est vendu") ||
    gap.includes("ce qui est proposé") ||
    gap.includes("ce que je peux obtenir") ||
    gap.includes("nature exacte de l'offre") ||
    gap.includes("nature précise des services")
  ) {
    return "/audit-silencieux/clarification";
  }

  if (
    gap.includes("trop large") ||
    gap.includes("abstrait") ||
    gap.includes("générique") ||
    gap.includes("manque de précision") ||
    gap.includes("reste flou")
  ) {
    return "/audit-silencieux/structuration";
  }

  return "/audit-silencieux/optimisation";
}

function normalizeText(text?: string) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function stripLeadingSubject(text: string) {
  return text
    .replace(
      /^([A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*(?:\s+[A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*){0,4})\s+(propose|conçoit|développe|présente|offre|met en place|crée)\s+/i,
      ""
    )
    .trim();
}

function extractSubjectName(expressedMessage?: string) {
  const value = normalizeText(expressedMessage);

  const match = value.match(
    /^([A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*(?:\s+[A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*){0,4})\s+(propose|conçoit|développe|présente|offre|met en place|crée)\b/
  );

  if (!match) return "";

  return match[1].trim();
}

function buildParagraphs({
  expressedMessage,
  perceivedMessage,
  mainGap,
  recommendation
}: {
  expressedMessage?: string;
  perceivedMessage?: string;
  mainGap?: string;
  recommendation?: string;
}) {
  const subjectName = extractSubjectName(expressedMessage);
  const expressed = stripLeadingSubject(normalizeText(expressedMessage));
  const perceived = normalizeText(perceivedMessage);
  const gap = normalizeText(mainGap);
  const reco = normalizeText(recommendation);

  const p1 = subjectName
    ? `Dans le cas de ${subjectName}, l’audit confirme qu’il existe déjà une intention sérieuse et une base de valeur perçue.`
    : `Cet audit confirme qu’il existe déjà une intention sérieuse et une base de valeur perçue.`;

  const p2 = gap
    ? `Le point à travailler n’est pas la qualité de fond, mais le passage entre intention et compréhension immédiate : ${gap.charAt(0).toLowerCase() + gap.slice(1)}`
    : perceived
      ? `Le point à travailler n’est pas la qualité de fond, mais la manière dont l’offre est comprise au premier contact : ${perceived.charAt(0).toLowerCase() + perceived.slice(1)}`
      : `Le point à travailler n’est pas la qualité de fond, mais la manière dont l’offre est comprise au premier contact.`;

  const p3 = reco
    ? `La suite consiste à transformer ce diagnostic en structure plus nette, en travaillant en priorité ce levier : ${reco.charAt(0).toLowerCase() + reco.slice(1)}`
    : expressed
      ? `La suite consiste à rendre cette proposition plus lisible, plus précise et plus directement exploitable dès les premiers blocs de la page.`
      : `La suite consiste à rendre l’offre plus lisible, plus précise et plus directement exploitable dès les premiers blocs de la page.`;

  return [p1, p2, p3];
}

export function NextStepCard({
  title = "Aller plus loin",
  buttonLabel,
  mainGap,
  recommendation,
  expressedMessage,
  perceivedMessage
}: NextStepCardProps) {
  const router = useRouter();

  const computedButtonLabel = getButtonLabel(mainGap, buttonLabel);
  const redirectPath = getRedirectPath(mainGap);

  const paragraphs = buildParagraphs({
    expressedMessage,
    perceivedMessage,
    mainGap,
    recommendation
  });

  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <div className="max-w-3xl">
        <h3 className="text-[24px] font-semibold text-audit-text sm:text-[28px]">
          {title}
        </h3>

        <div className="mt-3 space-y-4 text-[17px] leading-relaxed text-audit-subtle">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 30)}`}>{paragraph}</p>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.push(redirectPath)}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
        >
          {computedButtonLabel}
        </button>
      </div>
    </section>
  );
}
