'use client'

import { useMemo, useState } from 'react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import {
  Users, TrendingUp, Activity, ShieldCheck, Search, Filter, Lock, ArrowUpRight,
  ArrowDownRight, CheckCircle2, AlertTriangle, LogOut, Eye, UserPlus, FileText, Server, CreditCard
} from 'lucide-react'

// Mock Analytics & User Data
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
  { id: 'USR-8901', name: 'Vikram Sharma', email: 'vikram.s@gmail.com', tier: 'PRO TERMINAL', status: 'ACTIVE', joined: '2026-05-12', volume: '₹42.5L' },
  { id: 'USR-8902', name: 'Ananya Roy', email: 'ananya.roy@tech.io', tier: 'ENTERPRISE', status: 'ACTIVE', joined: '2026-05-14', volume: '₹1.8Cr' },
  { id: 'USR-8903', name: 'Rajesh Patel', email: 'rajesh.p@patelcap.com', tier: 'PRO TERMINAL', status: 'ACTIVE', joined: '2026-05-18', volume: '₹85.0L' },
  { id: 'USR-8904', name: 'Priya Nair', email: 'priya.nair@outlook.com', tier: 'FREE TRIAL', status: 'PENDING', joined: '2026-06-01', volume: '₹5.0L' },
  { id: 'USR-8905', name: 'Amitabh Sen', email: 'sen.amit@yahoo.in', tier: 'PRO TERMINAL', status: 'ACTIVE', joined: '2026-06-03', volume: '₹28.4L' },
  { id: 'USR-8906', name: 'Kavita Reddy', email: 'kavita@reddycap.in', tier: 'ENTERPRISE', status: 'ACTIVE', joined: '2026-06-05', volume: '₹2.4Cr' },
]

