import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function ChartCard({ title, icon: Icon, children, action }: ChartCardProps) {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}