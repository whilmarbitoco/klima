import {
  Cloud,
  Brain,
  Cpu,
  MessageSquare,
  BarChart3,
  ArrowRight,
  CloudRain,
  Eye,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 font-[var(--font-poppins)]">
      {/* Unique Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -left-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-64 h-64 bg-teal-200/25 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="w-full">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-2">
              <Cloud className="w-8 h-8 text-green-600" />
              <span className="text-2xl font-bold text-gray-800">KLIMA</span>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors font-medium">
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="w-full py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-800 mb-8 leading-tight">
                Smart Weather
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600 block lg:inline">
                  {" "}
                  Intelligence
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                Knowledge-base Local Intelligence for Microweather Analysis.
                AI-powered predictions with IoT integration for accurate,
                real-time forecasts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-green-600 text-white px-18 py-4 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center font-medium text-lg">
                  Start Predicting <ArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full hover:border-gray-400 transition-colors font-medium text-lg">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                Key Features
              </h2>
              <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mx-auto">
                Advanced technology for precise weather intelligence
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Brain className="w-12 h-12 text-green-500 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  AI-Powered Prediction
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced machine learning algorithms deliver highly accurate
                  weather forecasts.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Cpu className="w-12 h-12 text-green-500 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  IoT Integration
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Real-time data collection from connected weather sensors and
                  devices.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <BarChart3 className="w-12 h-12 text-green-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  AI Recommendations
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Intelligent suggestions based on weather patterns and user
                  preferences.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <MessageSquare className="w-12 h-12 text-green-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Voice Interaction
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Text-to-speech conversation with AI for hands-free weather
                  updates.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <Eye className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Interactive Visualization
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Beautiful, intuitive interface for weather data visualization
                  and analysis.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CloudRain className="w-12 h-12 text-green-400 mb-6" />
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Microweather Analysis
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Hyperlocal weather insights for precise location-based
                  forecasting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-16">
              <div className="grid sm:grid-cols-3 gap-8 lg:gap-12 text-center">
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-3">
                    99.2%
                  </div>
                  <div className="text-gray-600 text-lg">
                    Prediction Accuracy
                  </div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-green-500 mb-3">
                    24/7
                  </div>
                  <div className="text-gray-600 text-lg">
                    Real-time Monitoring
                  </div>
                </div>
                <div>
                  <div className="text-4xl lg:text-5xl font-bold text-green-400 mb-3">
                    1000+
                  </div>
                  <div className="text-gray-600 text-lg">
                    IoT Sensors Connected
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-8 lg:p-16 text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Experience Smart Weather?
              </h2>
              <p className="text-lg lg:text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Join thousands of users making informed decisions with KLIMA
              </p>
              <button className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg">
                Start Your Free Trial
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center text-gray-600">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Cloud className="w-6 h-6 text-green-600" />
              <span className="text-xl font-bold text-gray-800">KLIMA</span>
            </div>
            <p>
              &copy; 2024 KLIMA. All rights reserved. Powered by advanced AI and
              IoT technology.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
