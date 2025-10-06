import { LocateIcon, MapPin } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-gray-400 mt-1.5">{description}</p>
      </div>

      {children}
    </div>
  );
};

export default Header;
