"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { User, Wifi, Plus, Trash2, Edit3, Save } from "lucide-react";
import PageLayout from "@/components/PageLayout";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface Device {
  id: number;
  name: string;
  deviceId: string;
  status: "online" | "offline";
}

export default function Settings() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    name: "John Farmer",
    email: "john@farm.com",
    phone: "+1234567890",
    location: "Iowa, USA",
  });

  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "Weather Station 1", deviceId: "WS001", status: "online" },
    { id: 2, name: "Soil Sensor A", deviceId: "SS002", status: "offline" },
  ]);

  const [newDevice, setNewDevice] = useState<{
    deviceId: string;
    name: string;
  }>({
    deviceId: "",
    name: "",
  });

  const [editingDevice, setEditingDevice] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);

  const handlePersonalInfoChange = (
    field: keyof PersonalInfo,
    value: string
  ) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const addDevice = () => {
    if (newDevice.deviceId && newDevice.name) {
      setDevices((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...newDevice,
          status: "offline",
        },
      ]);
      setNewDevice({ deviceId: "", name: "" });
      setShowAddDeviceForm(false);
    }
  };

  const deleteDevice = (id: number) => {
    setDevices((prev) => prev.filter((device) => device.id !== id));
  };

  const updateDeviceName = (id: number, name: string) => {
    setDevices((prev) =>
      prev.map((device) => (device.id === id ? { ...device, name } : device))
    );
    setEditingDevice(null);
  };

  return (
    <PageLayout 
      title="Account Settings" 
      description="Manage your account settings and IoT devices."
    >
      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Personal Information</h2>
              <p className="text-sm text-gray-400">Update your profile details</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-green-600/20 text-green-400 border border-green-600/30 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors"
          >
            {isEditing ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
            <span>{isEditing ? "Save" : "Edit"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(["name", "email", "phone", "location"] as (keyof PersonalInfo)[]).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                value={personalInfo[field]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePersonalInfoChange(field, e.target.value)
                }
                disabled={!isEditing}
                className="w-full bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600/50 disabled:opacity-50 focus:border-green-500 focus:outline-none transition-colors"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Wifi className="w-6 h-6 text-green-400" />
            <div>
              <h2 className="text-xl font-bold text-white">IoT Devices</h2>
              <p className="text-sm text-gray-400">Manage your connected sensors</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddDeviceForm((prev) => !prev)}
            className="flex items-center space-x-2 bg-green-600/20 text-green-400 border border-green-600/30 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddDeviceForm ? "Hide Form" : "Add Device"}</span>
          </button>
        </div>

        {showAddDeviceForm && (
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600/30">
            <h3 className="text-lg font-medium text-white mb-4">Register New Device</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Device ID (e.g., WS003)"
                value={newDevice.deviceId}
                onChange={(e) => setNewDevice((prev) => ({ ...prev, deviceId: e.target.value }))}
                className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600/50 focus:border-green-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={(e) => setNewDevice((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600/50 focus:border-green-500 focus:outline-none transition-colors"
              />
              <button
                onClick={addDevice}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-gray-700/20 backdrop-blur-sm rounded-lg p-4 flex items-center justify-between border border-gray-600/30 hover:bg-gray-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  device.status === "online" ? "bg-green-400" : "bg-red-400"
                }`} />
                <div>
                  {editingDevice === device.id ? (
                    <input
                      type="text"
                      defaultValue={device.name}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          updateDeviceName(device.id, (e.target as HTMLInputElement).value);
                        }
                        if (e.key === "Escape") {
                          setEditingDevice(null);
                        }
                      }}
                      className="bg-gray-700/50 text-white px-2 py-1 rounded border border-gray-600/50 focus:border-green-500 focus:outline-none"
                      autoFocus
                    />
                  ) : (
                    <h4 className="font-medium text-white">{device.name}</h4>
                  )}
                  <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-3 py-1 rounded-full border ${
                  device.status === "online"
                    ? "bg-green-600/20 text-green-400 border-green-600/30"
                    : "bg-red-600/20 text-red-400 border-red-600/30"
                }`}>
                  {device.status}
                </span>
                <button
                  onClick={() => setEditingDevice(device.id)}
                  className="text-gray-400 hover:text-white p-1 rounded transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteDevice(device.id)}
                  className="text-red-400 hover:text-red-300 p-1 rounded transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
