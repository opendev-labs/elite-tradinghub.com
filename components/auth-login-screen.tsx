"use client";

import React, { useState } from "react";
import { Command, Eye, EyeOff, Loader2 } from "lucide-react";

interface AuthLoginScreenProps {
  onLogin?: (email: string, pass: string) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
  title?: string;
  subtitle?: string;
  redirectUrl?: string;
  defaultEmail?: string;
  portalType?: "admin" | "client";
}

export function AuthLoginScreen({
  onLogin,
  onGoogleLogin,
  title = "Hello again",
  subtitle = "Login to continue",
  portalType = "client",
}: AuthLoginScreenProps) {
  const [email, setEmail] = useState(portalType === "admin" ? "admin@elite" : "");
  const [password, setPassword] = useState(portalType === "admin" ? "elite123123" : "");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please fill in both email and password.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      if (onLogin) {
        await onLogin(email, password);
      }
    } catch (err: any) {
      setError(err?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      if (onGoogleLogin) {
        await onGoogleLogin();
      }
    } catch (err: any) {
      setError(err?.message || "Google authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-white text-zinc-900 font-sans">
      {/* Left side - Dark branding panel */}
      <div className="hidden md:flex flex-col items-center justify-center bg-[#18181b] text-white p-12 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          {/* Bull Logo Image directly - no square box */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/only-bull-head-icon.png" 
            alt="Elite Trading Hub Bull Logo" 
            className="h-14 w-auto object-contain mb-8 filter drop-shadow-lg" 
          />

          <h1 className="text-4xl font-semibold tracking-tight text-white mb-3">
            {title}
          </h1>
          <p className="text-zinc-400 text-base font-normal">
            {subtitle}
          </p>

          {portalType === "admin" && (
            <div className="mt-8 px-4 py-2 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-300 font-mono">
              Admin Gateway Portal
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="absolute bottom-8 text-center text-xs text-zinc-500 font-medium">
          © {new Date().getFullYear()} Elite Trading Hub. All rights reserved.
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-white relative">
        <div className="w-full max-w-[360px] mx-auto space-y-6">
          {/* Top header */}
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-900">
              {portalType === "admin" ? "Admin Portal Sign In" : "Login"}
            </h2>
            <p className="text-xs text-zinc-500 leading-relaxed px-2">
              {portalType === "admin" 
                ? "Enter your administrator credentials to access the control center." 
                : "Welcome back. Enter your credentials or sign in with Google."}
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                {portalType === "admin" ? "Username" : "Email Address"}
              </label>
              <input
                type={portalType === "admin" ? "text" : "email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={portalType === "admin" ? "admin@elite" : "you@example.com"}
                required
                className="w-full h-10 px-3.5 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-10 pl-3.5 pr-10 text-xs bg-white border border-zinc-200 rounded-lg text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-900 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 accent-zinc-900"
                />
                <span className="text-xs text-zinc-600 font-medium">
                  Remember me for 30 days
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs rounded-lg transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Login
            </button>
          </form>

          {/* Social login for Clients ONLY */}
          {portalType === "client" && (
            <>
              <div className="relative flex items-center justify-center my-4">
                <div className="border-t border-zinc-200 w-full" />
                <span className="bg-white px-2 text-[11px] text-zinc-400 font-medium uppercase tracking-wider absolute">
                  or
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleClick}
                disabled={loading}
                className="w-full h-11 min-h-[44px] bg-white hover:bg-zinc-50 active:bg-zinc-100 border border-zinc-200 text-zinc-800 font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-2.5 touch-manipulation cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-600" />
                ) : (
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                )}
                <span>{loading ? "Connecting to Google..." : "Continue with Google"}</span>
              </button>
            </>
          )}

          {/* Footer link */}
          <div className="text-center pt-2">
            {portalType === "admin" ? (
              <p className="text-xs text-zinc-500">
                Are you a client?{" "}
                <a href="/login" className="text-zinc-900 font-semibold hover:underline">
                  Login as Client
                </a>
              </p>
            ) : (
              <p className="text-xs text-zinc-500">
                Are you an administrator?{" "}
                <a href="/admin" className="text-zinc-900 font-semibold hover:underline">
                  Login for admin portal
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
