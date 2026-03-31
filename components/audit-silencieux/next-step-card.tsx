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

function getProfile(mainGap?: string, perceived?: string) {
  const combined = `${mainGap ?? ""} ${perceived ?? ""}`.toLowerCase();

  if (
    combined.includes("ne sait pas") ||
    combined.includes("ne comprend pas") ||
    combined.includes("ce qui est vendu") ||
    combined.includes("ce qui est proposé") ||
    combined.includes("services") ||
    combined.includes("offre")
  ) {
    return "clarity";
  }

  if (
    combined.includes("trop large") ||
    combined.includes("abstrait") ||
    combined.includes("générique") ||
    combined.includes("flou")
  ) {
    return "structure";
  }

  return "conversion";
}

function getButtonLabel(mainGap?: string, buttonLabel?: string) {
  if (buttonLabel) return buttonLabel;

  const gap = (mainGap ?? "").toLowerCase();

  if (gap.includes("ne sait pas") || gap.includes("ce qui est")) {
    return "Clarifier votre offre";
  }

  if (gap.includes("abstrait") || gap.includes("flou")) {
    return "Structurer votre message";
  }

  return "Optimiser votre point d’entrée";
}

function getRedirectPath(mainGap?: string) {
  const gap = (mainGap ?? "").toLowerCase();

  if (gap.includes("ne sait pas") || gap.includes("ce qui est")) {
    return "/audit-silencieux/clarification";
  }

  if (gap.includes("abstrait") || gap.includes("flou")) {
    return "/audit-silencieux/structuration";
  }

  return "/audit-silencieux/optimisation";
}

function buildParagraphs(mainGap?: string, recommendation?: string, perceived?: string) {
  const gap = normalize(mainGap);
  const reco = normalize(recommendation);
  const percep = normalize(perceived);

  const profile = getProfile(gap, percep);

  // 1. Constat direct
  let p1 = "Votre page transmet une intention sérieuse, mais le message ne se transforme pas encore en compréhension immédiate.";

  if (profile === "clarity") {
    p1 = "Votre page donne une impression de qualité, mais l’offre n’est pas immédiatement identifiable.";
  }

  if (profile === "structure") {
    p1 = "Votre page est cohérente dans le fond, mais le message reste trop large pour être compris rapidement.";
  }

  // 2. Impact utilisateur concret
  let p2 = "Concrètement, le visiteur comprend l’intention globale, mais ne sait pas rapidement ce que vous proposez ni ce qu’il doit faire ensuite.";

  if (gap) {
    p2 = `Concrètement, le visiteur comprend l’intention, mais bloque dès qu’il cherche à se projeter : ${lowerFirst(gap)}.`;
  } else if (percep) {
    p2 = `Concrètement, le visiteur perçoit une direction, mais manque de repères clairs : ${lowerFirst(percep)}.`;
  }

  // 3. Action claire
  let p3 = "L’ajustement prioritaire consiste à rendre votre proposition explicite dès les premiers éléments visibles de la page.";

  if (reco) {
    p3 = `L’ajustement prioritaire consiste à ${lowerFirst(reco)}.`;
  }

  // 4. Punchline
  let p4 = "L’enjeu n’est pas d’en dire plus, mais d’être compris immédiatement.";

  if (profile === "structure") {
    p4 = "L’enjeu n’est pas de complexifier, mais de clarifier.";
  }

  if (profile === "conversion") {
    p4 = "L’enjeu n’est pas de tout refaire, mais d’enlever les points de friction.";
  }

  return [p1, p2, p3, p4];
}

export function NextStepCard({
  title = "Aller plus loin",
  buttonLabel,
  mainGap,
  recommendation,
  perceivedMessage
}: NextStepCardProps) {
  const router = useRouter();

  const paragraphs = buildParagraphs(mainGap, recommendation, perceivedMessage);

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
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(getRedirectPath(mainGap))}
            className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
          >
            {getButtonLabel(mainGap, buttonLabel)}
          </button>

          <span className="text-[14px] text-audit-subtle">
            Recommandation issue de votre page
          </span>
        </div>
      </div>
    </section>
  );
}
