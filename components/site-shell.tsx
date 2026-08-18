'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Menu, X, Lock, ChevronRight, Send, User, LayoutDashboard } from 'lucide-react'
import { MarketStrip } from './trading-dashboard'
import { getStoredUser, subscribeFirebaseUser, UserSessionData } from '@/lib/firebase'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Platform' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [fbUser, setFbUser] = useState<UserSessionData | null>(null)

  useEffect(() => {
    setFbUser(getStoredUser())
    const unsubscribe = subscribeFirebaseUser((u) => setFbUser(u))
    return () => unsubscribe()
  }, [])

  const isLoggedIn = !!session || !!fbUser
  const activeName = session?.user?.name || fbUser?.name || 'Trader'
  const activeImage = session?.user?.image || fbUser?.image
  const firstName = activeName.split(' ')[0]
  const initials = firstName.slice(0, 2).toUpperCase()

  return (
    <>
      <MarketStrip />

      <header className="site-header">
        <div className="site-header-inner">
          {/* Top Brand Icon: White Bull Head Icon (Transparent Background) */}
          <Link href="/" className="premium-brand-icon-only" onClick={() => setOpen(false)}>
            <motion.img 
              src="/only-bull-head-icon.png" 
              alt="Elite Trading Hub White Bull Logo Icon" 
              className="header-green-bull-icon"
              whileHover={{ scale: 1.08, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="site-nav desktop-nav" aria-label="Primary navigation">
            {links.map(link => (
              <motion.div key={link.href} whileHover={{ y: -1 }}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="site-actions desktop-actions">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a 
                href="https://t.me/+la1ShIiNHJ5mYzk1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="telegram-header-btn"
              >
                <Send size={13} /> Telegram
              </a>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link className={`header-cta ${isLoggedIn ? 'logged-in-profile-chip' : ''}`} href="/login">
                {isLoggedIn ? (
                  <div className="header-google-profile-wrap">
                    {activeImage ? (
                      <img src={activeImage} alt={activeName} className="header-google-avatar-img" />
                    ) : (
                      <div className="header-google-avatar-initials">{initials}</div>
                    )}
                    <span className="header-profile-name">{firstName}</span>
                    <span className="header-profile-divider" />
                    <span className="header-dash-label">Dashboard</span>
                    <LayoutDashboard size={13} style={{ color: '#26d98a' }} />
                  </div>
                ) : (
                  <>
                    Login <ArrowUpRight size={14} />
                  </>
                )}
              </Link>
            </motion.div>
          </div>

          {/* Clean Hamburger Icon Toggle */}
          <button 
            className="mobile-hamburger-btn"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Clean Dropdown Menu unfolding with AnimatePresence */}
        <AnimatePresence>
          {open && (
            <motion.div 
              className="header-dropdown open"
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <nav className="header-dropdown-inner" aria-label="Mobile navigation dropdown">
                <div className="dropdown-links">
                  {links.map(link => (
                    <Link 
                      key={link.href} 
                      href={link.href} 
                      className="dropdown-item" 
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="dropdown-actions">
                  <a 
                    href="https://t.me/+la1ShIiNHJ5mYzk1" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="dropdown-telegram-btn"
                    onClick={() => setOpen(false)}
                  >
                    <Send size={15} /> Join Telegram Community
                  </a>
                  <Link 
                    href="/login" 
                    className="dropdown-login-btn"
                    onClick={() => setOpen(false)}
                  >
                    {isLoggedIn ? (
                      <div className="mobile-profile-flex">
                        {activeImage ? (
                          <img src={activeImage} alt={activeName} className="header-google-avatar-img" />
                        ) : (
                          <div className="header-google-avatar-initials">{initials}</div>
                        )}
                        <span>Dashboard ({firstName})</span>
                      </div>
                    ) : (
                      'Login to Portal'
                    )} <ArrowUpRight size={16} />
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand-col">
          <Link href="/" className="footer-logo-wrap">
            <img src="/only-bull-head-icon.png" alt="Elite Trading Hub Logo" className="footer-bull-logo" />
            <span>ELITE<b>TRADING</b><em style={{ fontStyle: 'normal', color: '#5c6c75' }}>HUB</em></span>
          </Link>
          <p className="footer-desc">
            Decision-grade quantitative market intelligence, options flow analytics, and algorithmic execution setups for Indian market participants.
          </p>
          <div className="footer-reg-info">
            <span>SEBI Registered Research Analyst Standards Compliant</span>
            <span>NSE / BSE Real-Time Feed Protocol Data</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div>
            <h4>PLATFORM</h4>
            <Link href="/features">NIFTY Setups</Link>
            <Link href="/features">Risk Calculator</Link>
            <Link href="/features">Options Chain</Link>
            <Link href="/methodology">Institutional Methodology</Link>
          </div>

          <div>
            <h4>COMPANY</h4>
            <Link href="/about">About Elite Hub</Link>
            <Link href="/contact">Contact Support</Link>
            <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer">Telegram Channel</a>
          </div>

          <div>
            <h4>LEGAL & COMPLIANCE</h4>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/disclaimer">Risk Disclaimer</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <span>© {new Date().getFullYear()} Elite Trading Hub. All rights reserved.</span>
        <span>Made for Professional Indian Market Traders</span>
      </div>
    </footer>
  )
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell-wrapper">
      <SiteHeader />
      <main className="site-shell-main">{children}</main>
      <SiteFooter />
    </div>
  )
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell-wrapper">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}

export function PageHero({ kicker, title, desc }: { kicker: string; title: string; desc: string }) {
  return (
    <section className="premium-hero-sub">
      <div className="eyebrow-line">
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
        {kicker}
      </div>
      <h1>{title}</h1>
      <p>{desc}</p>
    </section>
  )
}

export function SectionHeading({ kicker, title, desc }: { kicker: string; title: string; desc?: string }) {
  return (
    <div className="section-head">
      <span className="section-kicker">{kicker}</span>
      <h2>{title}</h2>
      {desc && <p>{desc}</p>}
    </div>
  )
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <PageFrame>
      <main className="legal-main">
        <PageHero kicker="LEGAL & COMPLIANCE" title={title} desc="Elite Trading Hub platform policies and SEBI guidelines." />
        <div className="legal-copy">{children}</div>
      </main>
    </PageFrame>
  )
}
