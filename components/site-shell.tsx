'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
              <Link className="header-cta" href="/login">
                Login <ArrowUpRight size={14} />
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
                    Login to Portal <ArrowUpRight size={16} />
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
        <div className="footer-brand-column">
          <Link href="/" className="footer-brand-link">
            <img 
              src="/only-bull-head-icon.png" 
              alt="Elite Trading Hub Bull Icon" 
              className="footer-brand-icon" 
            />
            <span className="footer-brand-text">ELITE TRADING HUB</span>
          </Link>
          <p className="footer-tagline">
            Decision-grade market intelligence for NIFTY 50, BANK NIFTY, and SENSEX traders.
          </p>
        </div>
        <div className="footer-links-grid">
          <div className="footer-col">
            <b>Platform</b>
            <Link href="/features">Capabilities</Link>
            <Link href="/methodology">Methodology</Link>
            <Link href="/login">Portal Login</Link>
          </div>
          <div className="footer-col">
            <b>Company</b>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer">
              Telegram
            </a>
          </div>
          <div className="footer-col">
            <b>Legal</b>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/disclaimer">Risk Disclosure</Link>
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
    <motion.div 
      className="premium-site"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
    </motion.div>
  )
}

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return (
    <motion.section 
      className="page-hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="eyebrow-line">
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
        {eyebrow}
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
    </motion.section>
  )
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div 
      className="premium-section-heading"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="eyebrow-line">
        <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
        {eyebrow}
      </div>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
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
