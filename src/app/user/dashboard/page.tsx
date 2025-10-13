"use client";

import { useEffect, useState } from "react";
import {
  Thermometer,
  Droplets,
  Gauge,
  CloudRain,
  MapPin,
  Activity,
  Sprout,
} from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";
import ActivityCard from "@/components/ActivityCard";
import PageLayout from "@/components/PageLayout";
import MetricsGrid from "@/components/MetricsGrid";
import { createFarmDetails, getUserFarmDetails } from "@/sevice/userService";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { FarmDetails, Weather } from "@/types";
import { getCache, getLatestPrediction } from "@/sevice/weatherService";
import Suspender from "@/components/Suspender";
import WeatherChart from "@/components/WeatherChart";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, loading] = useCurrentUser();
  const [cacheWeather, setCacheWeather] = useState<Weather[]>([]);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);

  const activities = [
    {
      color: "bg-green-400",
      title: "Soil moisture alert configured",
      time: "2 hours ago",
    },
    {
      color: "bg-blue-400",
      title: "Irrigation schedule updated",
      time: "1 day ago",
    },
    {
      color: "bg-yellow-400",
      title: "Crop growth stage recorded",
      time: "2 days ago",
    },
    {
      color: "bg-purple-400",
      title: "Weather forecast reviewed",
      time: "3 days ago",
    },
    {
      color: "bg-red-400",
      title: "Drought risk assessment",
      time: "4 days ago",
    },
    {
      color: "bg-cyan-400",
      title: "Rainfall data synchronized",
      time: "5 days ago",
    },
  ];

  const onClose = async (data: FarmDetails) => {
    setShowOnboarding(false);

    if (currentUser == null) return;

    await createFarmDetails(currentUser.uid, data);
  };

  useEffect(() => {
    async function checkFarmDetails() {
      if (loading || !currentUser) return;

      const farmDetails = (await getUserFarmDetails(currentUser.uid)) != null;
      setShowOnboarding(!farmDetails);

      const cacheDevice = await getCache(currentUser.uid);
      console.log("Cache", cacheDevice);

      if (cacheDevice != null) {
        const cacheWeather = await getLatestPrediction(cacheDevice);
        setCacheWeather(cacheWeather);
        setCurrentWeather(cacheWeather[0]);
      }
    }
    checkFarmDetails();
  }, [currentUser, loading]);

  return (
    <PageLayout
      title="Dashboard"
      description="Welcome, Farmer John! Here's an overview of your farm's latest conditions."
    >
      <Suspender
        condition={currentWeather != null}
        header="Loading Analytics..."
      >
        {currentWeather != null ? (
          <MetricsGrid
            temperature={currentWeather.temp}
            humidity={currentWeather.humidity}
            pressure={currentWeather.pressure}
            soilMoisture={currentWeather.soilMoisture}
          />
        ) : (
          <h1>No Cache Weather Data</h1>
        )}
      </Suspender>

      <Suspender
        condition={cacheWeather.length > 0}
        header="Loading Weather Trend..."
      >
        <WeatherChart
          title="Cache Weather Trends"
          subtitle="View Analytics Page for New Data"
          icon={Activity}
          data={cacheWeather}
          type="line"
          dataKeys={[
            { key: "temp", color: "#F97316", name: "Temperature (°C)" },
            { key: "humidity", color: "#3B82F6", name: "Humidity (%)" },
          ]}
          height={320}
        />
      </Suspender>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">
              Recent AI Recommendations
            </h2>
            <p className="text-sm text-gray-400">
              Latest updates from your farm operations
            </p>
          </div>
          <Activity className="w-5 h-5 text-green-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              color={"bg-cyan-400"}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </div>
      </div>

      <OnboardingModal isOpen={showOnboarding} onClose={onClose} />
    </PageLayout>
  );
}
