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
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState("");
  const [tempFilter, setTempFilter] = useState("");
  const [humidityFilter, setHumidityFilter] = useState("");
  const [pressureFilter, setPressureFilter] = useState("");
  const itemsPerPage = 5;

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
    let filtered = weatherData;
    
    if (dateFilter) {
      filtered = filtered.filter(item => item.time?.includes(dateFilter));
    }
    
    if (tempFilter) {
      filtered = filtered.filter(item => {
        const temp = item.temp || 0;
        if (tempFilter === 'high') return temp > 30;
        if (tempFilter === 'low') return temp < 20;
        if (tempFilter === 'normal') return temp >= 20 && temp <= 30;
        return true;
      });
    }
    
    if (humidityFilter) {
      filtered = filtered.filter(item => {
        const humidity = item.humidity || 0;
        if (humidityFilter === 'high') return humidity > 80;
        if (humidityFilter === 'low') return humidity < 60;
        if (humidityFilter === 'normal') return humidity >= 60 && humidity <= 80;
        return true;
      });
    }
    
    if (pressureFilter) {
      filtered = filtered.filter(item => {
        const pressure = item.pressure || 0;
        if (pressureFilter === 'high') return pressure > 1020;
        if (pressureFilter === 'low') return pressure < 1000;
        if (pressureFilter === 'normal') return pressure >= 1000 && pressure <= 1020;
        return true;
      });
    }
    
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [weatherData, dateFilter, tempFilter, humidityFilter, pressureFilter]);



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
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Weather Data</h3>
                <div className="text-sm text-gray-400">
                  {filteredData.length} records
                </div>
              </div>
              
              {/* Filters */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <input
                  type="text"
                  placeholder="Search date..."
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700/50 text-white rounded-lg text-sm border border-gray-600/50 focus:border-green-500 focus:outline-none placeholder-gray-400"
                />
                <select
                  value={tempFilter}
                  onChange={(e) => setTempFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700/50 text-white rounded-lg text-sm border border-gray-600/50 focus:border-green-500 focus:outline-none"
                >
                  <option value="">Temperature</option>
                  <option value="high">High (&gt;30°C)</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low (&lt;20°C)</option>
                </select>
                <select
                  value={humidityFilter}
                  onChange={(e) => setHumidityFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700/50 text-white rounded-lg text-sm border border-gray-600/50 focus:border-green-500 focus:outline-none"
                >
                  <option value="">Humidity</option>
                  <option value="high">High (&gt;80%)</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low (&lt;60%)</option>
                </select>
                <select
                  value={pressureFilter}
                  onChange={(e) => setPressureFilter(e.target.value)}
                  className="px-3 py-2 bg-gray-700/50 text-white rounded-lg text-sm border border-gray-600/50 focus:border-green-500 focus:outline-none"
                >
                  <option value="">Pressure</option>
                  <option value="high">High (&gt;1020)</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low (&lt;1000)</option>
                </select>
              </div>
            </div>
            
            <div className="border-t border-gray-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Time</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Temp (°C)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Humidity (%)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Pressure</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Soil (%)</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rain (mm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((item, index) => (
                      <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">{item.time}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{item.temp?.toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{item.humidity?.toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{item.pressure?.toFixed(0)}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{item.soilMoisture?.toFixed(1)}</td>
                        <td className="px-6 py-4 text-sm text-white font-medium">{item.rainfall?.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}-{Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-700/50 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
                <div className="px-3 py-2 text-sm text-gray-300 bg-gray-700/30 rounded-lg">
                  {currentPage} / {Math.ceil(filteredData.length / itemsPerPage)}
                </div>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage)))}
                  disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage)}
                  className="px-4 py-2 bg-gray-700/50 text-white rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
                >
                  Next
                </button>
              </div>
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
