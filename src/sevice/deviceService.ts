import { ref, push, set, get, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { Device, Recommendation } from "@/types";
import { generateRandomId } from "@/lib/utils";

export const createDevice = async (userId: string, deviceData: Device) => {
  const deviceRef = ref(db, `devices/${userId}/${deviceData.deviceId}`);
  await set(deviceRef, deviceData);
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
  const recommendationRef = ref(db, `recommendations/${deviceId}`);
  await set(recommendationRef, recommendations);
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

export const removeDevice = async (userId: string, deviceId: string) => {
  const deviceRef = ref(db, `devices/${userId}/${deviceId}`);
  await remove(deviceRef);
};
