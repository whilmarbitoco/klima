"use client";

import { Brain, Database, Cpu, Zap, ArrowRight } from "lucide-react";

const AIArchitecture = () => {
  const architectureSteps = [
    {
      icon: Cpu,
      title: "IoT Data Collection",
      description:
        "NodeMCU ESP8266 sensors collect real-time environmental data",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      icon: Brain,
      title: "LSTM Processing",
      description: "Deep learning model trained on Philippine weather patterns",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      icon: Database,
      title: "Vector Storage",
      description: "Pinecone database stores weather embeddings for RAG",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      icon: Zap,
      title: "AI Recommendations",
      description: "Gemini AI generates contextual farming insights",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
            AI-Powered Architecture
          </h2>
          <p className="text-gray-300 text-sm lg:text-xl max-w-3xl mx-auto">
            See how KLIMA combines LSTM neural networks, RAG vector search, and
            real-time IoT data to deliver unprecedented weather intelligence
          </p>
        </div>

        {/* Architecture Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {architectureSteps.map((step, index) => (
            <div key={index} className="relative">
              <div
                className={`${step.bgColor} ${step.borderColor} border-2 rounded-xl p-6 text-center h-full`}
              >
                <div className={`${step.color} mb-4 flex justify-center`}>
                  <step.icon className="w-12 h-12" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm">{step.description}</p>
              </div>

              {/* Arrow connector */}
              {index < architectureSteps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800/80 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Brain className="w-6 h-6 text-green-400 mr-3" />
              Deep Learning Pipeline
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  LSTM networks trained on comprehensive Philippine weather
                  datasets
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>4-day weather forecasting with 94.2% accuracy</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Real-time model updates from IoT sensor data</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>Pattern recognition for seasonal weather trends</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800/80 rounded-xl p-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Database className="w-6 h-6 text-purple-400 mr-3" />
              RAG Intelligence System
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Pinecone vector database for semantic weather search
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Google Generative AI embeddings for context understanding
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Retrieval-augmented generation for personalized
                  recommendations
                </span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span>
                  Contextual farming insights based on similar weather patterns
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIArchitecture;
