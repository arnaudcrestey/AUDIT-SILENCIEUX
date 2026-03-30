import { AuditHero } from "@/components/audit-silencieux/audit-hero";
import { AuditInputCard } from "@/components/audit-silencieux/audit-input-card";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";
import { TrustMicrocopy } from "@/components/audit-silencieux/trust-microcopy";

const benefits = [
  "Une lecture structurée et immédiate de votre positionnement.",
  "Une mise en évidence claire de la perception client réelle.",
  "Une recommandation actionnable pour clarifier votre point d’entrée."
];

export default function AuditSilencieuxPage() {
  return (
    <AuditShell>
      <div className="space-y-8 lg:space-y-10">
        <AuditHero />
        <AuditInputCard />
        <TrustMicrocopy />

        <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-2xl border border-audit-border-subtle bg-white px-5 py-4 text-[15px] text-audit-subtle shadow-audit-soft"
            >
              {benefit}
            </article>
          ))}
        </section>
      </div>
    </AuditShell>
  );
}
