import Link from 'next/link';
import { ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 font-sans text-center">
      <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 mb-6 shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-6 h-6 object-contain" />
      </div>

      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase tracking-wider mb-4">
        404 - Page Not Found
      </span>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-2">
        Looking for market intelligence?
      </h1>
      <p className="text-xs sm:text-sm text-zinc-400 max-w-md mb-8 leading-relaxed">
        The page you are looking for doesn&apos;t exist or has been moved. Return to the main portal or administrative dashboard.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="h-10 px-5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-800 text-xs font-medium transition-all flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>

        <Link
          href="/dashboard"
          className="h-10 px-5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-semibold transition-all flex items-center gap-2 shadow-sm"
        >
          <LayoutDashboard className="w-4 h-4" /> Open Dashboard
        </Link>
      </div>
    </div>
  );
}
