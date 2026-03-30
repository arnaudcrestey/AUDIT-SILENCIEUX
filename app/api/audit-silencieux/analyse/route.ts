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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "user",
            content: `Analyse ce texte en une phrase : ${content}`
          }
        ]
      })
    });

    const data = await response.json();

    const text = data.choices?.[0]?.message?.content || "PAS DE RÉPONSE IA";

    return NextResponse.json({
      summary: `[TEST IA] ${text}`,
      expressedMessage: "ok",
      perceivedMessage: "ok",
      mainGap: "ok",
      recommendation: "ok"
    });
  } catch {
    return NextResponse.json(
      { error: "erreur serveur" },
      { status: 500 }
    );
  }
}
