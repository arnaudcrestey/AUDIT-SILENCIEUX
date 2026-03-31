"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";
import { DualReadingCard } from "@/components/audit-silencieux/dual-reading-card";
import { GapHighlightCard } from "@/components/audit-silencieux/gap-highlight-card";
import { NextStepCard } from "@/components/audit-silencieux/next-step-card";
import { RecommendationCard } from "@/components/audit-silencieux/recommendation-card";
import { ResultSummaryCard } from "@/components/audit-silencieux/result-summary-card";
import type { AuditAnalysisResult } from "@/lib/audit-types";

export default function ResultatPage() {
  const router = useRouter();
  const [result, setResult] = useState<AuditAnalysisResult | null>(null);

  useEffect(() => {
    const rawResult = localStorage.getItem("audit_silencieux_result");

    if (!rawResult) {
      router.replace("/audit-silencieux");
      return;
    }

    try {
      const parsed = JSON.parse(rawResult) as AuditAnalysisResult;

      if (
        !parsed ||
        typeof parsed.summary !== "string" ||
        typeof parsed.expressedMessage !== "string" ||
        typeof parsed.perceivedMessage !== "string" ||
        typeof parsed.mainGap !== "string" ||
        typeof parsed.recommendation !== "string"
      ) {
        router.replace("/audit-silencieux");
        return;
      }

      setResult(parsed);
    } catch {
      router.replace("/audit-silencieux");
    }
  }, [router]);

  if (!result) {
    return null;
  }

  return (
    <AuditShell>
      <div className="space-y-5 sm:space-y-6">
        <ResultSummaryCard summary={result.summary} />

        <DualReadingCard
          expressedMessage={result.expressedMessage}
          perceivedMessage={result.perceivedMessage}
        />

        <GapHighlightCard mainGap={result.mainGap} />

        <RecommendationCard recommendation={result.recommendation} />

       <NextStepCard
  mainGap={result.mainGap}
  recommendation={result.recommendation}
  perceivedMessage={result.perceivedMessage}
/>
      </div>
    </AuditShell>
  );
}
