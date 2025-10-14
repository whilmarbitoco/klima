import { db } from "@/lib/firebaseAdmin";
import { addWeatherData } from "@/lib/qdrant";
import {
  formatCurrentDate,
  generateRandomId,
  isParementersMissing,
} from "@/lib/utils";
import { Weather } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const deviceId = url.searchParams.get("deviceId");
    const { weather }: { weather: Weather[] } = await request.json();

    if (isParementersMissing([deviceId, weather])) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    if (deviceId == null) {
      return NextResponse.json({ error: "Missing Device ID" }, { status: 400 });
    }

    const weatherData = weather.map((w) => ({
      ...w,
      time: formatCurrentDate(),
      timestamp: Date.now(),
    }));

    await createWeatherRecord(deviceId, weatherData);
    addWeatherData(deviceId, weatherData);

    return NextResponse.json(
      { message: "Weather data added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

const createWeatherRecord = async (deviceID: string, weather: Weather[]) => {
  for (const data of weather) {
    db.ref(
      `weather/${deviceID}/${generateRandomId(Date.now().toString())}`
    ).set(data);
  }
};
