import { Cloud } from "lucide-react";

const Nav = () => {
  return (
    <nav className="w-full absolute top-0 left-0 z-20 bg-transparent">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-6">
        <div className="flex items-center space-x-2">
          <Cloud className="w-8 h-8 text-green-400" />
          <span className="text-2xl font-bold text-white">KLIMA</span>
        </div>
        <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-medium">
          Get Started
        </button>
      </div>
    </nav>
  );
};

export default Nav;
