"use client";

import Link from "next/link";
import Aurora from "./Aurora";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(badgeRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(titleRef.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, 
      "-=0.4"
    )
    .fromTo(subtitleRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.6"
    )
    .fromTo(buttonsRef.current, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, 
      "-=0.4"
    );
  }, []);

  return (
    <section className="w-full h-screen relative overflow-hidden flex items-center">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#10b981", "#34d399", "#6ee7b7"]}
          amplitude={0.8}
          blend={0.6}
          speed={1}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div ref={badgeRef} className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-green-600/30 p-1 px-3 border-green-800 border-2 rounded-full flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide uppercase">
                AI-Powered Microweather Intelligence
              </span>
            </div>
          </div>

          <h1 ref={titleRef} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Smart Weather Intelligence
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 block">
              for Modern Farmers
            </span>
          </h1>
          <p ref={subtitleRef} className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered microweather monitoring with IoT sensors. Get hyperlocal forecasts, 
            smart irrigation alerts, and crop optimization insights.
          </p>
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <button className="cursor-pointer flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors font-medium text-lg">
                Start Predicting <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
            <Link href="/signup">
              <button className="cursor-pointer border-2 border-white/30 text-white px-8 py-4 rounded-full hover:border-white/50 transition-colors font-medium text-lg backdrop-blur-sm">
                Sign Up For Free
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
