import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  icon: LucideIcon;
  iconColor: string;
  value: string;
  title: string;
  status: string;
  statusColor: string;
}

const SensorCard = ({
  icon: Icon,
  iconColor,
  value,
  title,
  status,
  statusColor,
}: SensorCardProps) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-8 h-8 ${iconColor}`} />
        <span className="text-3xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-gray-300 font-medium">{title}</h3>
      <p className={`text-sm mt-1 ${statusColor}`}>{status}</p>
    </div>
  );
};

export default SensorCard;
