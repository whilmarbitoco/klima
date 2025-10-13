"use client";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Nav from "@/components/Nav";
import HowItWorks from "@/components/HowItWorks";
import ProductShowcase from "@/components/ProductShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 font-[var(--font-poppins)]">
      <div className="relative z-10">
        <Nav />
        <Hero />
        <Features />
        <HowItWorks />
        <ProductShowcase />
        <Footer />
      </div>
    </div>
  );
}
