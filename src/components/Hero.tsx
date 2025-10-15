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

    tl.fromTo(
      badgeRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        "-=0.4"
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      )
      .fromTo(
        buttonsRef.current,
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
          <div
            ref={badgeRef}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="bg-green-600/30 p-1 px-4 border-green-800 border-2 rounded-full flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-100 text-sm font-medium tracking-wide uppercase">
                LSTM Deep Learning + RAG + IoT Sensors
              </span>
            </div>
          </div>

          <h1
            ref={titleRef}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
          >
            AI-Powered Weather Intelligence
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 block">
              for Philippine Agriculture
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-sm lg:text-lg text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Revolutionary platform combining LSTM deep learning, RAG vector
            search, and IoT sensors to deliver 4-day hyperlocal weather
            predictions and intelligent farming recommendations.
          </p>
          <div
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Link href="/login">
              <button
                className="cursor-pointer flex items-center justify-center bg-green-600 text-white 
    px-6 py-3 md:px-8 md:py-4 
    rounded-full transition-all duration-300 
    font-medium text-base md:text-lg shadow-lg w-full sm:w-auto"
              >
                Start Predicting{" "}
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </button>
            </Link>

            <Link href="/signup">
              <button
                className="cursor-pointer border-2 border-white/30 text-white 
    px-6 py-3 md:px-8 md:py-4 
    rounded-full hover:border-white/50 transition-all duration-300 
    font-medium text-base md:text-lg backdrop-blur-sm hover:bg-white/10 
    w-full sm:w-auto"
              >
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
