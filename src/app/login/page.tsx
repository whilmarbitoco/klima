"use client";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";
import Divider from "../../components/Divider";
import AuthBackground from "../../components/AuthBackground";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/user/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        setError(error.message);
      } else {
        console.error("An unknown error occurred.");
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push("/user/dashboard");
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code !== "auth/popup-closed-by-user") {
        setError("Google sign-in failed. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-sm">
          <Logo />

          <Header
            title="Welcome Back"
            description="Sign in to your KLIMA account"
          />

          {/* Form */}
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 text-red-400 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              icon={Mail}
              required
            />

            <InputField
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              icon={Lock}
              required
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-400 bg-gray-800 border-gray-700 rounded focus:ring-green-400"
                />
                <span className="ml-2 text-sm text-gray-300">Remember me</span>
              </div>
              <Link
                href="#"
                className="text-sm text-green-400 hover:text-green-300"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <Divider />
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? "Signing in..." : "Continue with Google"}</span>
          </button>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-400">
            Don&apos;t have an account?{" "}
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
              Welcome Back to KLIMA
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 mb-8">
              Continue your journey with AI-powered weather intelligence and
              precision farming insights.
            </p>

            {/* Features list */}
            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Real-time weather data</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Smart irrigation alerts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Crop health monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Predictive analytics</span>
              </div>
            </div>
          </div>
        </AuthBackground>
      </div>
    </div>
  );
}
