import {
  isOptimalHumidity,
  isOptimalPressure,
  isOptimalSoilMoisture,
  isOptimalTemperature,
} from "@/lib/utils";
import { Droplets, Gauge, LucideIcon, Sprout, Thermometer } from "lucide-react";

interface MetricsGridProps {
  temperature: number;
  soilMoisture: number;
  humidity: number;
  pressure: number;
}

export default function MetricsGrid({
  temperature,
  soilMoisture,
  humidity,
  pressure,
}: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Thermometer className={`w-5 h-5 text-orange-400`} />
          {isOptimalTemperature(temperature) ? (
            <span className="text-xs text-green-400">Optimal</span>
          ) : (
            <span className="text-xs text-red-400">Alert</span>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          {Math.floor(temperature)}°C
        </div>
        <div className="text-sm text-gray-400">Temperature</div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Sprout className={`w-5 h-5 text-green-400`} />
          {isOptimalSoilMoisture(soilMoisture) ? (
            <span className="text-xs text-green-400">Optimal</span>
          ) : (
            <span className="text-xs text-red-400">Alert</span>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          {Math.floor(soilMoisture)}%
        </div>
        <div className="text-sm text-gray-400">Soil Moisture</div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Droplets className={`w-5 h-5 text-blue-400`} />
          {(() => {
            const status = isOptimalHumidity(humidity);
            if (status === "Optimal") {
              return <span className="text-xs text-green-400">Optimal</span>;
            }
            if (status === "Low") {
              return <span className="text-xs text-blue-400">Low</span>;
            }
            return <span className="text-xs text-red-400">High</span>;
          })()}
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          {Math.floor(humidity)}%
        </div>
        <div className="text-sm text-gray-400">Humidity</div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <Gauge className={`w-5 h-5 text-purple-400`} />
          {isOptimalPressure(pressure) ? (
            <span className="text-xs text-green-400">Optimal</span>
          ) : (
            <span className="text-xs text-red-400">Alert</span>
          )}
        </div>
        <div className="text-2xl font-bold text-white mb-1">
          {Math.floor(pressure)}hPa
        </div>
        <div className="text-sm text-gray-400">Atmospheric Pressure</div>
      </div>
    </div>
  );
}
