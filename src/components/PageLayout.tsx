"use client";

import Header from "./Header";

interface PageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function PageLayout({
  title,
  description,
  children,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm top-0 z-10">
        <div className="p-4 sm:p-6">
          <Header title={title} description={description} />
        </div>
      </div>
      <div className="p-4 md:p-6 space-y-6">{children}</div>
    </div>
  );
}
