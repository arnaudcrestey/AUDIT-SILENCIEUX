type GapHighlightCardProps = {
  mainGap: string;
};

export function GapHighlightCard({ mainGap }: GapHighlightCardProps) {
  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <h3 className="text-[24px] font-semibold text-audit-text">Décalage principal</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-audit-subtle">{mainGap}</p>
    </section>
  );
}
