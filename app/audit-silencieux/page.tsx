import { AuditInputCard } from "@/components/audit-silencieux/audit-input-card";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";
import { TrustMicrocopy } from "@/components/audit-silencieux/trust-microcopy";

const benefits = [
  "Une lecture structurée et immédiate de ce que votre activité exprime vraiment.",
  "Une mise en évidence claire de l’écart entre votre intention et la perception réelle.",
  "Une recommandation concrète pour renforcer la lisibilité de votre point d’entrée.",
];

export default function AuditSilencieuxPage() {
  return (
    <AuditShell>
      <div className="space-y-8 lg:space-y-9">
        <header className="flex items-start justify-between gap-6">
          <a
            href="https://arnaudcrestey.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-col items-center text-center"
          >
            <span className="font-serif text-[2.35rem] leading-[0.9] tracking-[-0.07em] text-audit-ink sm:text-[2.75rem]">
              AC
            </span>

            <span className="mt-0.5 block text-[0.9rem] font-normal leading-none tracking-[-0.01em] text-audit-ink sm:text-[0.96rem]">
              arnaudcrestey.com
            </span>

            <span className="mt-3 h-px w-16 bg-audit-border-subtle transition-all duration-300 group-hover:w-24" />
          </a>

          <div className="inline-flex items-center rounded-full border border-audit-border-subtle bg-white/88 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-audit-subtle shadow-[0_8px_24px_rgba(31,39,64,0.04)] backdrop-blur-sm sm:text-[12px]">
            Diagnostic premium
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.02fr)_430px] lg:items-start lg:gap-14">
          <div className="pt-1 lg:pt-4">
            <div className="mb-6 text-[0.78rem] font-semibold uppercase tracking-[0.28em] text-[#3154b8]">
              Audit stratégique
            </div>

            <h1 className="max-w-[660px] font-serif text-[2.7rem] leading-[0.93] tracking-[-0.05em] text-audit-ink sm:text-[3.45rem] md:text-[4.05rem] lg:text-[4.55rem]">
              Ce que votre activité montre…
              <br />
              et ce que vos clients
              <br />
              comprennent réellement
            </h1>

            <p className="mt-7 max-w-[640px] text-[1rem] leading-[1.95] text-audit-subtle sm:text-[1.08rem]">
              Collez simplement votre site, une page ou votre présentation.
              Nous analysons ce que vous exprimez réellement — au-delà de ce que
              vous pensez dire.
            </p>
          </div>

          <aside className="rounded-[32px] border border-audit-border-subtle bg-white/92 p-8 shadow-[0_16px_48px_rgba(31,39,64,0.05)] backdrop-blur-sm">
            <div className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-audit-subtle">
              À qui s’adresse cet audit
            </div>

            <p className="mt-5 text-[0.98rem] leading-[2] text-audit-ink">
              Aux professionnels de l’accompagnement, du conseil et aux activités
              de service qui veulent mieux comprendre ce que leur présence en ligne
              donne à percevoir dès les premières secondes.
            </p>

            <div className="mt-9 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-audit-subtle">
              Ce que vous allez identifier
            </div>

            <ul className="mt-5 space-y-4 text-[0.98rem] leading-[1.85] text-audit-ink">
              <li className="flex gap-3">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#3154b8]" />
                <span>Le message principal réellement perçu</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#3154b8]" />
                <span>Les écarts entre votre intention et la lecture client</span>
              </li>

              <li className="flex gap-3">
                <span className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#3154b8]" />
                <span>La priorité la plus utile pour renforcer votre lisibilité</span>
              </li>
            </ul>
          </aside>
        </section>

        <section className="mt-6">
  <AuditInputCard />
</section>

        <div className="pt-0.5">
          <TrustMicrocopy />
        </div>

        <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-[22px] border border-audit-border-subtle bg-white/94 px-5 py-5 text-[14px] leading-7 text-audit-subtle shadow-[0_12px_28px_rgba(31,39,64,0.04)]"
            >
              {benefit}
            </article>
          ))}
        </section>
      </div>
    </AuditShell>
  );
}
