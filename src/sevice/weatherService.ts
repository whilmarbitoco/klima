import {
  ref,
  push,
  set,
  get,
  query,
  orderByKey,
  limitToLast,
} from "firebase/database";
import { db } from "@/lib/firebase";
import { Weather } from "@/types";

export const getWeatherDataByDevice = async (
  deviceId: string
): Promise<Weather[]> => {
  const weatherRef = ref(db, `weather/${deviceId}`);
  const snapshot = await get(weatherRef);

  if (!snapshot.exists()) return [];

  const weatherData: Weather[] = [];

  snapshot.forEach((childSnapshot) => {
    const weather = childSnapshot.val() as Weather;
    weatherData.push(weather);
  });

  return weatherData;
};

export const createWeatherPrediction = async (
  deviceId: string,
  weather: Weather[]
) => {
  const predictRef = ref(db, `predictions/${deviceId}`);

  const newPredictRef = push(predictRef);
  await set(newPredictRef, weather);
};

export const getLatestPrediction = async (
  deviceId: string
): Promise<Weather[]> => {
  const predictRef = ref(db, `predictions/${deviceId}`);
  const q = query(predictRef, orderByKey(), limitToLast(1));
  const snapshot = await get(q);

  const weatherData: Weather[] = [];
  if (!snapshot.exists()) return weatherData;

  const predictions = snapshot.val();

  const lastPredictionKey = Object.keys(predictions)[0];
  if (!lastPredictionKey) return weatherData;

  const lastPrediction = predictions[lastPredictionKey];
  if (Array.isArray(lastPrediction)) {
    return lastPrediction as Weather[];
  }

  return weatherData;
};

export const cacheDevice = async (userId: string, deviceId: string) => {
  const cacheRef = ref(db, `cache/${userId}`);

  await set(cacheRef, { deviceId });
};
