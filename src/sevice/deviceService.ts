import { ref, push, set, get } from "firebase/database";
import { db } from "@/lib/firebase";
import { Device } from "@/types";

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
