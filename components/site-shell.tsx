'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Menu, X, Lock, ChevronRight, Send } from 'lucide-react'
import { MarketStrip } from './trading-dashboard'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Platform' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MarketStrip />

      <header className="site-header">
        <div className="site-header-inner">
          {/* Top Brand Icon: ONLY Green Bull Head Icon (Transparent Background) */}
          <Link href="/" className="premium-brand-icon-only" onClick={() => setOpen(false)}>
            <img 
              src="/only-bull-head-icon.png" 
              alt="Elite Trading Hub Bull Logo Icon" 
              className="header-green-bull-icon" 
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="site-nav desktop-nav" aria-label="Primary navigation">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="site-actions desktop-actions">
            <a 
              href="https://t.me/+la1ShIiNHJ5mYzk1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="telegram-header-btn"
            >
              <Send size={13} /> Telegram
            </a>
            <Link className="header-cta" href="/login">
              Login <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Clean Hamburger Icon Toggle (Pinned Far Top-Right on Mobile) */}
          <button 
            className="mobile-hamburger-btn"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Clean Dropdown Menu unfolding directly below the Header */}
        <div className={`header-dropdown ${open ? 'open' : ''}`}>
          <nav className="header-dropdown-inner" aria-label="Mobile navigation dropdown">
            <div className="dropdown-links">
              {links.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="dropdown-item" 
                  onClick={() => setOpen(false)}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="dropdown-arrow" />
                </Link>
              ))}
            </div>

            <div className="dropdown-bottom-actions">
              <div className="dropdown-status">
                <span className="live-dot"><i /> LIVE INDEX FEED</span>
                <span className="meta-info">Educational Platform</span>
              </div>
              <a 
                href="https://t.me/+la1ShIiNHJ5mYzk1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="dropdown-telegram-btn"
                onClick={() => setOpen(false)}
              >
                <Send size={14} /> Join Official Telegram
              </a>
              <Link href="/login" className="dropdown-login-btn" onClick={() => setOpen(false)}>
                Login to Platform <ArrowUpRight size={15} />
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link href="/" className="premium-brand-icon-only">
            <img src="/only-bull-head-icon.png" alt="Elite Trading Hub Bull Icon" className="footer-green-bull-icon" />
            <span className="footer-brand-title">ELITE TRADING HUB</span>
          </Link>
          <p>Decision-grade market intelligence for NIFTY 50, BANK NIFTY, and SENSEX traders.</p>
        </div>
        <div className="footer-links">
          <div>
            <b>Explore</b>
            <Link href="/features">Platform</Link>
            <Link href="/methodology">Methodology</Link>
            <Link href="/about">About us</Link>
          </div>
          <div>
            <b>Company</b>
            <Link href="/contact">Contact</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <div>
            <b>Community & Portal</b>
            <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer">
              Telegram Group <Send size={11} style={{ display: 'inline', marginLeft: '3px' }} />
            </a>
            <Link href="/login">
              Login Portal <Lock size={11} style={{ display: 'inline', marginLeft: '3px' }} />
            </Link>
            <Link href="/disclaimer">Risk disclosure</Link>
            <Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Elite Trading Hub. All rights reserved.</span>
        <span>Educational content only. Not investment advice.</span>
      </div>
    </footer>
  )
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="premium-site">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  )
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <section className="page-hero">
      <div className="eyebrow-line">
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="premium-section-heading">
      <div className="eyebrow-line">
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  )
}

export function LegalPage({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) {
  return (
    <PageFrame>
      <main className="legal-main">
        <PageHero eyebrow={eyebrow} title={title} description="Please read this information carefully before using the Elite Trading Hub platform." />
        <article className="legal-copy">{children}</article>
      </main>
    </PageFrame>
  )
}
