import { Device } from "@/types";

interface DeviceCardProps {
  device: Device;
  handleDeviceSelect: (device: Device) => void;
}

const DeviceCard = ({ device, handleDeviceSelect }: DeviceCardProps) => {
  return (
    <button
      onClick={() => handleDeviceSelect(device)}
      className="cursor-pointer bg-gray-700/50 hover:bg-gray-700 border border-gray-600 rounded-lg p-4 transition-colors text-left"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-white">{device.name}</h3>
        <div
          className={`w-3 h-3 rounded-full ${
            device.status === "online" ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </div>
      <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
      <span
        className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
          device.status === "online"
            ? "bg-green-600/20 text-green-400"
            : "bg-red-600/20 text-red-400"
        }`}
      >
        {device.status}
      </span>
    </button>
  );
};

export default DeviceCard;
