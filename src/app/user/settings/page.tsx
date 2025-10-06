"use client";
import { useState, ChangeEvent, KeyboardEvent } from "react";
import { User, Wifi, Plus, Trash2, Edit3, Save } from "lucide-react";

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
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold text-white">Settings</h1>

      {/* Personal Information */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">
              Personal Information
            </h2>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            {isEditing ? (
              <Save className="w-4 h-4" />
            ) : (
              <Edit3 className="w-4 h-4" />
            )}
            <span>{isEditing ? "Save" : "Edit"}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(
            ["name", "email", "phone", "location"] as (keyof PersonalInfo)[]
          ).map((field) => (
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
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 disabled:opacity-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* IoT Devices */}
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Wifi className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold text-white">IoT Devices</h2>
          </div>
          <button
            onClick={() => setShowAddDeviceForm((prev) => !prev)}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddDeviceForm ? "Hide Form" : "Add Device"}</span>
          </button>
        </div>

        {/* Add New Device Form (toggle visibility) */}
        {showAddDeviceForm && (
          <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-white mb-4">
              Register New Device
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Device ID (e.g., WS003)"
                value={newDevice.deviceId}
                onChange={(e) =>
                  setNewDevice((prev) => ({
                    ...prev,
                    deviceId: e.target.value,
                  }))
                }
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
              />
              <input
                type="text"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={(e) =>
                  setNewDevice((prev) => ({ ...prev, name: e.target.value }))
                }
                className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600"
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

        {/* Device List */}
        <div className="space-y-4">
          {devices.map((device) => (
            <div
              key={device.id}
              className="bg-gray-700/30 rounded-lg p-4 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    device.status === "online" ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <div>
                  {editingDevice === device.id ? (
                    <input
                      type="text"
                      defaultValue={device.name}
                      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          updateDeviceName(
                            device.id,
                            (e.target as HTMLInputElement).value
                          );
                        }
                        if (e.key === "Escape") {
                          setEditingDevice(null);
                        }
                      }}
                      className="bg-gray-700 text-white px-2 py-1 rounded border border-gray-600"
                      autoFocus
                    />
                  ) : (
                    <h4 className="font-medium text-white">{device.name}</h4>
                  )}
                  <p className="text-sm text-gray-400">ID: {device.deviceId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    device.status === "online"
                      ? "bg-green-600/20 text-green-400"
                      : "bg-red-600/20 text-red-400"
                  }`}
                >
                  {device.status}
                </span>
                <button
                  onClick={() => setEditingDevice(device.id)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteDevice(device.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
