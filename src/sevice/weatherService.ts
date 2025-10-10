import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Weather } from "@/types";
import { snap } from "gsap";

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
