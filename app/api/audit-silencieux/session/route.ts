import { NextResponse } from "next/server";
import { createAuditSession } from "@/lib/audit-storage";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as { content?: string };
    const content = typeof json.content === "string" ? json.content.trim() : "";

    if (!content) {
      return NextResponse.json({ error: "Le champ content est requis." }, { status: 400 });
    }

    const sessionId = createAuditSession(content);

    return NextResponse.json({ sessionId }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Une erreur serveur est survenue pendant la création de session." },
      { status: 500 }
    );
  }
}
