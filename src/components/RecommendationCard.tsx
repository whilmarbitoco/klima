import { Recommendation } from "@/types";
import { InfoIcon } from "lucide-react";

const RecommendationCard = ({ title, description }: Recommendation) => {
  return (
    <div className="p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
      <div className="flex items-start space-x-3">
        <div className="text-blue-400 text-lg">
          <InfoIcon className="w-6 h-6 text-green-400" />
        </div>
        <div>
          <h4 className="font-medium text-white mb-2">{title}</h4>
          <p className="text-sm text-gray-300">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
