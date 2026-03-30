import { randomUUID } from "crypto";
import type { AuditAnalysisResult } from "@/lib/audit-types";

type SessionRecord = {
  content: string;
  createdAt: number;
  result?: AuditAnalysisResult;
  lead?: {
    email: string;
    name?: string;
    message?: string;
    createdAt: number;
  };
};

const sessionStore = new Map<string, SessionRecord>();
const SESSION_TTL_MS = 1000 * 60 * 60 * 4;

function cleanupExpiredSessions() {
  const now = Date.now();

  for (const [sessionId, record] of sessionStore.entries()) {
    if (now - record.createdAt > SESSION_TTL_MS) {
      sessionStore.delete(sessionId);
    }
  }
}

export function createAuditSession(content: string) {
  cleanupExpiredSessions();
  const sessionId = randomUUID();

  sessionStore.set(sessionId, {
    content,
    createdAt: Date.now()
  });

  return sessionId;
}

export function getAuditSession(sessionId: string) {
  cleanupExpiredSessions();
  return sessionStore.get(sessionId) ?? null;
}

export function attachSessionResult(sessionId: string, result: AuditAnalysisResult) {
  const current = sessionStore.get(sessionId);
  if (!current) return;

  sessionStore.set(sessionId, {
    ...current,
    result
  });
}

export function attachSessionLead(
  sessionId: string,
  lead: { email: string; name?: string; message?: string }
) {
  const current = sessionStore.get(sessionId);
  if (!current) return;

  sessionStore.set(sessionId, {
    ...current,
    lead: {
      ...lead,
      createdAt: Date.now()
    }
  });
}
