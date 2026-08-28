'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X, Send, LayoutDashboard, ShieldCheck, Activity, ChevronDown, User, LogOut } from 'lucide-react';
import { MarketStrip } from './trading-dashboard';
import { getStoredUser, subscribeFirebaseUser, trackPageView, logoutFirebase, performFullLogout, signInWithGoogleFirebase, signInWithGoogleCredential, checkGoogleRedirectResult, UserSessionData } from '@/lib/firebase';
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
  { href: '/portfolio-management', label: 'Portfolio PMS' },
  { href: '/knowledge', label: 'Free Knowledge' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [fbUser, setFbUser] = useState<UserSessionData | null>(null);
  const [showGooglePrompt, setShowGooglePrompt] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // GIS-detected account info (populated when Google One Tap / FedCM detects account)
  const [detectedGoogleUser, setDetectedGoogleUser] = useState<{
    name: string;
    email: string;
    picture: string;
    idToken: string;
  } | null>(null);

  const [localSession, setLocalSession] = useState<{ name: string; email: string; href: string } | null>(null);

  // ── Firebase auth state & redirect handler ──
  useEffect(() => {
    setFbUser(getStoredUser());
    trackPageView(window.location.pathname);
    const unsubscribe = subscribeFirebaseUser((u) => setFbUser(u));

    try {
      const adminStr = localStorage.getItem("eth_admin_session");
      if (adminStr) {
        const a = JSON.parse(adminStr);
        if (a?.email || a?.username || a?.displayName) {
          setLocalSession({
            name: a.displayName || a.username || "Administrator",
            email: a.email || "admin@elitetradinghub.com",
            href: "/admin"
          });
        }
      } else {
        const clientStr = localStorage.getItem("eth_client_session");
        if (clientStr) {
          const c = JSON.parse(clientStr);
          if (c?.email) {
            setLocalSession({
              name: c.name || c.email.split("@")[0] || "Trader",
              email: c.email,
              href: "/login"
            });
          }
        }
      }
    } catch {}

    checkGoogleRedirectResult().then((userData) => {
      if (userData) {
        setFbUser(userData);
        setShowGooglePrompt(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // ── Google Identity Services One Tap (silent account detection) ──
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const GOOGLE_CLIENT_ID = '116492878256-6gd53qldcqeiagbr920jnmq7kh0uktk5.apps.googleusercontent.com';

    const initGIS = () => {
      if (!(window as any).google?.accounts?.id) return;

      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async (response: { credential: string }) => {
          if (!response?.credential) return;
          try {
            setIsConnecting(true);
            const res = await signInWithGoogleCredential(response.credential);
            if (res.user) {
              setFbUser(res.user);
              const u = { email: res.user.email, name: res.user.name || "Trader", plan: "PRO" };
              try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
              window.location.href = '/login';
            }
          } catch (e) {
            console.error('GIS One Tap sign-in error:', e);
          } finally {
            setIsConnecting(false);
          }
        },
        auto_select: false,
        itp_support: true,
        cancel_on_tap_outside: false,
        use_fedcm_for_prompt: false,
      });

      (window as any).google.accounts.id.prompt();
    };

    if ((window as any).google?.accounts?.id) {
      initGIS();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGIS;
      document.head.appendChild(script);
    }
  }, []);

  // ── Sign in handler ──
  const handleGoogleSignInPrompt = async () => {
    setIsConnecting(true);
    try {
      let userData = null;
      if (detectedGoogleUser?.idToken) {
        // Fast path: use GIS credential directly
        const res = await signInWithGoogleCredential(detectedGoogleUser.idToken);
        userData = res.user;
      } else {
        // Fallback: standard popup/redirect
        const res = await signInWithGoogleFirebase();
        userData = res?.user ?? null;
      }
      if (userData) {
        setFbUser(userData);
        setShowGooglePrompt(false);
        setDetectedGoogleUser(null);
        const u = { email: userData.email, name: userData.name || "Trader", plan: "PRO" };
        try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
        window.location.href = '/login';
      }
    } catch (e) {
      console.error('Google Sign-In Error:', e);
    } finally {
      setIsConnecting(false);
    }
  };

  const isLoggedIn = !!session || !!fbUser || !!localSession;
  const activeName = session?.user?.name || fbUser?.name || localSession?.name || '';
  const activeEmail = session?.user?.email || fbUser?.email || localSession?.email || '';
  const activeImage = session?.user?.image || fbUser?.image || '';
  const dashboardHref = localSession?.href || '/login';
  const firstName = activeName.split(' ')[0] || 'Trader';
  const initials = firstName.slice(0, 2).toUpperCase() || '?';

  // Card display data — prefer GIS-detected account
  const cardName = detectedGoogleUser?.name || 'Trader Account';
  const cardEmail = detectedGoogleUser?.email || 'Connected Google Account';
  const cardPicture = detectedGoogleUser?.picture || '';
  const cardFirstName = cardName.split(' ')[0];
  const cardInitials = cardFirstName.slice(0, 2).toUpperCase();

  return (
    <>
      <MarketStrip />

      <header className="sticky top-0 z-50 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 transition-all">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
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
                      <p className="text-[10px] text-zinc-400 truncate font-mono">{activeEmail || session?.user?.email || fbUser?.email || "Account"}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <DropdownMenuItem className="p-0">
                      <Link href={dashboardHref} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-white hover:bg-zinc-800/80 transition-all cursor-pointer font-bold">
                        <LayoutDashboard className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span className="font-bold text-white">Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="bg-zinc-800 my-1" />

                    <DropdownMenuItem
                      onClick={async () => {
                        await performFullLogout();
                        window.location.href = '/';
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

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

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
                        <span className="text-[10px] font-mono text-zinc-400 truncate">{activeEmail || session?.user?.email || fbUser?.email || "Verified User"}</span>
                      </div>
                    </div>
                  </div>
                )}

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
                  href={dashboardHref}
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
                      await performFullLogout();
                      window.location.href = '/';
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
                <li><Link href="/portfolio-management" className="hover:text-zinc-100 transition-colors">Portfolio PMS</Link></li>
                <li><Link href="/knowledge" className="hover:text-zinc-100 transition-colors">Free Knowledge Hub</Link></li>
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
                <li><Link href="/portfolio-management" className="hover:text-zinc-100 transition-colors font-medium text-emerald-400">Portfolio Management</Link></li>
                <li><Link href="/knowledge" className="hover:text-zinc-100 transition-colors font-medium text-purple-400">Free Knowledge</Link></li>
                <li><Link href="/build-webapp" className="hover:text-emerald-400 font-semibold text-emerald-400/90 transition-colors flex items-center gap-1">Build a WebApp <ArrowUpRight className="w-3 h-3 text-emerald-400" /></Link></li>
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
          <div className="flex flex-wrap items-center gap-2.5">
            <p>© {new Date().getFullYear()} Elite Trading Hub. All rights reserved.</p>
            <span className="text-zinc-700">•</span>
            <Link href="/build-webapp" className="hover:text-emerald-400 font-mono transition-colors flex items-center gap-1 text-[10px] text-zinc-400">
              made by opendev-labs
            </Link>
          </div>
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
    <section className="w-full py-10 sm:py-14 md:py-18 border-b border-zinc-800/80 bg-gradient-to-b from-zinc-900/40 to-zinc-950 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-emerald-400">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-3.5 h-3.5 object-contain" />
          {kicker}
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
          {title}
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {desc}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="mb-6 sm:mb-8 text-center max-w-2xl mx-auto space-y-2">
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
