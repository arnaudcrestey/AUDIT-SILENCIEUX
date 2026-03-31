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

function normalizeText(text?: string) {
  return (text ?? "").replace(/\s+/g, " ").trim();
}

function stripTrailingPeriod(text: string) {
  return text.replace(/\s*[.:;!?]+$/, "").trim();
}

function lowerFirst(text: string) {
  if (!text) return "";
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function extractSubjectName(expressedMessage?: string) {
  const value = normalizeText(expressedMessage);

  const match = value.match(
    /^([A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*(?:\s+[A-ZÀ-ÖØ-Ý0-9][\wÀ-ÖØ-öø-ÿ.\-]*){0,4})\s+(propose|conçoit|développe|présente|offre|met en place|crée)\b/i
  );

  if (!match) return "";

  return match[1].trim();
}

function getButtonLabel(mainGap?: string, buttonLabel?: string) {
  if (buttonLabel) return buttonLabel;

  const gap = normalizeText(mainGap).toLowerCase();

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
  const gap = normalizeText(mainGap).toLowerCase();

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

type GapProfile = "offer-clarity" | "message-structure" | "conversion-friction";

function getGapProfile(mainGap?: string, perceivedMessage?: string): GapProfile {
  const gap = normalizeText(mainGap).toLowerCase();
  const perceived = normalizeText(perceivedMessage).toLowerCase();

  const combined = `${gap} ${perceived}`;

  if (
    combined.includes("ne sait pas") ||
    combined.includes("ne comprend pas") ||
    combined.includes("ce qui est vendu") ||
    combined.includes("ce qui est proposé") ||
    combined.includes("ce que je peux obtenir") ||
    combined.includes("services") ||
    combined.includes("prestations") ||
    combined.includes("offre")
  ) {
    return "offer-clarity";
  }

  if (
    combined.includes("trop large") ||
    combined.includes("abstrait") ||
    combined.includes("générique") ||
    combined.includes("manque de précision") ||
    combined.includes("reste flou") ||
    combined.includes("positionnement") ||
    combined.includes("lisible")
  ) {
    return "message-structure";
  }

  return "conversion-friction";
}

function buildIntro(subjectName: string, profile: GapProfile) {
  const subject = subjectName ? `Dans le cas de ${subjectName}` : "Dans ce cas";

  switch (profile) {
    case "offer-clarity":
      return `${subject}, l’audit ne met pas en évidence un manque de sérieux ou de valeur, mais un défaut de traduction immédiate de l’offre.`;
    case "message-structure":
      return `${subject}, l’audit montre une intention réelle et un univers cohérent, mais encore insuffisamment structurés pour produire une compréhension rapide.`;
    case "conversion-friction":
      return `${subject}, l’audit confirme qu’une base solide existe déjà, mais que certains points de lecture freinent encore l’adhésion immédiate.`;
  }
}

function buildImpactParagraph(profile: GapProfile, mainGap?: string, perceivedMessage?: string) {
  const gap = stripTrailingPeriod(normalizeText(mainGap));
  const perceived = stripTrailingPeriod(normalizeText(perceivedMessage));

  if (profile === "offer-clarity") {
    if (gap) {
      return `Concrètement, le visiteur perçoit une promesse de qualité, mais ne peut pas identifier assez vite ce qui est réellement proposé, pour qui, et avec quel bénéfice concret : ${lowerFirst(gap)}.`;
    }

    if (perceived) {
      return `Concrètement, le visiteur perçoit une promesse de qualité, mais ne peut pas identifier assez vite ce qui est réellement proposé, pour qui, et avec quel bénéfice concret : ${lowerFirst(perceived)}.`;
    }

    return `Concrètement, le visiteur perçoit une promesse de qualité, mais ne comprend pas assez vite ce qui lui est proposé ni ce qu’il peut en attendre.`;
  }

  if (profile === "message-structure") {
    if (gap) {
      return `Le frein principal se situe dans la mise en forme du message : l’ensemble paraît sérieux, mais encore trop large ou trop abstrait pour déclencher une projection nette : ${lowerFirst(gap)}.`;
    }

    if (perceived) {
      return `Le frein principal se situe dans la mise en forme du message : l’ensemble paraît sérieux, mais encore trop large ou trop abstrait pour déclencher une projection nette : ${lowerFirst(perceived)}.`;
    }

    return `Le frein principal se situe dans la mise en forme du message : l’ensemble paraît sérieux, mais encore trop large ou trop abstrait pour déclencher une projection nette.`;
  }

  if (gap) {
    return `Le point sensible n’est donc pas seulement le contenu, mais la fluidité du passage entre lecture, compréhension et envie d’aller plus loin : ${lowerFirst(gap)}.`;
  }

  if (perceived) {
    return `Le point sensible n’est donc pas seulement le contenu, mais la fluidité du passage entre lecture, compréhension et envie d’aller plus loin : ${lowerFirst(perceived)}.`;
  }

  return `Le point sensible n’est donc pas seulement le contenu, mais la fluidité du passage entre lecture, compréhension et envie d’aller plus loin.`;
}

function buildActionParagraph(profile: GapProfile, recommendation?: string) {
  const reco = stripTrailingPeriod(normalizeText(recommendation));

  if (reco) {
    return `La suite logique consiste à renforcer prioritairement ce levier pour rendre la page plus immédiate, plus crédible et plus engageante : ${lowerFirst(reco)}.`;
  }

  switch (profile) {
    case "offer-clarity":
      return `La suite logique consiste à clarifier l’offre dès les premiers écrans, en nommant plus directement les services, leur usage et la cible concernée.`;
    case "message-structure":
      return `La suite logique consiste à resserrer le message, hiérarchiser les informations et rendre la proposition plus concrète dès les premiers blocs.`;
    case "conversion-friction":
      return `La suite logique consiste à fluidifier la lecture, renforcer les repères de compréhension et mieux orienter le visiteur vers l’étape suivante.`;
  }
}

function buildClosingLine(profile: GapProfile) {
  switch (profile) {
    case "offer-clarity":
      return "L’enjeu n’est pas d’en dire plus, mais d’être compris plus vite.";
    case "message-structure":
      return "L’enjeu n’est pas de complexifier le discours, mais de le rendre plus net.";
    case "conversion-friction":
      return "L’enjeu n’est pas de tout refaire, mais d’enlever ce qui ralentit la décision.";
  }
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
  const profile = getGapProfile(mainGap, perceivedMessage);

  return [
    buildIntro(subjectName, profile),
    buildImpactParagraph(profile, mainGap, perceivedMessage),
    buildActionParagraph(profile, recommendation),
    buildClosingLine(profile)
  ];
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

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => router.push(redirectPath)}
            className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
          >
            {computedButtonLabel}
          </button>

          <span className="text-[14px] text-audit-subtle">
            Recommandation issue de la lecture de votre page
          </span>
        </div>
      </div>
    </section>
  );
}
