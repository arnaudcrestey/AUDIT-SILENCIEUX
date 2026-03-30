type ResultSummaryCardProps = {
  summary: string;
};

export function ResultSummaryCard({ summary }: ResultSummaryCardProps) {
  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <h2 className="text-[30px] font-semibold text-audit-text sm:text-[34px]">Lecture de votre activité</h2>
      <p className="mt-4 text-[17px] leading-relaxed text-audit-subtle">{summary}</p>
    </section>
  );
}
