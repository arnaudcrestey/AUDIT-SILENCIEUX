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
