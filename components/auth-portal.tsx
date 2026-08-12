'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ShieldCheck, User, Lock, ArrowRight, ArrowUpRight, LogOut, CheckCircle2,
  AlertTriangle, Key, Activity, Sparkles, Sliders, ChevronRight, Layers, FileText
} from 'lucide-react'
import { AdminDashboardView } from './admin-dashboard'

export function AuthPortal() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  
  // Auth state: null | 'ADMIN' | 'CLIENT'
  const [authRole, setAuthRole] = useState<'ADMIN' | 'CLIENT' | null>(null)
  const [userName, setUserName] = useState('')

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cleanEmail = email.toLowerCase().trim()

    if (cleanEmail.includes('admin')) {
      setAuthRole('ADMIN')
      setUserName('Client Administrator')
      setErrorMsg('')
    } else {
      setAuthRole('CLIENT')
      setUserName(cleanEmail.split('@')[0] || 'Pro Trader')
      setErrorMsg('')
    }
  }

  const loginAsDemoAdmin = () => {
    setEmail('admin@elitetradinghub.com')
    setPassword('admin123')
    setAuthRole('ADMIN')
    setUserName('Client Administrator')
    setErrorMsg('')
  }

  const loginAsDemoClient = () => {
    setEmail('trader@elitetradinghub.com')
    setPassword('client123')
    setAuthRole('CLIENT')
    setUserName('Vikram Sharma (Pro Trader)')
    setErrorMsg('')
  }

  // 1. ADMIN LOGGED IN VIEW -> Show Admin Dashboard
  if (authRole === 'ADMIN') {
    return (
      <div>
        <div className="auth-role-banner admin-banner">
          <span><ShieldCheck size={16} /> LOGGED IN AS <b>ADMINISTRATOR</b></span>
          <button onClick={() => setAuthRole(null)} className="icon-btn-text">
            <LogOut size={14} /> Switch Account / Logout
          </button>
        </div>
        <AdminDashboardView />
      </div>
    )
  }

  // 2. CLIENT LOGGED IN VIEW -> Show Client Pro Terminal & Workspace
  if (authRole === 'CLIENT') {
    return (
      <div className="client-portal-wrapper">
        <div className="auth-role-banner client-banner">
          <span><User size={16} /> LOGGED IN AS CLIENT: <b>{userName}</b> (PRO TERMINAL SUBSCRIBER)</span>
          <button onClick={() => setAuthRole(null)} className="icon-btn-text">
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="client-dashboard-hero">
          <div className="eyebrow-line"><i /> PRO TRADER DASHBOARD</div>
          <h1>Welcome back, <em>{userName}</em>.</h1>
          <p>Your personalized market setup workspace, risk engine, and active signal alerts are live.</p>

          <div className="client-quick-actions">
            <Link href="/features#setups" className="luxury-button">
              View Intraday Setups <ArrowRight size={15} />
            </Link>
            <Link href="/features#calculator" className="quiet-link">
              Position Risk Calculator <ChevronRight size={15} />
            </Link>
          </div>
        </div>

        <div className="client-grid">
          <div className="client-card">
            <div className="card-head">
              <div><span>MY SUBSCRIPTION</span><strong>PRO TERMINAL TIER</strong></div>
              <span className="badge">ACTIVE</span>
            </div>
            <p>Renewal Date: <b>18 Dec 2026</b> · Unlimited level 2 market setups & options analytics.</p>
          </div>

          <div className="client-card">
            <div className="card-head">
              <div><span>SAVED WATCHLIST</span><strong>NSE / NIFTY 50</strong></div>
              <Activity size={18} className="emerald" />
            </div>
            <p>3 active high-conviction signals triggered today (NIFTY, BANK NIFTY, RELIANCE).</p>
          </div>
        </div>
      </div>
    )
  }

  // 3. LOGIN FORM (Unauthenticated View)
  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-head">
          <img src="/only-bull-head-icon.png" alt="Elite Trading Hub Bull Logo" className="login-card-bull-icon" />
          <h2>Elite Trading Hub Login</h2>
          <p>Single sign-in portal for both Client Traders & Administrators.</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="admin-login-form">
          <label>
            EMAIL ADDRESS
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="trader@elitetradinghub.com or admin@..."
              required
            />
          </label>

          <label>
            PASSWORD
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          {errorMsg && <p className="login-error-msg"><AlertTriangle size={14} /> {errorMsg}</p>}

          <button type="submit" className="luxury-button" style={{ width: '100%', marginTop: '8px' }}>
            Sign In to Account <ArrowUpRight size={16} />
          </button>

          <div className="demo-login-divider">
            <span>OR QUICK DEMO ACCESS</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <button
              type="button"
              className="quiet-link"
              style={{ justifyContent: 'center', padding: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              onClick={loginAsDemoClient}
            >
              <User size={14} /> Client Demo
            </button>

            <button
              type="button"
              className="quiet-link"
              style={{ justifyContent: 'center', padding: '10px', background: 'var(--surface-2)', border: '1px solid var(--border)' }}
              onClick={loginAsDemoAdmin}
            >
              <ShieldCheck size={14} /> Admin Demo
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
