"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  mainGap?: string;
  subjectName?: string;
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

function buildIntro(subjectName?: string) {
  if (subjectName && subjectName.trim()) {
    return `Pour ${subjectName.trim()}, un point reste à clarifier.`;
  }

  return "Un point reste à clarifier dans la manière dont votre offre est perçue.";
}

export function NextStepCard({
  title = "Aller plus loin",
  text,
  buttonLabel,
  mainGap,
  subjectName
}: NextStepCardProps) {
  const router = useRouter();

  const intro = buildIntro(subjectName);

  const finalText =
    text ??
    `${intro}

Le diagnostic montre qu’il existe déjà une intention claire, mais que certains repères restent insuffisamment explicites pour permettre une compréhension immédiate de l’offre.

La suite consiste à transformer cette première lecture en structure plus nette : préciser ce que vous proposez, pour qui, avec quel bénéfice concret, et comment rendre cela plus engageant sur votre page.`;

  const computedButtonLabel = getButtonLabel(mainGap, buttonLabel);
  const redirectPath = getRedirectPath(mainGap);

  const paragraphs = finalText
    .split("\n\n")
    .map((item) => item.trim())
    .filter(Boolean);

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
