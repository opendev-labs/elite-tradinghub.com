"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarHeader,
  SidebarFooter, SidebarInset, SidebarTrigger, useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard, TrendingUp, Calculator, Settings, LogOut,
  ChevronDown, ChevronRight, Bell, Search, Lock,
  ArrowUpRight, ArrowDownRight, Radio, BookOpen, Activity,
  Target, ShieldCheck, Wifi, Send, Globe, Loader2
} from "lucide-react";
import {
  Area, AreaChart, CartesianGrid, XAxis, YAxis,
  ResponsiveContainer, Tooltip,
} from "recharts";
import { signInWithGoogleFirebase, checkGoogleRedirectResult, getStoredUser, subscribeFirebaseUser, logoutFirebase, performFullLogout } from '@/lib/firebase';
import { signIn } from 'next-auth/react';
import { AuthLoginScreen } from "@/components/auth-login-screen";

// ── Toast ──────────────────────────────────────────────────────────────────
type ToastType = "info" | "success" | "error";
function Toast({ toasts }: { toasts: { id: number; msg: string; type: ToastType }[] }) {
  return (
    <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border border-zinc-700 bg-zinc-900 min-w-[260px] max-w-[340px] animate-slide-in-right pointer-events-auto">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${t.type === "error" ? "bg-red-500" : t.type === "success" ? "bg-emerald-400" : "bg-blue-400"}`} />
          <p className="text-xs text-zinc-200 font-medium leading-relaxed flex-1">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ title, value, change, up, icon, sub }: {
  title: string; value: string | number; change: string; up: boolean; icon: React.ReactNode; sub: string;
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-zinc-100 tracking-tight">{value}</div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
            {up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {change}
          </span>
          <span className="text-xs text-zinc-600">{sub}</span>
        </div>
      </div>
    </div>
  );
}

// ── Mobile nav ─────────────────────────────────────────────────────────────
function NavBtn({ onClick, children, ...props }: any) {
  const { setOpenMobile, isMobile } = useSidebar();
  return (
    <SidebarMenuButton
      type="button"
      onClick={(e: any) => {
        if (e && e.preventDefault) e.preventDefault();
        if (onClick) onClick(e);
        if (isMobile) setOpenMobile(false);
      }}
      {...props}
    >{children}</SidebarMenuButton>
  );
}

// ── Mock signals ──────────────────────────────────────────────────────────
const MOCK_SIGNALS = [
  { id: "SIG-001", symbol: "NIFTY 50",    bias: "BULLISH", entry: "24,680", target: "24,850", stop: "24,560", rr: "1:2.1", time: "09:45 AM", status: "LIVE"   },
  { id: "SIG-002", symbol: "BANK NIFTY",  bias: "BEARISH", entry: "52,300", target: "51,800", stop: "52,650", rr: "1:1.4", time: "Yesterday", status: "CLOSED" },
  { id: "SIG-003", symbol: "SENSEX",      bias: "BULLISH", entry: "81,200", target: "81,600", stop: "81,000", rr: "1:2.0", time: "2 days ago", status: "HIT"    },
  { id: "SIG-004", symbol: "NIFTY BANK",  bias: "BULLISH", entry: "52,180", target: "52,500", stop: "52,020", rr: "1:2.0", time: "3 days ago", status: "HIT"    },
];

const PORTFOLIO = [
  { symbol: "NIFTY 50",   qty: 50,  buy: "24,350", ltp: "24,718", pnl: "+₹18,400", up: true  },
  { symbol: "BANK NIFTY", qty: 25,  buy: "51,800", ltp: "52,405", pnl: "+₹15,125", up: true  },
  { symbol: "SENSEX",     qty: 10,  buy: "81,500", ltp: "81,332", pnl: "-₹1,680",  up: false },
];

const CHART = [
  { month: "Mar", value: 100 },
  { month: "Apr", value: 112 },
  { month: "May", value: 108 },
  { month: "Jun", value: 128 },
  { month: "Jul", value: 143 },
  { month: "Aug", value: 157 },
];

const NAV = [
  { label: "Dashboard",  icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Signals",    icon: <Radio           className="w-4 h-4" /> },
  { label: "Portfolio",  icon: <TrendingUp      className="w-4 h-4" /> },
  { label: "Calculator", icon: <Calculator      className="w-4 h-4" /> },
  { label: "Settings",   icon: <Settings        className="w-4 h-4" /> },
];

// Named export for page imports
// Main Component
export function AuthPortal() {
  const [user, setUser]       = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [redirectChecking, setRedirectChecking] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [tab, setTab]         = useState("Dashboard");
  const [email, setEmail]     = useState("");
  const [pass, setPass]       = useState("");
  const [busy, setBusy]       = useState(false);
  const [toasts, setToasts]   = useState<{ id: number; msg: string; type: ToastType }[]>([]);
  const ctr = useRef(0);

  // Calculator state
  const [capital, setCapital]   = useState("500000");
  const [riskPct, setRiskPct]   = useState("1");
  const [entryPx, setEntryPx]   = useState("24680");
  const [stopPx, setStopPx]     = useState("24560");
  const [lotSize, setLotSize]   = useState("50");

  const toast = useCallback((msg: string, type: ToastType = "info") => {
    const id = ++ctr.current;
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);

  useEffect(() => {
    setMounted(true);
    // 1. Check local storage for client session
    try {
      const stored = localStorage.getItem("eth_client_session");
      if (stored) {
        setUser(JSON.parse(stored));
        setLoading(false);
      }
    } catch {}

    // 2. Check stored Firebase user
    try {
      const fbUser = getStoredUser();
      if (fbUser?.email) {
        const u = { email: fbUser.email, name: fbUser.name || fbUser.email.split("@")[0] || "Trader", image: fbUser.image || null, plan: "PRO" };
        setUser(u);
        try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
        setLoading(false);
      }
    } catch {}

    // 3. Subscribe to live Firebase Auth state change
    const unsubFb = subscribeFirebaseUser((fbU) => {
      if (fbU?.email) {
        const u = { email: fbU.email, name: fbU.name || fbU.email.split("@")[0] || "Trader", image: fbU.image || null, plan: "PRO" };
        setUser(u);
        try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
        setLoading(false);
      }
    });

    // 4. Handle Mobile Google OAuth Redirect result & NextAuth session
    // This MUST complete before showing login screen to prevent redirect loop
    checkGoogleRedirectResult().then(userData => {
      if (userData) {
        const u = { email: userData.email, name: userData.name, image: userData.image || null, plan: "PRO" };
        setUser(u);
        try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
        setLoading(false);
        setRedirectChecking(false);
        toast("Welcome!", "success");
        return;
      }
      fetch("/api/auth/session")
        .then(r => r.ok ? r.json() : null)
        .then(s => {
          if (s?.user?.email) {
            const u = { email: s.user.email, name: s.user.name || s.user.email.split("@")[0], image: s.user.image || null, plan: "PRO" };
            setUser(u);
            try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
          }
        })
        .catch(() => {})
        .finally(() => { setLoading(false); setRedirectChecking(false); });
    }).catch(() => { setLoading(false); setRedirectChecking(false); });

    return () => unsubFb();
  }, [toast]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !pass.trim()) { toast("Enter your email and password", "error"); return; }
    setBusy(true);
    try {
      const r = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password: pass.trim() }),
      });
      if (r.ok) {
        const session = await fetch("/api/auth/session").then(r => r.json()).catch(() => null);
        if (session?.user?.email) {
          const u = { email: session.user.email, name: session.user.name || session.user.email.split("@")[0], plan: "PRO" };
          setUser(u);
          try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
          toast("Welcome back!", "success");
        } else {
          // Fallback demo login for testing
          const u = { email: email.trim(), name: email.split("@")[0], plan: "PRO" };
          setUser(u);
          try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
          toast("Logged in", "success");
        }
      } else {
        toast("Invalid email or password", "error");
      }
    } catch {
      // Offline demo fallback
      const u = { email: email.trim(), name: email.split("@")[0], plan: "PRO" };
      setUser(u);
      try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
      toast("Welcome!", "success");
    }
    setBusy(false);
  };

  const handleGoogleLogin = async () => {
    setBusy(true);
    try {
      const fbResult = await signInWithGoogleFirebase();
      if (fbResult.user) {
        const u = { email: fbResult.user.email, name: fbResult.user.name || fbResult.user.email?.split("@")[0] || "User", plan: "PRO" };
        setUser(u);
        try { localStorage.setItem("eth_client_session", JSON.stringify(u)); } catch {}
        toast("Welcome!", "success");
        setBusy(false);
        return;
      }
      if (fbResult.redirecting) {
        // Redirecting on mobile browser...
        return;
      }
      
      await signIn('google', { callbackUrl: '/login' });
    } catch (err: any) {
      toast(err?.message || 'Google Sign-In failed', 'error');
    }
    setBusy(false);
  };

  const logout = async () => {
    await performFullLogout();
    setUser(null);
    window.location.href = '/';
  };

  // Calculator
  const cap  = parseFloat(capital.replace(/,/g, "")) || 0;
  const risk = (parseFloat(riskPct) / 100) * cap;
  const diff = Math.abs(parseFloat(entryPx.replace(/,/g, "")) - parseFloat(stopPx.replace(/,/g, "")));
  const ls   = parseFloat(lotSize) || 1;
  const lots = diff > 0 ? Math.floor(risk / (diff * ls)) : 0;
  const reqMarg = lots * ls * parseFloat(entryPx.replace(/,/g, "")) * 0.18;

  if (!mounted || loading || redirectChecking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-emerald-400 rounded-full animate-spin" />
        {redirectChecking && (
          <p className="text-xs text-zinc-500 font-mono animate-pulse">Completing sign-in…</p>
        )}
      </div>
    );
  }

  // ── Login ──────────────────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <Toast toasts={toasts} />
        <AuthLoginScreen
          portalType="client"
          onLogin={async (em, pw) => {
            setEmail(em);
            setPass(pw);
            const fakeEvent = { preventDefault: () => {} } as any;
            await login(fakeEvent);
          }}
          onGoogleLogin={handleGoogleLogin}
        />
      </>
    );
  }

  // ── Dashboard Shell ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Toast toasts={toasts} />
      <SidebarProvider>

        {/* ── Sidebar ── */}
        <Sidebar
          variant="inset"
          collapsible="icon"
          className="border-r border-zinc-800 bg-zinc-900 text-zinc-100 sticky top-0 h-screen max-h-screen overflow-hidden flex flex-col justify-between"
        >
          <SidebarHeader className="border-b border-zinc-800 px-3 py-3 shrink-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size="lg" className="hover:bg-zinc-800 cursor-default" tabIndex={-1}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/only-bull-head-icon.png" alt="ELITE TRADING HUB" className="w-7 h-7 object-contain flex-shrink-0" />
                  <div className="group-data-[collapsible=icon]:hidden min-w-0">
                    <p className="text-xs font-semibold text-zinc-100 tracking-tight truncate">ELITE TRADING HUB</p>
                    <p className="text-[10px] text-zinc-500 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                      Client Gateway
                    </p>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>

          <SidebarContent className="bg-zinc-900 py-2 flex-1 overflow-hidden select-none">
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-semibold text-zinc-600 uppercase tracking-widest px-3 mb-1">
                Menu
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.map(item => (
                    <SidebarMenuItem key={item.label}>
                      <NavBtn
                        onClick={() => setTab(item.label)}
                        isActive={tab === item.label}
                        className={tab === item.label
                          ? "bg-zinc-800 text-zinc-100 font-medium"
                          : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 transition-colors"
                        }
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        {tab === item.label && (
                          <span className="ml-auto w-1 h-4 rounded-full bg-emerald-400 group-data-[collapsible=icon]:hidden" />
                        )}
                      </NavBtn>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="bg-zinc-900 border-t border-zinc-800 p-2.5 mt-auto shrink-0">
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800 hover:bg-zinc-800/80 transition-all text-left outline-none cursor-pointer">
                    {user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.image} alt={user.name || "User"} className="w-10 h-10 rounded-xl object-cover border border-emerald-500/50 flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-base font-bold text-emerald-400 flex-shrink-0">
                        {(user?.name || "Trader").charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="group-data-[collapsible=icon]:hidden min-w-0 flex-1 ml-2.5">
                      <p className="text-sm font-bold text-zinc-100 truncate capitalize">{user?.name || "Trader"}</p>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">{user?.email || ""}</p>
                    </div>
                    <ChevronDown className="ml-auto w-4 h-4 text-zinc-400 group-data-[collapsible=icon]:hidden" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" sideOffset={10} className="w-60 bg-zinc-900/95 border-zinc-800 backdrop-blur-2xl text-zinc-100 rounded-xl p-2 shadow-2xl z-[100] mb-2">
                    <div className="px-3 py-2.5 border-b border-zinc-800/80 mb-1.5 bg-zinc-950/50 rounded-lg">
                      <p className="text-xs font-bold text-zinc-100 truncate capitalize">{user?.name || "Trader"}</p>
                      <p className="text-[10px] text-zinc-400 font-mono truncate">{user?.email || ""}</p>
                    </div>
                    <DropdownMenuItem onClick={() => setTab("Settings")} className="hover:bg-zinc-800/80 cursor-pointer text-xs text-zinc-200 font-semibold rounded-lg p-2 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-zinc-400" /> Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                    <DropdownMenuItem onClick={logout} className="hover:bg-red-500/10 cursor-pointer text-xs text-red-400 font-semibold rounded-lg p-2 flex items-center gap-2">
                      <LogOut className="w-4 h-4 text-red-400" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* ── Main ── */}
        <SidebarInset className="bg-zinc-950">

          {/* Header */}
          <header className="sticky top-0 z-40 flex h-12 items-center justify-between border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl px-4 gap-4">
            <div className="flex items-center gap-2.5">
              <SidebarTrigger className="text-zinc-500 hover:text-zinc-300 transition-colors -ml-1" />
              <div className="h-4 w-px bg-zinc-800" />
              <nav className="flex items-center gap-1.5 text-xs">
                <span className="text-zinc-600">Client</span>
                <ChevronRight className="w-3 h-3 text-zinc-700" />
                <span className="text-zinc-300 font-medium">{tab}</span>
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono">
              {[["NIFTY", "24,718", "+0.84%"], ["BNF", "52,405", "+1.12%"], ["SENSEX", "81,332", "+0.76%"]].map(([n, v, c]) => (
                <div key={n} className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800">
                  <span className="text-zinc-600">{n}</span>
                  <span className="text-zinc-300 font-semibold">{v}</span>
                  <span className="text-emerald-400 text-[10px]">▲ {c}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/"
                className="h-8 px-3 rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all flex-shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-950" />
                <span>Website</span>
              </a>
              <button className="w-8 h-8 rounded-md bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-colors">
                <Bell className="w-3.5 h-3.5" />
              </button>
            </div>
          </header>

          {/* Content */}
          <main className="p-4 md:p-8 space-y-5 flex-1 w-full">

            {/* ── DASHBOARD ── */}
            {tab === "Dashboard" && (
              <>
                {/* Welcome */}
                <div className="rounded-xl bg-gradient-to-br from-emerald-500/10 to-zinc-900 border border-emerald-500/20 p-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-zinc-100">
                      Good day, <span className="capitalize">{user?.name || "Trader"}</span> 👋
                    </h2>
                    <p className="text-xs text-zinc-400 mt-0.5">Your trading dashboard is live and tracking market conditions.</p>
                    <span className="inline-flex items-center gap-1.5 mt-2.5 text-[10px] font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {user?.plan || "PRO"} Subscription
                    </span>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/only-bull-head-icon.png" alt="ETH" className="h-14 w-auto opacity-10 hidden sm:block" />
                </div>

                {/* KPIs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Active Signals" value={1}   change="LIVE"    up icon={<Radio    className="w-3.5 h-3.5" />} sub="right now" />
                  <StatCard title="Total Signals"  value={176} change="+23.1%"  up icon={<Activity className="w-3.5 h-3.5" />} sub="this month" />
                  <StatCard title="Accuracy"       value="87%" change="+2.1%"   up icon={<Target   className="w-3.5 h-3.5" />} sub="vs last month" />
                  <StatCard title="Avg R:R"        value="1:2.3" change="Stable" up icon={<ShieldCheck className="w-3.5 h-3.5" />} sub="risk reward" />
                </div>

                {/* Chart + Latest signal */}
                <div className="grid gap-4 lg:grid-cols-7">
                  <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Portfolio Performance</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Indexed return (base 100)</p>
                      </div>
                      <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">+57% YTD</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={CHART} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                        <defs>
                          <linearGradient id="cp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%"  stopColor="#34d399" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 11, fill: "#52525b" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#52525b" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5", fontSize: "12px" }} />
                        <Area dataKey="value" type="monotone" fill="url(#cp)" stroke="#34d399" strokeWidth={1.5} name="Return" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Latest signal card */}
                  <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-zinc-100">Latest Signal</h3>
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-md uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>
                    {(() => {
                      const s = MOCK_SIGNALS[0];
                      return (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-zinc-100">{s.symbol}</span>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${s.bias === "BULLISH" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>{s.bias}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            {[["Entry", s.entry, "text-zinc-200"], ["Target", s.target, "text-emerald-400"], ["Stop", s.stop, "text-red-400"]].map(([l, v, c]) => (
                              <div key={l} className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-center">
                                <p className="text-[10px] text-zinc-600 mb-1 uppercase">{l}</p>
                                <p className={`text-xs font-bold font-mono ${c}`}>₹{v}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-600">Risk/Reward</span>
                            <span className="font-mono font-semibold text-zinc-200">{s.rr}</span>
                          </div>
                          <button onClick={() => setTab("Signals")} className="w-full h-8 bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold rounded-lg transition-all shadow-sm">
                            View All Signals →
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </>
            )}

            {/* ── SIGNALS ── */}
            {tab === "Signals" && (
              <>
                <div>
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" /> Live Signals
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Decision-grade trade setups for NIFTY, BANKNIFTY & SENSEX</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {MOCK_SIGNALS.map(s => (
                    <div key={s.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-sm font-bold text-zinc-100">{s.symbol}</span>
                          <span className="ml-2 text-[10px] text-zinc-600 font-mono">{s.id}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase ${
                            s.status === "LIVE" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" :
                            s.status === "HIT"  ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                            "bg-zinc-800 border-zinc-700 text-zinc-500"
                          }`}>{s.status}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase ${s.bias === "BULLISH" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>{s.bias}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {[["Entry", s.entry, "text-zinc-200"], ["Target", s.target, "text-emerald-400"], ["Stop", s.stop, "text-red-400"]].map(([l, v, c]) => (
                          <div key={l} className="rounded-lg bg-zinc-950 border border-zinc-800 p-2.5 text-center">
                            <p className="text-[10px] text-zinc-600 mb-1 uppercase">{l}</p>
                            <p className={`text-xs font-bold font-mono ${c}`}>₹{v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-zinc-600">
                        <span>R:R — <span className="text-zinc-400 font-mono">{s.rr}</span></span>
                        <span>{s.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── PORTFOLIO ── */}
            {tab === "Portfolio" && (
              <>
                <div>
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" /> Portfolio
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Your open positions</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <div className="hidden sm:grid grid-cols-5 gap-4 px-5 py-3 border-b border-zinc-800 bg-zinc-950/50">
                    {["Symbol", "Qty", "Buy Price", "LTP", "P&L"].map(h => (
                      <span key={h} className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">{h}</span>
                    ))}
                  </div>
                  <div className="divide-y divide-zinc-800/40">
                    {PORTFOLIO.map(p => (
                      <div key={p.symbol} className="grid grid-cols-2 sm:grid-cols-5 gap-4 items-center px-5 py-4 hover:bg-zinc-800/20 transition-colors">
                        <span className="text-sm font-semibold text-zinc-200">{p.symbol}</span>
                        <span className="text-sm text-zinc-400 font-mono">{p.qty}</span>
                        <span className="text-sm text-zinc-400 font-mono">₹{p.buy}</span>
                        <span className="text-sm text-zinc-200 font-mono font-semibold">₹{p.ltp}</span>
                        <span className={`text-sm font-bold font-mono ${p.up ? "text-emerald-400" : "text-red-400"}`}>{p.pnl}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 py-3.5 border-t border-zinc-800 flex items-center justify-between bg-zinc-950/30">
                    <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Total P&L</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">+₹31,845</span>
                  </div>
                </div>
              </>
            )}

            {/* ── CALCULATOR ── */}
            {tab === "Calculator" && (
              <div className="max-w-lg">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-emerald-400" /> Position Size Calculator
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Calculate optimal lot size based on your risk tolerance</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Capital (₹)</label>
                      <input value={capital} onChange={e => setCapital(e.target.value)}
                        className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 font-mono focus:border-zinc-700 focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Risk per Trade (%)</label>
                      <input value={riskPct} onChange={e => setRiskPct(e.target.value)}
                        className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 font-mono focus:border-zinc-700 focus:outline-none" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[["Entry (₹)", entryPx, setEntryPx], ["Stop Loss (₹)", stopPx, setStopPx], ["Lot Size", lotSize, setLotSize]].map(([l, v, fn]: any) => (
                      <div key={l}>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">{l}</label>
                        <input value={v} onChange={(e: any) => fn(e.target.value)}
                          className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 font-mono focus:border-zinc-700 focus:outline-none" />
                      </div>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="rounded-lg bg-zinc-950 border border-zinc-800 p-4 grid grid-cols-2 gap-3">
                    <div className="text-center p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/15">
                      <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Optimal Lots</p>
                      <p className="text-2xl font-bold text-emerald-400 font-mono">{lots}</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Risk Amount</p>
                      <p className="text-2xl font-bold text-zinc-200 font-mono">₹{Math.round(risk).toLocaleString()}</p>
                    </div>
                    <div className="col-span-2 text-center p-3 rounded-lg bg-zinc-900 border border-zinc-800">
                      <p className="text-[10px] text-zinc-600 uppercase tracking-wider mb-1">Est. Margin Required (18%)</p>
                      <p className="text-lg font-bold text-zinc-300 font-mono">₹{Math.round(reqMarg).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── SETTINGS ── */}
            {tab === "Settings" && (
              <div className="max-w-sm">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-zinc-100">Settings</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Manage your account</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-3.5 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-base font-bold text-emerald-400">
                      {(user?.name || "Trader").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-100 capitalize">{user?.name || "Trader"}</p>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{user?.email || ""}</p>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-1.5 inline-block uppercase">
                        {user?.plan || "PRO"} Member
                      </span>
                    </div>
                  </div>
                  <button onClick={logout}
                    className="w-full h-9 border border-zinc-800 hover:border-zinc-700 bg-transparent text-zinc-400 hover:text-zinc-200 text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}

          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
