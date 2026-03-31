"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
  mainGap?: string;
};

function cleanMainGap(text: string) {
  return text
    .replace(/^je comprends que\s*/i, "")
    .replace(/^le visiteur\s*/i, "")
    .replace(/^on\s*/i, "")
    .replace(/^bloque\s*(à|au|sur)?\s*/i, "")
    .trim();
}

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

export function NextStepCard({
  title = "Aller plus loin",
  text,
  buttonLabel,
  mainGap
}: NextStepCardProps) {
  const router = useRouter();

  const cleanedGap = mainGap ? cleanMainGap(mainGap) : "";

  const intro = cleanedGap
    ? `${cleanedGap.charAt(0).toUpperCase() + cleanedGap.slice(1)}`
    : "Votre message ne permet pas encore à un visiteur de comprendre clairement ce que vous proposez et pour qui.";

  const finalText =
    text ??
    `${intro}

Dans la majorité des cas, ce type de décalage ne vient pas d’un manque de qualité, mais d’un manque de structure dans la manière dont l’offre est présentée.

La suite consiste à identifier concrètement ce que vous devez formuler en priorité, comment rendre votre offre immédiatement compréhensible, et comment transformer cette clarté en prise de contact réelle.`;

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
