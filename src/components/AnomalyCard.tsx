import { AlertTriangle, Snowflake } from "lucide-react";

interface AnomalyCardProps {
  title: string;
  riskLevel: "Low" | "Medium" | "High";
  description: string;
  action: string;
}

const AnomalyCard = () => {
  return (
    <div className="p-6 bg-yellow-600/10 rounded-lg border border-yellow-600/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
          <span className="font-medium text-white">Frost Risk</span>
        </div>
        <span className="text-xs bg-yellow-600 text-white px-2 py-1 rounded-full">
          Low Risk
        </span>
      </div>
      <p className="text-sm text-gray-300 mb-4">
        Minimum temperature expected: 8°C on Day 4. No frost protection needed.
      </p>
      <div className="text-xs text-yellow-400">Next check: Day 4 morning</div>
    </div>
  );
};

export default AnomalyCard;
