import { isParementersMissing } from "@/lib/utils";
import { Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const deviceId = url.searchParams.get("deviceId");
    const { weather }: { weather: Weather } = await request.json();

    if (isParementersMissing([deviceId, weather])) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    NextResponse.json({ deviceId });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
