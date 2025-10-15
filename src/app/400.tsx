"use client";

import Link from "next/link";

export default function BadRequestPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 text-gray-800">
      <h1 className="text-6xl font-bold mb-4">400</h1>
      <p className="text-xl mb-8">
        Bad Request — Something went wrong with your request.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </main>
  );
}
