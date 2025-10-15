import { Weather } from "@/types";
import { pinecone } from "./pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY,
});

const INDEX = "weather-data";

export function weatherToText(weather: Weather): string {
  return `At ${weather.time}, temperature: ${weather.temp}°C, humidity: ${weather.humidity}%, rainfall: ${weather.rainfall}mm, soil moisture: ${weather.soilMoisture}%, pressure: ${weather.pressure} hPa.`;
}

export async function addWeatherData(
  device_id: string,
  weatherList: Weather[]
) {
  const index = pinecone.index(INDEX);

  const textsToEmbed = weatherList.map(weatherToText);

  const vectors = await embeddings.embedDocuments(textsToEmbed);

  const upsertPayload = weatherList.map((w, i) => ({
    id: `${device_id}-${i}-${Date.now()}`,
    values: vectors[i],
    metadata: {
      device_id,
      text: textsToEmbed[i],
      ...w,
    },
  }));

  await index.upsert(upsertPayload);
  console.log(`Inserted ${upsertPayload.length} points`);
}

export async function searchWeather(
  device_id: string,
  query: string,
  limit = 4
) {
  const index = pinecone.index(INDEX);

  const queryVector = await embeddings.embedQuery(query);

  const result = await index.query({
    topK: limit,
    vector: queryVector,
    filter: { device_id },
    includeMetadata: true,
  });

  return result.matches;
}
