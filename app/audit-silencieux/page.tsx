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
        <header className="flex items-start justify-between gap-6">
          <a
            href="https://arnaudcrestey.com"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex flex-col items-center text-center"
          >
            <span className="font-serif text-[2.45rem] leading-[0.9] tracking-[-0.07em] text-audit-ink sm:text-[2.9rem]">
              AC
            </span>

            <span className="mt-0.5 block text-[0.94rem] font-normal leading-none tracking-[-0.01em] text-audit-ink sm:text-[1rem]">
              arnaudcrestey.com
            </span>

            <span className="mt-3 h-px w-16 bg-audit-border-subtle transition-all duration-300 group-hover:w-24" />
          </a>

          <div className="inline-flex items-center rounded-full border border-audit-border-subtle bg-white/85 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-audit-subtle shadow-[0_10px_28px_rgba(31,39,64,0.05)] backdrop-blur-sm sm:text-[12px]">
            Diagnostic premium
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_420px] lg:items-start lg:gap-12">
          <div className="pt-1 lg:pt-5">
            <div className="mb-6 text-[0.8rem] font-semibold uppercase tracking-[0.26em] text-[#3154b8]">
              Audit stratégique
            </div>

            <h1 className="max-w-[700px] font-serif text-[2.85rem] leading-[0.94] tracking-[-0.045em] text-audit-ink sm:text-[3.7rem] md:text-[4.4rem] lg:text-[4.9rem]">
              Ce que votre activité montre…
              <br />
              et ce que vos clients
              <br />
              comprennent réellement
            </h1>

            <p className="mt-7 max-w-[690px] text-[1.04rem] leading-[1.95] text-audit-subtle sm:text-[1.1rem]">
              Collez simplement votre site, une page ou votre présentation.
              Nous analysons ce que vous exprimez réellement — au-delà de ce que
              vous pensez dire.
            </p>
          </div>

          <aside className="rounded-[32px] border border-audit-border-subtle bg-white/90 p-8 shadow-[0_18px_60px_rgba(31,39,64,0.06)] backdrop-blur-sm">
            <div className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-audit-subtle">
              À qui s’adresse cet audit
            </div>

            <p className="mt-5 text-[1.02rem] leading-[2] text-audit-ink">
              Aux professionnels de l’accompagnement, du conseil et aux activités
              de service qui veulent mieux comprendre ce que leur présence en ligne
              donne à percevoir dès les premières secondes.
            </p>

            <div className="mt-9 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-audit-subtle">
              Ce que vous allez identifier
            </div>

            <ul className="mt-5 space-y-4 text-[1rem] leading-[1.85] text-audit-ink">
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

        <section className="rounded-[36px] border border-audit-border-subtle bg-white/84 p-5 shadow-[0_24px_80px_rgba(31,39,64,0.07)] sm:p-6 lg:p-7">
          <div className="rounded-[30px] border border-audit-border-subtle bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(248,250,255,0.88)_100%)] p-4 sm:p-5 lg:p-6">
            <AuditInputCard />
          </div>
        </section>

        <div className="pt-1">
          <TrustMicrocopy />
        </div>

        <section className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit}
              className="rounded-[24px] border border-audit-border-subtle bg-white/92 px-6 py-5 text-[15px] leading-7 text-audit-subtle shadow-[0_14px_34px_rgba(31,39,64,0.045)]"
            >
              {benefit}
            </article>
          ))}
        </section>
      </div>
    </AuditShell>
  );
}
