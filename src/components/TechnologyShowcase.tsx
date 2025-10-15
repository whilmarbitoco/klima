"use client";

import {
  MessageSquare,
  Mic,
  Volume2,
  Wifi,
  Thermometer,
  Droplets,
} from "lucide-react";

const TechnologyShowcase = () => {
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6">
            Next-Generation Farming Technology
          </h2>
          <p className="text-gray-300 text-sm lg:text-xl max-w-3xl mx-auto">
            Experience the future of agriculture with conversational AI and
            intelligent IoT sensors
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conversational AI Section */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-2xl p-8 border border-green-500/30">
              <div className="flex items-center mb-6">
                <MessageSquare className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-2xl font-bold text-white">
                  Conversational AI Interface
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-800/60 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Mic className="w-5 h-5 text-blue-400 mr-2" />
                    <span className="text-blue-400 font-medium">You:</span>
                  </div>
                  <p className="text-gray-200">
                    "Should I water my rice crops today?"
                  </p>
                </div>

                <div className="bg-green-600/20 rounded-lg p-4 border border-green-500/30">
                  <div className="flex items-center mb-2">
                    <Volume2 className="w-5 h-5 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium">
                      KLIMA AI:
                    </span>
                  </div>
                  <p className="text-gray-200">
                    "Based on the LSTM forecast, humidity will drop to 65%
                    tomorrow with no rainfall expected. I recommend irrigating
                    your rice fields this evening to maintain optimal soil
                    moisture levels."
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    Natural
                  </div>
                  <div className="text-gray-300 text-sm">Voice & Text</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    Contextual
                  </div>
                  <div className="text-gray-300 text-sm">Farm-Specific</div>
                </div>
              </div>
            </div>
          </div>

          {/* IoT Sensors Section */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-purple-600/20 to-orange-600/20 rounded-2xl p-8 border border-purple-500/30">
              <div className="flex items-center mb-6">
                <Wifi className="w-8 h-8 text-purple-400 mr-4" />
                <h3 className="text-2xl font-bold text-white">
                  Smart IoT Sensor Network
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/60 rounded-lg p-4 text-center">
                  <Thermometer className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">27.3°C</div>
                  <div className="text-gray-300 text-sm">Temperature</div>
                </div>

                <div className="bg-gray-800/60 rounded-lg p-4 text-center">
                  <Droplets className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white">72.7%</div>
                  <div className="text-gray-300 text-sm">Soil Moisture</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">NodeMCU ESP8266</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                    <span className="text-green-400 text-sm">Online</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Data Transmission</span>
                  <span className="text-blue-400 text-sm">Real-time</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Device Status</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">
                    5 Sensors
                  </div>
                  <div className="text-gray-300 text-sm">Per Device</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400 mb-1">
                    24/7
                  </div>
                  <div className="text-gray-300 text-sm">Monitoring</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="hidden lg:block mt-16 bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Technical Specifications
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-green-400 mb-3">
                AI Models
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Google Gemini API</li>
                <li>LSTM Neural Networks</li>
                <li>TensorFlow/Keras</li>
                <li>LangChain Framework</li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-blue-400 mb-3">
                IoT Hardware
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>NodeMCU ESP8266</li>
                <li>DHT22 Sensor</li>
                <li>BMP280 Pressure</li>
                <li>Soil Moisture Probe</li>
              </ul>
            </div>

            <div className="text-center">
              <h4 className="text-lg font-semibold text-purple-400 mb-3">
                Data Infrastructure
              </h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>Pinecone Vector DB</li>
                <li>Firebase Realtime</li>
                <li>Google Embeddings</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
