import { Device, FarmDetails, Weather } from "@/types";
import {
  BarChart3,
  Bell,
  Cloud,
  Droplets,
  Gauge,
  Home,
  icons,
  MessageCircleIcon,
  Settings,
  Sprout,
  Thermometer,
  User,
} from "lucide-react";

export const FEATURES = [
  {
    icons: icons.Brain,
    title: "LSTM Deep Learning",
    description:
      "Advanced neural networks trained on Philippine weather data deliver 4-day forecasts with 94.2% accuracy.",
  },
  {
    icons: icons.Database,
    title: "RAG Vector Search",
    description:
      "Retrieval-Augmented Generation with Pinecone vector database for contextual weather intelligence.",
  },
  {
    icons: icons.MessageSquare,
    title: "Conversational AI",
    description:
      "Natural language interface powered by Google Gemini for voice and text weather consultations.",
  },
  {
    icons: icons.Cpu,
    title: "IoT Sensor Network",
    description:
      "Real-time data from NodeMCU ESP8266 sensors monitoring temperature, humidity, soil moisture, and pressure.",
  },
  {
    icons: icons.Zap,
    title: "Real-time Processing",
    description:
      "Sub-200ms response times with automatic data ingestion and instant recommendation generation.",
  },
  {
    icons: icons.Target,
    title: "Hyperlocal Precision",
    description:
      "Farm-specific predictions and recommendations tailored to your exact location and crop types.",
  },
];

export const NAVIGATION = [
  { name: "Dashboard", href: "/user/dashboard", icon: Home },
  { name: "Analytics", href: "/user/analytics", icon: BarChart3 },
  { name: "Weather", href: "/user/weather", icon: Cloud },
  { name: "AI Assistant", href: "/user/message", icon: MessageCircleIcon },
  { name: "Settings", href: "/user/settings", icon: Settings },
];

export const CROPTYPES = [
  "Corn",
  "Wheat",
  "Rice",
  "Soybeans",
  "Cotton",
  "Tomatoes",
  "Potatoes",
  "Lettuce",
  "Carrots",
  "Onions",
  "Peppers",
  "Beans",
];

export const FARMCONCERNS = [
  "Soil Moisture",
  "Temperature",
  "Humidity",
  "Rainfall",
  "Pressure",
  "Frost Risk",
  "Drought",
  "Flooding",
  "Pest Control",
  "Disease Prevention",
];

export const METRICS = [
  {
    label: "Temperature",
    value: "27.3°C",
    status: "Optimal",
    icon: Thermometer,
    color: "text-orange-400",
  },
  {
    label: "Soil Moisture",
    value: "72.7%",
    status: "Good",
    icon: Sprout,
    color: "text-green-400",
  },
  {
    label: "Humidity",
    value: "82.4%",
    status: "High",
    icon: Droplets,
    color: "text-blue-400",
  },
  {
    label: "Pressure",
    value: "1010hPa",
    status: "Stable",
    icon: Gauge,
    color: "text-purple-400",
  },
];

export const weatherData: Weather[] = [
  {
    time: "time 1",
    temp: 25.639999389648438,
    humidity: 88.94000244140625,
    rainfall: 0,
    pressure: 1011.719970703125,
    soilMoisture: 86.69999694824219,
  },
  {
    time: "time 2",
    temp: 25.510000228881836,
    humidity: 89.44999694824219,
    rainfall: 0,
    pressure: 1011.8499755859375,
    soilMoisture: 86.0,
  },
  {
    time: "time 3",
    temp: 25.3700008392334,
    humidity: 89.76000213623047,
    rainfall: 0.28700000047683716,
    pressure: 1011.530029296875,
    soilMoisture: 88.7699966430664,
  },
  {
    time: "time 4",
    temp: 25.020000457763672,
    humidity: 90.3499984741211,
    rainfall: 0.05400000140070915,
    pressure: 1011.6699829101562,
    soilMoisture: 90.02999877929688,
  },
];

export const farmDetails: FarmDetails = {
  farmLocation: "Tagum City, PH",
  farmSize: "100 acres",
  yearsOfExperience: "10 years",
  crops: ["Rice", "Tomatoes"],
  irrigationSystem: "Surface Irrigation",
  farmingPriority: ["Soil Moisture", "Temperature", "Humidity", "Rainfall"],
};

export const devices: Device[] = [
  {
    name: "Field Sensor A1",
    deviceId: "FS-A1001-WB-2025",
    status: "offline",
  },
];

const rawData = [
  {
    day: "Day 1",
    temperature_c: 27.3,
    humidity_percent: 82.4,
    rain: 0.005,
    pressure_hpa: 1010.36,
    soil_moisture_percent: 72.71,
  },
  {
    day: "Day 2",
    temperature_c: 26.81,
    humidity_percent: 84.07,
    rain: 0.052,
    pressure_hpa: 1010.54,
    soil_moisture_percent: 69.04,
  },
  {
    day: "Day 3",
    temperature_c: 27.13,
    humidity_percent: 84.23,
    rain: 0.513,
    pressure_hpa: 1010.2,
    soil_moisture_percent: 65.78,
  },
  {
    day: "Day 4",
    temperature_c: 26.87,
    humidity_percent: 84.52,
    rain: 0.182,
    pressure_hpa: 1010.19,
    soil_moisture_percent: 57.51,
  },
];

export const weatherPrediction: Weather[] = rawData.map((d) => ({
  time: d.day,
  temp: d.temperature_c,
  humidity: d.humidity_percent,
  rainfall: d.rain,
  soilMoisture: d.soil_moisture_percent,
  pressure: d.pressure_hpa,
  timestamp: Date.now(),
}));
