import type { ReactNode } from "react";

export function AuditShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-audit-bg">
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        {children}
      </div>
    </div>
  );
}
