import { generateText } from "@/lib/gemini";
import { createChatPromptRAG } from "@/lib/prompt";
import { searchWeather } from "@/lib/rag";
import { isParementersMissing } from "@/lib/utils";
import { Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  deviceId: string;
  message: string;
  weather: Weather[];
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId, message, weather }: ChatRequest = await request.json();

    if (isParementersMissing([deviceId, message, weather])) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const searchQuery = await searchWeather(deviceId, message);
    const context = searchQuery
      .map((m) =>
        m.metadata && "text" in m.metadata ? String(m.metadata.text) : ""
      )
      .join("\n")
      .replace(/\\n/g, "\n");

    const weatherData = weather
      .map(
        (w) =>
          `Date: ${w.time}, Temperature: ${w.temp}, Humidity: ${w.humidity}, Pressure: ${w.pressure}`
      )
      .join("\n");

    const prompt = createChatPromptRAG(context, weatherData);
    const genAI = await generateText(prompt, message);
    console.log("GEMINI ", genAI);

    return NextResponse.json({ message: genAI, context }, { status: 200 });
  } catch (error) {
    console.error("Failed to process chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
