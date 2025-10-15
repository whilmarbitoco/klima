"use client";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import ProductShowcase from "@/components/ProductShowcase";
import AIArchitecture from "@/components/AIArchitecture";
import TechnologyShowcase from "@/components/TechnologyShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 font-[var(--font-poppins)] overflow-x-hidden">
      <div className="relative z-10 w-full">
        <Nav />
        <Hero />
        <Features />
        <AIArchitecture />
        <TechnologyShowcase />
        <ProductShowcase />
        <Footer />
      </div>
    </div>
  );
}
