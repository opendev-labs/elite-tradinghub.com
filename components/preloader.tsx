"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  loading?: boolean;
  onFadeComplete?: () => void;
}

export default function Preloader({ loading = true, onFadeComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (!loading) {
      setFadingOut(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onFadeComplete) onFadeComplete();
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setVisible(true);
      setFadingOut(false);
    }
  }, [loading, onFadeComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-[10000] flex flex-col items-center justify-center transition-opacity duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
        fadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ background: "#000000" }}
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-14 h-14 rounded-full border border-white/8 border-t-white/40 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="/only-bull-head-icon.png" alt="ETH" className="w-6 h-6 object-contain invert opacity-60" />
        </div>
      </div>

      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.5)",
        textTransform: "uppercase"
      }}>
        ELITE TRADING HUB
      </p>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "9px",
        fontWeight: 500,
        letterSpacing: "0.2em",
        color: "rgba(255,255,255,0.2)",
        textTransform: "uppercase",
        marginTop: "4px"
      }}>
        Loading Portal...
      </p>
    </div>
  );
}
