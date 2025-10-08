import { Weather } from "@/types";
import { LucideIcon } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface WeatherChartProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  data: Weather[];
  type: "line" | "bar" | "area";
  dataKeys: { key: string; color: string; name: string }[];
  height?: number;
}

export default function WeatherChart({
  title,
  subtitle,
  icon: Icon,
  data,
  type,
  dataKeys,
  height = 320,
}: WeatherChartProps) {
  const tooltipStyle = {
    backgroundColor: "#1F2937",
    border: "1px solid #374151",
    borderRadius: "8px",
    color: "#F9FAFB",
  };

  const renderChart = () => {
    const commonProps = {
      data,
      children: [
        <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#374151" />,
        <XAxis
          key="xaxis"
          dataKey="time"
          stroke="#9CA3AF"
          fontSize={10}
          tick={{ fontSize: 10 }}
        />,
        <YAxis key="yaxis" stroke="#9CA3AF" fontSize={12} />,
        <Tooltip key="tooltip" contentStyle={tooltipStyle} />,
      ],
    };

    switch (type) {
      case "line":
        return (
          <LineChart {...commonProps}>
            {commonProps.children}
            {dataKeys.map(({ key, color, name }) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                strokeWidth={3}
                dot={{ fill: color, strokeWidth: 2, r: 4 }}
                name={name}
              />
            ))}
          </LineChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            {commonProps.children}
            {dataKeys.map(({ key, color, name }) => (
              <Bar
                key={key}
                dataKey={key}
                fill={color}
                radius={[4, 4, 0, 0]}
                name={name}
              />
            ))}
          </BarChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            {commonProps.children}
            {dataKeys.map(({ key, color, name }) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={color}
                fill={color}
                fillOpacity={0.3}
                strokeWidth={3}
                name={name}
              />
            ))}
          </AreaChart>
        );
      default:
        return <LineChart {...commonProps}>{commonProps.children}</LineChart>;
    }
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-white truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 truncate">
            {subtitle}
          </p>
        </div>
        <Icon className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
      </div>
      <div
        style={{
          height:
            typeof height === "number" ? Math.max(height * 0.8, 250) : height,
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
