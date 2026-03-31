import Link from "next/link";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";

export default function AllerPlusLoinPage() {
  return (
    <AuditShell>
      <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8">

        {/* HERO */}
        <header className="rounded-[28px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
          <div className="inline-flex items-center rounded-full border border-audit-border bg-[#f8f9fc] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-audit-subtle">
            Suite recommandée
          </div>

          <h1 className="mt-4 text-[2rem] font-semibold leading-tight text-audit-text sm:text-[2.6rem]">
            Clarifier votre offre pour qu’elle soit immédiatement comprise
          </h1>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            L’audit a mis en évidence un blocage.  
            La suite consiste à rendre votre activité lisible, précise et directement compréhensible pour vos futurs clients.
          </p>

          <div className="mt-6">
            <Link
              href="https://arnaudcrestey.com/contact"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-6 py-3 text-[15px] font-medium text-white transition hover:bg-audit-blue-hover"
            >
              Parler de votre situation
            </Link>
          </div>
        </header>

        {/* IMPACT */}
        <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
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

        {/* PROCESS */}
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
            L’objectif n’est pas d’ajouter du marketing, mais de rendre votre activité immédiatement lisible.
          </p>
        </section>

        {/* CTA FINAL */}
        <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8 text-center">
          <h2 className="text-[1.5rem] font-semibold text-audit-text">
            Passer à la prochaine étape
          </h2>

          <p className="mt-4 text-[1rem] leading-7 text-audit-subtle">
            Si vous souhaitez transformer cette première lecture en direction claire,
            nous pouvons en parler rapidement.
          </p>

          <div className="mt-6">
            <Link
              href="https://arnaudcrestey.com/contact"
              className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-7 py-3 text-[15px] font-medium text-white transition hover:bg-audit-blue-hover"
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
