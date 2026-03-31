"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  buttonLabel?: string;
  mainGap?: string;
  recommendation?: string;
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
    return `Pour ${subjectName.trim()}, un point mérite d’être clarifié pour rendre l’offre plus immédiatement compréhensible.`;
  }

  return "Un point mérite d’être clarifié pour rendre l’offre plus immédiatement compréhensible.";
}

function buildMiddle(mainGap?: string) {
  const gap = (mainGap ?? "").toLowerCase();

  if (
    gap.includes("ne sait pas") ||
    gap.includes("ne comprend pas") ||
    gap.includes("ce qui est vendu") ||
    gap.includes("ce qui est proposé") ||
    gap.includes("ce que je peux obtenir")
  ) {
    return "Le diagnostic montre que le visiteur perçoit une intention sérieuse, mais ne parvient pas encore à identifier clairement ce qu’il peut obtenir, ni pourquoi cette offre lui serait utile.";
  }

  if (
    gap.includes("trop large") ||
    gap.includes("abstrait") ||
    gap.includes("générique") ||
    gap.includes("reste flou")
  ) {
    return "Le message donne une direction, mais il reste encore trop large pour permettre une projection rapide dans un service, un usage ou un résultat concret.";
  }

  if (
    gap.includes("résultats") ||
    gap.includes("bénéfice") ||
    gap.includes("projection")
  ) {
    return "Le fond paraît sérieux, mais les repères concrets manquent encore pour transformer l’intérêt initial en compréhension utile et en envie d’aller plus loin.";
  }

  return "Le diagnostic montre qu’il existe déjà une base crédible, mais que certains repères restent trop implicites pour produire une compréhension immédiate et rassurante.";
}

function buildOutro(recommendation?: string) {
  if (recommendation && recommendation.trim()) {
    return `La suite consiste à transformer ce constat en structure plus nette, en travaillant notamment ce point : ${recommendation.trim()}`;
  }

  return "La suite consiste à transformer ce constat en structure plus nette : préciser ce que vous proposez, pour qui, avec quel bénéfice concret, et comment le rendre plus lisible sur votre page.";
}

export function NextStepCard({
  title = "Aller plus loin",
  buttonLabel,
  mainGap,
  recommendation,
  subjectName
}: NextStepCardProps) {
  const router = useRouter();

  const computedButtonLabel = getButtonLabel(mainGap, buttonLabel);
  const redirectPath = getRedirectPath(mainGap);

  const paragraphs = [
    buildIntro(subjectName),
    buildMiddle(mainGap),
    buildOutro(recommendation)
  ];

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
