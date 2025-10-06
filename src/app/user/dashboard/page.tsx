"use client";
import { useState, useEffect } from "react";
import {
  Thermometer,
  Droplets,
  Gauge,
  CloudRain,
  MapPin,
  Bell,
  Activity,
  Sprout,
} from "lucide-react";
import OnboardingModal from "@/components/OnboardingModal";
import Header from "@/components/Header";
import SensorCard from "@/components/SensorCard";
import ActivityCard from "@/components/ActivityCard";

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true);
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

  return (
    <div className="p-4 lg:p-6 space-y-6 overflow-x-hidden">
      <Header
        title="Farmer John"
        description={`Welcome, Farmer John! Here's an overview of your farm's latest conditions and activities.`}
      >
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Tagum City, PH</span>
          </div>
        </div>
      </Header>

      {/* Farm Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SensorCard
            icon={Thermometer}
            iconColor="text-orange-400"
            value="27.3°C"
            title="Temperature"
            status="Optimal for crops"
            statusColor="text-green-400"
          />

          <SensorCard
            icon={Sprout}
            iconColor="text-green-400"
            value="72.7%"
            title="Soil Moisture"
            status="Good levels"
            statusColor="text-green-400"
          />

          <SensorCard
            icon={Droplets}
            iconColor="text-blue-400"
            value="82.4%"
            title="Humidity"
            status="High levels"
            statusColor="text-yellow-400"
          />

          <SensorCard
            icon={CloudRain}
            iconColor="text-cyan-400"
            value="0.005mm"
            title="Rainfall"
            status="Very low"
            statusColor="text-red-400"
          />
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Gauge className="w-8 h-8 text-green-200" />
            <span className="text-2xl font-bold">1010hPa</span>
          </div>
          <h3 className="text-green-100 font-medium mb-4">
            Atmospheric Pressure
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Conditions:</span>
              <span className="font-medium">Stable</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Trend:</span>
              <span className="font-medium">Rising</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-200">Forecast:</span>
              <span className="font-medium">Fair weather</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Farm Activity</h2>
          <Activity className="w-5 h-5 text-gray-400" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              color={activity.color}
              title={activity.title}
              time={activity.time}
            />
          ))}
        </div>
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
