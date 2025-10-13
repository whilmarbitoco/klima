export default function CustomError({ statusCode }: { statusCode?: number }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{statusCode || 500}</h1>
        <p className="text-gray-400">Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}
