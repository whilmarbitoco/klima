import { createChatPrompt } from "@/lib/prompt";
import { isParementersMissing } from "@/lib/utils";
import { FarmDetails, Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.NEXT_GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

interface ChatRequest {
  message: string;
  farm: FarmDetails;
  weather: Weather;
}

export async function POST(request: NextRequest) {
  try {
    const { message, farm, weather }: ChatRequest = await request.json();

    if (isParementersMissing([message, farm, weather])) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    const PROMPT = createChatPrompt(farm, weather);

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `System: ${PROMPT}\nUser: ${message}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 300,
        temperature: 0.7,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const botMessage =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    return NextResponse.json({ message: botMessage });
  } catch (error) {
    console.error("Failed to process chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
