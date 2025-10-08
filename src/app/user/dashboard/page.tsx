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
import { FarmDetails } from "@/types";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentUser, loading] = useCurrentUser();

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
    if (loading) return;

    async function checkFarmDetails() {
      if (!loading && currentUser != null) {
        const userId = currentUser?.uid;
        const farmDetails = (await getUserFarmDetails(userId)) != null;
        setShowOnboarding(!farmDetails);
      } else {
        setShowOnboarding(true);
      }
    }
    checkFarmDetails();
  }, [currentUser, loading]);

  return (
    <PageLayout
      title="Dashboard"
      description="Welcome, Farmer John! Here's an overview of your farm's latest conditions."
    >
      <MetricsGrid metrics={metrics} />

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
              color={activity.color}
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
