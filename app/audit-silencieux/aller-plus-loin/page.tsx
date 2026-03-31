import Link from "next/link";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";

const forWho = [
  "Votre activité est sérieuse, mais votre offre reste difficile à identifier immédiatement.",
  "Votre message donne une impression de qualité, sans permettre au visiteur de se projeter clairement.",
  "Vous sentez un écart entre la valeur réelle de votre travail et la façon dont il est perçu en ligne."
];

const outcomes = [
  "Une reformulation claire de votre activité, de votre offre et de votre point d’entrée.",
  "Un message principal plus lisible, plus concret et plus immédiatement compréhensible.",
  "Des ajustements directement exploitables pour mieux orienter vos visiteurs vers la prise de contact."
];

const processSteps = [
  {
    title: "1. Lecture ciblée",
    text: "Nous reprenons votre activité, vos pages clés ou vos supports pour identifier précisément ce qui est compris, ce qui reste flou et où la lecture se bloque."
  },
  {
    title: "2. Clarification stratégique",
    text: "Nous clarifions votre offre, votre cible prioritaire, vos bénéfices visibles et la façon dont votre proposition doit être formulée."
  },
  {
    title: "3. Recommandation exploitable",
    text: "Vous repartez avec une direction claire, structurée et directement réutilisable pour renforcer votre lisibilité et votre conversion."
  }
];

const deliverables = [
  "Une lecture stratégique de votre message actuel",
  "Un cadrage plus net de votre offre",
  "Une clarification de votre cible prioritaire",
  "Des recommandations concrètes pour vos pages ou supports",
  "Une base solide pour renforcer votre point d’entrée"
];

export default function AllerPlusLoinPage() {
  return (
    <AuditShell>
      <div className="mx-auto max-w-6xl space-y-6 sm:space-y-8">
        <header className="rounded-[28px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8 lg:p-10">
          <div className="inline-flex items-center rounded-full border border-audit-border bg-[#f8f9fc] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-audit-subtle">
            Suite recommandée
          </div>

          <h1 className="mt-4 max-w-4xl text-[2rem] font-semibold leading-[1.02] tracking-[-0.03em] text-audit-text sm:text-[2.6rem] lg:text-[3.4rem]">
            Transformez cette lecture en clarification complète de votre offre
          </h1>

          <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-audit-subtle sm:text-[1.06rem]">
            L’audit silencieux met en lumière un blocage. La clarification complète
            vous permet d’aller plus loin : rendre votre activité plus lisible,
            votre offre plus identifiable et votre point d’entrée plus efficace.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="mailto:contact@arnaudcrestey.com?subject=Clarification%20compl%C3%A8te%20-%20Audit%20silencieux"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[15px] font-medium text-white transition hover:bg-audit-blue-hover"
            >
              Demander une clarification complète
            </Link>

            <Link
              href="/audit-silencieux"
              className="inline-flex items-center justify-center rounded-xl border border-audit-border px-6 py-3 text-[15px] font-medium text-audit-text transition hover:bg-white/70"
            >
              Revenir à l’audit
            </Link>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
            <h2 className="text-[1.45rem] font-semibold text-audit-text sm:text-[1.7rem]">
              Quand cette suite devient pertinente
            </h2>

            <ul className="mt-5 space-y-4 text-[1rem] leading-8 text-audit-subtle">
              {forWho.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[13px] h-2 w-2 shrink-0 rounded-full bg-audit-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
            <h2 className="text-[1.45rem] font-semibold text-audit-text sm:text-[1.7rem]">
              Ce que cela vous apporte
            </h2>

            <ul className="mt-5 space-y-4 text-[1rem] leading-8 text-audit-subtle">
              {outcomes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[13px] h-2 w-2 shrink-0 rounded-full bg-audit-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
          <h2 className="text-[1.45rem] font-semibold text-audit-text sm:text-[1.7rem]">
            Comment se déroule la clarification
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {processSteps.map((step) => (
              <article
                key={step.title}
                className="rounded-[20px] border border-audit-border bg-[#fbfcfe] p-5"
              >
                <h3 className="text-[1.05rem] font-semibold text-audit-text">
                  {step.title}
                </h3>
                <p className="mt-3 text-[0.98rem] leading-7 text-audit-subtle">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <article className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
            <h2 className="text-[1.45rem] font-semibold text-audit-text sm:text-[1.7rem]">
              Ce que vous recevez
            </h2>

            <ul className="mt-5 space-y-4 text-[1rem] leading-8 text-audit-subtle">
              {deliverables.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[13px] h-2 w-2 shrink-0 rounded-full bg-audit-blue" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
            <h2 className="text-[1.45rem] font-semibold text-audit-text sm:text-[1.7rem]">
              Ouvrir la prochaine étape
            </h2>

            <p className="mt-4 text-[1rem] leading-8 text-audit-subtle">
              Cette suite est utile si vous ne cherchez pas seulement un avis,
              mais une direction claire pour rendre votre activité plus lisible
              et plus convaincante. L’objectif n’est pas d’ajouter du marketing
              artificiel, mais de clarifier ce qui doit être compris immédiatement.
            </p>

            <div className="mt-6 rounded-[18px] border border-audit-border bg-[#fafbfe] p-5">
              <p className="text-[0.98rem] leading-7 text-audit-subtle">
                La prise de contact permet de vérifier rapidement si cette
                clarification est pertinente pour votre activité et sous quelle
                forme elle peut être menée.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="mailto:contact@arnaudcrestey.com?subject=Clarification%20compl%C3%A8te%20-%20Audit%20silencieux"
                className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[15px] font-medium text-white transition hover:bg-audit-blue-hover"
              >
                Ouvrir une session de clarification
              </Link>

              <Link
                href="/audit-silencieux"
                className="inline-flex items-center justify-center rounded-xl border border-audit-border px-6 py-3 text-[15px] font-medium text-audit-text transition hover:bg-white/70"
              >
                Revenir à l’audit
              </Link>
            </div>
          </article>
        </section>
      </div>
    </AuditShell>
  );
}
