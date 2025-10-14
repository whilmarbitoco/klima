import { searchWeather } from "@/lib/rag";
import { isParementersMissing } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { deviceId, message }: { deviceId: string; message: string } =
      await request.json();

    if (isParementersMissing([deviceId, message])) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    const searchQuery = searchWeather(deviceId, message);

    return NextResponse.json({ searchQuery });
  } catch (error) {
    console.error("Failed to process chat message:", error);
    return NextResponse.json(
      { error: "Failed to process chat message" },
      { status: 500 }
    );
  }
}
