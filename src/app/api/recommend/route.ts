import { weatherData } from "@/constant";
import { generateText } from "@/lib/gemini";
import { createRecommendationPromptRAG } from "@/lib/prompt";
import { searchWeather, weatherToText } from "@/lib/rag";
import { isParementersMissing } from "@/lib/utils";
import { Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  weather: Weather[];
  deviceId: string;
}

export async function POST(request: NextRequest) {
  try {
    const { weather, deviceId }: ChatRequest = await request.json();

    if (isParementersMissing([weather, deviceId])) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const weatherText = weather.map(weatherToText);
    const currentWeather = weatherText[0];
    const textData = weatherText.join("\n");

    const similarVector = await searchWeather(deviceId, currentWeather);
    const similar = similarVector
      .map((m) =>
        m.metadata && "text" in m.metadata ? String(m.metadata.text) : ""
      )
      .join("\n");
    const systemPrompt = createRecommendationPromptRAG(textData, similar);
    const prompt = "Generate recommendations based on the provided data.";

    const result = await generateText(systemPrompt, prompt);

    return NextResponse.json({ message: result });
  } catch (error) {
    console.error("Failed to process chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
