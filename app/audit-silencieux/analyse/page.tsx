"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnalysisLoader } from "@/components/audit-silencieux/analysis-loader";
import { AuditShell } from "@/components/audit-silencieux/audit-shell";
import type { AuditAnalysisResult } from "@/lib/audit-types";

type AnalysisState = "running" | "error";

const PROCESS_STEPS = [
  "Lecture de votre contenu…",
  "Identification des signaux clés…",
  "Analyse de la perception client…",
  "Mise en cohérence globale…"
];

export default function AnalysePage() {
  const router = useRouter();
  const [state, setState] = useState<AnalysisState>("running");
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => PROCESS_STEPS, []);

  useEffect(() => {
    async function runAnalysis() {
      const content = localStorage.getItem("audit_silencieux_content");
      const sessionId = localStorage.getItem("audit_silencieux_session_id");

      if (!content) {
        router.replace("/audit-silencieux");
        return;
      }

      try {
        const response = await fetch("/api/audit-silencieux/analyse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content,
            sourceType: "mixed",
            sessionId
          })
        });

        if (!response.ok) {
          const payload = (await response.json().catch(() => null)) as {
            error?: string;
          } | null;
          throw new Error(payload?.error ?? "L’analyse n’a pas pu être finalisée.");
        }

        const result = (await response.json()) as AuditAnalysisResult;
        localStorage.setItem("audit_silencieux_result", JSON.stringify(result));

        setTimeout(() => {
          router.replace("/audit-silencieux/resultat");
        }, 900);
      } catch (runError) {
        setState("error");
        setError(
          runError instanceof Error
            ? runError.message
            : "Une erreur inattendue est survenue lors du traitement."
        );
      }
    }

    void runAnalysis();
  }, [router]);

  return (
    <AuditShell>
      <div className="space-y-7 pt-8 sm:pt-14">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="text-[36px] font-semibold leading-tight text-audit-text sm:text-[44px]">
            Analyse en cours
          </h1>
          <p className="mt-3 text-[17px] text-audit-subtle">
            Nous structurons une lecture claire de ce que votre activité projette réellement.
          </p>
        </header>

        {state === "running" ? (
          <AnalysisLoader steps={steps} />
        ) : (
          <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-white p-6 text-center shadow-audit-soft">
            <p className="text-[16px] text-red-700">{error}</p>
            <button
              type="button"
              className="mt-5 rounded-xl border border-audit-border px-5 py-3 text-sm text-audit-text"
              onClick={() => router.push("/audit-silencieux")}
            >
              Revenir au formulaire
            </button>
          </div>
        )}
      </div>
    </AuditShell>
  );
}
