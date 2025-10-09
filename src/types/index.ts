export type DeviceStatus = "online" | "offline";

export interface Device {
  name: string;
  deviceId: string;
  status: DeviceStatus;
}

export interface Weather {
  time: string;
  temp: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
  pressure: number;
  timestamp?: number;
}

export interface UserProfile {
  userId: string;
  name: string;
  email: string;
  location: string;
}

export interface FarmDetails {
  farmLocation: string;
  farmSize: string;
  yearsOfExperience: string;
  crops: string[];
  irrigationSystem: string;
  farmingConcerns: string[];
}

export interface Message {
  id: number;
  text: string;
  isBot?: boolean;
  timestamp: Date;
}

export interface SoilAnalysis {
  status: "below" | "optimal" | "above";
}

export interface Recommendation {
  title: string;
  description: string;
}
