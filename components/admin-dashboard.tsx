'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { signOut } from 'next-auth/react'
import {
  Users, Activity, Search, LogOut, ArrowLeft,
  ArrowUpRight, Eye, CreditCard, Server,
  LayoutDashboard, BarChart2, FileText, Settings, Bell, Menu, X,
  Radio, Plus, CheckCircle2, Shield, ShieldCheck, RefreshCw, Trash2, Send
} from 'lucide-react'

const userGrowthData = [
  { month: 'Jan', users: 4200, active: 2800 },
  { month: 'Feb', users: 5800, active: 3900 },
  { month: 'Mar', users: 7400, active: 5100 },
  { month: 'Apr', users: 9100, active: 6400 },
  { month: 'May', users: 11200, active: 7800 },
  { month: 'Jun', users: 14280, active: 8940 },
]

const usageByFeature = [
  { name: 'Index Setups', views: 42300 },
  { name: 'Risk Calculator', views: 28900 },
  { name: 'Options Context', views: 19400 },
  { name: 'Methodology', views: 12100 },
]

const geoData = [
  { name: 'Mumbai', value: 38, color: '#26d98a' },
  { name: 'Bengaluru', value: 26, color: '#5c9cf5' },
  { name: 'Delhi NCR', value: 20, color: '#e0b15a' },
  { name: 'Hyderabad & Pune', value: 16, color: '#f0646b' },
]

const initialUsersList = [
  { id: 'TRD-2026-0001', name: 'Riya Sharma', email: 'riya@trading.com', phone: '+91 98765 43210', tier: 'PRO TERMINAL', status: 'ACTIVE', volume: '₹42.5L' },
  { id: 'TRD-2026-0002', name: 'Arjun Mehta', email: 'arjun@trading.com', phone: '+91 87654 32109', tier: 'ENTERPRISE', status: 'ACTIVE', volume: '₹1.8Cr' },
  { id: 'TRD-2026-0003', name: 'Priya Patel', email: 'priya@trading.com', phone: '+91 76543 21098', tier: 'PRO TERMINAL', status: 'INACTIVE', volume: '₹85.0L' },
  { id: 'TRD-2026-0004', name: 'Vikram Singh', email: 'vikram@trading.com', phone: '+91 65432 10987', tier: 'ENTERPRISE', status: 'ACTIVE', volume: '₹2.4Cr' },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Users, label: 'Trader Records', id: 'users' },
  { icon: Radio, label: 'Signal Broadcaster', id: 'broadcaster' },
  { icon: BarChart2, label: 'Quant Analytics', id: 'analytics' },
  { icon: Settings, label: 'System Settings', id: 'settings' },
]

