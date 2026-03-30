type RecommendationCardProps = {
  recommendation: string;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  return (
    <section className="rounded-[24px] border border-audit-border bg-white p-6 shadow-audit-soft sm:p-8">
      <h3 className="text-[24px] font-semibold text-audit-text">Recommandation prioritaire</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-audit-subtle">{recommendation}</p>
    </section>
  );
}
