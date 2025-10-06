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
