export interface Device {
  id: number;
  name: string;
  deviceId: string;
  status: "online" | "offline";
}

export interface Weather {
  time: string;
  temp: number;
  humidity: number;
  rainfall: number;
  soilMoisture: number;
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
  farmingPriority: string[];
}
