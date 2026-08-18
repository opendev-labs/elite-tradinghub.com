'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import {
  ShieldCheck, User, Lock, ArrowRight, ArrowUpRight, LogOut, ArrowLeft,
  Activity, Sparkles, AlertTriangle, CheckCircle2, Radio, Menu, X,
  TrendingUp, Bell, Eye, EyeOff, Loader2, RefreshCw, Send, Sliders,
  Zap, Target, Shield, PieChart as PieIcon, LineChart, Layers, Crosshair,
  BarChart2, Globe, Clock, ChevronRight, Terminal, DollarSign
} from 'lucide-react'
import { AdminDashboardView } from './admin-dashboard'
import {
  signInWithGoogleFirebase, logoutFirebase, getStoredUser, subscribeFirebaseUser, UserSessionData
} from '@/lib/firebase'

const fadeUp = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

const miniPerformanceData = [
  { time: '09:15', value: 24520, pnl: +1200 },
  { time: '10:30', value: 24590, pnl: +3400 },
  { time: '11:45', value: 24630, pnl: +2800 },
  { time: '13:00', value: 24680, pnl: +6500 },
  { time: '14:15', value: 24710, pnl: +8900 },
  { time: '15:30', value: 24750, pnl: +11450 },
]

const optionFlowData = [
  { strike: '24500 CE', oi: 142000, type: 'CALL WRITING', bias: 'BULLISH' },
  { strike: '24600 CE', oi: 189000, type: 'HEAVY CALL OI', bias: 'BULLISH' },
  { strike: '24700 PE', oi: 95000, type: 'PUT WRITING', bias: 'SUPPORT' },
  { strike: '24800 PE', oi: 124000, type: 'PUT BUYING', bias: 'BEARISH' },
]

