import { generateText } from "@/lib/gemini";
import { createChatPromptRAG } from "@/lib/prompt";
import { searchWeather, weatherToText } from "@/lib/rag";
import { farmToText, isParementersMissing } from "@/lib/utils";
import { FarmDetails, Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

interface ChatRequest {
  deviceId: string;
  message: string;
  weather: Weather[];
  farm: FarmDetails;
}

export async function POST(request: NextRequest) {
  try {
    const { deviceId, message, weather, farm }: ChatRequest =
      await request.json();

    if (isParementersMissing([deviceId, message, weather, farm])) {
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
      .join("\n");

    const weatherData = weather.map((w) => weatherToText(w)).join("\n");

    console.log("FARM", farm);
    const farmDetail = farm.crops != undefined ? farmToText(farm) : "";

    const prompt = createChatPromptRAG(context, weatherData, farmDetail);
    const genAI = await generateText(prompt, message);

    console.log("PROMPT", prompt);

    return NextResponse.json({ message: genAI }, { status: 200 });
  } catch (error) {
    console.error("Failed to process chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
