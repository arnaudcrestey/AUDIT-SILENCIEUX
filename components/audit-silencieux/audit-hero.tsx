export function AuditHero() {
  return (
    <header className="mx-auto max-w-4xl space-y-6 text-center">
      <span className="inline-flex items-center rounded-full border border-audit-border bg-white px-4 py-1 text-sm font-medium text-audit-muted shadow-audit-soft">
        Audit stratégique
      </span>

      <h1 className="text-balance text-[38px] font-semibold leading-[1.05] text-audit-text sm:text-[48px] lg:text-[62px]">
        Ce que votre activité montre…
        <br className="hidden sm:block" />
        et ce que vos clients comprennent réellement
      </h1>

      <p className="mx-auto max-w-3xl text-[17px] leading-relaxed text-audit-subtle sm:text-[18px]">
        Collez simplement votre site, une page ou votre présentation.
        <br className="hidden sm:block" />
        Nous analysons ce que vous exprimez réellement — au-delà de ce que vous pensez dire.
      </p>
    </header>
  );
}
