'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-zinc-950 text-zinc-100 min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
          <h2 className="text-xl font-bold text-zinc-100">Application Error</h2>
          <p className="text-xs text-zinc-400">An error occurred while loading the application.</p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-emerald-500 text-zinc-950 font-semibold text-xs rounded-lg cursor-pointer"
            >
              Retry
            </button>
            <a href="/" className="px-4 py-2 bg-zinc-800 text-zinc-200 font-semibold text-xs rounded-lg border border-zinc-700">
              Home
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
