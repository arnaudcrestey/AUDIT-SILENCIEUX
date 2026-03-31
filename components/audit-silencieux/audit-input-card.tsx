"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SessionPayload = {
  sessionId: string;
};

export function AuditInputCard() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!content.trim()) {
      setError("Veuillez coller un contenu avant de lancer l’audit.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/audit-silencieux/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });

      if (!response.ok) {
        throw new Error("Impossible d’ouvrir une session d’audit.");
      }

      const payload = (await response.json()) as SessionPayload;

      localStorage.setItem("audit_silencieux_content", content.trim());
      localStorage.setItem("audit_silencieux_session_id", payload.sessionId);

      router.push("/audit-silencieux/analyse");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Une erreur inattendue est survenue."
      );
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-[880px]">
      <form
        onSubmit={handleSubmit}
        className="rounded-[26px] border border-audit-border-subtle bg-white/90 px-4 py-4 shadow-[0_18px_50px_rgba(31,39,64,0.05)] sm:px-6 sm:py-6"
      >
        <label htmlFor="audit-content" className="sr-only">
          Collez ici votre site, une page ou une présentation
        </label>

        <textarea
          id="audit-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={6}
          placeholder="Collez ici votre site, une page ou une présentation…"
          className="w-full min-h-[140px] resize-y rounded-[16px] border border-[#d9e0ec] bg-[#f2f5fa] px-4 py-4 text-[15px] leading-6 text-audit-text placeholder:text-audit-muted outline-none transition focus:border-audit-blue focus:bg-white focus:ring-4 focus:ring-audit-halo sm:min-h-[160px] sm:px-5 sm:leading-7"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-[13px] text-audit-muted">
            {error ? (
              <span className="text-red-700">{error}</span>
            ) : (
              "Lecture immédiate — sans inscription"
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-audit-blue px-5 py-3 text-[14px] font-medium text-white shadow-[0_10px_24px_rgba(49,84,199,0.25)] transition hover:-translate-y-[1px] hover:bg-audit-blue-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {loading ? "Ouverture…" : "Lancer l’audit"}
          </button>
        </div>
      </form>
    </div>
  );
}
