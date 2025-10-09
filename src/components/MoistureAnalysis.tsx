import { isOptimalSoilMoisture, moistureAverage } from "@/lib/utils";
import { AlertTriangle, InfoIcon } from "lucide-react";

const MoistureAnalysis = ({ moisture }: { moisture: number[] }) => {
  const prediction = moistureAverage(moisture);

  return (
    <div className="space-y-4">
      {prediction < 20 || prediction > 60 ? (
        <div className="p-4 bg-red-600/10 rounded-lg border border-red-600/20">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />

            <span className="text-red-400 font-medium text-sm">
              Critical Alert
            </span>
          </div>
          <p className="text-gray-300 text-sm">
            Moisture is expected to drop in the next few days. Consider watering
            your crops.
          </p>
        </div>
      ) : null}

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Current Level:</span>
          {isOptimalSoilMoisture(moisture[0]) ? (
            <span className="text-green-400 font-medium">
              {moisture[0].toFixed(1)}%
            </span>
          ) : (
            <span className="text-red-400 font-medium">
              {moisture[0].toFixed(1)}%
            </span>
          )}
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Optimal Range:</span>
          <span className="text-gray-300">65-80%</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">AI Prediction Avg:</span>
          {isOptimalSoilMoisture(prediction) ? (
            <span className="text-green-400 font-medium">
              {Math.floor(prediction)}%
            </span>
          ) : (
            <span className="text-red-400 font-medium">
              {prediction.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoistureAnalysis;
