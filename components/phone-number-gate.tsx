"use client";

import React, { useState } from "react";
import { Phone, ShieldCheck, ArrowRight, Lock, CheckCircle2, AlertCircle, LogOut, Sparkles, User } from "lucide-react";

interface PhoneNumberGateProps {
  user: {
    name?: string;
    email?: string | null;
    image?: string | null;
    uid: string;
  };
  onSavePhone: (phone: string) => Promise<void>;
  onSignOut: () => void;
}

export function PhoneNumberGate({ user, onSavePhone, onSignOut }: PhoneNumberGateProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    // Keep only numbers and max 10 digits
    const raw = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(raw);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const clean = phoneNumber.replace(/\D/g, "");

    if (clean.length === 0) {
      setError("Please enter your mobile number");
      return;
    }

    if (clean.length < 10) {
      setError(`Please enter a complete 10-digit mobile number (${clean.length}/10 entered)`);
      return;
    }

    if (!/^[6-9]\d{9}$/.test(clean)) {
      setError("Please enter a valid Indian 10-digit mobile number starting with 6, 7, 8, or 9");
      return;
    }

    setLoading(true);
    try {
      const formatted = `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
      await onSavePhone(formatted);
    } catch (err: any) {
      setError(err?.message || "Failed to save phone number. Please try again.");
      setLoading(false);
    }
  };

  const digitsCount = phoneNumber.replace(/\D/g, "").length;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="relative w-full max-w-md bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Brand & Progress Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/only-bull-head-icon.png"
              alt="Elite Trading Hub"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xs font-bold tracking-wider text-zinc-300 uppercase">
              Elite Trading Hub
            </span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Profile Setup 2/2
          </span>
        </div>

        {/* User identification info */}
        <div className="p-3 rounded-xl bg-zinc-950/70 border border-zinc-800/80 flex items-center gap-3">
          {user.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full border border-emerald-500/30 object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm shrink-0">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-bold text-zinc-100 truncate">{user.name || "Trader"}</p>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </div>
            <p className="text-[11px] text-zinc-400 font-mono truncate">{user.email || "Google Account Verified"}</p>
          </div>
        </div>

        {/* Header Title */}
        <div className="space-y-1.5">
          <h1 className="text-xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
            <Phone className="w-5 h-5 text-emerald-400" /> Enter Your Mobile Number
          </h1>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Please register your phone number to unlock your real-time decision-grade trading dashboard. No verification code required.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                Mobile Number
              </label>
              <span className={`text-[10px] font-mono ${digitsCount === 10 ? "text-emerald-400 font-bold" : "text-zinc-500"}`}>
                {digitsCount}/10 digits
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Country code prefix */}
              <div className="h-11 px-3 bg-zinc-950 border border-zinc-800 rounded-xl flex items-center gap-1.5 text-xs font-mono font-semibold text-zinc-300 shrink-0 select-none">
                <span>🇮🇳</span>
                <span>+91</span>
              </div>

              {/* Number Input */}
              <div className="relative flex-1">
                <input
                  type="tel"
                  autoFocus
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  placeholder="98765 43210"
                  disabled={loading}
                  className="w-full h-11 px-3.5 bg-zinc-950 border border-zinc-800 rounded-xl text-sm font-mono text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/40 transition-all disabled:opacity-50 tracking-wider"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Benefits summary */}
          <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 space-y-2 text-[11px] text-zinc-400">
            <div className="flex items-center gap-2 text-zinc-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Real-time NIFTY, BANKNIFTY & SENSEX trade signals</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Direct PMS portfolio allocations & risk advisory</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Zero-spam guarantee • Securely stored in Firebase</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || digitsCount < 10}
            className="w-full h-11 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:cursor-not-allowed text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-[0.99] cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                Saving to Dashboard…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Save & Open Dashboard <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Footer / Switch Account */}
        <div className="pt-2 border-t border-zinc-800/60 text-center">
          <button
            type="button"
            onClick={onSignOut}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors inline-flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Not you? Sign out & switch account</span>
          </button>
        </div>

      </div>
    </div>
  );
}
