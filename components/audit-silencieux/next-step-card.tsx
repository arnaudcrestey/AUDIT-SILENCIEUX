"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  text?: string;
  buttonLabel?: string;
};

export function NextStepCard({
  title = "Aller plus loin",
  text = "Ce diagnostic met en évidence un point précis : votre message ne permet pas encore à un visiteur de comprendre clairement ce que vous proposez et pour qui.\n\nDans la majorité des cas, ce type de décalage ne vient pas d’un manque de qualité, mais d’un manque de structure dans la manière dont l’offre est présentée.\n\nLa suite consiste à identifier concrètement ce que vous devez formuler en priorité, comment rendre votre offre immédiatement compréhensible, et comment transformer cette clarté en prise de contact réelle.",
  buttonLabel = "Comprendre ce qui bloque vraiment"
}: NextStepCardProps) {
  const router = useRouter();

  const paragraphs = text
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
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <button
          type="button"
          onClick={() => router.push("/audit-silencieux/aller-plus-loin")}
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
        >
          {buttonLabel}
        </button>
      </div>
    </section>
  );
}
