"use client";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Activity,
  Gauge,
} from "lucide-react";
import { useParams } from "next/navigation";
import PageLayout from "@/components/PageLayout";
import DeviceStatusBar from "@/components/DeviceStatusBar";
import MetricsGrid from "@/components/MetricsGrid";
import WeatherChart from "@/components/WeatherChart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Device, Weather } from "@/types";

export default function DeviceAnalytics() {
  const params = useParams();

  const devices: Device[] = [
    { id: 1, name: "Weather Station 1", deviceId: "WS001", status: "online" },
    { id: 2, name: "Soil Sensor A", deviceId: "SS002", status: "offline" },
    { id: 3, name: "Field Monitor B", deviceId: "FM003", status: "online" },
  ];

  const currentDevice = devices.find((d) => d.deviceId === params.deviceId);
  const selectedDevice = currentDevice || devices[0];

  const weatherData: Weather[] = [
    {
      time: "Today",
      temp: 27.3,
      humidity: 82,
      rainfall: 0,
      soilMoisture: 72.7,
    },
    {
      time: "Day 2",
      temp: 28.1,
      humidity: 78,
      rainfall: 5,
      soilMoisture: 69.0,
    },
    {
      time: "Day 3",
      temp: 26.5,
      humidity: 85,
      rainfall: 15,
      soilMoisture: 65.8,
    },
    {
      time: "Day 4",
      temp: 25.8,
      humidity: 88,
      rainfall: 25,
      soilMoisture: 62.5,
    },
  ];

  const metrics = [
    {
      label: "Temperature",
      value: "27.3°C",
      status: "Optimal",
      icon: Thermometer,
      color: "text-orange-400",
    },
    {
      label: "Soil Moisture",
      value: "72.7%",
      status: "Good",
      icon: Sprout,
      color: "text-green-400",
    },
    {
      label: "Humidity",
      value: "82.4%",
      status: "High",
      icon: Droplets,
      color: "text-blue-400",
    },
    {
      label: "Pressure",
      value: "1010hPa",
      status: "Stable",
      icon: Gauge,
      color: "text-purple-400",
    },
  ];

  return (
    <PageLayout
      title="Analytics & Forecast"
      description="AI-powered weather forecasting and analysis"
    >
      <DeviceStatusBar device={selectedDevice} />

      <MetricsGrid metrics={metrics} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WeatherChart
            title="Weather Trends"
            subtitle="4-day forecast analysis"
            icon={Activity}
            data={weatherData}
            type="line"
            dataKeys={[
              { key: "temp", color: "#F97316", name: "Temperature (°C)" },
              { key: "humidity", color: "#3B82F6", name: "Humidity (%)" },
            ]}
            height={320}
          />
        </div>

        <WeatherChart
          title="Rainfall"
          subtitle="Expected precipitation"
          icon={CloudRain}
          data={weatherData}
          type="bar"
          dataKeys={[
            { key: "rainfall", color: "#06B6D4", name: "Rainfall (mm)" },
          ]}
          height={320}
        />
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Soil Moisture Analysis
            </h3>
            <p className="text-sm text-gray-400">
              Critical irrigation insights
            </p>
          </div>
          <Sprout className="w-5 h-5 text-green-400" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                      color: "#F9FAFB",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="soilMoisture"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.3}
                    strokeWidth={3}
                    name="Soil Moisture (%)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-red-600/10 rounded-lg border border-red-600/20">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 font-medium text-sm">
                  Critical Alert
                </span>
              </div>
              <p className="text-gray-300 text-sm">
                Moisture dropping below optimal. Irrigation recommended within
                48 hours.
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Current Level:</span>
                <span className="text-green-400 font-medium">72.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Optimal Range:</span>
                <span className="text-gray-300">65-80%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Predicted Low:</span>
                <span className="text-red-400 font-medium">62.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 backdrop-blur-sm border border-green-600/20 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Droplets className="w-4 h-4 mr-2 text-blue-400" />
              Humidity Management
            </h4>
            <p className="text-sm text-gray-300">
              High humidity detected. Consider fungicide application within 48
              hours to prevent crop disease.
            </p>
          </div>

          <div className="p-4 bg-orange-600/10 rounded-lg border border-orange-600/20">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <Sprout className="w-4 h-4 mr-2 text-orange-400" />
              Irrigation Schedule
            </h4>
            <p className="text-sm text-gray-300">
              Soil moisture declining. Schedule irrigation for Day 2-3 with 15mm
              water volume recommended.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
