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
      <div className="space-y-8 lg:space-y-10">
        <header className="flex items-start justify-between gap-4">
          <a
            href="https://arnaudcrestey.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-col items-start"
          >
            <span className="font-serif text-[3rem] leading-none tracking-[-0.08em] text-audit-ink sm:text-[3.5rem]">
              AC
            </span>

            <span className="-mt-1 text-[1.02rem] font-medium tracking-[-0.02em] text-audit-ink sm:text-[1.12rem]">
              arnaudcrestey.com
            </span>

            <span className="mt-2 h-px w-16 bg-audit-border-subtle transition-all duration-300 group-hover:w-24" />
          </a>

          <div className="inline-flex items-center rounded-full border border-audit-border-subtle bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-audit-subtle shadow-audit-soft backdrop-blur-sm sm:text-[12px]">
            Diagnostic premium
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:items-start lg:gap-10">
          <div className="pt-2 lg:pt-6">
            <div className="mb-5 text-[0.82rem] font-semibold uppercase tracking-[0.26em] text-[#2f54b7]">
              Audit stratégique
            </div>

            <h1 className="max-w-[760px] font-serif text-[2.7rem] leading-[0.96] tracking-[-0.05em] text-audit-ink sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.2rem]">
              Ce que votre activité montre…
              <br />
              et ce que vos clients
              <br />
              comprennent réellement
            </h1>

            <p className="mt-6 max-w-[760px] text-[1.06rem] leading-[1.9] text-audit-subtle sm:text-[1.14rem]">
              Collez simplement votre site, une page ou votre présentation.
              Nous analysons ce que vous exprimez réellement — au-delà de ce que
              vous pensez dire.
            </p>
          </div>

          <aside className="rounded-[30px] border border-audit-border-subtle bg-white/88 p-7 shadow-audit-soft backdrop-blur-sm sm:p-8">
            <div className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-audit-subtle">
              À qui s’adresse cet audit
            </div>

            <p className="mt-4 text-[1.02rem] leading-[1.95] text-audit-ink">
              Aux professionnels de l’accompagnement, du conseil et aux activités
              de service qui veulent mieux comprendre ce que leur présence en
              ligne donne à percevoir dès les premières secondes.
            </p>

            <div className="mt-8 text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-audit-subtle">
              Ce que vous allez identifier
            </div>

            <ul className="mt-4 space-y-4 text-[1rem] leading-[1.8] text-audit-ink">
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

        <section className="rounded-[34px] border border-audit-border-subtle bg-white/82 p-3 shadow-[0_22px_80px_rgba(31,39,64,0.07)] sm:p-4 lg:p-5">
          <AuditInputCard />
        </section>

        <TrustMicrocopy />

        <section className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-[24px] border border-audit-border-subtle bg-white/92 px-5 py-5 text-[15px] leading-7 text-audit-subtle shadow-[0_14px_34px_rgba(31,39,64,0.05)]"
            >
              {benefit}
            </article>
          ))}
        </section>
      </div>
    </AuditShell>
  );
}
