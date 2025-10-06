import Aurora from "./Aurora";

interface AuthBackgroundProps {
  children: React.ReactNode;
}

export default function AuthBackground({ children }: AuthBackgroundProps) {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0">
        <Aurora
          colorStops={["#10b981", "#34d399", "#6ee7b7"]}
          amplitude={0.6}
          blend={0.4}
          speed={0.3}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
}
