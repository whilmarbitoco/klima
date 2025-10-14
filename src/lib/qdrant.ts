import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantClient } from "@qdrant/js-client-rest";
import { Weather } from "@/types";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY,
});

const QDRANT_URL = process.env.QDRANT_URL!;
const QDRANT_API_KEY = process.env.QDRANT_API!;
const COLLECTION_NAME = "weather_data";

export const qdrantClient = new QdrantClient({
  url: QDRANT_URL,
  apiKey: QDRANT_API_KEY,
});

function weatherToText(weather: Weather): string {
  return `At ${weather.time}, temperature: ${weather.temp}°C, humidity: ${weather.humidity}%, rainfall: ${weather.rainfall}mm, soil moisture: ${weather.soilMoisture}%, pressure: ${weather.pressure} hPa.`;
}

export async function ensureCollection(): Promise<void> {
  const collections = await qdrantClient.getCollections();
  const exists = collections.collections.some(
    (c) => c.name === COLLECTION_NAME
  );

  if (!exists) {
    await qdrantClient.createCollection(COLLECTION_NAME, {
      vectors: { size: 768, distance: "Cosine" },
    });
    console.log(`Collection '${COLLECTION_NAME}' created.`);
  }
}

export async function addWeatherData(
  device_id: string,
  weatherList: Weather[]
): Promise<QdrantVectorStore> {
  await ensureCollection();

  const texts = weatherList.map((w) => weatherToText(w));

  const metadatas = weatherList.map((w) => ({
    device_id,
    ...w,
  }));

  const vectorStore = await QdrantVectorStore.fromTexts(
    texts,
    metadatas,
    embeddings,
    {
      url: QDRANT_URL,
      apiKey: QDRANT_API_KEY,
      collectionName: COLLECTION_NAME,
    }
  );

  return vectorStore;
}

export async function searchWeather(
  device_id: string,
  query: string,
  limit = 3
) {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    {
      url: QDRANT_URL,
      apiKey: QDRANT_API_KEY,
      collectionName: COLLECTION_NAME,
    }
  );

  const qdrantFilter = {
    must: [{ key: "device_id", match: { value: device_id } }],
  };

  return await vectorStore.similaritySearch(query, limit, qdrantFilter);
}
