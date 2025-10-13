"use client";
import {
  CloudRain,
  Sprout,
  TrendingUp,
  Activity,
  RefreshCw,
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
import { Device, Recommendation, Weather } from "@/types";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  addRecommendations,
  getDeviceById,
  getRecommendations,
} from "@/sevice/deviceService";
import {
  cacheDevice,
  createWeatherPrediction,
  getLatestPrediction,
  getWeatherDataByDevice,
} from "@/sevice/weatherService";
import {
  cleanAIResponse,
  transformDay,
} from "@/lib/utils";
import MoistureAnalysis from "@/components/MoistureAnalysis";
import RecommendationCard from "@/components/RecommendationCard";
import Suspender from "@/components/Suspender";

export default function DeviceAnalytics() {
  const params = useParams();
  const deviceId = params.deviceId as string;

  const [currentUser, loading] = useCurrentUser();
  const [device, setDevice] = useState<Device | null>(null);
  const [weather, setWeather] = useState<Weather[]>([]);
  const [weatherPrediction, setWeatherPrediction] = useState<Weather[]>([]);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);
  const [recommendations, setrecommendations] = useState<Recommendation[]>([]);

  const refreshRecommendation = async () => {
    setrecommendations([]);
    const requestBody = {
      weather: weatherPrediction,
    };

    const response = await fetch("/api/recommend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log(response);
      return;
    }

    const data = await response.json();

    const formatted = JSON.parse(
      cleanAIResponse(data.message)
    ) as Recommendation[];
    setrecommendations(formatted);
    await addRecommendations(deviceId, formatted);
  };

  const refreshWeatherPrediction = async () => {
    setWeatherPrediction([]);
    const requestBody = {
      data: weather.map((w) => [
        w.temp,
        w.humidity,
        w.rainfall,
        w.pressure,
        w.soilMoisture,
      ]),
    };

    const response = await fetch("https://wb2c0-klima.hf.space/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.log(response);
      return;
    }

    const data = await response.json();
    const mappedWeather: Weather[] = data.map((day: { temperature_c: number; humidity_percent: number; rain: number; pressure_hpa: number; soil_moisture_percent: number }, index: number) => ({
      temp: day.temperature_c,
      humidity: day.humidity_percent,
      rainfall: day.rain,
      pressure: day.pressure_hpa,
      soilMoisture: day.soil_moisture_percent,
      time: transformDay(index),
    }));

    await createWeatherPrediction(deviceId, mappedWeather);
    setWeatherPrediction(mappedWeather);
    setCurrentWeather(mappedWeather[0]);
  };

  useEffect(() => {
    async function fetchData() {
      if (loading || !currentUser) return;

      setTimeout(() => {}, 20000);
      const currentDevice = await getDeviceById(currentUser.uid, deviceId);
      setDevice(currentDevice);

      const weatherData = await getLatestPrediction(deviceId);
      setWeatherPrediction(weatherData);

      const currentRecommendations = await getRecommendations(deviceId);
      setrecommendations(currentRecommendations);

      if (weatherData.length > 0) {
        setCurrentWeather(weatherData[0]);
      }

      await cacheDevice(currentUser.uid, deviceId);

      const deviceWeatherData = await getWeatherDataByDevice(deviceId);
      setWeather(deviceWeatherData);
    }
    fetchData();
  }, [currentUser, loading, deviceId]);

  return (
    <PageLayout
      title="Analytics & Forecast"
      description="AI-powered weather forecasting and analysis"
    >
      <Suspender condition={device != null}>
        <DeviceStatusBar device={device} />
      </Suspender>

      <Suspender
        condition={currentWeather != null}
        header="Loading Analytics..."
      >
        {currentWeather != null && (
          <MetricsGrid
            temperature={currentWeather.temp}
            humidity={currentWeather.humidity}
            pressure={currentWeather.pressure}
            soilMoisture={currentWeather.soilMoisture}
          />
        )}
      </Suspender>

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
        <button
          onClick={refreshWeatherPrediction}
          title="Refresh Weather Prediction"
          className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-200" />
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <Suspender
            condition={weatherPrediction.length > 0}
            header="Loading Weather Trend..."
          >
            <WeatherChart
              title="Weather Trends"
              subtitle="4-day forecast analysis"
              icon={Activity}
              data={weatherPrediction}
              type="line"
              dataKeys={[
                { key: "temp", color: "#F97316", name: "Temperature (°C)" },
                { key: "humidity", color: "#3B82F6", name: "Humidity (%)" },
              ]}
              height={320}
            />
          </Suspender>
        </div>

        <Suspender
          condition={weatherPrediction.length > 0}
          header="Loading Rainfall Data..."
        >
          <WeatherChart
            title="Rainfall"
            subtitle="Expected precipitation"
            icon={CloudRain}
            data={weatherPrediction}
            type="bar"
            dataKeys={[
              { key: "rainfall", color: "#FFB8D9", name: "Rainfall (mm)" },
            ]}
            height={320}
          />
        </Suspender>
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
            <Suspender condition={weatherPrediction.length > 0}>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weatherPrediction}>
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
            </Suspender>
          </div>

          {weatherPrediction &&
            Array.isArray(weatherPrediction) &&
            weatherPrediction.length > 0 && (
              <MoistureAnalysis
                moisture={weatherPrediction.map((w) => w.soilMoisture)}
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

          <button
            onClick={refreshRecommendation}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-gray-400 hover:text-gray-200" />
          </button>
        </div>

        <Suspender condition={recommendations?.length > 0}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendations.map(
              (recommendation: Recommendation, index: number) => (
                <RecommendationCard
                  key={index}
                  title={recommendation.title}
                  description={recommendation.description}
                />
              )
            )}
          </div>
        </Suspender>
      </div>
    </PageLayout>
  );
}
