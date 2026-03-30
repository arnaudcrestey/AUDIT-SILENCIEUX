import type { AuditAnalyseInput } from "@/lib/audit-types";

const SOURCE_TYPES = ["site", "page", "presentation", "mixed"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateAnalysePayload(
  payload: unknown
):
  | { ok: true; data: AuditAnalyseInput }
  | { ok: false; error: string } {
  if (!isRecord(payload)) {
    return { ok: false, error: "Le format de la requête est invalide." };
  }

  const content = typeof payload.content === "string" ? payload.content.trim() : "";
  const sourceType =
    typeof payload.sourceType === "string" ? payload.sourceType.trim().toLowerCase() : "mixed";
  const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.trim() : undefined;

  if (!content) {
    return { ok: false, error: "Le champ content est requis." };
  }

  const isWebsiteUrl = isUrl(content);

  if (!isWebsiteUrl && content.length < 40) {
    return {
      ok: false,
      error: "Ajoutez un contenu un peu plus détaillé (minimum 40 caractères)."
    };
  }

  if (content.length > 20000) {
    return {
      ok: false,
      error: "Le contenu dépasse la limite autorisée (20000 caractères)."
    };
  }

  if (!SOURCE_TYPES.includes(sourceType as (typeof SOURCE_TYPES)[number])) {
    return { ok: false, error: "sourceType doit être site, page, presentation ou mixed." };
  }

  return {
    ok: true,
    data: {
      content,
      sourceType: sourceType as AuditAnalyseInput["sourceType"],
      sessionId
    }
  };
}

export function validateLeadPayload(
  payload: unknown
):
  | { ok: true; data: { email: string; name?: string; message?: string; sessionId?: string } }
  | { ok: false; error: string } {
  if (!isRecord(payload)) {
    return { ok: false, error: "Le format de la requête est invalide." };
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const name = typeof payload.name === "string" ? payload.name.trim() : undefined;
  const message = typeof payload.message === "string" ? payload.message.trim() : undefined;
  const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.trim() : undefined;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { ok: false, error: "Veuillez fournir un email valide." };
  }

  return {
    ok: true,
    data: {
      email,
      name: name || undefined,
      message: message || undefined,
      sessionId
    }
  };
}
