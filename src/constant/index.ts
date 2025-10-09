import { FarmDetails, Weather } from "@/types";
import {
  BarChart3,
  Bell,
  Home,
  icons,
  MessageCircleIcon,
  Settings,
  User,
} from "lucide-react";

export const FEATURES = [
  {
    icons: icons.Brain,
    title: "AI-Powered Prediction",
    description:
      "Advanced machine learning algorithms deliver highly accurate weather forecasts.",
  },
  {
    icons: icons.Cpu,
    title: "IoT Integration",
    description:
      "Real-time data collection from connected weather sensors and devices.",
  },
  {
    icons: icons.CloudRain,
    title: "Microclimate Analysis",
    description:
      "Hyperlocal weather insights for precise location-based forecasting.",
  },
];

export const NAVIGATION = [
  { name: "Dashboard", href: "/user/dashboard", icon: Home },
  { name: "Analytics", href: "/user/analytics", icon: BarChart3 },
  { name: "Message", href: "/user/message", icon: MessageCircleIcon },
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
  farmingConcerns: ["Soil Moisture", "Temperature", "Humidity", "Rainfall"],
};
