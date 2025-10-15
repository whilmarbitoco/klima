"use client";

import { Thermometer, Wifi, Battery, Ruler } from "lucide-react";
import Image from "next/image";

export default function ProductShowcase() {
  const product = {
    name: "KLIMA Weather Analyzer",
    model: "KL-2025",
    description:
      "The KLIMA Weather Analyzer KL-2025 delivers real-time environmental data to empower precision agriculture. Built for accuracy and endurance, it provides deep insights into temperature, humidity, and atmospheric conditions across your farm.",
    image: "/product.png",
    features: [
      "Accurate environmental sensors",
      "Real-time cloud Syncing",
      "Wide 5km LoRaWAN connectivity range",
      "Durable, weatherproof enclosure for harsh climates",
    ],
    specs: [
      {
        icon: Thermometer,
        label: "Sensors",
        value: "Temperature, Humidity, Pressure, Wind",
      },
      { icon: Ruler, label: "Range", value: "Up to 5km coverage" },
      { icon: Battery, label: "Power", value: "Solar + Backup Battery" },
      { icon: Wifi, label: "Connectivity", value: "LoRaWAN" },
    ],
  };

  return (
    <section className="bg-gray-900 text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
        {/* Left Section — Info */}
        <div>
          <p className="text-green-400 font-semibold tracking-wide mb-3">
            Professional IoT Hardware
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {product.name}{" "}
            <span className="text-green-500">{product.model}</span>
          </h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Feature list */}
          <ul className="space-y-3 mb-10">
            {product.features.map((feature, i) => (
              <li key={i} className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-2.5 h-2.5 mt-2 bg-green-500 rounded-full" />
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section — Image */}
        <div className="relative flex justify-center items-center">
          <div className="absolute -inset-4 bg-green-500/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 rounded-2xl overflow-hiddenshadow-2xl">
            <Image
              src={product.image}
              alt={product.name}
              width={700}
              height={800}
              draggable={false}
              className="object-cover w-full h-full rotate-24 transform-3d"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
