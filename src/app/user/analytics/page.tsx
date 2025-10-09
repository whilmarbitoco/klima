"use client";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getDevices } from "@/sevice/deviceService";
import { Device } from "@/types";
import { Wifi } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalyticsPage() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [currentUser, loading] = useCurrentUser();

  const handleDeviceSelect = (device: Device) => {
    router.push(`/user/analytics/${device.deviceId}`);
  };

  useEffect(() => {
    async function fetchDevices() {
      if (loading || !currentUser) return;

      const devicesData: Device[] = await getDevices(currentUser?.uid);

      setDevices(devicesData);
      console.log(devicesData);
    }
    fetchDevices();
  }, [currentUser, loading]);

  return (
    <div className="p-4 lg:p-6 space-y-6 overflow-x-hidden">
      <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center">
        <Wifi className="w-16 h-16 text-green-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">
          Select IoT Device
        </h2>
        <p className="text-gray-400 mb-6">
          Choose a device to view its analytics and predictions
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {devices.map((device) => (
            <button
              key={device.deviceId}
              onClick={() => handleDeviceSelect(device)}
              className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 transition-colors text-left"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-white">{device.name}</h3>
                <div
                  className={`w-3 h-3 rounded-full ${
                    device.status === "online" ? "bg-green-400" : "bg-red-400"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
              <span
                className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                  device.status === "online"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}
              >
                {device.status}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
