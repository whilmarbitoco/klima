import { Shield, Zap, Target, Users } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Target,
      title: "Hyperlocal Accuracy",
      description: "Get weather data specific to your exact location, not the nearest city 50km away."
    },
    {
      icon: Zap,
      title: "Real-time Insights",
      description: "Instant alerts and recommendations powered by AI to optimize your farming decisions."
    },
    {
      icon: Shield,
      title: "Enterprise Reliability",
      description: "99.9% uptime with redundant systems ensuring your data is always available."
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated agricultural specialists to help you maximize your yield and profits."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Farmers Choose KLIMA
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join thousands of farmers who've increased their yield by 25% using our AI-powered weather intelligence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600/30 transition-colors">
                  <Icon className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{reason.title}</h3>
                <p className="text-gray-400 leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600/10 to-blue-600/10 rounded-2xl p-8 border border-green-600/20">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Farm?</h3>
            <p className="text-gray-300 mb-6">Start your free trial today and see the difference precision weather data makes</p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition-colors font-medium">
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}