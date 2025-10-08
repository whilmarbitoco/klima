import { Device } from "@/types";
import { Wifi, RefreshCcw } from "lucide-react";

interface DeviceStatusBarProps {
  device: Device;
  onRefresh?: () => void;
}

export default function DeviceStatusBar({
  device,
  onRefresh,
}: DeviceStatusBarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl border border-gray-700/50">
      <div className="flex items-center space-x-3">
        <Wifi className="w-5 h-5 text-green-400" />
        <div>
          <h3 className="font-medium text-white">{device.name}</h3>
          <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            device.status === "online"
              ? "bg-green-600/20 text-green-400 border border-green-600/30"
              : "bg-red-600/20 text-red-400 border border-red-600/30"
          }`}
        >
          {device.status}
        </span>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <RefreshCcw className="w-4 h-4 text-gray-400 hover:text-gray-200" />
          </button>
        )}
      </div>
    </div>
  );
}
