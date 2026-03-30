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

    const text =
      data.output?.[0]?.content?.[0]?.text || "PAS DE RÉPONSE IA";

    return NextResponse.json({
      summary: `[TEST IA] ${text}`,
      expressedMessage: "ok",
      perceivedMessage: "ok",
      mainGap: "ok",
      recommendation: "ok"
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "erreur serveur" },
      { status: 500 }
    );
  }
}
