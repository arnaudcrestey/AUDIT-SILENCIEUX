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
        body: JSON.stringify({ content: content.trim() })
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
    <div className="mx-auto mt-12 w-full max-w-4xl rounded-[28px] border border-audit-border bg-white p-5 shadow-audit-soft sm:p-8 lg:p-10">
      <form className="space-y-5" onSubmit={handleSubmit}>
        <label htmlFor="audit-content" className="sr-only">
          Collez ici votre site, une page ou une présentation
        </label>

        <textarea
          id="audit-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={9}
          placeholder="Collez ici votre site, une page ou une présentation…"
          className="w-full resize-y rounded-2xl border border-audit-border-subtle bg-audit-surface px-5 py-4 text-[16px] leading-relaxed text-audit-text outline-none transition placeholder:text-audit-muted focus:border-audit-blue focus:ring-4 focus:ring-audit-halo"
        />

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-xl bg-audit-blue px-6 py-4 text-[16px] font-medium text-white transition hover:bg-audit-blue-hover disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {loading ? "Ouverture de la session…" : "Lancer l’audit"}
        </button>
      </form>
    </div>
  );
}
