'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
            <button
              onClick={() => reset()}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}