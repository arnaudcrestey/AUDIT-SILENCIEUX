"use client";

import { useRouter } from "next/navigation";

type NextStepCardProps = {
  title?: string;
  text?: string;
};

export function NextStepCard({
  title = "Aller plus loin",
  text = "Ce premier audit met en lumière une première lecture. La suite consiste à clarifier précisément votre activité, votre message et votre point d’entrée."
}: NextStepCardProps) {
  const router = useRouter();

  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <h3 className="text-[24px] font-semibold text-audit-text">{title}</h3>
      <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-audit-subtle">{text}</p>
      <button
        type="button"
        onClick={() => router.push("/audit-silencieux/aller-plus-loin")}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
      >
        Aller plus loin
      </button>
    </section>
  );
}