export function AdminDashboardView() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('admin@elitetradinghub.com')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  const [searchTerm, setSearchTerm] = useState('')
  const [tierFilter, setTierFilter] = useState('ALL')
  const [users, setUsers] = useState(initialUsersList)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123' || password === 'admin' || password === '') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials. Use "admin123" or click Quick Demo Login.')
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            u.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTier = tierFilter === 'ALL' || u.tier === tierFilter
      return matchesSearch && matchesTier
    })
  }, [users, searchTerm, tierFilter])

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-head">
            <div className="brand-mark"><ShieldCheck size={24} /></div>
            <h2>Client Admin Portal</h2>
            <p>Sign in to view site analytics, active users & compliance metrics.</p>
          </div>
          
          <form onSubmit={handleLogin} className="admin-login-form">
            <label>
              ADMIN EMAIL
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@elitetradinghub.com"
                required
              />
            </label>
            <label>
              PASSWORD
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (e.g. admin123)"
              />
            </label>

            {loginError && <p className="login-error-msg"><AlertTriangle size={14} /> {loginError}</p>}

            <button type="submit" className="luxury-button" style={{ width: '100%', marginTop: '10px' }}>
              Sign In to Admin Portal <ArrowUpRight size={16} />
            </button>

            <button
              type="button"
              className="quiet-link"
              style={{ width: '100%', justifyContent: 'center', marginTop: '14px' }}
              onClick={() => {
                setPassword('admin123')
                setIsAuthenticated(true)
              }}
            >
              ⚡ Quick One-Click Demo Access
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard-container">
      {/* Top Admin Bar */}
      <header className="admin-topbar">
        <div>
          <span className="admin-badge">ADMIN CONTROL CENTER</span>
          <h1>Elite Trading Hub — Insights & User Management</h1>
        </div>
        <div className="admin-user-profile">
          <span>Logged in as <b>Client Administrator</b></span>
          <button className="icon-btn-text" onClick={() => setIsAuthenticated(false)}>
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      {/* Overview Stat Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-head">
            <span>TOTAL REGISTERED USERS</span>
            <Users size={18} className="stat-icon emerald" />
          </div>
          <strong>14,280</strong>
          <small className="positive"><ArrowUpRight size={13} /> +18.4% this month</small>
        </div>

        <div className="admin-stat-card">
          <div className="stat-head">
            <span>ACTIVE MONTHLY TRADERS</span>
            <Activity size={18} className="stat-icon blue" />
          </div>
          <strong>8,940</strong>
          <small className="positive"><ArrowUpRight size={13} /> +12.1% active engagement</small>
        </div>

        <div className="admin-stat-card">
          <div className="stat-head">
            <span>PLATFORM REVENUE (MRR)</span>
            <CreditCard size={18} className="stat-icon amber" />
          </div>
          <strong>₹14,25,000</strong>
          <small className="positive"><ArrowUpRight size={13} /> +24.8% YoY growth</small>
        </div>

        <div className="admin-stat-card">
          <div className="stat-head">
            <span>SYSTEM HEALTH / SEBI AUDIT</span>
            <Server size={18} className="stat-icon emerald" />
          </div>
          <strong>99.98%</strong>
          <small className="positive"><CheckCircle2 size={13} /> 12ms latency · Verified</small>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="admin-charts-grid">
        {/* User Growth Chart */}
        <div className="admin-card">
          <div className="admin-card-head">
            <div>
              <h3>User Growth & Active Trader Trajectory</h3>
              <p>Monthly breakdown of registered users vs. daily active traders.</p>
            </div>
          </div>
          <div className="admin-chart-container">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--emerald)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--emerald)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--blue)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--blue)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={11} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ background: '#0e151c', border: '1px solid #26343e', borderRadius: '4px', color: '#e8edf0' }} />
                <Area type="monotone" dataKey="users" stroke="var(--emerald)" strokeWidth={2.5} fillOpacity={1} fill="url(#userGrad)" name="Total Users" />
                <Area type="monotone" dataKey="active" stroke="var(--blue)" strokeWidth={2} fillOpacity={1} fill="url(#activeGrad)" name="Active Traders" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Usage & Geographic Spread */}
        <div className="admin-card">
          <div className="admin-card-head">
            <div>
              <h3>Geographic User Distribution</h3>
              <p>Top trading hubs by active user volume in India.</p>
            </div>
          </div>
          <div className="admin-chart-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <ResponsiveContainer width="55%" height={220}>
              <PieChart>
                <Pie data={geoData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={4}>
                  {geoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{ background: '#0e151c', border: '1px solid #26343e', borderRadius: '4px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="admin-legend">
              {geoData.map((g) => (
                <div key={g.name} className="legend-item">
                  <span className="legend-dot" style={{ background: g.color }} />
                  <div>
                    <b>{g.name}</b>
                    <small>{g.value}%</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* User Management Section */}
      <div className="admin-card user-management-section">
        <div className="admin-card-head user-table-head">
          <div>
            <h3>Registered User Directory</h3>
            <p>Manage, inspect, and audit platform client accounts.</p>
          </div>

          <div className="user-table-actions">
            <div className="search-box">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search user name, email or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value)}>
              <option value="ALL">All Tiers</option>
              <option value="PRO TERMINAL">PRO TERMINAL</option>
              <option value="ENTERPRISE">ENTERPRISE</option>
              <option value="FREE TRIAL">FREE TRIAL</option>
            </select>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="admin-user-table">
            <thead>
              <tr>
                <th>USER ID</th>
                <th>CLIENT NAME</th>
                <th>EMAIL ADDRESS</th>
                <th>TIER</th>
                <th>STATUS</th>
                <th>JOIN DATE</th>
                <th>TRADING VOL</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td><code>{u.id}</code></td>
                  <td><b>{u.name}</b></td>
                  <td>{u.email}</td>
                  <td><span className={`tier-badge ${u.tier.replace(' ', '-').toLowerCase()}`}>{u.tier}</span></td>
                  <td><span className={`status-tag ${u.status.toLowerCase()}`}>{u.status}</span></td>
                  <td>{u.joined}</td>
                  <td><b>{u.volume}</b></td>
                  <td>
                    <button className="action-btn" title="View Profile Details"><Eye size={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
