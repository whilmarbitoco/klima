"use client";
import { useState } from "react";
import { X, MapPin, Briefcase, Home, Users } from "lucide-react";

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({ isOpen, onClose }: OnboardingModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    farmLocation: "",
    farmSize: "",
    cropTypes: [] as string[],
    farmingConcerns: [] as string[],
    experienceYears: "",
    irrigationSystem: "",
  });

  const cropTypes = [
    "Corn", "Wheat", "Rice", "Soybeans", "Cotton", "Tomatoes",
    "Potatoes", "Lettuce", "Carrots", "Onions", "Peppers", "Beans"
  ];

  const farmingConcerns = [
    "Soil Moisture", "Temperature", "Humidity", "Rainfall", "Pressure",
    "Frost Risk", "Drought", "Flooding", "Pest Control", "Disease Prevention"
  ];

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else onClose();
  };

  const handleCropToggle = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      cropTypes: prev.cropTypes.includes(crop)
        ? prev.cropTypes.filter(c => c !== crop)
        : [...prev.cropTypes, crop]
    }));
  };

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      farmingConcerns: prev.farmingConcerns.includes(concern)
        ? prev.farmingConcerns.filter(c => c !== concern)
        : [...prev.farmingConcerns, concern]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">Welcome to KLIMA</h2>
            <p className="text-gray-400">Help us personalize your weather experience</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full ${
                  i <= step ? "bg-green-600" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 mt-2">Step {step} of 3</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Farm Details</h3>
                <p className="text-gray-400">Tell us about your farm location and size</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Farm Location
                  </label>
                  <input
                    type="text"
                    value={formData.farmLocation}
                    onChange={(e) => setFormData(prev => ({ ...prev, farmLocation: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    placeholder="e.g., Iowa, USA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Farm Size (acres)
                  </label>
                  <input
                    type="text"
                    value={formData.farmSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, farmSize: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    placeholder="e.g., 100 acres"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Years of Farming Experience
                  </label>
                  <select
                    value={formData.experienceYears}
                    onChange={(e) => setFormData(prev => ({ ...prev, experienceYears: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="">Select experience level</option>
                    <option value="1-5">1-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="11-20">11-20 years</option>
                    <option value="20+">20+ years</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Crops & Irrigation</h3>
                <p className="text-gray-400">What crops do you grow and how do you irrigate?</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Select your crops:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {cropTypes.map((crop) => (
                      <button
                        key={crop}
                        onClick={() => handleCropToggle(crop)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          formData.cropTypes.includes(crop)
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Irrigation System
                  </label>
                  <select
                    value={formData.irrigationSystem}
                    onChange={(e) => setFormData(prev => ({ ...prev, irrigationSystem: e.target.value }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-green-400"
                  >
                    <option value="">Select irrigation type</option>
                    <option value="drip">Drip Irrigation</option>
                    <option value="sprinkler">Sprinkler System</option>
                    <option value="flood">Flood Irrigation</option>
                    <option value="rain-fed">Rain-fed Only</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Home className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Farming Priorities</h3>
                <p className="text-gray-400">Which farming conditions are most critical for your operations?</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {farmingConcerns.map((concern) => (
                  <button
                    key={concern}
                    onClick={() => handleConcernToggle(concern)}
                    className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                      formData.farmingConcerns.includes(concern)
                        ? "bg-green-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {concern}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-700">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            {step === 3 ? "Complete Setup" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}