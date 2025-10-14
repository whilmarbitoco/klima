import { QdrantVectorStore } from "@langchain/qdrant";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Weather } from "@/types";

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "models/embedding-001",
  apiKey: process.env.GOOGLE_API_KEY,
});

const QDRANT_CONFIG = {
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY,
  collectionName: "weather_data",
};

function weatherToText(weather: Weather) {
  return `At ${weather.time}, the temperature was ${weather.temp}°C, humidity ${weather.humidity}%, rainfall ${weather.rainfall}mm, soil moisture ${weather.soilMoisture}%, and pressure ${weather.pressure} hPa.`;
}

export async function addWeatherData(weatherList: Weather[]) {
  const texts = weatherList.map(weatherToText);
  const metadatas = weatherList.map((w) => ({
    time: w.time,
    temp: w.temp,
    humidity: w.humidity,
    rainfall: w.rainfall,
    soilMoisture: w.soilMoisture,
    pressure: w.pressure,
  }));

  const vectorStore = await QdrantVectorStore.fromTexts(
    texts,
    metadatas,
    embeddings,
    QDRANT_CONFIG
  );
  return vectorStore;
}

export async function searchWeather(query: string, limit = 3) {
  const vectorStore = await QdrantVectorStore.fromExistingCollection(
    embeddings,
    QDRANT_CONFIG
  );
  return await vectorStore.similaritySearch(query, limit);
}
