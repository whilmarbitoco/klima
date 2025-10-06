import { FEATURES } from "@/constant";
import Feature from "./Feature";

const Features = () => {
  return (
    <section className="w-full py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Key Features
          </h2>
          <p className="text-gray-300 text-lg lg:text-xl max-w-2xl mx-auto">
            Advanced technology for precise weather intelligence
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {FEATURES.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icons}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
