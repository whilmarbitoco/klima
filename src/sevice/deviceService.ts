import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Device, Recommendation } from "@/types";
import { generateRandomId } from "@/lib/utils";

export const createDevice = async (userId: string, deviceData: Device) => {
  const newDeviceRef = push(ref(db, `users/${userId}/${deviceData.deviceId}`));
  await set(newDeviceRef, deviceData);
};

export const getDevices = async (userId: string): Promise<Device[]> => {
  const devicesRef = ref(db, `devices/${userId}`);
  const snapshot = await get(devicesRef);

  const devices: Device[] = [];
  snapshot.forEach((childSnapshot) => {
    const device = childSnapshot.val() as Device;
    devices.push(device);
  });

  return devices;
};

export const getDeviceById = async (
  userId: string,
  deviceId: string
): Promise<Device | null> => {
  const deviceRef = ref(db, `devices/${userId}/${deviceId}`);
  const snapshot = await get(deviceRef);
  return snapshot.exists() ? (snapshot.val() as Device) : null;
};

export const addRecommendations = async (
  deviceId: string,
  recommendations: Recommendation[]
) => {
  recommendations.forEach(async (recommendation) => {
    const ID = generateRandomId(recommendation.title);
    const newRecommendationRef = push(ref(db, `recommendations/${deviceId}`));
    await set(newRecommendationRef, recommendation);
  });
};

export const getRecommendations = async (
  deviceId: string
): Promise<Recommendation[]> => {
  const recommendationRef = ref(db, `recommendations/${deviceId}`);
  const snapshot = await get(recommendationRef);

  const recommendations: Recommendation[] = [];
  snapshot.forEach((childSnapshot) => {
    const recommendation = childSnapshot.val() as Recommendation;
    recommendations.push(recommendation);
  });

  return recommendations;
};
