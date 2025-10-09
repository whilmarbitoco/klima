import { InfoIcon } from "lucide-react";

const Recommendation = () => {
  return (
    <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
      <h4 className="font-medium text-white mb-2 flex items-center">
        <InfoIcon className="w-4 h-4 mr-2 text-blue-400" />
        Humidity Management
      </h4>
      <p className="text-sm text-gray-300">
        High humidity detected. Consider fungicide application within 48 hours
        to prevent crop disease.
      </p>
    </div>
  );
};

export default Recommendation;
