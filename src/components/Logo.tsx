import { Cloud } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Cloud className="w-8 h-8 text-green-400" />
        <span className="text-2xl font-bold text-white">KLIMA</span>
      </div>
    </Link>
  );
}
