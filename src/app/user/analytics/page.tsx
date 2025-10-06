"use client";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Sprout,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Download,
  Snowflake,
  Sun,
  Zap,
  InfoIcon,
} from "lucide-react";

import ChartCard from "@/components/ChartCard";
import SimpleChart from "@/components/SimpleChart";
import RecommendationCard from "@/components/RecommendationCard";
import Header from "@/components/Header";
import AnomalyCard from "@/components/AnomalyCard";

export default function Analytics() {
  const temperatureForecast = [
    { label: "Today", value: 27.3 },
    { label: "Tomorrow", value: 28.1 },
    { label: "Day 3", value: 26.5 },
    { label: "Day 4", value: 25.8 },
  ];

  const rainfallForecast = [
    { label: "Today", value: 0 },
    { label: "Tomorrow", value: 5 },
    { label: "Day 3", value: 15 },
    { label: "Day 4", value: 25 },
  ];

  const humidityForecast = [
    { label: "Today", value: 82 },
    { label: "Tomorrow", value: 78 },
    { label: "Day 3", value: 85 },
    { label: "Day 4", value: 88 },
  ];

  const soilMoistureData = [
    { label: "Today", value: 72.7 },
    { label: "Day 2", value: 69.0 },
    { label: "Day 3", value: 65.8 },
    { label: "Day 4", value: 62.5 },
  ];

  return (
    <div className="p-4 lg:p-6 space-y-6 overflow-x-hidden">
      l
      <Header
        title="Analytics & Forecasts"
        description="AI-powered forecasts and crop analytics for informed farming decisions"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors w-full sm:w-auto justify-center">
            <TrendingUp className="w-4 h-4" />
            <span>Request New Prediction</span>
          </button>
          <button className="flex items-center space-x-2 bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors w-full sm:w-auto justify-center">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
        </div>
      </Header>
      {/* Forecast Graphs - Next 7 Days */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <ChartCard title="Temperature Forecast" icon={Thermometer}>
          <div className="mb-4 text-xs text-gray-500">
            <span className="font-medium">°C:</span> Degrees Celsius - Air
            temperature
          </div>
          <SimpleChart
            data={temperatureForecast}
            type="line"
            height={200}
            unit="°C"
          />
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Peak:</span>
              <span className="text-orange-400 font-medium">
                29.2°C (Day 6)
              </span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Rainfall Forecast" icon={CloudRain}>
          <div className="mb-4 text-xs text-gray-500">
            <span className="font-medium">mm:</span> Millimeters - Expected
            precipitation
          </div>
          <SimpleChart
            data={rainfallForecast}
            type="bar"
            height={200}
            unit="mm"
          />
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expected:</span>
              <span className="text-cyan-400 font-medium">56mm total</span>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Humidity Forecast" icon={Droplets}>
          <div className="mb-4 text-xs text-gray-500">
            <span className="font-medium">%:</span> Percentage - Relative
            humidity in air
          </div>
          <SimpleChart
            data={humidityForecast}
            type="line"
            height={200}
            unit="%"
          />
          <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Range:</span>
              <span className="text-blue-400 font-medium">72% - 88%</span>
            </div>
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Soil Moisture Prediction" icon={Sprout}>
        <div className="mb-4 text-xs text-gray-500">
          <span className="font-medium">%:</span> Percentage - Water content in
          soil
        </div>
        <SimpleChart
          data={soilMoistureData}
          type="line"
          height={250}
          unit="%"
        />
        <div className="mt-4 p-4 bg-red-600/10 rounded-lg border border-red-600/20">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-red-400 font-medium text-sm">
              Irrigation Alert
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            Soil moisture will drop below 55% by Day 7. Plan irrigation for Day
            5-6.
          </p>
        </div>
      </ChartCard>
      {/* Knowledge & Recommendations */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <h3 className="text-xl font-bold text-white">
            Knowledge & Recommendations
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
          <RecommendationCard />
        </div>
      </div>
      {/* Anomaly Alerts */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <h3 className="text-xl font-bold text-white">
            Weather Anomaly Alerts
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AnomalyCard />
          <AnomalyCard />
          <AnomalyCard />
        </div>
      </div>
    </div>
  );
}
