import type { ReactNode } from "react";

export function AuditShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#edf1f7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,108,242,0.08),transparent_28%),radial-gradient(circle_at_top_right,rgba(59,99,243,0.06),transparent_26%),linear-gradient(180deg,#f3f6fb_0%,#edf1f7_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.52),rgba(255,255,255,0.14))]" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
        {children}
      </div>
    </div>
  );
}
