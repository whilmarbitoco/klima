"use client";
import {
  CloudRain,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Activity,
  RefreshCw,
  InfoIcon,
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
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { getDeviceById } from "@/sevice/deviceService";
import { getWeatherDataByDevice } from "@/sevice/weatherService";
import { moistureAverage } from "@/lib/utils";
import MoistureAnalysis from "@/components/MoistureAnalysis";
import { weatherData } from "@/constant";

export default function DeviceAnalytics() {
  const params = useParams();
  const deviceId = params.deviceId as string;

  const [currentUser, loading] = useCurrentUser();
  const [device, setDevice] = useState<Device | null>(null);
  const [weather, setWeather] = useState<Weather[] | null>(null);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (loading || !currentUser) return;

      const currentDevice = await getDeviceById(currentUser.uid, deviceId);
      setDevice(currentDevice);

      const weatherData = await getWeatherDataByDevice(deviceId);
      setWeather(weatherData);

      if (weatherData && weatherData.length > 0) {
        setCurrentWeather(weatherData[0]);
      }
    }
    fetchData();
  }, [currentUser, loading, deviceId]);

  return (
    <PageLayout
      title="Analytics & Forecast"
      description="AI-powered weather forecasting and analysis"
    >
      <DeviceStatusBar device={device} />

      {currentWeather && (
        <MetricsGrid
          temperature={currentWeather?.temp}
          humidity={currentWeather.humidity}
          pressure={currentWeather.pressure}
          soilMoisture={currentWeather.soilMoisture}
        />
      )}

      <div className="text-green-50 flex items-start lg:items-center justify-between pt-5">
        <div>
          <h1 className="text-xl font-bold">
            AI-powered 4 Day Weather Prediction
          </h1>
          <p className="text-gray-400 mt-1 text-xs sm:text-base">
            Get precise, AI-driven forecasts to help you plan smarter and farm
            better.
          </p>
        </div>
        <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
          <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-200" />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {weather && Array.isArray(weather) && weather.length > 0 && (
            <WeatherChart
              title="Weather Trends"
              subtitle="4-day forecast analysis"
              icon={Activity}
              data={weather}
              type="line"
              dataKeys={[
                { key: "temp", color: "#F97316", name: "Temperature (°C)" },
                { key: "humidity", color: "#3B82F6", name: "Humidity (%)" },
              ]}
              height={320}
            />
          )}
        </div>

        {weather && Array.isArray(weather) && weather.length > 0 && (
          <WeatherChart
            title="Rainfall"
            subtitle="Expected precipitation"
            icon={CloudRain}
            data={weather}
            type="bar"
            dataKeys={[
              { key: "rainfall", color: "#FFB8D9", name: "Rainfall (mm)" },
            ]}
            height={320}
          />
        )}
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
            {weather && Array.isArray(weather) && weather.length > 0 && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weather}>
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
            )}
          </div>

          {weatherData &&
            Array.isArray(weatherData) &&
            weatherData.length > 0 && (
              <MoistureAnalysis
                moisture={weatherData.map((w) => w.soilMoisture)}
              />
            )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-600/10 to-blue-600/10 backdrop-blur-sm border border-green-600/20 rounded-xl p-6">
        <div className="flex items-center justify-between space-x-3 mb-6">
          <div>
            <TrendingUp className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
            <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
            <h4 className="font-medium text-white mb-2 flex items-center">
              <InfoIcon className="w-4 h-4 mr-2 text-blue-400" />
              Humidity Management
            </h4>
            <p className="text-sm text-gray-300">
              High humidity detected. Consider fungicide application within 48
              hours to prevent crop disease.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
