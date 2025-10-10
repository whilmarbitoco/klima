import { Device } from "@/types";
import { Edit3, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeviceSettingsCardProps {
  device: Device;
}

const DeviceSettingsCard = ({ device }: DeviceSettingsCardProps) => {
  return (
    <div
      key={device.deviceId}
      className="bg-gray-700/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-gray-600/30 hover:bg-gray-700/30 transition-colors"
    >
      <div className="flex items-center space-x-4">
        <div
          className={`w-3 h-3 rounded-full ${
            device.status === "online" ? "bg-green-400" : "bg-red-400"
          }`}
        />
        <div>
          <h4 className="font-medium text-white">{device.name}</h4>
          <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`text-xs px-3 py-1 rounded-full border ${
            device.status === "online"
              ? "bg-green-600/20 text-green-400 border-green-600/30"
              : "bg-red-600/20 text-red-400 border-red-600/30"
          }`}
        >
          {device.status}
        </span>

        <button className="cursor-pointer text-red-400 hover:text-red-300 p-1 rounded transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default DeviceSettingsCard;
