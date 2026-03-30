import Link from "next/link";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";

const outcomes = [
  "Une formulation précise de votre activité, nette et immédiatement lisible.",
  "Un message principal aligné avec la perception réelle de vos clients.",
  "Un point d’entrée solide pour vos pages clés et vos prises de contact."
];

const audience = [
  "Dirigeants, consultants et indépendants avec une offre difficile à expliquer.",
  "Structures expertes qui veulent gagner en clarté sans sur-promesse.",
  "Équipes qui ressentent un écart entre leur savoir-faire et leur conversion."
];

const deliverables = [
  "Une lecture stratégique complète de votre activité et de vos signaux clés.",
  "Un cadre de clarification de positionnement et de proposition de valeur.",
  "Des recommandations concrètes pour votre parcours de conversion premium."
];

export default function AllerPlusLoinPage() {
  return (
    <AuditShell>
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-[26px] border border-audit-border bg-white p-7 shadow-audit-soft sm:p-10">
          <h1 className="text-[38px] font-semibold leading-tight text-audit-text sm:text-[52px]">
            Clarification complète
          </h1>
          <p className="mt-4 max-w-3xl text-[17px] leading-relaxed text-audit-subtle">
            L’audit silencieux ouvre une première lecture. La clarification complète vous permet
            d’aligner votre activité, votre message et votre point d’entrée avec un niveau de
            précision réellement exploitable.
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <article className="rounded-2xl border border-audit-border bg-white p-6 shadow-audit-soft">
            <h2 className="text-[24px] font-semibold text-audit-text">Ce que cela vous apporte</h2>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-audit-subtle">
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-audit-border bg-white p-6 shadow-audit-soft">
            <h2 className="text-[24px] font-semibold text-audit-text">Pour qui c’est utile</h2>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-audit-subtle">
              {audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-audit-border bg-white p-6 shadow-audit-soft">
            <h2 className="text-[24px] font-semibold text-audit-text">Ce que vous recevez</h2>
            <ul className="mt-4 space-y-3 text-[16px] leading-relaxed text-audit-subtle">
              {deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
          <h3 className="text-[26px] font-semibold text-audit-text">Finaliser la prochaine étape</h3>
          <p className="mt-3 max-w-3xl text-[17px] leading-relaxed text-audit-subtle">
            Si vous souhaitez transformer cette première lecture en trajectoire claire, nous pouvons
            ouvrir une session de clarification dédiée à votre activité.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="mailto:contact@arnaudcrestey.com?subject=Clarification%20compl%C3%A8te%20-%20Audit%20silencieux"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover"
            >
              Ouvrir une session de clarification
            </Link>
            <Link
              href="/audit-silencieux"
              className="inline-flex items-center justify-center rounded-xl border border-audit-border px-6 py-3 text-[16px] font-medium text-audit-text"
            >
              Revenir à l’audit
            </Link>
          </div>
        </section>
      </div>
    </AuditShell>
  );
}
