import { isOptimalSoilMoisture, moistureAverage } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Droplet, InfoIcon } from "lucide-react";

const Message = ({
  type = "critical", // "critical" | "warning" | "success"
  title,
  message,
}: {
  type: "critical" | "warning" | "success";
  title: string;
  message: string;
}) => {
  const types = {
    critical: {
      icon: <AlertTriangle className="w-4 h-4 text-red-400" />,
      bg: "bg-red-600/10",
      border: "border-red-600/20",
      text: "text-red-400",
      defaultTitle: "Critical Alert",
    },
    warning: {
      icon: <Droplet className="w-4 h-4 text-yellow-400" />,
      bg: "bg-yellow-600/10",
      border: "border-yellow-600/20",
      text: "text-yellow-400",
      defaultTitle: "Warning",
    },
    success: {
      icon: <CheckCircle2 className="w-4 h-4 text-green-400" />,
      bg: "bg-green-600/10",
      border: "border-green-600/20",
      text: "text-green-400",
      defaultTitle: "All Good",
    },
  };

  const style = types[type] || types.critical;

  return (
    <div
      className={`p-4 rounded-lg border ${style.bg} ${style.border} transition-all duration-500 ease-in-out hover:scale-[1.02]`}
    >
      <div className="flex items-center space-x-2 mb-2">
        {style.icon}
        <span className={`${style.text} font-medium text-sm`}>
          {title || style.defaultTitle}
        </span>
      </div>
      <p className="text-gray-300 text-sm">{message}</p>
    </div>
  );
};

const MoistureAnalysis = ({ moisture }: { moisture: number[] }) => {
  const prediction = moistureAverage(moisture);

  return (
    <div className="space-y-4">
      {prediction < 20 ? (
        <Message
          type="critical"
          title="Critical Alert"
          message="Soil moisture is critically low. Consider watering your crops."
        />
      ) : prediction > 60 ? (
        <Message
          type="warning"
          title="High Moisture"
          message="Soil moisture is too high. Avoid overwatering to prevent root rot."
        />
      ) : (
        <Message
          type="success"
          title="All Good"
          message="Soil moisture levels are healthy. No action needed."
        />
      )}

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