// === $3M STARTUP INSTITUTIONAL CLIENT DASHBOARD ===
function ClientDashboard({ name, image, email, onLogout }: {
  name: string, image?: string | null, email?: string | null, onLogout: () => void
}) {
  const initials = name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'PRO'
  const [activeTab, setActiveTab] = useState<'signals' | 'analytics' | 'risk' | 'options'>('signals')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [accountBalance, setAccountBalance] = useState('1000000')
  const [riskPercent, setRiskPercent] = useState('1.0')
  const [copiedSignal, setCopiedSignal] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [refreshNotice, setRefreshNotice] = useState('')

  // Risk Math
  const capital = parseFloat(accountBalance || '0')
  const riskRatio = parseFloat(riskPercent || '0') / 100
  const maxRiskInr = capital * riskRatio
  const recommendedNiftyLots = Math.max(1, Math.floor(maxRiskInr / 3500))

  const copyTradeSignal = (sym: string, entry: string, target: string, stop: string) => {
    const text = `[ELITE SIGNALS] ${sym} | ENTRY: ₹${entry} | TARGET: ₹${target} | STOP: ₹${stop}`
    navigator.clipboard.writeText(text)
    setCopiedSignal(sym)
    setTimeout(() => setCopiedSignal(null), 2500)
  }

  const handleRefreshFeed = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsRefreshing(true)
    setRefreshNotice('Feed Refreshed!')
    setTimeout(() => {
      setIsRefreshing(false)
      setTimeout(() => setRefreshNotice(''), 2000)
    }, 800)
  }

  return (
    <div className="client-portal-wrapper-v3">
      {/* Persistent Full-Width Global Top Header */}
      <header className="client-global-header-v3">
        <div className="header-brand-left-v3">
          <button className="mobile-hamburger-btn" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="back-to-site-btn-v3">
            <ArrowLeft size={15} /> <span>Back to Website</span>
          </Link>
          <div className="header-divider-v3" />
          <div className="header-brand-title-v3">
            <img src="/only-bull-head-icon.png" alt="Elite Hub" className="header-bull-logo-v3" />
            <span>ELITE<b>TRADING</b><em style={{ fontStyle: 'normal', color: '#5c6c75' }}>HUB</em></span>
            <span className="terminal-badge-tag">INSTITUTIONAL TERMINAL</span>
          </div>
        </div>

        <div className="header-brand-right-v3">
          <div className="feed-status-pill">
            <span className="live-dot-green" />
            <span>NSE DIRECT FEED · 8ms</span>
          </div>

          <div className="pro-member-tag">
            <ShieldCheck size={14} />
            <span>PRO CLIENT MEMBER</span>
          </div>

          <div className="user-profile-chip">
            {image ? (
              <img src={image} alt={name} className="user-chip-avatar" />
            ) : (
              <div className="user-chip-initials">{initials}</div>
            )}
            <span className="user-chip-name">{name.split(' ')[0]}</span>
            <button onClick={onLogout} className="user-chip-logout" title="Sign Out">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="client-portal-shell-v3">
        {/* Dynamic Glowing Accents */}
        <div className="portal-glow-accent-left" />
        <div className="portal-glow-accent-right" />

        {/* Sidebar Nav - FIXED NON-SCROLLING */}
        <aside className={`client-sidebar-v3 ${mobileNavOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-brand-head">
            <div className="sidebar-brand-icon">
              <img src="/only-bull-head-icon.png" alt="Elite Hub" />
            </div>
            <div>
              <span className="sidebar-brand-name">ELITE<b>HUB</b></span>
              <span className="sidebar-brand-sub">PRO CLIENT DESK</span>
            </div>
          </div>

          <div className="sidebar-nav-section-label">MARKET TERMINAL</div>
          <nav className="sidebar-nav-list-v3">
            <button
              onClick={() => { setActiveTab('signals'); setMobileNavOpen(false) }}
              className={`sidebar-nav-btn ${activeTab === 'signals' ? 'active' : ''}`}
            >
              <Zap size={16} />
              <span>Live Algo Signals</span>
              <span className="nav-count-badge">5</span>
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setMobileNavOpen(false) }}
              className={`sidebar-nav-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            >
              <BarChart2 size={16} />
              <span>Quant Analytics</span>
            </button>

            <button
              onClick={() => { setActiveTab('risk'); setMobileNavOpen(false) }}
              className={`sidebar-nav-btn ${activeTab === 'risk' ? 'active' : ''}`}
            >
              <Shield size={16} />
              <span>Position Risk Engine</span>
            </button>

            <button
              onClick={() => { setActiveTab('options'); setMobileNavOpen(false) }}
              className={`sidebar-nav-btn ${activeTab === 'options' ? 'active' : ''}`}
            >
              <Layers size={16} />
              <span>Options Flow & OI</span>
            </button>
          </nav>

          <div className="sidebar-nav-section-label">RESOURCES</div>
          <nav className="sidebar-nav-list-v3">
            <a href="/methodology" className="sidebar-nav-btn">
              <Sparkles size={16} />
              <span>Methodology & Edge</span>
            </a>
            <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer" className="sidebar-nav-btn telegram-btn">
              <Send size={16} />
              <span>Telegram VIP Channel</span>
              <ArrowUpRight size={13} />
            </a>
          </nav>

          <div className="sidebar-user-card-v3">
            <div className="avatar-wrap-v3">
              {image ? (
                <img src={image} alt={name} className="user-avatar-v3" />
              ) : (
                <div className="user-initials-v3">{initials}</div>
              )}
              <span className="online-dot-v3" />
            </div>
            <div className="user-info-v3">
              <b>{name}</b>
              <small>{email || 'client@elitetradinghub.com'}</small>
            </div>
            <button onClick={onLogout} className="logout-icon-btn-v3" title="Sign Out">
              <LogOut size={15} />
            </button>
          </div>
        </aside>

        {/* Main Glass Workspace Content - SCROLLS INDEPENDENTLY */}
        <main className="client-main-v3">
          {/* Top Ticker Row */}
          <div className="metrics-ticker-grid-v3">
            <div className="metric-ticker-card emerald">
              <div className="ticker-head">
                <span className="ticker-label">NIFTY 50 INDEX</span>
                <span className="ticker-badge bull">BULLISH</span>
              </div>
              <strong className="ticker-val">24,710.45</strong>
              <small className="ticker-sub pos">+142.80 (+0.58%)</small>
            </div>

            <div className="metric-ticker-card crimson">
              <div className="ticker-head">
                <span className="ticker-label">BANK NIFTY INDEX</span>
                <span className="ticker-badge bear">BEARISH</span>
              </div>
              <strong className="ticker-val">53,420.10</strong>
              <small className="ticker-sub neg">-180.25 (-0.34%)</small>
            </div>

            <div className="metric-ticker-card emerald">
              <div className="ticker-head">
                <span className="ticker-label">PORTFOLIO RISK STATUS</span>
                <span className="ticker-badge safe">PROTECTED</span>
              </div>
              <strong className="ticker-val">OPTIMAL (0.8%)</strong>
              <small className="ticker-sub pos">Max Limit 2.0%</small>
            </div>

            <div className="metric-ticker-card emerald">
              <div className="ticker-head">
                <span className="ticker-label">TODAY'S CUMULATIVE P&L</span>
                <span className="ticker-badge gain">PROFITABLE</span>
              </div>
              <strong className="ticker-val">+₹11,450</strong>
              <small className="ticker-sub pos">6 Signals Executed</small>
            </div>
          </div>

          {/* Workspace Body */}
          <div className="client-workspace-content-v3">
            {/* TAB 1: LIVE ALGO SIGNALS */}
            {activeTab === 'signals' && (
              <div className="workspace-signals-layout">
                {/* Left Signals List Panel */}
                <motion.div className="glass-panel-v3" variants={fadeUp} initial="hidden" animate="visible">
                  {/* Admin Broadcast Sync Banner */}
                  <div className="admin-broadcast-banner-v3">
                    <div className="banner-left">
                      <Radio size={18} className="pulse-radio-icon" />
                      <span><b>DIRECT ADMIN DESK BROADCAST:</b> Real-time setups published from the Admin Control Center arrive live below.</span>
                    </div>
                    <span className="banner-sync-tag">SYNC ACTIVE</span>
                  </div>

                  <div className="panel-header-v3">
                    <div>
                      <span className="panel-kicker-v3">INSTITUTIONAL SIGNAL STREAM</span>
                      <h2 className="panel-title-v3">Real-Time Algo Setups</h2>
                    </div>
                    <button type="button" className="btn-refresh-v3" onClick={handleRefreshFeed}>
                      <RefreshCw size={13} className={isRefreshing ? 'spin-icon' : ''} />
                      <span>{refreshNotice || 'Refresh Feed'}</span>
                    </button>
                  </div>

                  <div className="signals-list-v3">
                    {[
                      { sym: 'NIFTY 50 24700 CE', bias: 'BULLISH', entry: '24,680', target: '24,840', stop: '24,560', score: 92, status: 'HIGH CONVICTION', rr: '1:2.4', pnl: '+₹4,800' },
                      { sym: 'BANK NIFTY 53500 PE', bias: 'BEARISH', entry: '53,400', target: '52,900', stop: '53,750', score: 81, status: 'WATCHING', rr: '1:1.8', pnl: 'PENDING' },
                      { sym: 'RELIANCE 3250 CE', bias: 'BULLISH', entry: '3,245', target: '3,320', stop: '3,195', score: 87, status: 'TARGET 1 HIT', rr: '1:2.6', pnl: '+₹3,250' },
                      { sym: 'HDFCBANK 1650 CE', bias: 'BULLISH', entry: '1,640', target: '1,685', stop: '1,615', score: 84, status: 'TRIGGERED', rr: '1:2.1', pnl: '+₹1,800' },
                      { sym: 'INFOSYS 1880 PE', bias: 'BEARISH', entry: '1,890', target: '1,840', stop: '1,915', score: 78, status: 'WATCHING', rr: '1:2.0', pnl: 'PENDING' },
                    ].map((s) => (
                      <div key={s.sym} className={`signal-card-v3 ${s.bias.toLowerCase()}`}>
                        <div className="signal-info-left">
                          <div className="signal-header-row">
                            <b className="symbol-name">{s.sym}</b>
                            <span className={`bias-tag ${s.bias.toLowerCase()}`}>{s.bias}</span>
                            <span className="status-tag">{s.status}</span>
                          </div>

                          <div className="signal-levels-grid">
                            <div><span className="lvl-lbl">ENTRY</span><b>₹{s.entry}</b></div>
                            <div><span className="lvl-lbl">TARGET</span><b className="pos">₹{s.target}</b></div>
                            <div><span className="lvl-lbl">STOP LOSS</span><b className="neg">₹{s.stop}</b></div>
                            <div><span className="lvl-lbl">R:R RATIO</span><b>{s.rr}</b></div>
                          </div>
                        </div>

                        <div className="signal-info-right">
                          <div className="score-wrap">
                            <strong className="score-num">{s.score}</strong>
                            <small className="score-max">/100</small>
                          </div>

                          <button
                            onClick={() => copyTradeSignal(s.sym, s.entry, s.target, s.stop)}
                            className="btn-copy-signal"
                          >
                            {copiedSignal === s.sym ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                            <span>{copiedSignal === s.sym ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Performance Sidebar */}
                <div className="workspace-side-tactical">
                  <motion.div className="glass-panel-v3" variants={fadeUp} initial="hidden" animate="visible">
                    <div className="panel-header-v3">
                      <div>
                        <span className="panel-kicker-v3">SESSION TELEMETRY</span>
                        <h3 className="panel-title-v3">Performance Curve</h3>
                      </div>
                    </div>

                    <div className="chart-container-v3">
                      <ResponsiveContainer width="100%" height={160}>
                        <AreaChart data={miniPerformanceData}>
                          <defs>
                            <linearGradient id="pnlGradV3" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#26d98a" stopOpacity={0.4} />
                              <stop offset="95%" stopColor="#26d98a" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" stroke="#3a4f48" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis stroke="#3a4f48" fontSize={10} axisLine={false} tickLine={false} hide />
                          <RechartsTooltip contentStyle={{ background: '#091016', border: '1px solid #1e3530', borderRadius: '6px', fontSize: 11 }} />
                          <Area type="monotone" dataKey="pnl" stroke="#26d98a" strokeWidth={2} fillOpacity={1} fill="url(#pnlGradV3)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="telemetry-summary-rows">
                      <div><span>Win Rate:</span><b className="pos">83.3% (5/6)</b></div>
                      <div><span>Profit Factor:</span><b>3.24</b></div>
                      <div><span>Max Drawdown:</span><b className="pos">-0.32%</b></div>
                    </div>
                  </motion.div>

                  <motion.div className="glass-panel-v3 vip-card-v3" variants={fadeUp} initial="hidden" animate="visible" style={{ transitionDelay: '0.1s' }}>
                    <div className="vip-head-v3">
                      <div className="vip-icon-v3"><Send size={22} /></div>
                      <div>
                        <h4>VIP Signal Telegram Channel</h4>
                        <p>Instant mobile push alerts and live order execution updates.</p>
                      </div>
                    </div>
                    <a
                      href="https://t.me/+la1ShIiNHJ5mYzk1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vip-btn-v3"
                    >
                      <span>Join Telegram Channel</span>
                      <ArrowUpRight size={16} />
                    </a>
                  </motion.div>
                </div>
              </div>
            )}

            {/* TAB 2: QUANT ANALYTICS */}
            {activeTab === 'analytics' && (
              <motion.div className="glass-panel-v3" variants={fadeUp} initial="hidden" animate="visible">
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">QUANTITATIVE ENGINE</span>
                    <h2 className="panel-title-v3">Market Trajectory & Volume Profiler</h2>
                  </div>
                </div>

                <div className="quant-chart-box">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={miniPerformanceData}>
                      <defs>
                        <linearGradient id="quantGradV3" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5c9cf5" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#5c9cf5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} />
                      <YAxis stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
                      <RechartsTooltip contentStyle={{ background: '#091016', border: '1px solid #1e3530', borderRadius: '6px', fontSize: 12 }} />
                      <Area type="monotone" dataKey="value" stroke="#5c9cf5" strokeWidth={2.5} fillOpacity={1} fill="url(#quantGradV3)" name="NIFTY Index Value" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            )}

            {/* TAB 3: POSITION RISK ENGINE */}
            {activeTab === 'risk' && (
              <motion.div className="glass-panel-v3" variants={fadeUp} initial="hidden" animate="visible">
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">CAPITAL PRESERVATION</span>
                    <h2 className="panel-title-v3">Institutional Risk Calculator</h2>
                  </div>
                </div>

                <div className="risk-engine-grid-v3">
                  <div className="risk-inputs-col">
                    <label className="risk-input-label">
                      <span>ACCOUNT CAPITAL (INR)</span>
                      <input
                        type="number"
                        value={accountBalance}
                        onChange={(e) => setAccountBalance(e.target.value)}
                      />
                    </label>

                    <label className="risk-input-label">
                      <span>MAX RISK PER TRADE (%)</span>
                      <input
                        type="number"
                        step="0.1"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="risk-output-col">
                    <span className="risk-output-lbl">MAX ALLOWABLE TRADE RISK</span>
                    <strong className="risk-output-val">₹{maxRiskInr.toLocaleString('en-IN')}</strong>
                    <p className="risk-output-sub">Automated position size calculated for drawdown protection.</p>

                    <div className="risk-cards-grid">
                      <div className="risk-lot-card">
                        <span>NIFTY Futures</span>
                        <b>{recommendedNiftyLots} Lots</b>
                      </div>
                      <div className="risk-lot-card">
                        <span>BANK NIFTY</span>
                        <b>{Math.max(1, Math.floor(recommendedNiftyLots / 2))} Lots</b>
                      </div>
                      <div className="risk-lot-card">
                        <span>Option Premium</span>
                        <b>₹{(maxRiskInr * 0.8).toLocaleString('en-IN')}</b>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: OPTIONS FLOW & OI */}
            {activeTab === 'options' && (
              <motion.div className="glass-panel-v3" variants={fadeUp} initial="hidden" animate="visible">
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">INSTITUTIONAL FLOW</span>
                    <h2 className="panel-title-v3">Option Chain Open Interest & Gamma Profile</h2>
                  </div>
                </div>

                <div className="table-responsive-v3">
                  <table className="options-flow-table-v3">
                    <thead>
                      <tr>
                        <th>STRIKE & OPTION</th>
                        <th>OPEN INTEREST (OI)</th>
                        <th>FLOW CLASSIFICATION</th>
                        <th>INSTITUTIONAL BIAS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optionFlowData.map((o) => (
                        <tr key={o.strike}>
                          <td><b>{o.strike}</b></td>
                          <td>{o.oi.toLocaleString()} Contracts</td>
                          <td><span className="flow-badge">{o.type}</span></td>
                          <td>
                            <span className={`bias-status-pill ${o.bias.toLowerCase()}`}>
                              {o.bias}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

// === MAIN AUTH PORTAL WRAPPER ===
export function AuthPortal() {
  const { data: session, status } = useSession()
  const [tab, setTab] = useState<'client' | 'admin'>('client')
  const [adminUser, setAdminUser] = useState('')
  const [adminPass, setAdminPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [adminError, setAdminError] = useState('')
  const [adminLoading, setAdminLoading] = useState(false)

  // Firebase Google Auth State with Session Persistence
  const [firebaseUser, setFirebaseUser] = useState<UserSessionData | null>(null)
  const [googleLoading, setGoogleLoading] = useState(false)
  const [googleError, setGoogleError] = useState('')

  useEffect(() => {
    setFirebaseUser(getStoredUser())
    const unsubscribe = subscribeFirebaseUser((user) => {
      setFirebaseUser(user)
    })
    return () => unsubscribe()
  }, [])

  if (status === 'loading') {
    return (
      <div className="auth-loading-state">
        <Loader2 size={28} className="spin-icon" />
        <span>Authenticating session…</span>
      </div>
    )
  }

  if (firebaseUser) {
    return (
      <ClientDashboard
        name={firebaseUser.name}
        image={firebaseUser.image}
        email={firebaseUser.email}
        onLogout={async () => {
          await logoutFirebase()
          setFirebaseUser(null)
        }}
      />
    )
  }

  if (session) {
    const role = (session.user as any)?.role
    const name = session.user?.name || 'Trader'
    const image = session.user?.image
    const email = session.user?.email

    if (role === 'ADMIN') {
      return (
        <div>
          <AdminDashboardView />
        </div>
      )
    }

    return (
      <ClientDashboard
        name={name}
        image={image}
        email={email}
        onLogout={() => signOut({ callbackUrl: '/login' })}
      />
    )
  }

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdminLoading(true)
    setAdminError('')
    const result = await signIn('credentials', {
      username: adminUser,
      password: adminPass,
      redirect: false,
    })
    setAdminLoading(false)
    if (result?.error) {
      setAdminError('Invalid admin credentials. Use username "yash" and password "123123".')
    }
  }

  const handleGoogleLogin = async () => {
    setGoogleLoading(true)
    setGoogleError('')

    const fbResult = await signInWithGoogleFirebase()
    if (fbResult.user) {
      setFirebaseUser(fbResult.user)
      setGoogleLoading(false)
      return
    }

    try {
      await signIn('google', { callbackUrl: '/login' })
    } catch (err: any) {
      setGoogleError(err?.message || fbResult.error || 'Google Sign-In failed')
      setGoogleLoading(false)
    }
  }

  return (
    <div className="auth-login-outer">
      <div className="auth-tab-row">
        <button
          className={`auth-tab ${tab === 'client' ? 'active' : ''}`}
          onClick={() => setTab('client')}
        >
          <User size={14} /> Client SSO Portal
        </button>
        <button
          className={`auth-tab ${tab === 'admin' ? 'active' : ''}`}
          onClick={() => setTab('admin')}
        >
          <ShieldCheck size={14} /> Admin Access Desk
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'client' ? (
          <motion.div
            key="client"
            className="auth-panel google-enterprise-panel"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="auth-panel-head">
              <div className="google-partner-badge">
                <img src="/only-bull-head-icon.png" alt="Elite Trading Hub" className="auth-bull-icon" />
                <span>ELITE TRADING HUB · MEMBER ACCESS</span>
              </div>
              <h2>Institutional Member Portal</h2>
              <p>Sign in with your Google account to access your live trading terminal.</p>
            </div>

            <motion.button
              className="google-signin-btn-enterprise"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              {googleLoading ? (
                <Loader2 size={18} className="spin-icon" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                </svg>
              )}
              <span>{googleLoading ? 'Authenticating with Google…' : 'Continue with Google Workspace'}</span>
            </motion.button>

            {googleError && (
              <p className="auth-error mt-3">
                <AlertTriangle size={14} /> {googleError}
              </p>
            )}

            <div className="enterprise-security-footer">
              <ShieldCheck size={14} style={{ color: '#26d98a' }} />
              <span>256-bit Encrypted Session · Single Sign-On</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="admin"
            className="auth-panel google-enterprise-panel"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="auth-panel-head">
              <div className="auth-shield-icon"><ShieldCheck size={28} /></div>
              <h2>Admin Desk Access</h2>
              <p>Enter administrator credentials to manage member records and signal broadcasts.</p>
            </div>

            <form onSubmit={handleAdminLogin} className="auth-form">
              <label className="auth-label">
                ADMINISTRATOR USERNAME
                <input
                  type="text"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="yash"
                  required
                  autoComplete="username"
                />
              </label>

              <label className="auth-label">
                ADMINISTRATOR PASSWORD
                <div className="auth-password-field">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="123123"
                    required
                    autoComplete="current-password"
                  />
                  <button type="button" className="auth-eye-btn" onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              {adminError && (
                <p className="auth-error">
                  <AlertTriangle size={14} /> {adminError}
                </p>
              )}

              <motion.button
                type="submit"
                className="auth-submit-btn"
                disabled={adminLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {adminLoading ? <Loader2 size={16} className="spin-icon" /> : <Lock size={16} />}
                {adminLoading ? 'Authenticating Admin…' : 'Access Admin Control Desk'}
              </motion.button>
            </form>

            <p className="auth-security-note">
              <ShieldCheck size={12} /> Authorized System Admin: <b>yash</b> / <b>123123</b>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
