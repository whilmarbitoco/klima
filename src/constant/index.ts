import { BarChart3, Bell, Home, icons, Settings, User } from "lucide-react";

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
  { name: "Notifications", href: "/user/notifications", icon: Bell },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "Settings", href: "/user/settings", icon: Settings },
];
