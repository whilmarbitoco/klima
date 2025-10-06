import { CloudRain, Droplets, Thermometer, TrendingUp } from "lucide-react";
import React from "react";

const Insight = () => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <TrendingUp className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">
          AI Insights & Recommendations
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-blue-600/10 rounded-lg border border-blue-600/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Droplets className="w-5 h-5 text-blue-400" />
              <span className="font-medium text-white">Irrigation Alert</span>
            </div>
            <span className="text-xs bg-red-600 text-white px-2 py-1 rounded-full">
              High Priority
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Soil moisture dropping below optimal levels. Consider irrigation in
            the next 24-48 hours.
          </p>
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Accept Recommendation
          </button>
        </div>

        <div className="p-6 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <CloudRain className="w-5 h-5 text-yellow-400" />
              <span className="font-medium text-white">Weather Forecast</span>
            </div>
            <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
              Medium Priority
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Low rainfall expected for the next week. Plan water management
            accordingly.
          </p>
          <button className="w-full bg-yellow-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-yellow-700 transition-colors">
            Accept Recommendation
          </button>
        </div>

        <div className="p-6 bg-green-600/10 rounded-lg border border-green-600/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Thermometer className="w-5 h-5 text-green-400" />
              <span className="font-medium text-white">
                Temperature Optimal
              </span>
            </div>
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
              Low Priority
            </span>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            Current temperature range is ideal for crop growth. Maintain current
            practices.
          </p>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
            Accept Recommendation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Insight;
