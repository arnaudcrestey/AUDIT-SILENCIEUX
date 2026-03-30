import { NextResponse } from "next/server";
import { attachSessionLead } from "@/lib/audit-storage";
import { validateLeadPayload } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as unknown;
    const validation = validateLeadPayload(json);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const { email, name, message, sessionId } = validation.data;

    if (sessionId) {
      attachSessionLead(sessionId, { email, name, message });
    }

    return NextResponse.json(
      {
        ok: true,
        message: "Votre demande a bien été enregistrée."
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        error: "Une erreur serveur est survenue pendant l’enregistrement du lead."
      },
      { status: 500 }
    );
  }
}
