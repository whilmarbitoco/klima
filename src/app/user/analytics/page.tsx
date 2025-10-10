"use client";

import DeviceCard from "@/components/DeviceCard";
import PageLayout from "@/components/PageLayout";
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
    <PageLayout
      title="Registered Devices"
      description="Select your registered IoT device"
    >
      <div className="p-4 lg:p-6 space-y-6 overflow-x-hidden">
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 text-center">
          <Wifi className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Select IoT Device
          </h2>
          <p className="text-gray-400 mb-6">
            Choose a device to view its analytics and predictions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {devices.map((device) => (
              <DeviceCard
                key={device.deviceId}
                device={device}
                handleDeviceSelect={handleDeviceSelect}
              />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
