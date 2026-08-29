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
  LayoutDashboard, Users as UsersIcon, Radio, BarChart2, Settings, LogOut,
  Wifi, CheckCircle2, Send, Megaphone, ChevronDown, Search,
  Lock, ArrowUpRight, ArrowDownRight, ChevronRight, Bell,
  TrendingUp, Activity, DollarSign, RefreshCw, Briefcase, Plus,
  FileSpreadsheet, Filter, SlidersHorizontal, Download, Eye, Grid, List,
  MoreHorizontal, CheckSquare, Square, Building2, UserPlus, X, HelpCircle, Globe,
  MessageSquare, Trash2, Star, MessageCircle, Clock,
} from "lucide-react";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis,
  ResponsiveContainer, Tooltip, Line, LineChart, PieChart, Pie, Cell,
} from "recharts";
import { AuthLoginScreen } from "@/components/auth-login-screen";
import {
  subscribeRtdbData, pushRtdbData, writeRtdbData, updateRtdbData, formatTimeAgo, performFullLogout
} from "@/lib/firebase";


// ── Toast ──────────────────────────────────────────────────────────────────
type ToastType = "info" | "success" | "error";
function Toast({ toasts }: { toasts: { id: number; msg: string; type: ToastType }[] }) {
  return (
    <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none">
      {toasts.map((t) => (
        <div key={t.id} className="flex items-center gap-3 px-4 py-3 rounded-lg shadow-2xl border border-zinc-700 bg-zinc-900 min-w-[280px] max-w-[360px] animate-slide-in-right pointer-events-auto">
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

// ── Mobile-aware sidebar menu button ──────────────────────────────────────
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

// ── Mock data ─────────────────────────────────────────────────────────────
const CLIENTS = [
  { id: "ETH-001", name: "Riya Sharma",   email: "riya@example.com",   plan: "PRO",        status: "ACTIVE",   joined: "Jan 10, 2026", online: true  },
  { id: "ETH-002", name: "Arjun Mehta",   email: "arjun@example.com",  plan: "ENTERPRISE", status: "ACTIVE",   joined: "Jan 18, 2026", online: false },
  { id: "ETH-003", name: "Priya Patel",   email: "priya@example.com",  plan: "PRO",        status: "INACTIVE", joined: "Feb 4, 2026",  online: false },
  { id: "ETH-004", name: "Vikram Singh",  email: "vikram@example.com", plan: "ENTERPRISE", status: "ACTIVE",   joined: "Feb 14, 2026", online: true  },
  { id: "ETH-005", name: "Neha Kapoor",   email: "neha@example.com",   plan: "STANDARD",   status: "ACTIVE",   joined: "Mar 1, 2026",  online: false },
  { id: "ETH-006", name: "Rahul Gupta",   email: "rahul@example.com",  plan: "PRO",        status: "ACTIVE",   joined: "Mar 8, 2026",  online: true  },
  { id: "ETH-007", name: "Ananya Das",    email: "ananya@example.com", plan: "STANDARD",   status: "ACTIVE",   joined: "Mar 15, 2026", online: false },
];

const MOCK_ORGANIZATION_USERS = [
  { id: "usr_1", name: "Olivia Rhye", email: "olivia.rhye@weblabs.studio", role: "Workspace Owner", team: "Platform", workspace: "WS", status: "Active", joined: "24 Jun 2024, 9:23 AM", color: "bg-amber-500/20 text-amber-300" },
  { id: "usr_2", name: "Noah Pierre", email: "noah.pierre@weblabs.studio", role: "Contributor", team: "Platform", workspace: "WS", status: "Active", joined: "18 Jun 2024, 4:50 PM", color: "bg-orange-500/20 text-orange-300" },
  { id: "usr_3", name: "Koray Okumus", email: "koray.okumus@weblabs.studio", role: "Security Admin", team: "Internal Tools", workspace: "WS +1", status: "Active", joined: "22 May 2024, 8:30 AM", color: "bg-rose-500/20 text-rose-300" },
  { id: "usr_4", name: "Candice Wu", email: "candice.wu@sandbox.dev", role: "Team Lead", team: "Customer Ops", workspace: "S", status: "Active", joined: "19 May 2024, 7:55 AM", color: "bg-amber-500/20 text-amber-300" },
  { id: "usr_5", name: "Nico Arendt", email: "nico.arendt@sandbox.dev", role: "Contributor", team: "Customer Ops", workspace: "S +1", status: "Active", joined: "13 May 2024, 6:35 PM", color: "bg-orange-500/20 text-orange-300" },
  { id: "usr_6", name: "Livia Bator", email: "livia.bator@weblabs.studio", role: "Contributor", team: "Platform", workspace: "WS", status: "Pending invite", joined: "02 May 2024, 11:20 AM", color: "bg-blue-500/20 text-blue-300" },
  { id: "usr_7", name: "Marcus Chen", email: "marcus.chen@weblabs.studio", role: "Team Lead", team: "Internal Tools", workspace: "WS", status: "Active", joined: "28 Apr 2024, 3:15 PM", color: "bg-emerald-500/20 text-emerald-300" },
  { id: "usr_8", name: "Sophia Martinez", email: "sophia.m@sandbox.dev", role: "Contributor", team: "Customer Ops", workspace: "S", status: "Suspended", joined: "15 Apr 2024, 10:45 AM", color: "bg-purple-500/20 text-purple-300" },
];

const ACTIVITY = [
  { user: "Riya Sharma",  action: "Viewed NIFTY signal",   time: "2 min ago"  },
  { user: "Vikram Singh", action: "Updated profile",        time: "12 min ago" },
  { user: "Rahul Gupta",  action: "Joined platform",        time: "34 min ago" },
  { user: "Arjun Mehta",  action: "Downloaded report",      time: "1 hr ago"   },
  { user: "Neha Kapoor",  action: "Renewed subscription",   time: "3 hr ago"   },
];

const CHART_DATA = [
  { month: "Mar", clients: 12, signals: 48  },
  { month: "Apr", clients: 19, signals: 72  },
  { month: "May", clients: 27, signals: 91  },
  { month: "Jun", clients: 34, signals: 118 },
  { month: "Jul", clients: 41, signals: 143 },
  { month: "Aug", clients: 52, signals: 176 },
];

// Analytics Chart Data
const TRAFFIC_QUALITY_DATA = [
  { week: "Week 1", val: 0, benchmark: -1 },
  { week: "W1.2", val: 2.5, benchmark: 0.5 },
  { week: "W1.4", val: 2.0, benchmark: 1.0 },
  { week: "W1.6", val: 3.5, benchmark: -0.5 },
  { week: "W1.8", val: -1.2, benchmark: 2.2 },
  { week: "Week 2", val: -2.8, benchmark: 1.8 },
  { week: "W2.2", val: 4.2, benchmark: -0.8 },
  { week: "W2.4", val: 2.8, benchmark: 1.2 },
  { week: "W2.6", val: 3.2, benchmark: 0.8 },
  { week: "W2.8", val: -2.1, benchmark: 2.5 },
  { week: "Week 3", val: 1.8, benchmark: -1.0 },
  { week: "W3.2", val: 4.0, benchmark: -1.2 },
  { week: "W3.4", val: 3.1, benchmark: 0.4 },
  { week: "Week 4", val: 4.5, benchmark: 1.8 },
];

const REALTIME_VISITORS_DATA = [
  { time: "1m", v: 12 }, { time: "2m", v: 18 }, { time: "3m", v: 24 }, { time: "4m", v: 16 },
  { time: "5m", v: 28 }, { time: "6m", v: 22 }, { time: "7m", v: 34 }, { time: "8m", v: 20 },
  { time: "9m", v: 15 }, { time: "10m", v: 30 }, { time: "11m", v: 25 }, { time: "12m", v: 32 },
];

// CRM Mock Data
const LEADS_SOURCE_DATA = [
  { name: "Website", value: 170, color: "#94a3b8" },
  { name: "Referral", value: 105, color: "#64748b" },
  { name: "Social Media", value: 90, color: "#475569" },
  { name: "Cold Outreach", value: 62, color: "#334155" },
  { name: "Other", value: 48, color: "#1e293b" },
];

const REVENUE_VS_TARGET_DATA = [
  { project: "Enterprise Q3", actual: 88, target: 100 },
  { project: "SaaS Platform", actual: 65, target: 100 },
  { project: "API Access", actual: 42, target: 100 },
  { project: "Custom Trading Bot", actual: 95, target: 100 },
  { project: "Algorithmic Feed", actual: 82, target: 100 },
  { project: "Mobile Suite", actual: 70, target: 100 },
];

const CRM_LEADS_TABLE = [
  { ref: "L-1012", name: "Guillermo Rauch", company: "Vercel", status: "Qualified", source: "Website", activity: "30m ago" },
  { ref: "L-1013", name: "Lee Robinson", company: "Next.js Inc", status: "Negotiation", source: "Referral", activity: "1h ago" },
  { ref: "L-1014", name: "Shadcn", company: "UI Design Co", status: "Proposal Sent", source: "Social Media", activity: "3h ago" },
  { ref: "L-1015", name: "Sarah Drasner", company: "Google Cloud", status: "Won", source: "Direct", activity: "5h ago" },
  { ref: "L-1016", name: "Dan Abramov", company: "React Core", status: "Qualified", source: "Cold Outreach", activity: "1d ago" },
];

const NAV = [
  { label: "Dashboard",           icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Portfolio PMS",       icon: <PieChart        className="w-4 h-4 text-emerald-400" /> },
  { label: "Comments & Feedback", icon: <MessageSquare   className="w-4 h-4 text-purple-400" /> },
  { label: "Google Logins",       icon: <Lock            className="w-4 h-4 text-emerald-400" /> },
  { label: "Analytics",           icon: <BarChart2       className="w-4 h-4" /> },
  { label: "CRM",                 icon: <Briefcase       className="w-4 h-4" /> },
  { label: "Users",               icon: <UsersIcon       className="w-4 h-4" /> },
  { label: "Clients",             icon: <UsersIcon       className="w-4 h-4" /> },
  { label: "Broadcaster",         icon: <Radio           className="w-4 h-4" /> },
  { label: "Announcements",       icon: <Megaphone       className="w-4 h-4" /> },
  { label: "Settings",            icon: <Settings        className="w-4 h-4" /> },
];

export interface AdminDashboardProps {
  defaultTab?: string;
}

// ── Main Component ────────────────────────────────────────────────────────
export default function AdminDashboard({ defaultTab = "Dashboard" }: AdminDashboardProps) {
  const [user, setUser]               = useState<any>(null);
  const [loading, setLoading]         = useState(true);
  const [mounted, setMounted]         = useState(false);
  const [tab, setTab]                 = useState(defaultTab);
  const [search, setSearch]           = useState("");
  const [toasts, setToasts]           = useState<{ id: number; msg: string; type: ToastType }[]>([]);
  const ctr = useRef(0);

  // Analytics sub-tabs
  const [analyticsSubTab, setAnalyticsSubTab] = useState("Overview");
  const [timeRange, setTimeRange] = useState("Last 4 weeks");

  // Users & Clients State (Live RTDB)
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [teamFilter, setTeamFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [workspaceFilter, setWorkspaceFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [clientsList, setClientsList] = useState<any[]>([]);
  const [crmLeads, setCrmLeads] = useState<any[]>([]);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [googleLogins, setGoogleLogins] = useState<any[]>([]);
  const [pageViewsList, setPageViewsList] = useState<any[]>([]);
  const [signalsCount, setSignalsCount] = useState(0);
  const [commentsList, setCommentsList] = useState<any[]>([]);
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);

  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // New User Form State
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState("Contributor");
  const [newUserTeam, setNewUserTeam] = useState("Platform");
  const [newUserWorkspace, setNewUserWorkspace] = useState("WS");

  // New Lead Form State
  const [leadName, setLeadName] = useState("");
  const [leadCompany, setLeadCompany] = useState("");
  const [leadStatus, setLeadStatus] = useState("Qualified");
  const [leadSource, setLeadSource] = useState("Website");

  // CRM Tasks State (Live RTDB)
  const [crmTasks, setCrmTasks] = useState<any[]>([]);

  // Signal broadcaster state
  const [symbol, setSymbol]   = useState("NIFTY 50");
  const [bias, setBias]       = useState("BULLISH");
  const [entry, setEntry]     = useState("24,680");
  const [target, setTarget]   = useState("24,850");
  const [stop, setStop]       = useState("24,560");
  const [sent, setSent]       = useState(false);

  const toast = useCallback((msg: string, type: ToastType = "info") => {
    const id = ++ctr.current;
    setToasts(p => [...p, { id, msg, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 4000);
  }, []);

  // Auth check
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("eth_admin_session");
      if (stored) { setUser(JSON.parse(stored)); setLoading(false); return; }
    } catch {}
    fetch("/api/auth/session")
      .then(r => r.ok ? r.json() : null)
      .then(s => {
        if (s?.user?.role === "ADMIN" || s?.user?.email?.includes("admin")) {
          const a = { email: s.user.email, displayName: s.user.name || "Admin" };
          setUser(a);
          try { localStorage.setItem("eth_admin_session", JSON.stringify(a)); } catch {}
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Firebase Realtime Database Sync
  useEffect(() => {
    // 1. Subscribe to Live Users
    const unsubUsers = subscribeRtdbData("users", (data) => {
      if (data) {
        const uList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k }));
        setUsersList(uList);
      } else {
        setUsersList([]);
      }
    });

    // 2. Subscribe to Live Clients
    const unsubClients = subscribeRtdbData("clients", (data) => {
      if (data) {
        const cList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k }));
        setClientsList(cList);
      } else {
        setClientsList([]);
      }
    });

    // 3. Subscribe to Signals Count
    const unsubSignals = subscribeRtdbData("signals", (data) => {
      if (data) {
        setSignalsCount(Object.keys(data).length);
      } else {
        setSignalsCount(0);
      }
    });

    // 4. Subscribe to Live CRM Tasks
    const unsubTasks = subscribeRtdbData("crm_tasks", (data) => {
      if (data) {
        const tList = Object.keys(data).map((k, idx) => ({ ...data[k], id: data[k].id || idx + 1, rtdbKey: k }));
        setCrmTasks(tList);
      } else {
        setCrmTasks([]);
      }
    });

    // 5. Subscribe to Live CRM Leads
    const unsubLeads = subscribeRtdbData("crm/leads", (data) => {
      if (data) {
        const lList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k }));
        setCrmLeads(lList);
      } else {
        setCrmLeads([]);
      }
    });

    // 6. Subscribe to Live Activity Logs
    const unsubActivity = subscribeRtdbData("activity", (data) => {
      if (data) {
        const aList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k })).reverse();
        setActivityLogs(aList);
      } else {
        setActivityLogs([]);
      }
    });

    // 7. Subscribe to Live Google Logins
    const unsubGoogle = subscribeRtdbData("google_logins", (data) => {
      if (data) {
        const gList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k }));
        setGoogleLogins(gList);
      } else {
        setGoogleLogins([]);
      }
    });

    // 8. Subscribe to Live PageViews Analytics
    const unsubPageViews = subscribeRtdbData("analytics/pageviews", (data) => {
      if (data) {
        const pvList = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k }));
        setPageViewsList(pvList);
      } else {
        setPageViewsList([]);
      }
    });

    // 9. Subscribe to Live User Comments
    const unsubComments = subscribeRtdbData("comments", (data) => {
      if (data) {
        const list = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k, type: 'comment' })).reverse();
        setCommentsList(list);
      } else {
        setCommentsList([]);
      }
    });

    // 10. Subscribe to Live Testimonials & Feedback
    const unsubTestimonials = subscribeRtdbData("testimonials", (data) => {
      if (data) {
        const list = Object.keys(data).map(k => ({ ...data[k], rtdbKey: k, type: 'testimonial' })).reverse();
        setTestimonialsList(list);
      } else {
        setTestimonialsList([]);
      }
    });

    return () => {
      if (typeof unsubUsers === "function") unsubUsers();
      if (typeof unsubClients === "function") unsubClients();
      if (typeof unsubSignals === "function") unsubSignals();
      if (typeof unsubTasks === "function") unsubTasks();
      if (typeof unsubLeads === "function") unsubLeads();
      if (typeof unsubActivity === "function") unsubActivity();
      if (typeof unsubGoogle === "function") unsubGoogle();
      if (typeof unsubPageViews === "function") unsubPageViews();
      if (typeof unsubComments === "function") unsubComments();
      if (typeof unsubTestimonials === "function") unsubTestimonials();
    };
  }, []);

  const login = async (em: string, pw: string) => {
    const cleanEmail = em.trim().toLowerCase();
    const cleanPass  = pw.trim();

    const isValidAdmin =
      cleanEmail === "admin@elite" ||
      cleanEmail === "admin" ||
      cleanEmail === "admin@elitetradinghub.com" ||
      cleanEmail === "yash";

    const a = {
      email: cleanEmail.includes("@") ? cleanEmail : "admin@elitetradinghub.com",
      displayName: cleanEmail === "yash" ? "Yash" : "Administrator",
    };

    setUser(a);
    try { localStorage.setItem("eth_admin_session", JSON.stringify(a)); } catch {}
    toast("Welcome to Admin Control Center", "success");
  };

  const logout = async () => {
    await performFullLogout();
    setUser(null);
    window.location.href = '/';
  };

  const broadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    const signalData = { symbol, bias, entry, target, stop, createdAt: Date.now() };
    await pushRtdbData("signals", signalData).catch(() => {});
    toast(`Signal broadcast live: ${symbol} ${bias} @ ₹${entry}`, "success");
    setTimeout(() => setSent(false), 3500);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) {
      toast("Please provide user name and email", "error");
      return;
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      team: newUserTeam,
      workspace: newUserWorkspace,
      status: "Active",
      joined: "Just now",
      color: "bg-emerald-500/20 text-emerald-300",
    };
    setUsersList(prev => [newUser, ...prev]);
    await pushRtdbData("users", newUser).catch(() => {});
    await pushRtdbData("activity", { user: newUser.name, action: "Joined organization", time: "Just now" }).catch(() => {});
    setIsAddUserOpen(false);
    setNewUserName("");
    setNewUserEmail("");
    toast(`User ${newUser.name} added and synced to Firebase!`, "success");
  };

  const handleAddLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) {
      toast("Please provide lead name", "error");
      return;
    }
    const newLead = {
      ref: `L-${Math.floor(1000 + Math.random() * 9000)}`,
      name: leadName.trim(),
      company: leadCompany.trim() || "Independent Trader",
      status: leadStatus,
      source: leadSource,
      activity: "Just now",
      createdAt: Date.now(),
    };
    await pushRtdbData("crm/leads", newLead).catch(() => {});
    await pushRtdbData("activity", { user: newLead.name, action: `Added as ${newLead.status} lead (${newLead.source})`, time: "Just now" }).catch(() => {});
    setIsAddLeadOpen(false);
    setLeadName("");
    setLeadCompany("");
    toast(`Lead ${newLead.name} created and synced to Firebase!`, "success");
  };

  const toggleSelectUser = (id: string) => {
    setSelectedUserIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAllUsers = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map(u => u.id));
    }
  };

  const active    = clientsList.filter(c => c.status === "ACTIVE").length;
  const online    = clientsList.filter(c => c.online).length;
  const filteredClients = clientsList.filter(c => {
    if (!search) return true;
    return `${c.name} ${c.email} ${c.id}`.toLowerCase().includes(search.toLowerCase());
  });

  const filteredUsers = usersList.filter(u => {
    const matchesSearch = !userSearch || `${u.name} ${u.email} ${u.role}`.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    const matchesTeam = teamFilter === "All" || u.team === teamFilter;
    const matchesStatus = statusFilter === "All" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesTeam && matchesStatus;
  });

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-emerald-400 rounded-full animate-spin" />
      </div>
    );
  }

  // ── Login Page ─────────────────────────────────────────────────────────
  if (!user) {
    return (
      <>
        <Toast toasts={toasts} />
        <AuthLoginScreen
          portalType="admin"
          title="Studio Admin"
          subtitle="Enterprise Dashboard Portal"
          onLogin={login}
        />
      </>
    );
  }

  // ── Dashboard Shell ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <Toast toasts={toasts} />

      <SidebarProvider defaultOpen>
        <Sidebar className="border-r border-zinc-800 bg-zinc-900 sticky top-0 h-screen max-h-screen overflow-hidden flex flex-col justify-between">
          <SidebarHeader className="h-16 px-4 flex items-center justify-between border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/only-bull-head-icon.png" alt="Elite Trading Hub Logo" className="h-8 w-auto object-contain" />
              <div>
                <p className="text-xs font-semibold text-zinc-100 tracking-tight">ELITE TRADING HUB</p>
                <p className="text-[10px] text-zinc-500">Admin Gateway</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2 py-4 space-y-6 overflow-hidden select-none">
            <SidebarGroup>
              <SidebarGroupLabel className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 px-2 mb-2">
                Dashboards
              </SidebarGroupLabel>
              <SidebarGroupContent className="space-y-1">
                <SidebarMenu>
                  {NAV.map((n) => (
                    <SidebarMenuItem key={n.label}>
                      <NavBtn
                        isActive={tab === n.label}
                        onClick={() => setTab(n.label)}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors ${
                          tab === n.label
                            ? "bg-zinc-800 text-zinc-100 font-semibold border border-zinc-700"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {n.icon}
                          <span>{n.label}</span>
                        </div>
                        {n.label === "CRM" && (
                          <span className="px-1.5 py-0.5 text-[9px] font-semibold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
                            v1
                          </span>
                        )}
                      </NavBtn>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-3 border-t border-zinc-800">
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800 transition-colors text-left outline-none cursor-pointer">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-200">
                    {(user?.displayName || "A").charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left leading-none">
                    <p className="text-xs font-medium text-zinc-200">{user?.displayName || "Administrator"}</p>
                    <p className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate max-w-[110px]">{user?.email || "admin@elitetradinghub.com"}</p>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="center" sideOffset={8} className="w-56 bg-zinc-900/95 border border-zinc-800 backdrop-blur-xl text-zinc-200 rounded-xl p-1.5 shadow-2xl z-[100] mb-1">
                <div className="px-3 py-2 border-b border-zinc-800 mb-1">
                  <p className="text-xs font-bold text-zinc-100">{user?.displayName || "Administrator"}</p>
                  <p className="text-[10px] text-zinc-400 font-mono">{user?.email || "admin@elitetradinghub.com"}</p>
                </div>
                <DropdownMenuItem onClick={() => setTab("Settings")} className="text-xs text-zinc-200 font-semibold hover:bg-zinc-800/80 cursor-pointer rounded-lg p-2 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-zinc-400" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800 my-1" />
                <DropdownMenuItem onClick={logout} className="text-xs text-red-400 font-semibold hover:bg-red-500/10 cursor-pointer rounded-lg p-2 flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-red-400" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="bg-zinc-950 flex-1 min-w-0 max-w-full overflow-x-hidden flex flex-col">
          {/* Header */}
          <header className="h-14 sm:h-16 px-3 sm:px-6 border-b border-zinc-800 bg-zinc-900/60 backdrop-blur flex items-center justify-between sticky top-0 z-30 w-full min-w-0 max-w-full overflow-x-hidden">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <SidebarTrigger />
              <div className="h-4 w-px bg-zinc-800 shrink-0" />
              <h1 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">{tab}</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <a
                href="/"
                className="h-8 px-3 rounded-lg bg-white hover:bg-zinc-100 text-zinc-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all shrink-0"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-950" />
                <span>Website</span>
              </a>

              <div className="relative hidden sm:block">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search ⌘K"
                  className="h-8 w-36 md:w-48 pl-8 pr-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                />
              </div>

              <button className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-zinc-200 transition-colors shrink-0">
                <Bell className="w-3.5 h-3.5" />
              </button>

              <div className="hidden sm:flex items-center gap-2 border-l border-zinc-800 pl-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-zinc-400 font-mono">Live Session</span>
              </div>
            </div>
          </header>

          {/* Main Body */}
          <main className="p-3 sm:p-6 md:p-8 space-y-4 sm:space-y-6 flex-1 overflow-y-auto w-full min-w-0 max-w-full overflow-x-hidden">

            {/* ── 1. DASHBOARD ── */}
            {tab === "Dashboard" && (
              <>
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-zinc-100">Overview</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Welcome back, {user?.displayName || "Administrator"}. Here&apos;s your studio summary.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
                  <StatCard title="Total Clients"  value={clientsList.length} change="+14.2%"  up icon={<UsersIcon    className="w-3.5 h-3.5" />} sub="vs last month" />
                  <StatCard title="Online Now"     value={online}         change="Live"     up icon={<Wifi         className="w-3.5 h-3.5" />} sub="active sessions" />
                  <StatCard title="Signals Sent"   value={signalsCount}   change="+23.1%"  up icon={<Radio        className="w-3.5 h-3.5" />} sub="this month" />
                  <StatCard title="Active Members" value={active}         change="+8.4%"   up icon={<CheckCircle2 className="w-3.5 h-3.5" />} sub="subscriptions" />
                </div>

                <div className="grid gap-4 lg:grid-cols-7 w-full min-w-0">
                  {/* Client Growth & Signals Card */}
                  <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-5 w-full min-w-0 max-w-full overflow-hidden">
                    <div className="flex items-center justify-between mb-3 border-b border-zinc-800/60 pb-2.5">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">Client Growth & Signals</h3>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">6-month performance trend</p>
                      </div>
                      <span className="text-[10px] sm:text-xs text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shrink-0">YTD 2026</span>
                    </div>
                    <div className="w-full h-[180px] sm:h-[220px] min-w-0 overflow-hidden">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA} margin={{ left: -25, right: 4, top: 8, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%"  stopColor="#34d399" stopOpacity={0.15} />
                              <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                          <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fontSize: 10, fill: "#52525b" }} />
                          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#52525b" }} />
                          <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", color: "#f4f4f5", fontSize: "11px" }} />
                          <Area dataKey="clients" type="monotone" fill="url(#gc)" stroke="#34d399" strokeWidth={1.5} name="Clients" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent Activity Card */}
                  <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-5 w-full min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-100">Recent Activity</h3>
                        <p className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Client actions feed</p>
                      </div>
                      <span className="flex items-center gap-1.5 text-[10px] font-medium text-zinc-400 bg-zinc-800 border border-zinc-700 px-2 py-1 rounded-md shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                      </span>
                    </div>
                    <div className="space-y-2">
                      {activityLogs.length > 0 ? (
                        activityLogs.slice(0, 5).map((a, i) => (
                          <div key={a.rtdbKey || i} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-zinc-800/50 transition-colors">
                            <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300 flex-shrink-0">
                              {(a.user || "User").charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-medium text-zinc-200 truncate">{a.user || "System"}</p>
                              <p className="text-[10px] text-zinc-500 truncate">{a.action || "Active session"}</p>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-mono shrink-0">{formatTimeAgo(a.timestamp || a.time || a.createdAt)}</span>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center text-zinc-500 text-xs">
                          No recent live activity logged yet.<br/>
                          <span className="text-[10px] text-zinc-600">Events will appear live as users interact.</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Client Comments & User Feedback Feed ── */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 sm:p-5 space-y-4 w-full min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <MessageSquare className="w-4 h-4 text-purple-400 shrink-0" />
                      <div className="min-w-0">
                        <h3 className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">Client Comments & Feedback</h3>
                        <p className="text-[10px] sm:text-xs text-zinc-500 truncate">Live user feedback, author details & comments</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setTab("Comments & Feedback")}
                      className="text-[10px] sm:text-xs text-purple-400 hover:text-purple-300 font-mono bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md shrink-0 transition-colors"
                    >
                      View All ({commentsList.length + testimonialsList.length}) →
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full min-w-0">
                    {[...commentsList, ...testimonialsList].length > 0 ? (
                      [...commentsList, ...testimonialsList].slice(0, 6).map((item, idx) => (
                        <div key={item.rtdbKey || idx} className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-2.5 flex flex-col justify-between min-w-0">
                          <div className="space-y-2 min-w-0">
                            {/* Author info header */}
                            <div className="flex items-center gap-2.5 min-w-0">
                              {item.image || item.userImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.image || item.userImage} alt={item.name || item.author || "User"} className="w-8 h-8 rounded-full object-cover border border-purple-500/40 shrink-0" />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30 shrink-0">
                                  {(item.name || item.author || item.userName || "U").charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-1.5 min-w-0">
                                  <p className="text-xs font-bold text-zinc-100 truncate">{item.name || item.author || item.userName || "Verified Trader"}</p>
                                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded shrink-0">User</span>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-mono truncate">{item.email || item.userEmail || "Registered Account"}</p>
                              </div>
                            </div>

                            {/* Comment / Review Text */}
                            <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60 italic break-words">
                              “{item.text || item.comment || item.message || item.quote || item.review || "Great trading setups!"}”
                            </p>
                          </div>

                          <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <span>{item.role || item.title || "Trader"}</span>
                            <span>{formatTimeAgo(item.timestamp || item.createdAt || item.date)}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-zinc-500 text-xs">
                        No client comments logged in Realtime Database yet.<br/>
                        <span className="text-[10px] text-zinc-600">User reviews and comments will appear here automatically.</span>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ── 1.25 PORTFOLIO PMS ── */}
            {tab === "Portfolio PMS" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-emerald-400" /> Portfolio Management Services (PMS)
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">SEBI Framework Aligned Asset Allocation, Client Portfolios & Risk Parameter Engine.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> SEBI Compliant Framework
                    </span>
                  </div>
                </div>

                {/* PMS Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Total AUM Managed" value="₹ 4.85 Cr" change="+18.4%" up icon={<DollarSign className="w-3.5 h-3.5 text-emerald-400" />} sub="YTD Growth" />
                  <StatCard title="Active PMS Clients" value="38 Accounts" change="+6 new" up icon={<Briefcase className="w-3.5 h-3.5 text-blue-400" />} sub="Risk Profiled" />
                  <StatCard title="Max Risk Per Trade" value="1.50%" change="Strict Limit" up icon={<Lock className="w-3.5 h-3.5 text-amber-400" />} sub="Capital Preservation" />
                  <StatCard title="Benchmark Beta" value="0.72 vs NIFTY" change="Low Volatility" up icon={<TrendingUp className="w-3.5 h-3.5 text-purple-400" />} sub="Controlled Drawdown" />
                </div>

                {/* PMS Strategy Allocation & Risk Calculator Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Model Strategy Asset Allocation</h3>
                        <p className="text-xs text-zinc-500">Target weights across market regimes</p>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        Quant Rebalanced
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400">Large Cap Equities</span>
                        <div className="text-lg font-bold text-emerald-400">45%</div>
                        <span className="text-[10px] text-zinc-500">NIFTY 50 Core</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400">Tactical Options Hedge</span>
                        <div className="text-lg font-bold text-teal-400">20%</div>
                        <span className="text-[10px] text-zinc-500">Delta Neutral Skew</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400">Debt & Liquid G-Sec</span>
                        <div className="text-lg font-bold text-blue-400">25%</div>
                        <span className="text-[10px] text-zinc-500">Capital Protection</span>
                      </div>
                      <div className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400">Tactical Cash Reserve</span>
                        <div className="text-lg font-bold text-purple-400">10%</div>
                        <span className="text-[10px] text-zinc-500">Opportunistic Dip</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-zinc-300 space-y-1">
                      <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5" /> SEBI Compliance Note on Portfolio Performance
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">
                        “Our educational strategies are developed using structured market research, technical analysis and risk-management principles. Certain strategies may demonstrate high historical signal accuracy in specific market conditions; however, past performance does not guarantee future results.”
                      </p>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <h3 className="text-sm font-semibold text-zinc-100">PMS Services Overview</h3>
                        <span className="text-[10px] font-mono text-zinc-400">6 Pillars</span>
                      </div>
                      <ul className="space-y-2.5 mt-3 text-xs text-zinc-300">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>1. Personalized Portfolio Management</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>2. Market Research & Analysis</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>3. Risk Management & Stop-Loss Engine</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>4. Free Trading & Investment Education</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>5. Active Portfolio Monitoring</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>6. Transparent Benchmark Reporting</span>
                        </li>
                      </ul>
                    </div>

                    <a
                      href="/portfolio-management"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all text-center block shadow-md shadow-emerald-500/20"
                    >
                      View Live PMS Client Page →
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* ── 1.3 COMMENTS & FEEDBACK ── */}
            {tab === "Comments & Feedback" && (
              <div className="space-y-6 w-full min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-purple-400" /> Client Comments & User Feedback
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">Review live comments, user ratings, author emails, and client activity logged in Realtime Database.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold rounded-lg font-mono">
                      {commentsList.length + testimonialsList.length} Total Submissions
                    </span>
                  </div>
                </div>

                {/* Stat Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatCard title="Total Comments" value={commentsList.length + testimonialsList.length} change="Live" up icon={<MessageSquare className="w-3.5 h-3.5 text-purple-400" />} sub="All Submissions" />
                  <StatCard title="Verified Users" value={commentsList.filter(c => c.email || c.userEmail).length + testimonialsList.length} change="100%" up icon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />} sub="Google / Email Synced" />
                  <StatCard title="Avg Rating" value="4.9 / 5.0" change="Excellent" up icon={<Star className="w-3.5 h-3.5 text-amber-400" />} sub="Client Satisfaction" />
                  <StatCard title="Latest Post" value={([...commentsList, ...testimonialsList][0]?.name || "Live")} change="Just now" up icon={<Clock className="w-3.5 h-3.5 text-blue-400" />} sub="Most Recent" />
                </div>

                {/* Filter / Search Bar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      placeholder="Search author name or email..."
                      className="w-full h-9 pl-9 pr-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">Showing all client comments from RTDB</span>
                </div>

                {/* Comments Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
                  {[...commentsList, ...testimonialsList]
                    .filter(c => {
                      if (!search) return true;
                      const q = search.toLowerCase();
                      return (c.name || c.author || c.userName || "").toLowerCase().includes(q) ||
                             (c.email || c.userEmail || "").toLowerCase().includes(q) ||
                             (c.text || c.comment || c.message || c.quote || "").toLowerCase().includes(q);
                    })
                    .map((item, idx) => (
                      <div key={item.rtdbKey || idx} className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 flex flex-col justify-between shadow-md">
                        <div className="space-y-2.5">
                          {/* User Header */}
                          <div className="flex items-center gap-3">
                            {item.image || item.userImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={item.image || item.userImage} alt={item.name || item.author || "User"} className="w-10 h-10 rounded-full object-cover border border-purple-500/50 shrink-0" />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-purple-500/20 text-purple-300 font-bold text-sm flex items-center justify-center border border-purple-500/40 shrink-0">
                                {(item.name || item.author || item.userName || "U").charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5">
                                <h4 className="text-xs font-bold text-zinc-100 truncate">{item.name || item.author || item.userName || "Verified User"}</h4>
                                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded shrink-0">Verified</span>
                              </div>
                              <p className="text-[10px] text-zinc-400 font-mono truncate">{item.email || item.userEmail || "Google Account User"}</p>
                            </div>
                          </div>

                          {/* Category / Rating */}
                          <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800/60">
                            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                              {item.role || item.title || "Community Comment"}
                            </span>
                            <div className="flex items-center text-amber-400 text-xs">
                              {"★".repeat(item.rating || 5)}
                            </div>
                          </div>

                          {/* Comment Content */}
                          <p className="text-xs text-zinc-200 leading-relaxed bg-zinc-950/70 p-3 rounded-lg border border-zinc-800/80 italic break-words">
                            “{item.text || item.comment || item.message || item.quote || item.review || "Great platform setup!"}”
                          </p>
                        </div>

                        {/* Actions & Timestamp */}
                        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                          <span className="text-[10px] font-mono text-zinc-500">
                            {formatTimeAgo(item.timestamp || item.createdAt || item.date)}
                          </span>
                          <button
                            onClick={async () => {
                              if (confirm("Are you sure you want to delete this comment?")) {
                                const path = item.type === 'comment' ? `comments/${item.rtdbKey}` : `testimonials/${item.rtdbKey}`;
                                await writeRtdbData(path, null);
                                setToasts(t => [...t, { id: Date.now(), msg: "Comment removed", type: "success" }]);
                              }
                            }}
                            className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* ── 1.5 GOOGLE LOGINS ── */}
            {tab === "Google Logins" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-400" /> Google Authenticated Accounts
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">Real Google OAuth accounts logged into Elite Trading Hub (Live RTDB Synced).</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">
                      {googleLogins.length} Google Accounts
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 sm:p-5 shadow-sm space-y-4">
                  {/* Mobile Card View (Small Screens <640px) */}
                  <div className="block sm:hidden space-y-3">
                    {googleLogins.length > 0 ? (
                      googleLogins.map((g, idx) => {
                        const initial = (g.name || g.displayName || g.email || "G").charAt(0).toUpperCase();
                        return (
                          <div key={g.rtdbKey || g.uid || idx} className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 space-y-3 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-3 min-w-0">
                                {g.photoURL || g.image ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img src={g.photoURL || g.image} alt={g.name || "User"} className="w-10 h-10 rounded-full border border-emerald-500/40 object-cover shrink-0" />
                                ) : (
                                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-bold text-sm shrink-0">
                                    {initial}
                                  </div>
                                )}
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-xs font-bold text-zinc-100 truncate">{g.name || g.displayName || "Google User"}</h4>
                                  <p className="text-[11px] text-zinc-400 font-mono truncate">{g.email}</p>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 whitespace-nowrap">
                                Google OAuth 2.0
                              </span>
                            </div>
                            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                              <span>Logged in {formatTimeAgo(g.lastLogin || g.createdAt || g.lastLoginFormatted)}</span>
                              <span className="truncate max-w-[130px]">UID: {g.uid ? `${g.uid.slice(0, 8)}...` : 'Active'}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-zinc-500 text-xs">
                        No Google accounts logged in yet.
                      </div>
                    )}
                  </div>

                  {/* Tablet & Desktop Table View (>=640px) */}
                  <div className="hidden sm:block overflow-x-auto min-w-0">
                    <table className="w-full text-left text-xs text-zinc-300 min-w-[700px]">
                      <thead className="bg-zinc-950/60 border-b border-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                        <tr>
                          <th className="py-3 px-4 whitespace-nowrap">User Avatar</th>
                          <th className="py-3 px-4 whitespace-nowrap">Google Account Name</th>
                          <th className="py-3 px-4 whitespace-nowrap">Email Address</th>
                          <th className="py-3 px-4 whitespace-nowrap">Auth Provider</th>
                          <th className="py-3 px-4 whitespace-nowrap">Last Login Time</th>
                          <th className="py-3 px-4 whitespace-nowrap">Google UID</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60">
                        {googleLogins.length > 0 ? (
                          googleLogins.map((g, idx) => {
                            const initial = (g.name || g.displayName || g.email || "G").charAt(0).toUpperCase();
                            return (
                              <tr key={g.rtdbKey || g.uid || idx} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  {g.photoURL || g.image ? (
                                    /* eslint-disable-next-line @next/next/no-img-element */
                                    <img src={g.photoURL || g.image} alt={g.name || "User"} className="w-8 h-8 rounded-full border border-zinc-700 object-cover" />
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs">
                                      {initial}
                                    </div>
                                  )}
                                </td>
                                <td className="py-3.5 px-4 font-semibold text-zinc-100 whitespace-nowrap">{g.name || g.displayName || "Google User"}</td>
                                <td className="py-3.5 px-4 font-mono text-zinc-300 whitespace-nowrap">{g.email}</td>
                                <td className="py-3.5 px-4 whitespace-nowrap">
                                  <span className="px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap inline-block">
                                    Google OAuth 2.0
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">{formatTimeAgo(g.lastLogin || g.createdAt || g.lastLoginFormatted)}</td>
                                <td className="py-3.5 px-4 font-mono text-[10px] text-zinc-500 max-w-[140px] truncate">{g.uid}</td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={6} className="py-12 text-center text-zinc-500">
                              <p className="text-xs font-medium">No Google accounts have signed in yet.</p>
                              <p className="text-[10px] text-zinc-600 mt-1">When users log in with Google, their verified account details will stream live into this view.</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ── 2. ANALYTICS ── */}
            {tab === "Analytics" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Hello, {user.displayName?.split(" ")[0] || "Admin"}</h2>
                  <p className="text-xs text-zinc-400 mt-1">Monitor traffic, engagement, and conversion performance in one view.</p>
                </div>

                {/* Sub tabs & Controls */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-3">
                  <div className="flex items-center gap-1 overflow-x-auto">
                    {["Overview", "Audience", "Acquisition", "Engagement", "Conversions"].map(st => (
                      <button
                        key={st}
                        onClick={() => setAnalyticsSubTab(st)}
                        className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                          analyticsSubTab === st
                            ? "bg-zinc-800 text-zinc-100 border border-zinc-700 shadow-sm"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={timeRange}
                      onChange={e => setTimeRange(e.target.value)}
                      className="h-8 text-xs bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-lg px-3 focus:outline-none focus:border-zinc-700"
                    >
                      <option>Last 4 weeks</option>
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Year to Date</option>
                    </select>
                    <button className="h-8 px-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-400 hover:text-zinc-200">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* KPI Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    { label: "Tracked Pageviews", value: pageViewsList.length > 0 ? pageViewsList.length : "Live Active", change: "↗ Realtime", up: true, sub: "Google Analytics & RTDB" },
                    { label: "Google Logins", value: googleLogins.length, change: "↗ Verified", up: true, sub: "Google OAuth users" },
                    { label: "Live Sessions", value: online > 0 ? online : "Active Now", change: "↗ Realtime", up: true, sub: "Current live visitors" },
                    { label: "Signals Sent", value: signalsCount, change: "↗ Realtime", up: true, sub: "Broadcast to terminals" },
                    { label: "Active Clients", value: clientsList.length, change: "↗ Synced", up: true, sub: "Registered accounts" },
                  ].map((m, i) => (
                    <div key={i} className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium text-zinc-400">{m.label}</span>
                        <MoreHorizontal className="w-3.5 h-3.5 text-zinc-600 cursor-pointer" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-zinc-100 tracking-tight">{m.value}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${m.up ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
                            {m.change}
                          </span>
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1 truncate">{m.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Charts Row */}
                <div className="grid gap-4 lg:grid-cols-7">
                  {/* Traffic Quality Chart */}
                  <div className="lg:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Traffic Quality</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Weekly score fluctuation vs benchmark</p>
                      </div>
                      <MoreHorizontal className="w-4 h-4 text-zinc-500" />
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={TRAFFIC_QUALITY_DATA} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                        <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#71717a" }} />
                        <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#71717a" }} />
                        <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#3f3f46", borderRadius: "8px", fontSize: "11px" }} />
                        <Line type="monotone" dataKey="val" stroke="#f4f4f5" strokeWidth={2} dot={false} name="Actual" />
                        <Line type="monotone" dataKey="benchmark" stroke="#52525b" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="Benchmark" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Realtime Visitors */}
                  <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-zinc-100">Realtime Visitors</h3>
                        <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-zinc-100 mb-4">
                        24 <span className="text-xs font-normal text-zinc-500">per minute</span>
                      </div>

                      <ResponsiveContainer width="100%" height={100}>
                        <BarChart data={REALTIME_VISITORS_DATA}>
                          <Bar dataKey="v" fill="#52525b" radius={[2, 2, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-800 mt-4">
                      {[
                        { flag: "🇺🇸", name: "United States", count: 14 },
                        { flag: "🇬🇧", name: "United Kingdom", count: 4 },
                        { flag: "🇨🇦", name: "Canada", count: 3 },
                        { flag: "🇮🇳", name: "India", count: 3 },
                      ].map((c) => (
                        <div key={c.name} className="flex items-center justify-between p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                          <span className="text-xs text-zinc-300 flex items-center gap-1.5">
                            <span>{c.flag}</span> <span className="truncate">{c.name}</span>
                          </span>
                          <span className="text-xs font-bold font-mono text-zinc-100">{c.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Page Performance */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-100">Top Performing Pages</h3>
                  <div className="divide-y divide-zinc-800">
                    {[
                      { path: "/dashboard/analytics", views: "142,390", time: "3m 42s", bounce: "24.1%" },
                      { path: "/dashboard/crm-v1", views: "98,120", time: "2m 15s", bounce: "31.4%" },
                      { path: "/dashboard/users", views: "74,500", time: "4m 02s", bounce: "18.9%" },
                      { path: "/auth/v1/login", views: "52,810", time: "1m 05s", bounce: "42.0%" },
                    ].map(p => (
                      <div key={p.path} className="flex items-center justify-between py-2.5 text-xs">
                        <span className="font-mono text-zinc-300 font-medium">{p.path}</span>
                        <div className="flex items-center gap-6 text-zinc-400">
                          <span>{p.views} views</span>
                          <span>{p.time} avg</span>
                          <span className="text-emerald-400">{p.bounce} bounce</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── 3. CRM (Real Live Sync Engine) ── */}
            {tab === "CRM" && (() => {
              // Dynamic aggregation of all real leads from Firebase RTDB
              const allLeadsMap = new Map<string, any>();

              // 1. Add crm/leads
              crmLeads.forEach((l) => {
                const k = (l.email || l.name || l.rtdbKey || "").toLowerCase();
                if (k) {
                  allLeadsMap.set(k, {
                    ref: l.ref || `L-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: l.name || "Verified Lead",
                    company: l.company || l.message?.slice(0, 25) || "Website Contact Form",
                    status: l.status || "Qualified",
                    source: l.source || "Website",
                    activity: l.createdAt ? formatTimeAgo(l.createdAt) : (l.activity || "Recent interaction"),
                    rtdbKey: l.rtdbKey,
                    isRtdbLead: true,
                  });
                }
              });

              // 2. Add Google Logins
              googleLogins.forEach((g) => {
                const k = (g.email || g.name || g.uid || "").toLowerCase();
                if (k && !allLeadsMap.has(k)) {
                  allLeadsMap.set(k, {
                    ref: `G-${g.uid ? g.uid.slice(0, 4) : "1001"}`,
                    name: g.name || g.displayName || "Google Account User",
                    company: g.email || "Google OAuth 2.0",
                    status: "Won",
                    source: "Google Auth",
                    activity: formatTimeAgo(g.lastLogin || g.createdAt),
                    rtdbKey: g.rtdbKey,
                    isGoogle: true,
                  });
                }
              });

              // 3. Add Registered Users
              usersList.forEach((u) => {
                const k = (u.email || u.name || "").toLowerCase();
                if (k && !allLeadsMap.has(k)) {
                  allLeadsMap.set(k, {
                    ref: `U-${Math.floor(1000 + Math.random() * 9000)}`,
                    name: u.name || u.displayName || "Registered Client",
                    company: u.team || "Client Gateway User",
                    status: u.status === "Active" ? "Won" : "Qualified",
                    source: "Direct Signup",
                    activity: formatTimeAgo(u.joined || u.createdAt),
                    rtdbKey: u.rtdbKey,
                  });
                }
              });

              // Fallback seed list if database is completely empty
              if (allLeadsMap.size === 0) {
                CRM_LEADS_TABLE.forEach((l) => allLeadsMap.set(l.ref, l));
              }

              const combinedLeadsList = Array.from(allLeadsMap.values());
              const totalLeadsCount = combinedLeadsList.length;
              const wonCount = combinedLeadsList.filter((l) => l.status === "Won").length;
              const qualifiedCount = combinedLeadsList.filter((l) => l.status === "Qualified" || l.status === "New").length;
              const proposalsCount = combinedLeadsList.filter((l) => l.status === "Proposal Sent" || l.status === "Negotiation").length;
              const calculatedRevenue = (clientsList.length * 49900) + (wonCount * 15000) + 56050;

              // Leads by source breakdown
              const sourceCounts: Record<string, number> = {};
              combinedLeadsList.forEach((l) => {
                const s = l.source || "Website";
                sourceCounts[s] = (sourceCounts[s] || 0) + 1;
              });

              const dynamicLeadsSourceData = [
                { name: "Website Form", value: sourceCounts["Website"] || sourceCounts["Website Form"] || 1, color: "#34d399" },
                { name: "Google Auth", value: sourceCounts["Google Auth"] || sourceCounts["Google OAuth"] || 1, color: "#60a5fa" },
                { name: "Direct Signup", value: sourceCounts["Direct Signup"] || sourceCounts["Direct"] || 1, color: "#a78bfa" },
                { name: "Referral", value: sourceCounts["Referral"] || 1, color: "#f59e0b" },
                { name: "Social Media", value: sourceCounts["Social Media"] || 1, color: "#f43f5e" },
              ];

              return (
                <div className="space-y-6 w-full min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-100 tracking-tight flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-emerald-400" /> Realtime CRM Engine & Sales Pipeline
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1">Live lead acquisition, real Firebase database sync, status tracking, and revenue management.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAddLeadOpen(true)}
                        className="h-9 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                      >
                        <Plus className="w-4 h-4" /> Add New Lead
                      </button>
                    </div>
                  </div>

                  {/* KPI row */}
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <p className="text-[11px] text-zinc-400 font-medium">Total Real Leads</p>
                      <p className="text-xs text-zinc-500">Synced Live</p>
                      <div className="text-2xl font-bold text-zinc-100 mt-2">{totalLeadsCount}</div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
                        +100% Live Database
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <p className="text-[11px] text-zinc-400 font-medium">Qualified Pipeline</p>
                      <p className="text-xs text-zinc-500">In Active Stage</p>
                      <div className="text-2xl font-bold text-zinc-100 mt-2">{qualifiedCount + proposalsCount}</div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
                        {Math.round(((qualifiedCount + proposalsCount) / (totalLeadsCount || 1)) * 100)}% Conversion
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <p className="text-[11px] text-zinc-400 font-medium">Calculated Revenue</p>
                      <p className="text-xs text-zinc-500">Active Subscriptions</p>
                      <div className="text-2xl font-bold text-emerald-400 mt-2">₹ {calculatedRevenue.toLocaleString("en-IN")}</div>
                      <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 inline-block mt-1">
                        +22.4% YTD
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <p className="text-[11px] text-zinc-400 font-medium">Won Clients</p>
                      <p className="text-xs text-zinc-500">Closed Accounts</p>
                      <div className="text-2xl font-bold text-zinc-100 mt-2">{wonCount}</div>
                      <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/20 inline-block mt-1">
                        Active Accounts
                      </span>
                    </div>

                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 col-span-2 lg:col-span-1">
                      <p className="text-[11px] text-zinc-400 font-medium">Data Integrity</p>
                      <p className="text-xs text-zinc-500">Firebase Status</p>
                      <div className="text-lg font-bold text-emerald-400 mt-2 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> 100% Live
                      </div>
                      <p className="text-[10px] text-zinc-500 mt-1">Realtime DB Connected</p>
                    </div>
                  </div>

                  {/* Charts Row */}
                  <div className="grid gap-4 lg:grid-cols-2">
                    {/* Leads by Source */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100 mb-4">Leads by Real Acquisition Source</h3>
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                          <div className="w-40 h-40 relative flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie data={dynamicLeadsSourceData} innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value">
                                  {dynamicLeadsSourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute text-center leading-none">
                              <p className="text-xl font-bold text-zinc-100">{totalLeadsCount}</p>
                              <p className="text-[10px] text-zinc-500">Total Leads</p>
                            </div>
                          </div>

                          <div className="space-y-2 flex-1 w-full">
                            {dynamicLeadsSourceData.map((s) => (
                              <div key={s.name} className="flex items-center justify-between text-xs">
                                <span className="flex items-center gap-2 text-zinc-400">
                                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                                  {s.name}
                                </span>
                                <span className="font-mono font-bold text-zinc-200">{s.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sales Pipeline Funnel */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                      <h3 className="text-sm font-semibold text-zinc-100 mb-4">Sales Pipeline Funnel</h3>
                      <div className="space-y-2">
                        {[
                          { stage: "All Total Leads", count: totalLeadsCount, pct: "100%" },
                          { stage: "Qualified", count: qualifiedCount, pct: `${Math.round((qualifiedCount / (totalLeadsCount || 1)) * 100)}%` },
                          { stage: "Proposal Sent", count: proposalsCount, pct: `${Math.round((proposalsCount / (totalLeadsCount || 1)) * 100)}%` },
                          { stage: "Won Accounts", count: wonCount, pct: `${Math.round((wonCount / (totalLeadsCount || 1)) * 100)}%` },
                        ].map((fn) => (
                          <div key={fn.stage} className="flex items-center justify-between p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg">
                            <span className="text-xs font-semibold text-zinc-300">{fn.stage}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-mono text-zinc-400">{fn.count} leads</span>
                              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">{fn.pct}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Live Realtime Leads Table */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Live CRM Database Leads</h3>
                        <p className="text-xs text-zinc-500">Every website inquiry, Google sign-in & form submission stream here in real time.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsAddLeadOpen(true)}
                          className="h-8 px-3 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" /> + Add Lead
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto min-w-0">
                      <table className="w-full text-left text-xs text-zinc-300 min-w-[750px]">
                        <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-3">Ref ID</th>
                            <th className="py-3 px-3">Lead / Client Name</th>
                            <th className="py-3 px-3">Company / Source Details</th>
                            <th className="py-3 px-3">Pipeline Status</th>
                            <th className="py-3 px-3">Acquisition Source</th>
                            <th className="py-3 px-3">Last Activity</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {combinedLeadsList.map((l, idx) => (
                            <tr key={l.rtdbKey || l.ref || idx} className="hover:bg-zinc-800/30 transition-colors">
                              <td className="py-3 px-3 font-mono text-zinc-400 whitespace-nowrap">{l.ref}</td>
                              <td className="py-3 px-3 font-semibold text-zinc-100 whitespace-nowrap">{l.name}</td>
                              <td className="py-3 px-3 text-zinc-400 max-w-[200px] truncate">{l.company}</td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <select
                                  value={l.status}
                                  onChange={async (e) => {
                                    const newStatus = e.target.value;
                                    if (l.rtdbKey && l.isRtdbLead) {
                                      await updateRtdbData(`crm/leads/${l.rtdbKey}`, { status: newStatus });
                                      setToasts(t => [...t, { id: Date.now(), msg: `Lead ${l.name} status updated to ${newStatus}`, type: "success" }]);
                                    }
                                  }}
                                  className="h-7 bg-zinc-950 border border-zinc-800 text-emerald-400 font-semibold rounded px-2 text-[11px] focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Qualified">Qualified</option>
                                  <option value="Proposal Sent">Proposal Sent</option>
                                  <option value="Negotiation">Negotiation</option>
                                  <option value="Won">Won</option>
                                </select>
                              </td>
                              <td className="py-3 px-3 whitespace-nowrap">
                                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                                  {l.source}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-zinc-400 font-mono text-[11px] whitespace-nowrap">{l.activity}</td>
                              <td className="py-3 px-3 text-right whitespace-nowrap">
                                {l.rtdbKey && (
                                  <button
                                    onClick={async () => {
                                      if (confirm(`Remove lead ${l.name} from CRM?`)) {
                                        const path = l.isRtdbLead ? `crm/leads/${l.rtdbKey}` : l.isGoogle ? `google_logins/${l.rtdbKey}` : `users/${l.rtdbKey}`;
                                        await writeRtdbData(path, null);
                                        setToasts(t => [...t, { id: Date.now(), msg: "Lead removed", type: "success" }]);
                                      }
                                    }}
                                    className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                    title="Delete Lead"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── 4. USERS ── */}
            {tab === "Users" && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Users</h2>
                    <p className="text-xs text-zinc-400 mt-1">Manage your organization members and their access.</p>
                  </div>
                  <button
                    onClick={() => setIsAddUserOpen(true)}
                    className="h-9 px-4 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add User
                  </button>
                </div>

                {/* Controls & Filter bar */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type="text"
                        value={userSearch}
                        onChange={e => setUserSearch(e.target.value)}
                        placeholder="Search users... ⌘K"
                        className="w-full h-9 pl-9 pr-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                      />
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto">
                      <button className="h-8 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5" /> Hide
                      </button>
                      <button className="h-8 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5">
                        <SlidersHorizontal className="w-3.5 h-3.5" /> Customize
                      </button>
                      <button className="h-8 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-300 hover:text-zinc-100 flex items-center gap-1.5">
                        <Download className="w-3.5 h-3.5" /> Export
                      </button>
                    </div>
                  </div>

                  {/* Filter dropdowns & View switcher */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">Role:</span>
                        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="h-7 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded px-2 focus:outline-none">
                          <option>All</option>
                          <option>Workspace Owner</option>
                          <option>Contributor</option>
                          <option>Security Admin</option>
                          <option>Team Lead</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">Team:</span>
                        <select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="h-7 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded px-2 focus:outline-none">
                          <option>All</option>
                          <option>Platform</option>
                          <option>Internal Tools</option>
                          <option>Customer Ops</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-zinc-500">Status:</span>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="h-7 bg-zinc-950 border border-zinc-800 text-zinc-200 rounded px-2 focus:outline-none">
                          <option>All</option>
                          <option>Active</option>
                          <option>Pending invite</option>
                          <option>Suspended</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500">{selectedUserIds.length} selected</span>
                      <div className="flex items-center border border-zinc-800 rounded-lg p-0.5 bg-zinc-950">
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-1.5 rounded ${viewMode === "list" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-1.5 rounded ${viewMode === "grid" ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                          <Grid className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User List Table or Grid */}
                {viewMode === "list" ? (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-zinc-300">
                        <thead className="bg-zinc-950/60 border-b border-zinc-800 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                          <tr>
                            <th className="py-3 px-4 w-10">
                              <input
                                type="checkbox"
                                checked={selectedUserIds.length > 0 && selectedUserIds.length === filteredUsers.length}
                                onChange={toggleSelectAllUsers}
                                className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 accent-emerald-500 cursor-pointer"
                              />
                            </th>
                            <th className="py-3 px-4">User</th>
                            <th className="py-3 px-4">Role / Team</th>
                            <th className="py-3 px-4">Workspace</th>
                            <th className="py-3 px-4">Status</th>
                            <th className="py-3 px-4">Joined date</th>
                            <th className="py-3 px-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/60">
                          {filteredUsers.length > 0 ? (
                            filteredUsers.map(u => (
                              <tr key={u.id} className="hover:bg-zinc-800/30 transition-colors">
                                <td className="py-3.5 px-4">
                                  <input
                                    type="checkbox"
                                    checked={selectedUserIds.includes(u.id)}
                                    onChange={() => toggleSelectUser(u.id)}
                                    className="w-3.5 h-3.5 rounded border-zinc-700 bg-zinc-900 accent-emerald-500 cursor-pointer"
                                  />
                                </td>
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center font-bold text-xs ${u.color || "bg-emerald-500/20 text-emerald-300"}`}>
                                      {(u.name || "U").split(" ").map((n: string) => n[0]).join("")}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-zinc-100">{u.name}</p>
                                      <p className="text-[11px] text-zinc-500 font-mono">{u.email}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-3.5 px-4">
                                  <p className="font-medium text-zinc-200">{u.role}</p>
                                  <p className="text-[10px] text-zinc-500">{u.team}</p>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className="px-2 py-0.5 text-[10px] font-mono bg-zinc-800 border border-zinc-700 text-zinc-300 rounded">
                                    {u.workspace}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4">
                                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                    u.status === "Active"
                                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                      : u.status === "Pending invite"
                                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                      : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                  }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                      u.status === "Active" ? "bg-emerald-400" : u.status === "Pending invite" ? "bg-amber-400" : "bg-rose-400"
                                    }`} />
                                    {u.status}
                                  </span>
                                </td>
                                <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px]">{u.joined}</td>
                                <td className="py-3.5 px-4 text-right">
                                  <button className="p-1 rounded text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800">
                                    <MoreHorizontal className="w-4 h-4" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="py-12 text-center text-zinc-500">
                                <p className="text-xs font-medium">No live organization users registered yet.</p>
                                <button
                                  onClick={() => setIsAddUserOpen(true)}
                                  className="mt-2 text-xs text-emerald-400 hover:underline font-semibold"
                                >
                                  + Add First Real User
                                </button>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map(u => (
                      <div key={u.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4 hover:border-zinc-700 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center font-bold text-xs ${u.color}`}>
                              {(u.name || "U").split(" ").filter(Boolean).map((n: string) => n[0] || "").join("")}
                            </div>
                            <div>
                              <h4 className="font-semibold text-zinc-100">{u.name}</h4>
                              <p className="text-xs text-zinc-500 font-mono truncate">{u.email}</p>
                            </div>
                          </div>
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                            u.status === "Active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          }`}>
                            {u.status}
                          </span>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-zinc-800/80 text-xs">
                          <div className="flex justify-between"><span className="text-zinc-500">Role:</span><span className="text-zinc-300 font-medium">{u.role}</span></div>
                          <div className="flex justify-between"><span className="text-zinc-500">Team:</span><span className="text-zinc-300 font-medium">{u.team}</span></div>
                          <div className="flex justify-between"><span className="text-zinc-500">Joined:</span><span className="text-zinc-400 font-mono">{u.joined}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add User Modal */}
                {isAddUserOpen && (
                  <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md space-y-4 shadow-2xl animate-in fade-in zoom-in-95">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                        <h3 className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                          <UserPlus className="w-4 h-4 text-emerald-400" /> Add New Organization Member
                        </h3>
                        <button onClick={() => setIsAddUserOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleAddUser} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
                          <input
                            type="text"
                            value={newUserName}
                            onChange={e => setNewUserName(e.target.value)}
                            placeholder="e.g. Alex Rivera"
                            required
                            className="w-full h-9 px-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={newUserEmail}
                            onChange={e => setNewUserEmail(e.target.value)}
                            placeholder="alex@weblabs.studio"
                            required
                            className="w-full h-9 px-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">Role</label>
                            <select
                              value={newUserRole}
                              onChange={e => setNewUserRole(e.target.value)}
                              className="w-full h-9 px-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none"
                            >
                              <option>Workspace Owner</option>
                              <option>Contributor</option>
                              <option>Security Admin</option>
                              <option>Team Lead</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1">Team</label>
                            <select
                              value={newUserTeam}
                              onChange={e => setNewUserTeam(e.target.value)}
                              className="w-full h-9 px-2 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 focus:outline-none"
                            >
                              <option>Platform</option>
                              <option>Internal Tools</option>
                              <option>Customer Ops</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-800">
                          <button
                            type="button"
                            onClick={() => setIsAddUserOpen(false)}
                            className="px-4 h-9 border border-zinc-800 bg-transparent text-zinc-400 hover:text-zinc-200 text-xs font-medium rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 h-9 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-colors"
                          >
                            Add Member
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── 5. CLIENTS ── */}
            {tab === "Clients" && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-b border-zinc-800">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">Client Directory</h3>
                    <p className="text-xs text-zinc-500 mt-0.5">{online} online · {active} active · {CLIENTS.length} total</p>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-zinc-600" />
                    <input
                      value={search} onChange={e => setSearch(e.target.value)}
                      placeholder="Search clients…"
                      className="h-8 w-56 pl-8 pr-3 text-xs bg-zinc-950 border border-zinc-800 rounded-md text-zinc-300 placeholder-zinc-600 focus:border-zinc-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="hidden sm:grid grid-cols-[1fr_1fr_auto_auto_auto] gap-4 px-5 py-2.5 border-b border-zinc-800/50">
                  {["Client", "Contact", "Plan", "Status", "Action"].map(h => (
                    <span key={h} className="text-[10px] font-semibold text-zinc-600 uppercase tracking-wider">{h}</span>
                  ))}
                </div>

                <div className="divide-y divide-zinc-800/40">
                  {filteredClients.map(c => (
                    <div key={c.id} className="flex flex-col sm:grid sm:grid-cols-[1fr_1fr_auto_auto_auto] gap-3 sm:gap-4 sm:items-center px-5 py-3.5 hover:bg-zinc-800/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-bold text-zinc-300">
                            {c.name.charAt(0)}
                          </div>
                          {c.online && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-zinc-900" />}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200">{c.name}</p>
                          <p className="text-[10px] text-zinc-600 font-mono">{c.id}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-zinc-400">{c.email}</p>
                        <p className="text-[10px] text-zinc-600 mt-0.5">Joined {c.joined}</p>
                      </div>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 uppercase tracking-wider w-fit">{c.plan}</span>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border uppercase tracking-wider w-fit ${c.status === "ACTIVE" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-zinc-800 border-zinc-700 text-zinc-500"}`}>
                        {c.status}
                      </span>
                      <button className="text-xs font-medium text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 bg-zinc-950 rounded-lg px-3 py-1.5 transition-colors w-fit">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 6. BROADCASTER ── */}
            {tab === "Broadcaster" && (
              <div className="max-w-xl">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Radio className="w-4 h-4 text-emerald-400" /> Signal Broadcaster
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Push live trade setups to all client terminals</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                  <form onSubmit={broadcast} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Index / Symbol</label>
                        <input value={symbol} onChange={e => setSymbol(e.target.value)}
                          className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:border-zinc-700 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Signal Bias</label>
                        <select value={bias} onChange={e => setBias(e.target.value)}
                          className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none">
                          <option>BULLISH</option><option>BEARISH</option><option>NEUTRAL</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[["Entry (₹)", entry, setEntry], ["Target (₹)", target, setTarget], ["Stop (₹)", stop, setStop]].map(([lbl, val, fn]: any) => (
                        <div key={lbl}>
                          <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">{lbl}</label>
                          <input value={val} onChange={(e: any) => fn(e.target.value)}
                            className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 font-mono focus:border-zinc-700 focus:outline-none" />
                        </div>
                      ))}
                    </div>

                    <button type="submit" disabled={sent}
                      className="w-full h-9 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      {sent ? "Signal Sent!" : "Broadcast Signal"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* ── 7. ANNOUNCEMENTS ── */}
            {tab === "Announcements" && (
              <div className="max-w-xl">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-emerald-400" /> Announcements
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Broadcast messages to all clients</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Title</label>
                    <input placeholder="e.g. Market session update"
                      className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-700 focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wider">Message</label>
                    <textarea rows={4} placeholder="Type your announcement here…"
                      className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-600 focus:border-zinc-700 focus:outline-none resize-none" />
                  </div>
                  <button
                    onClick={() => toast("Announcement published to all clients!", "success")}
                    className="w-full h-9 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Send className="w-3.5 h-3.5" /> Publish Announcement
                  </button>
                </div>
              </div>
            )}

            {/* ── 8. SETTINGS ── */}
            {tab === "Settings" && (
              <div className="max-w-sm">
                <div className="mb-5">
                  <h2 className="text-base font-semibold text-zinc-100">Settings</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Manage your admin account</p>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-center gap-3.5 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                    <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-base font-bold text-zinc-200">
                      {(user?.displayName || "A").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-100">{user?.displayName || "Administrator"}</p>
                      <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{user?.email || "admin@elitetradinghub.com"}</p>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mt-1.5 inline-block uppercase">
                        Administrator
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

          {/* Add User Modal */}
          {isAddUserOpen && (
            <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-emerald-400" /> Add New User
                  </h3>
                  <button onClick={() => setIsAddUserOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleAddUser} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Full Name</label>
                    <input
                      required
                      type="text"
                      value={newUserName}
                      onChange={e => setNewUserName(e.target.value)}
                      placeholder="e.g. Yash Vardhan"
                      className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      value={newUserEmail}
                      onChange={e => setNewUserEmail(e.target.value)}
                      placeholder="e.g. yash@elitetradinghub.com"
                      className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Role</label>
                      <select value={newUserRole} onChange={e => setNewUserRole(e.target.value)} className="w-full h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none">
                        <option>Contributor</option>
                        <option>Workspace Owner</option>
                        <option>Security Admin</option>
                        <option>Team Lead</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Team</label>
                      <select value={newUserTeam} onChange={e => setNewUserTeam(e.target.value)} className="w-full h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none">
                        <option>Platform</option>
                        <option>Internal Tools</option>
                        <option>Customer Ops</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-zinc-800">
                    <button type="button" onClick={() => setIsAddUserOpen(false)} className="h-8 px-4 bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 text-xs font-medium rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="h-8 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-colors">
                      Save to Firebase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add Lead Modal */}
          {isAddLeadOpen && (
            <div className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-emerald-400" /> Add New CRM Lead
                  </h3>
                  <button onClick={() => setIsAddLeadOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <form onSubmit={handleAddLead} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Lead / Contact Name</label>
                    <input
                      required
                      type="text"
                      value={leadName}
                      onChange={e => setLeadName(e.target.value)}
                      placeholder="e.g. Vikram Sharma"
                      className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1">Company / Trading Firm</label>
                    <input
                      type="text"
                      value={leadCompany}
                      onChange={e => setLeadCompany(e.target.value)}
                      placeholder="e.g. Alpha Quant Capital"
                      className="w-full h-9 px-3 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-100 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Pipeline Status</label>
                      <select value={leadStatus} onChange={e => setLeadStatus(e.target.value)} className="w-full h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none">
                        <option>Qualified</option>
                        <option>Proposal Sent</option>
                        <option>Negotiation</option>
                        <option>Won</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1">Lead Source</label>
                      <select value={leadSource} onChange={e => setLeadSource(e.target.value)} className="w-full h-9 px-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none">
                        <option>Website</option>
                        <option>Referral</option>
                        <option>Social Media</option>
                        <option>Direct</option>
                      </select>
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-end gap-2 border-t border-zinc-800">
                    <button type="button" onClick={() => setIsAddLeadOpen(false)} className="h-8 px-4 bg-zinc-950 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 text-xs font-medium rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="h-8 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-colors">
                      Save Lead to Firebase
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
