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
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { Thermometer, Droplets, Gauge, CloudRain } from "lucide-react";

export default function WeatherPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deviceId = searchParams.get("deviceId");
  const [devices, setDevices] = useState<Device[]>([]);
  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [filteredData, setFilteredData] = useState<Weather[]>([]);

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



  const latestData = weatherData[weatherData.length - 1];
  const chartData = weatherData.slice(-24).map((item, index) => ({
    time: `${index + 1}h`,
    temp: item.temp,
    humidity: item.humidity,
    pressure: item.pressure,
    soilMoisture: item.soilMoisture
  }));

  if (deviceId) {
    return (
      <PageLayout title="Weather Analytics" description={`Device: ${deviceId}`}>
        <div className="p-4 lg:p-6 space-y-6">
          {/* Current Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <Thermometer className="w-8 h-8 text-orange-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{latestData?.temp?.toFixed(1) || '--'}°C</div>
                  <div className="text-gray-400 text-sm">Temperature</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <Droplets className="w-8 h-8 text-blue-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{latestData?.humidity?.toFixed(1) || '--'}%</div>
                  <div className="text-gray-400 text-sm">Humidity</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <Gauge className="w-8 h-8 text-purple-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{latestData?.pressure?.toFixed(0) || '--'}</div>
                  <div className="text-gray-400 text-sm">Pressure (hPa)</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <CloudRain className="w-8 h-8 text-green-400" />
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{latestData?.soilMoisture?.toFixed(1) || '--'}%</div>
                  <div className="text-gray-400 text-sm">Soil Moisture</div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Temperature Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Line type="monotone" dataKey="temp" stroke="#F97316" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4">Humidity Trend</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F3F4F6' }}
                    />
                    <Line type="monotone" dataKey="humidity" stroke="#3B82F6" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-gray-800/30 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-700">
              <h3 className="text-lg font-semibold text-white">Recent Data</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs text-gray-400 uppercase bg-gray-700/50">
                  <tr>
                    <th className="px-6 py-3">Time</th>
                    <th className="px-6 py-3">Temperature (°C)</th>
                    <th className="px-6 py-3">Humidity (%)</th>
                    <th className="px-6 py-3">Pressure (hPa)</th>
                    <th className="px-6 py-3">Soil Moisture (%)</th>
                    <th className="px-6 py-3">Rainfall (mm)</th>
                  </tr>
                </thead>
                <tbody>
                  {weatherData.slice(-10).reverse().map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                      <td className="px-6 py-4">{item.time}</td>
                      <td className="px-6 py-4">{item.temp?.toFixed(1)}</td>
                      <td className="px-6 py-4">{item.humidity?.toFixed(1)}</td>
                      <td className="px-6 py-4">{item.pressure?.toFixed(2)}</td>
                      <td className="px-6 py-4">{item.soilMoisture?.toFixed(1)}</td>
                      <td className="px-6 py-4">{item.rainfall?.toFixed(3)}</td>
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
