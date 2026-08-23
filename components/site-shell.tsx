'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Send, LayoutDashboard, ShieldCheck, Activity, ChevronDown, User, LogOut, Sun, Moon } from 'lucide-react';
import { MarketStrip } from './trading-dashboard';
import { useTheme } from './theme-context';
import { getStoredUser, subscribeFirebaseUser, trackPageView, logoutFirebase, signInWithGoogleFirebase, UserSessionData } from '@/lib/firebase';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Platform' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const [fbUser, setFbUser] = useState<UserSessionData | null>(null);
  const [showGooglePrompt, setShowGooglePrompt] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    setFbUser(getStoredUser());
    trackPageView(window.location.pathname);
    const unsubscribe = subscribeFirebaseUser((u) => setFbUser(u));
    return () => unsubscribe();
  }, []);

  const handleGoogleSignInPrompt = async () => {
    setIsConnecting(true);
    try {
      const res = await signInWithGoogleFirebase();
      if (res?.user) {
        setFbUser(res.user);
        setShowGooglePrompt(false);
      }
    } catch (e) {
      console.error('Google One-Tap Error:', e);
    } finally {
      setIsConnecting(false);
    }
  };

  const isLoggedIn = !!session || !!fbUser;
  const activeName = session?.user?.name || fbUser?.name || 'Trader';
  const activeImage = session?.user?.image || fbUser?.image;
  const firstName = activeName.split(' ')[0];
  const initials = firstName.slice(0, 2).toUpperCase();

  return (
    <>
      <MarketStrip />

      <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo - Bull head logo with no square box */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/only-bull-head-icon.png" 
              alt="Elite Trading Hub" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-zinc-100 group-hover:text-white transition-colors">
                ELITE TRADING HUB
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">
                Market Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 p-1 rounded-full backdrop-blur-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-1.5 rounded-full text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://t.me/+la1ShIiNHJ5mYzk1"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3.5 rounded-lg text-xs font-semibold bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/30 text-[#0088cc] transition-all flex items-center gap-2 shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#0088cc]" />
              <span>Telegram</span>
            </a>

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="h-9 px-4 rounded-lg text-xs font-bold bg-white text-zinc-950 hover:bg-zinc-100 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <span>Login</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="h-9 px-3.5 rounded-full text-xs font-semibold bg-zinc-900 border border-zinc-700/80 text-zinc-100 hover:border-emerald-500/60 hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-md cursor-pointer outline-none focus:outline-none group">
                  {activeImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={activeImage} alt={activeName} className="w-5 h-5 rounded-full object-cover border border-emerald-500/50 shrink-0" />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px] flex items-center justify-center border border-emerald-500/40 shrink-0">
                      {initials}
                    </div>
                  )}
                  <span className="font-semibold text-zinc-100">{activeName}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-transform duration-200" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56 bg-zinc-900/95 border-zinc-800 backdrop-blur-xl text-zinc-100 rounded-xl p-2 shadow-2xl z-[100]">
                  {/* User Profile Header */}
                  <div className="flex items-center gap-3 p-2.5 mb-1.5 border-b border-zinc-800/80 bg-zinc-950/50 rounded-lg">
                    {activeImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={activeImage} alt={activeName} className="w-9 h-9 rounded-full object-cover border border-emerald-500/50 shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm flex items-center justify-center border border-emerald-500/40 shrink-0">
                        {initials}
                      </div>
                    )}
                    <div className="overflow-hidden flex-1">
                      <p className="text-xs font-bold text-zinc-100 truncate">{activeName}</p>
                      <p className="text-[10px] text-zinc-400 truncate font-mono">{session?.user?.email || fbUser?.email || "Client"}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <DropdownMenuItem className="p-0">
                      <Link href="/login" className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white hover:bg-zinc-800/80 transition-all cursor-pointer font-bold">
                        <LayoutDashboard className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-bold text-white">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    {/* Light Mode / Dark Mode Theme Switch */}
                    <DropdownMenuItem
                      onClick={toggleTheme}
                      className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-200 hover:bg-zinc-800/80 transition-all cursor-pointer font-semibold"
                    >
                      <div className="flex items-center gap-2.5">
                        {theme === "dark" ? (
                          <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                        ) : (
                          <Moon className="w-4 h-4 text-indigo-400 shrink-0" />
                        )}
                        <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {theme === "dark" ? "Light" : "Dark"}
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                    <DropdownMenuItem
                      onClick={async () => {
                        await logoutFirebase();
                        window.location.href = '/login';
                      }}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-all cursor-pointer font-bold"
                    >
                      <LogOut className="w-4 h-4 text-red-400 shrink-0" />
                      <span className="font-bold">Sign Out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-zinc-800 bg-zinc-950/95 backdrop-blur-lg px-4 py-4 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-3 py-2 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex flex-col gap-2.5">
                {isLoggedIn && (
                  <div className="p-3 bg-zinc-900/90 border border-zinc-800 rounded-xl flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 min-w-0">
                      {activeImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={activeImage} alt={activeName} className="w-8 h-8 rounded-full object-cover border border-emerald-500/50 shrink-0" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40 shrink-0">
                          {initials}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-zinc-100 truncate">{activeName}</span>
                        <span className="text-[10px] font-mono text-zinc-400 truncate">{session?.user?.email || fbUser?.email || "Verified Trader"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3 Buttons stacked cleanly one directly below another */}
                <a
                  href="https://t.me/+la1ShIiNHJ5mYzk1"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full h-11 px-4 rounded-xl text-xs font-bold bg-[#0088cc] hover:bg-[#0077b5] text-white flex items-center justify-center gap-2.5 shadow-md transition-all shrink-0"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span className="text-white font-bold">Join Telegram Community</span>
                </a>

                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="w-full h-11 px-4 rounded-xl text-xs font-bold bg-zinc-900 border border-zinc-700/80 text-white hover:bg-zinc-800 flex items-center justify-center gap-2.5 shadow-md transition-all shrink-0"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-bold tracking-wide">Dashboard</span>
                </Link>

                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="w-full h-11 px-4 rounded-xl text-xs font-bold bg-white text-zinc-950 hover:bg-zinc-100 flex items-center justify-center gap-2.5 shadow-md transition-all shrink-0"
                  >
                    <span className="text-zinc-950 font-bold">Login</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-950" />
                  </Link>
                ) : (
                  <button
                    onClick={async () => {
                      setOpen(false);
                      await logoutFirebase();
                      window.location.href = '/login';
                    }}
                    className="w-full h-11 px-4 rounded-xl text-xs font-bold bg-red-500/15 hover:bg-red-500/25 border border-red-500/40 text-red-400 flex items-center justify-center gap-2.5 shadow-sm transition-all cursor-pointer shrink-0"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span className="text-red-400 font-bold">Sign Out</span>
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Auto-detect Google Account Card when user is NOT logged in */}
      <AnimatePresence>
        {!isLoggedIn && showGooglePrompt && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 z-[9999] w-84 p-4.5 rounded-2xl bg-zinc-900/95 border border-zinc-700/80 backdrop-blur-xl shadow-2xl text-zinc-100 flex flex-col gap-3.5"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-100">Google Account Detected</h4>
                  <p className="text-[10px] text-zinc-400 font-mono">Connected browser account</p>
                </div>
              </div>
              <button
                onClick={() => setShowGooglePrompt(false)}
                className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Dismiss Google prompt card"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Profile Picture & Account Box */}
            <div className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-xl flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/40 shrink-0">
                <User className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold text-zinc-100 truncate">Google Account Detected</span>
                <span className="text-[10px] text-zinc-400 truncate font-mono">1-Click Fast OAuth Sign-In</span>
              </div>
            </div>

            <button
              onClick={handleGoogleSignInPrompt}
              disabled={isConnecting}
              className="w-full h-9.5 rounded-xl text-xs font-semibold bg-white text-zinc-950 hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{isConnecting ? "Connecting Google Account..." : "Continue with Google"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/80 pt-16 pb-12 text-zinc-400 text-xs font-sans">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/only-bull-head-icon.png" alt="Elite Trading Hub" className="h-8 w-auto object-contain" />
              <span className="text-sm font-semibold tracking-tight text-zinc-100">
                ELITE TRADING HUB
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Decision-grade quantitative market intelligence, options flow analytics, and algorithmic execution setups for Indian market participants.
            </p>
            <div className="space-y-1.5 pt-1">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                <ShieldCheck className="w-3 h-3" /> SEBI Registered Standards Compliant
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-3 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-3.5">
                PLATFORM
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/features" className="hover:text-zinc-100 transition-colors">NIFTY Setups</Link></li>
                <li><Link href="/features" className="hover:text-zinc-100 transition-colors">Risk Calculator</Link></li>
                <li><Link href="/features" className="hover:text-zinc-100 transition-colors">Options Chain</Link></li>
                <li><Link href="/methodology" className="hover:text-zinc-100 transition-colors">Institutional Methodology</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-3.5">
                COMPANY
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="hover:text-zinc-100 transition-colors">About Elite Hub</Link></li>
                <li><Link href="/contact" className="hover:text-zinc-100 transition-colors">Contact Support</Link></li>
                <li>
                  <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-100 transition-colors flex items-center gap-1">
                    Telegram Channel <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-zinc-300 mb-3.5">
                LEGAL & COMPLIANCE
              </h4>
              <ul className="space-y-2.5">
                <li><Link href="/privacy" className="hover:text-zinc-100 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-zinc-100 transition-colors">Terms of Service</Link></li>
                <li><Link href="/disclaimer" className="hover:text-zinc-100 transition-colors">Risk Disclaimer</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} Elite Trading Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Market Feed Active
            </span>
            <span>Made for Professional Indian Market Traders</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { PageEntrance } from './page-motion';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <SiteHeader />
      <main className="flex-1">
        <PageEntrance>{children}</PageEntrance>
      </main>
      <SiteFooter />
    </div>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <SiteHeader />
      <PageEntrance className="flex-1">{children}</PageEntrance>
      <SiteFooter />
    </div>
  );
}

export function PageHero({ kicker, title, desc }: { kicker: string; title: React.ReactNode; desc: string }) {
  return (
    <section className="w-full py-16 md:py-24 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 to-zinc-950 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-3.5 h-3.5 object-contain" />
          {kicker}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-100">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-10 text-center max-w-2xl mx-auto space-y-2">
      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full inline-block">
        {kicker}
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
        {title}
      </h2>
      {desc && <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{desc}</p>}
    </div>
  );
}

export function LegalPage({ eyebrow = "LEGAL & COMPLIANCE", title, children }: { eyebrow?: string; title: string; children: React.ReactNode }) {
  return (
    <PageFrame>
      <main className="py-12 px-4 max-w-4xl mx-auto">
        <PageHero kicker={eyebrow} title={title} desc="Elite Trading Hub platform policies and guidelines." />
        <div className="mt-10 p-6 sm:p-10 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl text-zinc-300 text-sm leading-relaxed space-y-6">
          {children}
        </div>
      </main>
    </PageFrame>
  );
}
