import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "clé OpenAI absente" },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Analyse ce texte en une phrase : ${content}`
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          summary: `[TEST IA] ERREUR API ${response.status}`,
          expressedMessage: JSON.stringify(data).slice(0, 500),
          perceivedMessage: "ok",
          mainGap: "ok",
          recommendation: "ok"
        },
        { status: 200 }
      );
    }

   let text = "PAS DE RÉPONSE IA";

try {
  text =
    data.output?.[0]?.content?.[0]?.text ||
    data.output_text ||
    JSON.stringify(data).slice(0, 200);
} catch {
  text = "ERREUR LECTURE IA";
}

    return NextResponse.json({
      summary: `[TEST IA] ${text}`,
      expressedMessage: "ok",
      perceivedMessage: "ok",
      mainGap: "ok",
      recommendation: "ok"
    });
  } catch (error) {
    return NextResponse.json(
      {
        summary: "[TEST IA] ERREUR SERVEUR",
        expressedMessage: error instanceof Error ? error.message : "Erreur inconnue",
        perceivedMessage: "ok",
        mainGap: "ok",
        recommendation: "ok"
      },
      { status: 200 }
    );
  }
}
