"use client";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";
import InputField from "../../components/auth/InputField";
import GoogleButton from "../../components/auth/GoogleButton";
import Divider from "../../components/auth/Divider";
import AuthBackground from "../../components/auth/AuthBackground";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md">
          <Logo />

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={Mail}
            />

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-400 bg-gray-800 border-gray-700 rounded focus:ring-green-400"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm text-green-400 hover:text-green-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <Divider />
          <GoogleButton />

          {/* Footer */}
          <p className="mt-8 text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden lg:flex lg:w-1/2">
        <AuthBackground>
          <div className="text-center text-white max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Smart Farming Intelligence
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 mb-8">
              AI-powered weather insights designed specifically for modern farmers and agricultural operations.
            </p>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">99.2%</div>
                <div className="text-gray-300">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-gray-300">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">1000+</div>
                <div className="text-gray-300">Farms</div>
              </div>
            </div>
          </div>
        </AuthBackground>
      </div>
    </div>
  );
}
