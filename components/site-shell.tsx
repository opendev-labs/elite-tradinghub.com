'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Crosshair, Menu, X, Lock, ShieldCheck, ChevronRight } from 'lucide-react'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Platform' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  // Prevent background scroll when mobile drawer is active
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div className="premium-ribbon">
        <span>MARKET INTELLIGENCE, BUILT FOR DECISION QUALITY</span>
        <span className="ribbon-tag">Educational use only</span>
      </div>

      <header className="site-header">
        <div className="site-header-inner">
          <Link href="/" className="premium-brand" onClick={() => setOpen(false)}>
            <span className="premium-mark"><Crosshair size={17} /></span>
            <span>ELITE<span>TRADING</span><em>HUB</em></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="site-nav desktop-nav" aria-label="Primary navigation">
            {links.map(link => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-actions">
            <span className="header-status"><i /> NSE / BSE DATA</span>
            <Link className="header-cta" href="/login">
              Login <ArrowUpRight size={14} />
            </Link>

            {/* Mobile Hamburger Toggle in Top Right Corner */}
            <button 
              className="mobile-toggle" 
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} 
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Buttery Smooth Mobile Drawer Overlay */}
        <div className={open ? 'mobile-drawer open' : 'mobile-drawer'}>
          <div className="mobile-drawer-backdrop" onClick={() => setOpen(false)} />
          <nav className="mobile-drawer-content" aria-label="Mobile navigation">
            <div className="mobile-drawer-header">
              <span className="mobile-drawer-title"><ShieldCheck size={14} /> NAVIGATION</span>
              <span className="mobile-status-badge"><i /> LIVE DATA</span>
            </div>

            <div className="mobile-nav-links">
              {links.map(link => (
                <Link key={link.href} href={link.href} className="mobile-nav-item" onClick={() => setOpen(false)}>
                  <span>{link.label}</span>
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>

            <div className="mobile-drawer-actions">
              <Link href="/login" className="mobile-drawer-cta" onClick={() => setOpen(false)}>
                Login to Platform <ArrowUpRight size={16} />
              </Link>
              <div className="mobile-drawer-footer">
                <span>© 2026 Elite Trading Hub</span>
                <span>Institutional Grade Intelligence</span>
              </div>
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
          <Link href="/" className="premium-brand">
            <span className="premium-mark"><Crosshair size={17} /></span>
            <span>ELITE<span>TRADING</span><em>HUB</em></span>
          </Link>
          <p>Decision-grade market intelligence for the serious Indian trader.</p>
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
            <b>Account & Portal</b>
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
      <div className="eyebrow-line"><i />{eyebrow}</div>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  )
}

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="premium-section-heading">
      <div className="eyebrow-line"><i />{eyebrow}</div>
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
