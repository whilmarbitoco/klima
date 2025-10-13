"use client";

import { useState, useEffect } from "react";
import { User, Wifi, Plus, Edit3, Save } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Device, PersonalInfo } from "@/types";
import DeviceSettingsCard from "@/components/DeviceSettingsCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { createDevice, getDevices, removeDevice } from "@/sevice/deviceService";

export default function Settings() {
  const [currentUser, loading] = useCurrentUser();

  const [personalInfo] = useState<PersonalInfo>({
    fullname: "John",
    location: "N/A",
  });

  const [devices, setDevices] = useState<Device[]>([]);

  const [newDevice, setNewDevice] = useState<Device>({
    deviceId: "",
    name: "",
    status: "online",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAddDeviceForm, setShowAddDeviceForm] = useState(false);

  const addDevice = async () => {
    if (currentUser == null) return;

    if (newDevice.deviceId && newDevice.name) {
      setDevices((prev) => [...prev, newDevice]);
      setNewDevice({ deviceId: "", name: "" });
      setShowAddDeviceForm(false);
      await createDevice(currentUser.uid, newDevice);
    }
  };

  const deleteDevice = async (deviceId: string) => {
    if (currentUser == null) return;

    const filtered = devices.filter((device) => device.deviceId !== deviceId);
    setDevices(filtered);
    await removeDevice(currentUser.uid, deviceId);
  };

  useEffect(() => {
    if (loading || currentUser == null) return;

    console.log(currentUser);

    const fetchData = async () => {
      const currentDevices = await getDevices(currentUser.uid);
      setDevices(currentDevices);
    };

    fetchData();
  }, [currentUser]);

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
              <h2 className="text-xl font-bold text-white">
                Personal Information
              </h2>
              <p className="text-sm text-gray-400">
                Update your profile details
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="cursor-pointer flex items-center space-x-2 bg-green-600/20 text-green-400 border border-green-600/30 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors"
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
          {(["fullname", "location"] as (keyof PersonalInfo)[]).map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-400 mb-2 capitalize">
                {field}
              </label>
              <input
                type="text"
                value={personalInfo[field]}
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
              <p className="text-sm text-gray-400">
                Manage your connected sensors
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddDeviceForm((prev) => !prev)}
            className="flex items-center space-x-2 bg-green-600/20 text-green-400 border border-green-600/30 px-4 py-2 rounded-lg hover:bg-green-600/30 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm lg:text-lg">
              {showAddDeviceForm ? "Hide Form" : "Add Device"}
            </span>
          </button>
        </div>

        {showAddDeviceForm && (
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6 border border-gray-600/30">
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
                className="bg-gray-700/50 text-white px-4 py-2 rounded-lg border border-gray-600/50 focus:border-green-500 focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={(e) =>
                  setNewDevice((prev) => ({ ...prev, name: e.target.value }))
                }
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
            <DeviceSettingsCard
              key={device.deviceId}
              device={device}
              onDelete={deleteDevice}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
