'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowUpRight, Crosshair, Menu, X, Lock } from 'lucide-react'

const links = [
  { href: '/', label: 'Overview' },
  { href: '/features', label: 'Platform' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return <>
    <div className="premium-ribbon">MARKET INTELLIGENCE, BUILT FOR DECISION QUALITY <span>Educational use only</span></div>
    <header className="site-header">
      <Link href="/" className="premium-brand" onClick={() => setOpen(false)}><span className="premium-mark"><Crosshair size={17} /></span><span>ELITE<span>TRADING</span><em>HUB</em></span></Link>
      <nav className={open ? 'site-nav open' : 'site-nav'} aria-label="Primary navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></nav>
      <div className="site-actions"><span className="header-status"><i /> NSE / BSE DATA</span><Link className="header-cta" href="/login">Login <ArrowUpRight size={14} /></Link><button className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X size={19} /> : <Menu size={19} />}</button></div>
    </header>
  </>
}

export function SiteFooter() {
  return <footer className="site-footer"><div className="footer-top"><div><Link href="/" className="premium-brand"><span className="premium-mark"><Crosshair size={17} /></span><span>ELITE<span>TRADING</span><em>HUB</em></span></Link><p>Decision-grade market intelligence for the serious Indian trader.</p></div><div className="footer-links"><div><b>Explore</b><Link href="/features">Platform</Link><Link href="/methodology">Methodology</Link><Link href="/about">About us</Link></div><div><b>Company</b><Link href="/contact">Contact</Link><Link href="/terms">Terms & Conditions</Link><Link href="/privacy">Privacy Policy</Link></div><div><b>Account & Portal</b><Link href="/login">Login Portal <Lock size={11} style={{ display: 'inline', marginLeft: '3px' }} /></Link><Link href="/disclaimer">Risk disclosure</Link><Link href="/contact">Support</Link></div></div></div><div className="footer-bottom"><span>© 2026 Elite Trading Hub. All rights reserved.</span><span>Educational content only. Not investment advice.</span></div></footer>
}

export function PageFrame({ children }: { children: React.ReactNode }) { return <div className="premium-site"><SiteHeader />{children}<SiteFooter /></div> }

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) { return <section className="page-hero"><div className="eyebrow-line"><i />{eyebrow}</div><h1>{title}</h1><p>{description}</p></section> }

export function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) { return <div className="premium-section-heading"><div className="eyebrow-line"><i />{eyebrow}</div><h2>{title}</h2>{text && <p>{text}</p>}</div> }

export function LegalPage({ title, eyebrow, children }: { title: string; eyebrow: string; children: React.ReactNode }) { return <PageFrame><main className="legal-main"><PageHero eyebrow={eyebrow} title={title} description="Please read this information carefully before using the Elite Trading Hub platform." /><article className="legal-copy">{children}</article></main></PageFrame> }
