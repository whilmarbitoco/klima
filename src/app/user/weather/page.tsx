"use client";

import DeviceCard from "@/components/DeviceCard";
import PageLayout from "@/components/PageLayout";
import Suspender from "@/components/Suspender";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getDevices } from "@/sevice/deviceService";
import { Device } from "@/types";
import { Cloud } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWeatherData } from "@/sevice/weatherService";
import { Weather } from "@/types";

export default function WeatherPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("deviceId");
  const [devices, setDevices] = useState<Device[]>([]);
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [filteredData, setFilteredData] = useState<Weather[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentUser, loading] = useCurrentUser();

  const handleDeviceSelect = (device: Device) => {
    router.push(`/user/weather?deviceId=${device.deviceId}`);
  };

  useEffect(() => {
    async function fetchDevices() {
      if (loading || !currentUser) return;
      const devicesData: Device[] = await getDevices(currentUser?.uid);
      setDevices(devicesData);
    }
    fetchDevices();
  }, [currentUser, loading]);

  useEffect(() => {
    async function fetchWeatherData() {
      if (!deviceId) return;
      const data = await getWeatherData(deviceId);
      setWeatherData(data);
      setFilteredData(data);
    }
    fetchWeatherData();
  }, [deviceId]);

  useEffect(() => {
    const filtered = weatherData.filter(
      (item) =>
        item.time?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.temp?.toString().includes(searchTerm) ||
        item.humidity?.toString().includes(searchTerm)
    );
    setFilteredData(filtered);
  }, [searchTerm, weatherData]);

  if (deviceId) {
    return (
      <PageLayout title="Weather Data" description={`Device: ${deviceId}`}>
        <div className="p-4 lg:p-6 space-y-6">
          <div className="bg-gray-800/30 rounded-2xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Temperature (°C)</th>
                    <th className="px-6 py-3">Humidity (%)</th>
                    <th className="px-6 py-3">Rainfall (mm)</th>
                    <th className="px-6 py-3">Soil Moisture (%)</th>
                    <th className="px-6 py-3">Pressure (hPa)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 hover:bg-gray-700/30"
                    >
                      <td className="px-6 py-4">{item.time}</td>
                      <td className="px-6 py-4">{item.temp?.toFixed(1)}</td>
                      <td className="px-6 py-4">{item.humidity?.toFixed(1)}</td>
                      <td className="px-6 py-4">{item.rainfall?.toFixed(3)}</td>
                      <td className="px-6 py-4">
                        {item.soilMoisture?.toFixed(1)}
                      </td>
                      <td className="px-6 py-4">{item.pressure?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Weather Data"
      description="Select your device to view weather data"
    >
      <div className="p-4 lg:p-6 space-y-6 overflow-x-hidden">
        <div className="bg-gray-800/30 rounded-2xl p-8 border border-gray-700 text-center">
          <Cloud className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Select IoT Device
          </h2>
          <p className="text-gray-400 mb-6">
            Choose a device to view its weather data
          </p>

          <Suspender condition={devices.length > 0}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {devices.map((device) => (
                <DeviceCard
                  key={device.deviceId}
                  device={device}
                  handleDeviceSelect={handleDeviceSelect}
                />
              ))}
            </div>
          </Suspender>
        </div>
      </div>
    </PageLayout>
  );
}
