import { LucideIcon } from "lucide-react";

interface Metric {
  label: string;
  value: string;
  status: string;
  icon: LucideIcon;
  color: string;
}

interface MetricsGridProps {
  metrics: Metric[];
}

export default function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div key={index} className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:bg-gray-800/50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <Icon className={`w-5 h-5 ${metric.color}`} />
              <span className="text-xs text-gray-400">{metric.status}</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-sm text-gray-400">{metric.label}</div>
          </div>
        );
      })}
    </div>
  );
}