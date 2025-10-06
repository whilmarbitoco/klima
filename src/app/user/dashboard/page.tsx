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
  Sprout
} from "lucide-react";
import OnboardingModal from "../../../components/dashboard/OnboardingModal";

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Farm Dashboard</h1>
          <p className="text-gray-400">Welcome back, John! Here's your farm's current conditions.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Iowa Farm, USA</span>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Farm Metrics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Primary Metrics */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="w-8 h-8 text-orange-400" />
              <span className="text-3xl font-bold text-white">27.3°C</span>
            </div>
            <h3 className="text-gray-300 font-medium">Temperature</h3>
            <p className="text-green-400 text-sm mt-1">Optimal for crops</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Sprout className="w-8 h-8 text-green-400" />
              <span className="text-3xl font-bold text-white">72.7%</span>
            </div>
            <h3 className="text-gray-300 font-medium">Soil Moisture</h3>
            <p className="text-green-400 text-sm mt-1">Good levels</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="w-8 h-8 text-blue-400" />
              <span className="text-3xl font-bold text-white">82.4%</span>
            </div>
            <h3 className="text-gray-300 font-medium">Humidity</h3>
            <p className="text-yellow-400 text-sm mt-1">High levels</p>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <CloudRain className="w-8 h-8 text-cyan-400" />
              <span className="text-3xl font-bold text-white">0.005mm</span>
            </div>
            <h3 className="text-gray-300 font-medium">Rainfall</h3>
            <p className="text-red-400 text-sm mt-1">Very low</p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Gauge className="w-8 h-8 text-green-200" />
            <span className="text-2xl font-bold">1010hPa</span>
          </div>
          <h3 className="text-green-100 font-medium mb-4">Atmospheric Pressure</h3>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Soil moisture alert configured</p>
              <p className="text-gray-400 text-xs">2 hours ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Irrigation schedule updated</p>
              <p className="text-gray-400 text-xs">1 day ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Crop growth stage recorded</p>
              <p className="text-gray-400 text-xs">2 days ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Weather forecast reviewed</p>
              <p className="text-gray-400 text-xs">3 days ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Drought risk assessment</p>
              <p className="text-gray-400 text-xs">4 days ago</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 p-4 bg-gray-700/50 rounded-lg">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-white text-sm">Rainfall data synchronized</p>
              <p className="text-gray-400 text-xs">5 days ago</p>
            </div>
          </div>
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