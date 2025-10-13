"use client";

import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Logo from "../../components/Logo";
import InputField from "../../components/InputField";

import Divider from "../../components/Divider";
import AuthBackground from "../../components/AuthBackground";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/user/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        router.push('/user/dashboard');
      }
    } catch (error: unknown) {
      if (error instanceof Error && 'code' in error && error.code !== 'auth/popup-closed-by-user') {
        setError('Google sign-in failed. Please try again.');
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
            title="Create Account"
            description="Join KLIMA for smart weather insights"
          />

          {/* Form */}
          {error && (
            <div className="bg-red-600/10 border border-red-600/20 text-red-400 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              icon={User}
            />

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
              placeholder="Create a password"
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

            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              icon={Lock}
              required
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              }
            />

            <div className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-400 bg-gray-800 border-gray-700 rounded focus:ring-green-400 mt-1"
              />
              <span className="ml-2 text-sm text-gray-300">
                I agree to the{" "}
                <Link href="#" className="text-green-400 hover:text-green-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-green-400 hover:text-green-300">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <Divider />
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? 'Signing in...' : 'Continue with Google'}</span>
          </button>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-400 hover:text-green-300 font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Background */}
      <div className="hidden lg:flex lg:w-1/2">
        <AuthBackground>
          <div className="text-center text-white max-w-lg">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Join the Future of Farming
            </h2>
            <p className="text-lg lg:text-xl text-gray-200 mb-8">
              Transform your agricultural operations with AI-powered weather
              intelligence and precision farming insights.
            </p>

            {/* Features list */}
            <div className="space-y-4 text-left max-w-sm mx-auto">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Soil moisture monitoring</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Crop-specific forecasts</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Irrigation optimization</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-200">Yield predictions</span>
              </div>
            </div>
          </div>
        </AuthBackground>
      </div>
    </div>
  );
}
