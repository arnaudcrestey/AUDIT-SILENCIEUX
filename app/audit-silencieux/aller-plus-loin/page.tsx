import Link from "next/link";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";

export default function AllerPlusLoinPage() {
  return (
    <AuditShell>
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
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

        <section className="rounded-[28px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
          <div className="inline-flex items-center rounded-full border border-audit-border bg-[#f8f9fc] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-audit-subtle">
            Suite recommandée
          </div>

          <h1 className="mt-4 text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-audit-text sm:text-[2.6rem]">
            Clarifier votre offre pour qu’elle soit immédiatement comprise
          </h1>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            L’audit a mis en évidence un blocage. La suite consiste à rendre
            votre activité lisible, précise et directement compréhensible pour
            vos futurs clients.
          </p>

          <div className="mt-6">
            <Link
              href="https://arnaudcrestey.com/contact"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[15px] font-medium text-white transition hover:bg-audit-blue-hover"
            >
              Parler de votre situation
            </Link>
          </div>
        </section>

        <section className="rounded-[24px] border border-audit-border bg-[#f9fbff] p-6 shadow-audit-soft sm:p-8">
          <h2 className="text-[1.4rem] font-semibold text-audit-text">
            Ce que cela change concrètement
          </h2>

          <ul className="mt-5 space-y-4 text-[1rem] leading-7 text-audit-subtle">
            <li>• Votre offre devient immédiatement compréhensible</li>
            <li>• Le visiteur comprend en quelques secondes si c’est pour lui</li>
            <li>• Votre message devient plus crédible et plus engageant</li>
            <li>• Vous facilitez naturellement le passage à l’action</li>
          </ul>
        </section>

        <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
          <h2 className="text-[1.4rem] font-semibold text-audit-text">
            Comment on avance
          </h2>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            Nous reprenons votre activité pour clarifier précisément :
          </p>

          <ul className="mt-4 space-y-3 text-[1rem] leading-7 text-audit-subtle">
            <li>• ce que vous proposez réellement</li>
            <li>• à qui cela s’adresse</li>
            <li>• ce que le client obtient concrètement</li>
          </ul>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            L’objectif n’est pas d’ajouter du marketing, mais de rendre votre
            activité immédiatement lisible.
          </p>
        </section>

        <section className="rounded-[26px] border border-[#dfe5f3] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9ff_100%)] p-6 text-center shadow-[0_24px_80px_rgba(31,39,64,0.08)] sm:p-8">
          <h2 className="text-[1.5rem] font-semibold text-audit-text">
            Passer à la prochaine étape
          </h2>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            Si vous souhaitez transformer cette première lecture en direction
            claire, nous pouvons en parler rapidement.
          </p>

          <div className="mt-6">
            <Link
              href="https://arnaudcrestey.com/contact"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-7 py-3 text-[15px] font-medium text-white shadow-[0_12px_28px_rgba(49,84,199,0.25)] transition hover:-translate-y-[1px] hover:bg-audit-blue-hover"
            >
              Ouvrir la discussion
            </Link>
          </div>

          <Link
            href="/audit-silencieux"
            className="mt-4 block text-sm text-audit-subtle underline"
          >
            Revenir à l’audit
          </Link>
        </section>
      </div>
    </AuditShell>
  );
}
