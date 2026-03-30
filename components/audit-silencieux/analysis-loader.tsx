"use client";

import { useEffect, useState } from "react";

type AnalysisLoaderProps = {
  steps: string[];
};

export function AnalysisLoader({ steps }: AnalysisLoaderProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((previous) => {
        if (previous >= steps.length - 1) {
          return previous;
        }
        return previous + 1;
      });
    }, 1050);

    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div className="mx-auto max-w-3xl rounded-[28px] border border-audit-border bg-white p-8 shadow-audit-soft sm:p-12">
      <div className="mx-auto mb-10 h-14 w-14 animate-pulse rounded-full border-2 border-audit-halo border-t-audit-blue" />

      <ul className="space-y-4">
        {steps.map((step, index) => {
          const isComplete = index < activeStep;
          const isActive = index === activeStep;

          return (
            <li
              key={step}
              className={`rounded-xl border px-5 py-4 text-[16px] transition ${
                isComplete
                  ? "border-audit-success bg-audit-success text-audit-success-text"
                  : isActive
                    ? "border-audit-blue bg-audit-halo text-audit-text"
                    : "border-audit-border-subtle bg-audit-surface text-audit-muted"
              }`}
            >
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
