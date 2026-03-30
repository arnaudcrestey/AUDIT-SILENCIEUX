type DualReadingCardProps = {
  expressedMessage: string;
  perceivedMessage: string;
};

export function DualReadingCard({
  expressedMessage,
  perceivedMessage
}: DualReadingCardProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2">
      <article className="rounded-[22px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-7">
        <h3 className="text-[22px] font-semibold text-audit-text">Ce que vous exprimez</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-audit-subtle">{expressedMessage}</p>
      </article>
      <article className="rounded-[22px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-7">
        <h3 className="text-[22px] font-semibold text-audit-text">Ce que le client perçoit</h3>
        <p className="mt-3 text-[16px] leading-relaxed text-audit-subtle">{perceivedMessage}</p>
      </article>
    </section>
  );
}
