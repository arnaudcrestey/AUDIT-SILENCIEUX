"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  buttonLabel?: string;
  mainGap?: string;
  recommendation?: string;
  perceivedMessage?: string;
};

function normalize(text?: string) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function lowerFirst(text: string) {
  if (!text) return "";
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function stripTrailingPunctuation(text: string) {
  return text.replace(/\s*[.:;!?]+$/, "").trim();
}

type Profile = "clarity" | "structure" | "conversion";

function getProfile(mainGap?: string, perceived?: string): Profile {
  const combined = `${mainGap ?? ""} ${perceived ?? ""}`.toLowerCase();

  if (
    combined.includes("ne sait pas") ||
    combined.includes("ne comprend pas") ||
    combined.includes("ce qui est vendu") ||
    combined.includes("ce qui est proposé") ||
    combined.includes("ce qu'il peut obtenir") ||
    combined.includes("ce que je peux obtenir") ||
    combined.includes("service exact") ||
    combined.includes("services") ||
    combined.includes("prestations") ||
    combined.includes("offre")
  ) {
    return "clarity";
  }

  if (
    combined.includes("trop large") ||
    combined.includes("abstrait") ||
    combined.includes("générique") ||
    combined.includes("flou") ||
    combined.includes("manque de précision") ||
    combined.includes("reste flou")
  ) {
    return "structure";
  }

  return "conversion";
}

function getButtonLabel(mainGap?: string, buttonLabel?: string) {
  if (buttonLabel) return buttonLabel;

  const gap = normalize(mainGap).toLowerCase();

  if (
    gap.includes("ne sait pas") ||
    gap.includes("ne comprend pas") ||
    gap.includes("ce qui est vendu") ||
    gap.includes("ce qui est proposé") ||
    gap.includes("ce qu'il peut obtenir") ||
    gap.includes("ce que je peux obtenir") ||
    gap.includes("service exact") ||
    gap.includes("services") ||
    gap.includes("prestations") ||
    gap.includes("offre")
  ) {
    return "Clarifier votre offre";
  }

  if (
    gap.includes("trop large") ||
    gap.includes("abstrait") ||
    gap.includes("générique") ||
    gap.includes("flou") ||
    gap.includes("manque de précision") ||
    gap.includes("reste flou")
  ) {
    return "Structurer votre message";
  }

  return "Optimiser votre point d’entrée";
}

function getRedirectPath(mainGap?: string) {
  const gap = normalize(mainGap).toLowerCase();

  if (
    gap.includes("ne sait pas") ||
    gap.includes("ne comprend pas") ||
    gap.includes("ce qui est vendu") ||
    gap.includes("ce qui est proposé") ||
    gap.includes("ce qu'il peut obtenir") ||
    gap.includes("ce que je peux obtenir") ||
    gap.includes("service exact") ||
    gap.includes("services") ||
    gap.includes("prestations") ||
    gap.includes("offre")
  ) {
    return "/audit-silencieux/clarification";
  }

  if (
    gap.includes("trop large") ||
    gap.includes("abstrait") ||
    gap.includes("générique") ||
    gap.includes("flou") ||
    gap.includes("manque de précision") ||
    gap.includes("reste flou")
  ) {
    return "/audit-silencieux/structuration";
  }

  return "/audit-silencieux/optimisation";
}

function buildParagraphs(
  mainGap?: string,
  recommendation?: string,
  perceivedMessage?: string
) {
  const gap = stripTrailingPunctuation(normalize(mainGap));
  const reco = stripTrailingPunctuation(normalize(recommendation));
  const perceived = stripTrailingPunctuation(normalize(perceivedMessage));

  const profile = getProfile(gap, perceived);

  let p1 =
    "Dans l’état actuel, la page transmet une intention sérieuse, mais elle ne permet pas encore d’identifier clairement la nature exacte de l’offre.";

  if (perceived) {
    p1 = `Aujourd’hui, la lecture qui domine est la suivante : ${lowerFirst(perceived)}.`;
  }

  let p2 =
    "Ce qui freine n’est pas forcément la qualité perçue, mais le fait que le visiteur doive encore interpréter ce qu’il a sous les yeux.";

  if (gap) {
    p2 = `Le décalage principal se situe ici : ${lowerFirst(gap)}.`;
  }

  let p3 =
    "Autrement dit, la page suggère une valeur réelle, mais elle ne donne pas encore assez vite un point d’entrée concret, compréhensible et immédiatement projetable.";

  if (profile === "structure") {
    p3 =
      "Autrement dit, le fond paraît sérieux, mais la formulation reste encore trop large pour qu’un visiteur comprenne rapidement à quoi correspond l’offre.";
  }

  if (profile === "conversion") {
    p3 =
      "Autrement dit, ce n’est pas l’intention qui pose problème ici, mais la fluidité avec laquelle le visiteur comprend ce qu’il peut faire, obtenir ou attendre.";
  }

  let p4 =
    "L’ajustement le plus utile consiste à rendre l’offre plus explicite dès les premiers éléments visibles : ce que vous faites, pour qui, et avec quel bénéfice concret.";

  if (reco) {
    p4 = reco.charAt(0).toUpperCase() + reco.slice(1) + ".";
  }

  const p5 =
    "Quand la lecture est immédiate, la confiance monte. Quand elle demande un effort, l’intérêt retombe.";

  return [p1, p2, p3, p4, p5];
}

export function NextStepCard({
  title = "Aller plus loin",
  buttonLabel,
  mainGap,
  recommendation,
  perceivedMessage
}: NextStepCardProps) {
  const router = useRouter();

  const paragraphs = buildParagraphs(
    mainGap,
    recommendation,
    perceivedMessage
  );

  const computedButtonLabel = getButtonLabel(mainGap, buttonLabel);
  const redirectPath = getRedirectPath(mainGap);

  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <div className="max-w-3xl">
        <div className="inline-flex items-center rounded-full border border-audit-border bg-[#f8f9fc] px-3 py-1 text-[12px] font-medium uppercase tracking-[0.18em] text-audit-subtle">
          Suite recommandée
        </div>

        <h3 className="mt-4 text-[24px] font-semibold text-audit-text sm:text-[28px]">
          {title}
        </h3>

        <div className="mt-4 space-y-4 text-[17px] leading-relaxed text-audit-subtle">
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 40)}`}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-6 flex justify-center sm:justify-start">
          <button
            type="button"
            onClick={() => router.push(redirectPath)}
            className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
          >
            {computedButtonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
