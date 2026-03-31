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
    <div className="mx-auto w-full max-w-[920px] rounded-[24px] border border-audit-border-subtle bg-white/92 px-5 py-5 shadow-[0_14px_40px_rgba(31,39,64,0.05)] sm:px-7 sm:py-6 lg:px-8 lg:py-7">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label htmlFor="audit-content" className="sr-only">
          Collez ici votre site, une page ou une présentation
        </label>

        <textarea
          id="audit-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={7}
          placeholder="Collez ici votre site, une page ou une présentation…"
          className="min-h-[190px] w-full resize-y rounded-[18px] border border-audit-border-subtle bg-audit-surface px-5 py-4 text-[15px] leading-7 text-audit-text outline-none transition placeholder:text-audit-muted focus:border-audit-blue focus:bg-white focus:ring-4 focus:ring-audit-halo"
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-h-[20px]">
            {error ? (
              <p className="text-sm text-red-700">{error}</p>
            ) : (
              <p className="text-[13px] text-audit-muted">
                Lecture immédiate — sans inscription.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-audit-blue px-5 py-3 text-[14px] font-medium text-white shadow-[0_10px_24px_rgba(49,84,199,0.24)] transition hover:-translate-y-[1px] hover:bg-audit-blue-hover disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Ouverture de la session…" : "Lancer l’audit"}
          </button>
        </div>
      </form>
    </div>
  );
}
