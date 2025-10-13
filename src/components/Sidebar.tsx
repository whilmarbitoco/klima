"use client";
import { NAVIGATION } from "@/constant";
import { Cloud, User, LogOut, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "./Logo";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import { logOut } from "@/lib/firebase";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, loading] = useCurrentUser();

  const logout = async () => {
    await logOut();
    router.push("/login");
  };

  return (
    <div className="w-full h-full bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 md:p-6 border-b border-gray-700 flex items-center justify-between">
        <Logo />
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {NAVIGATION.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        {currentUser != null && (
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              {currentUser.photoURL ? (
                <Image
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || "User avatar"}
                  width={20}
                  height={20}
                  className="rounded-full w-full h-full"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white truncate">
                {currentUser.displayName}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {currentUser.email}
              </p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="cursor-pointer flex items-center space-x-2 text-gray-400 hover:text-white text-sm w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
}
