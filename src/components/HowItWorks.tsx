import { Wifi, Brain, Bell, TrendingUp, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Wifi,
      title: "Deploy Sensors",
      description:
        "Install our weather-resistant IoT sensors across your farm for comprehensive coverage.",
    },
    {
      icon: Sparkles,
      title: "AI Analysis",
      description:
        "Our machine learning algorithms process real-time data to predict weather patterns.",
    },
    {
      icon: Brain,
      title: "Smart AI Recommendations",
      description:
        "Receive actionable insights to protect your crops and optimize resources.",
    },
    {
      icon: TrendingUp,
      title: "Optimize Yield",
      description:
        "Make data-driven decisions to increase productivity and reduce crop losses.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How KLIMA Works
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            From installation to optimization - see how our platform transforms
            your farming operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-600/50 to-transparent transform translate-x-4"></div>
                )}

                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
