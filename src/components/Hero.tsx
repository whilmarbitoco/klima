"use client";

import Link from "next/link";
import Aurora from "./Aurora";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full min-h-screen relative overflow-hidden flex items-center">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#10b981", "#34d399", "#6ee7b7"]}
          amplitude={0.8}
          blend={0.6}
          speed={0.5}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Pulsing dot with text */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-green-600/30 p-1 px-3 border-green-800 border-2 rounded-full flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide uppercase">
                AI-Powered Weather Intelligence
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            The Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 block">
              Weather Prediction
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-gray-200 mb-10 max-w-4xl mx-auto leading-relaxed">
            Harness the power of AI and IoT for hyperlocal weather insights.
            Make informed decisions with real-time data and predictive
            analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="cursor-pointer bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors font-medium text-lg">
              <Link href="/login" className="flex items-center justify-center">
                Start Predicting <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </button>
            <button className="cursor-pointer border-2 border-white/30 text-white px-8 py-4 rounded-full hover:border-white/50 transition-colors font-medium text-lg backdrop-blur-sm">
              <Link href="/signup">Sign Up For Free</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