export function AdminDashboardView() {
  const [activeNav, setActiveNav] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('ALL')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [userList, setUserList] = useState(initialUsersList)

  // Add Trader form state
  const [newTraderName, setNewTraderName] = useState('')
  const [newTraderEmail, setNewTraderEmail] = useState('')
  const [newTraderPhone, setNewTraderPhone] = useState('')
  const [newTraderAccount, setNewTraderAccount] = useState('')

  // Broadcaster state
  const [signalSymbol, setSignalSymbol] = useState('NIFTY 50 24700 CE')
  const [signalBias, setSignalBias] = useState('BULLISH')
  const [signalEntry, setSignalEntry] = useState('24,680')
  const [signalTarget, setSignalTarget] = useState('24,840')
  const [signalStop, setSignalStop] = useState('24,560')
  const [broadcastSent, setBroadcastSent] = useState(false)

  const filteredUsers = useMemo(() => {
    return userList.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTier = tierFilter === 'ALL' || u.tier === tierFilter
      return matchesSearch && matchesTier
    })
  }, [userList, searchTerm, tierFilter])

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault()
    setBroadcastSent(true)
    setTimeout(() => setBroadcastSent(false), 4000)
  }

  const toggleUserStatus = (id: string) => {
    setUserList(prev => prev.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
      }
      return u
    }))
  }

  const handleAddTrader = () => {
    if (!newTraderName || !newTraderEmail || !newTraderPhone) {
      alert('Please fill in trader name, email, and phone.')
      return
    }
    const newAcc = newTraderAccount || `TRD-2026-${Math.floor(Math.random() * 9000) + 1000}`
    setUserList(prev => [
      {
        id: newAcc,
        name: newTraderName,
        email: newTraderEmail,
        phone: newTraderPhone,
        tier: 'PRO TERMINAL',
        status: 'ACTIVE',
        volume: '₹12.5L'
      },
      ...prev
    ])
    setNewTraderName('')
    setNewTraderEmail('')
    setNewTraderPhone('')
    setNewTraderAccount('')
  }

  const handleDeleteTrader = (id: string) => {
    if (confirm('Delete this trader record?')) {
      setUserList(prev => prev.filter(u => u.id !== id))
    }
  }

  const activeCount = userList.filter(u => u.status === 'ACTIVE').length

  return (
    <div className="admin-portal-wrapper-v3">
      {/* Top Persistent Header Bar */}
      <header className="admin-global-header-v3">
        <div className="header-brand-left-v3">
          <button className="mobile-hamburger-btn" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <Link href="/" className="back-to-site-btn-v3">
            <ArrowLeft size={15} /> <span>Back to Site</span>
          </Link>
          <div className="header-divider-v3" />
          <div className="header-brand-title-v3">
            <img src="/only-bull-head-icon.png" alt="Elite Admin" className="header-bull-logo-v3" />
            <span>ELITE<b>TRADING</b><em style={{ fontStyle: 'normal', color: '#5c6c75' }}>HUB</em></span>
            <span className="admin-badge-tag">ADMIN CONTROL CENTER</span>
          </div>
        </div>

        <div className="header-brand-right-v3">
          <div className="feed-status-pill">
            <span className="live-dot-green" />
            <span>BROADCASTER ACTIVE · 12ms</span>
          </div>

          <div className="user-profile-chip admin-chip">
            <div className="user-chip-initials admin-initials">Y</div>
            <span className="user-chip-name">Yash (Admin)</span>
            <button onClick={() => signOut({ callbackUrl: '/login' })} className="user-chip-logout" title="Sign Out">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Shell */}
      <div className="admin-portal-shell-v3">
        {/* Sidebar Nav */}
        <aside className={`admin-sidebar-v3 ${mobileNavOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-brand-head">
            <div className="sidebar-brand-icon admin-icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <span className="sidebar-brand-name">ADMIN<b>DESK</b></span>
              <span className="sidebar-brand-sub">CONTROL CENTER</span>
            </div>
          </div>

          <div className="sidebar-nav-section-label">MANAGEMENT</div>
          <nav className="sidebar-nav-list-v3">
            {navItems.map(({ icon: Icon, label, id }) => (
              <button
                key={id}
                onClick={() => { setActiveNav(id); setMobileNavOpen(false) }}
                className={`sidebar-nav-btn ${activeNav === id ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <div className="sidebar-user-card-v3">
            <div className="avatar-wrap-v3">
              <div className="user-initials-v3 admin-bg">YA</div>
              <span className="online-dot-v3" />
            </div>
            <div className="user-info-v3">
              <b>Yash Administrator</b>
              <small>yash@nexus.com</small>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="admin-main-v3">
          {/* Top Stat Cards Row */}
          <div className="metrics-ticker-grid-v3">
            <div className="metric-ticker-card blue">
              <div className="ticker-head">
                <span className="ticker-label">REGISTERED TRADERS</span>
                <span className="ticker-badge bull">TOTAL</span>
              </div>
              <strong className="ticker-val">{userList.length} Traders</strong>
              <small className="ticker-sub pos">+18.4% this month</small>
            </div>

            <div className="metric-ticker-card emerald">
              <div className="ticker-head">
                <span className="ticker-label">ACTIVE TRADING</span>
                <span className="ticker-badge bull">ONLINE</span>
              </div>
              <strong className="ticker-val">{activeCount} Active</strong>
              <small className="ticker-sub pos">+8.2% engagement</small>
            </div>

            <div className="metric-ticker-card amber">
              <div className="ticker-head">
                <span className="ticker-label">24H OPTIONS VOLUME</span>
                <span className="ticker-badge safe">VOLUME</span>
              </div>
              <strong className="ticker-val">₹4.25 Cr</strong>
              <small className="ticker-sub pos">+24.8% YoY</small>
            </div>

            <div className="metric-ticker-card emerald">
              <div className="ticker-head">
                <span className="ticker-label">SYSTEM HEALTH</span>
                <span className="ticker-badge safe">VERIFIED</span>
              </div>
              <strong className="ticker-val">99.99% UPTIME</strong>
              <small className="ticker-sub pos">0 Outages Reported</small>
            </div>
          </div>

          {/* Main Tab Content */}
          <div className="admin-workspace-content-v3">

            {/* OVERVIEW TAB */}
            {activeNav === 'overview' && (
              <div className="admin-overview-grid">
                {/* Trader Records Table */}
                <div className="glass-panel-v3">
                  <div className="panel-header-v3">
                    <div>
                      <span className="panel-kicker-v3">TRADER MANAGEMENT</span>
                      <h2 className="panel-title-v3">Trader Records Directory</h2>
                    </div>
                  </div>

                  {/* Add Trader Row */}
                  <div className="add-trader-row-v3">
                    <input
                      type="text"
                      placeholder="Trader Name"
                      value={newTraderName}
                      onChange={(e) => setNewTraderName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={newTraderEmail}
                      onChange={(e) => setNewTraderEmail(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Phone (+91...)"
                      value={newTraderPhone}
                      onChange={(e) => setNewTraderPhone(e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Account #"
                      value={newTraderAccount}
                      onChange={(e) => setNewTraderAccount(e.target.value)}
                    />
                    <button className="btn-add-trader-v3" onClick={handleAddTrader}>
                      <Plus size={14} /> Add Trader
                    </button>
                  </div>

                  <div className="table-responsive-v3">
                    <table className="admin-table-v3">
                      <thead>
                        <tr>
                          <th>TRADER</th>
                          <th>EMAIL</th>
                          <th>PHONE</th>
                          <th>ACCOUNT #</th>
                          <th>STATUS</th>
                          <th>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userList.map((u) => (
                          <tr key={u.id}>
                            <td><b>{u.name}</b></td>
                            <td>{u.email}</td>
                            <td>{u.phone}</td>
                            <td><span className="account-tag">{u.id}</span></td>
                            <td>
                              <span className={`status-badge-v3 ${u.status.toLowerCase()}`}>
                                {u.status}
                              </span>
                            </td>
                            <td>
                              <div className="table-action-btns">
                                <button className="btn-toggle-v3" onClick={() => toggleUserStatus(u.id)}>
                                  Toggle
                                </button>
                                <button className="btn-delete-v3" onClick={() => handleDeleteTrader(u.id)} title="Delete Record">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Growth Chart Panel */}
                <div className="glass-panel-v3 mt-4">
                  <div className="panel-header-v3">
                    <div>
                      <span className="panel-kicker-v3">GROWTH TELEMETRY</span>
                      <h3 className="panel-title-v3">User Trajectory & Active Traders</h3>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={240}>
                    <AreaChart data={userGrowthData}>
                      <defs>
                        <linearGradient id="userGradAdmin" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#26d98a" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#26d98a" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} />
                      <YAxis stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} />
                      <RechartsTooltip contentStyle={{ background: '#091016', border: '1px solid #1e3530', borderRadius: '6px', fontSize: 12 }} />
                      <Area type="monotone" dataKey="users" stroke="#26d98a" strokeWidth={2.5} fill="url(#userGradAdmin)" name="Total Users" />
                      <Area type="monotone" dataKey="active" stroke="#5c9cf5" strokeWidth={2} fill="none" name="Active Traders" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* SIGNAL BROADCASTER TAB */}
            {activeNav === 'broadcaster' && (
              <motion.div className="glass-panel-v3" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">SIGNAL BROADCASTER</span>
                    <h2 className="panel-title-v3">Publish Live Algo Signal</h2>
                  </div>
                </div>

                {broadcastSent && (
                  <div className="alert-banner-success">
                    <CheckCircle2 size={16} /> Signal broadcasted live to all Client Terminals & VIP Telegram Feed!
                  </div>
                )}

                <form onSubmit={handleBroadcast} className="broadcaster-form-v3">
                  <div className="form-row-2">
                    <label className="field-label-v3">
                      <span>SYMBOL / INDEX</span>
                      <input
                        type="text"
                        value={signalSymbol}
                        onChange={(e) => setSignalSymbol(e.target.value)}
                        placeholder="NIFTY 50 24700 CE"
                        required
                      />
                    </label>

                    <label className="field-label-v3">
                      <span>DIRECTIONAL BIAS</span>
                      <select value={signalBias} onChange={(e) => setSignalBias(e.target.value)}>
                        <option value="BULLISH">BULLISH (LONG)</option>
                        <option value="BEARISH">BEARISH (SHORT)</option>
                      </select>
                    </label>
                  </div>

                  <div className="form-row-3 mt-3">
                    <label className="field-label-v3">
                      <span>ENTRY LEVEL (₹)</span>
                      <input
                        type="text"
                        value={signalEntry}
                        onChange={(e) => setSignalEntry(e.target.value)}
                        placeholder="24,680"
                        required
                      />
                    </label>

                    <label className="field-label-v3">
                      <span>TARGET LEVEL (₹)</span>
                      <input
                        type="text"
                        value={signalTarget}
                        onChange={(e) => setSignalTarget(e.target.value)}
                        placeholder="24,840"
                        required
                      />
                    </label>

                    <label className="field-label-v3">
                      <span>STOP LOSS (₹)</span>
                      <input
                        type="text"
                        value={signalStop}
                        onChange={(e) => setSignalStop(e.target.value)}
                        placeholder="24,560"
                        required
                      />
                    </label>
                  </div>

                  <button type="submit" className="btn-broadcast-submit">
                    <Radio size={16} /> Broadcast Live Signal Now
                  </button>
                </form>
              </motion.div>
            )}

            {/* TRADER RECORDS DIRECTORY TAB */}
            {activeNav === 'users' && (
              <div className="glass-panel-v3">
                <div className="directory-toolbar-v3">
                  <div className="search-box-v3">
                    <Search size={16} />
                    <input
                      type="text"
                      placeholder="Search by name, email, or account ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="filter-pills-v3">
                    {['ALL', 'PRO TERMINAL', 'ENTERPRISE'].map((tier) => (
                      <button
                        key={tier}
                        className={`filter-btn-v3 ${tierFilter === tier ? 'active' : ''}`}
                        onClick={() => setTierFilter(tier)}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-responsive-v3 mt-3">
                  <table className="admin-table-v3">
                    <thead>
                      <tr>
                        <th>ACCOUNT ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>PHONE</th>
                        <th>TIER</th>
                        <th>STATUS</th>
                        <th>ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td><b className="account-code">{u.id}</b></td>
                          <td><b>{u.name}</b></td>
                          <td>{u.email}</td>
                          <td>{u.phone}</td>
                          <td><span className="tier-tag">{u.tier}</span></td>
                          <td>
                            <span className={`status-badge-v3 ${u.status.toLowerCase()}`}>
                              {u.status}
                            </span>
                          </td>
                          <td>
                            <button className="btn-toggle-v3" onClick={() => toggleUserStatus(u.id)}>
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* QUANT ANALYTICS TAB */}
            {activeNav === 'analytics' && (
              <div className="glass-panel-v3">
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">MODULE TRAFFIC</span>
                    <h2 className="panel-title-v3">Feature Views & Usage Telemetry</h2>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={usageByFeature} layout="vertical">
                    <XAxis type="number" stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#3a4f48" fontSize={11} axisLine={false} tickLine={false} width={110} />
                    <RechartsTooltip contentStyle={{ background: '#091016', border: '1px solid #1e3530', borderRadius: '6px', fontSize: 12 }} />
                    <Bar dataKey="views" fill="#26d98a" fillOpacity={0.85} radius={[0, 4, 4, 0]} name="Views" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* SYSTEM SETTINGS TAB */}
            {activeNav === 'settings' && (
              <div className="glass-panel-v3">
                <div className="panel-header-v3">
                  <div>
                    <span className="panel-kicker-v3">SECURITY & INTEGRATIONS</span>
                    <h2 className="panel-title-v3">Platform API Credentials</h2>
                  </div>
                </div>
                <div className="settings-cards-grid">
                  <div className="settings-card-item">
                    <div>
                      <b>Google OAuth 2.0 Integration</b>
                      <small>Client ID: 475847267545-r2o0nvq2ov57r22ghnhogn878ado54tg.apps.googleusercontent.com</small>
                    </div>
                    <span className="badge-active-v3"><CheckCircle2 size={13} /> ACTIVE</span>
                  </div>

                  <div className="settings-card-item">
                    <div>
                      <b>Firebase Web Auth SDK</b>
                      <small>Project ID: elite-tradinghubs-office</small>
                    </div>
                    <span className="badge-active-v3"><CheckCircle2 size={13} /> INITIALIZED</span>
                  </div>

                  <div className="settings-card-item">
                    <div>
                      <b>Admin Credentials Provider</b>
                      <small>Authorized Login: <b>yash</b> / <b>123123</b></small>
                    </div>
                    <span className="badge-active-v3"><CheckCircle2 size={13} /> ENFORCED</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
