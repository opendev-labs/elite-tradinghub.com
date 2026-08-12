'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Check, Database, Send, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react'
import { PageFrame, PageHero, SectionHeading } from './site-shell'
import { MarketStrip } from './trading-dashboard'

const capabilities = [
  ['Market coverage', 'NIFTY 50, BANK NIFTY, and SENSEX indices setups.', BarChart3],
  ['Signal discipline', 'A transparent framework combining price action, volume, volatility and derivatives context.', BarChart3],
  ['Risk first', 'Position sizing and stop-loss logic designed to put the downside before the trade idea.', ShieldCheck],
]

export function PremiumHome() {
  return (
    <PageFrame>
      <main>
        {/* Clean Pure Black Hero Section showcasing Clean Centered Logo Image (No Gemini Watermark) */}
        <section className="pure-black-hero-section">
          <div className="pure-black-hero-content">
            {/* Clean Centered Logo Image with 100% Transparent Background & No Gemini Watermark */}
            <div className="hero-logo-transparent-wrapper">
              <img 
                src="/user-logo-transparent.png" 
                alt="Elite Trading Hub Official Logo" 
                className="hero-logo-transparent-img"
              />
            </div>

            <div className="hero-buttons hero-center-buttons">
              <Link href="/features" className="luxury-button">
                Explore the platform <ArrowRight size={16} />
              </Link>
              <a 
                href="https://t.me/+la1ShIiNHJ5mYzk1" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="telegram-hero-button"
              >
                <Send size={15} /> Join Telegram
              </a>
              <Link href="/methodology" className="quiet-link">
                Our methodology <ArrowRight size={15} />
              </Link>
            </div>

            <div className="hero-micro hero-center-micro">
              <span><Check size={14} /> Research-led</span>
              <span><Check size={14} /> Risk-aware</span>
              <span><Check size={14} /> No promises</span>
            </div>
          </div>
        </section>

        {/* Proof Bar - Only NIFTY 50, BANK NIFTY, SENSEX */}
        <section className="proof-bar">
          <span>Supported Indices</span>
          <b>NIFTY 50</b>
          <b>BANK NIFTY</b>
          <b>SENSEX</b>
        </section>

        {/* Capability Overview Grid */}
        <section className="premium-section compact-top">
          <SectionHeading
            eyebrow="SYSTEM ARCHITECTURE"
            title="Institutional tools, built for independent traders."
            text="A clean breakdown of what Elite Trading Hub delivers every session."
          />
          <div className="capability-grid">
            {capabilities.map(([title, desc, Icon], i) => (
              <article key={title} className="capability-card">
                <Icon size={20} />
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="/features">
                  Open platform <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Dark Band Philosophy Statement */}
        <section className="dark-band">
          <div>
            <div className="eyebrow-line">
              <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
              WHY ELITE
            </div>
            <h2>Clarity compounds.</h2>
            <p>
              Markets will always contain uncertainty. Your process does not have to. We make the work before the trade visible, repeatable and accountable.
            </p>
            <Link href="/methodology" className="luxury-button">
              See the framework <ArrowRight size={16} />
            </Link>
          </div>
          <div className="quote-card">
            <Sparkles size={18} />
            <p>
              “The goal is not to predict every move. It is to create a better decision than the one you would make without a process.”
            </p>
            <span>— ELITE TRADING HUB RESEARCH PRINCIPLE</span>
          </div>
        </section>

        {/* Platform CTA */}
        <section className="premium-section platform-cta">
          <div className="cta-panel">
            <div>
              <div className="eyebrow-line">
                <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
                READY WHEN YOU ARE
              </div>
              <h2>
                Trade less reactively.<br />
                <em>Think more clearly.</em>
              </h2>
            </div>
            <Link href="/features" className="luxury-button">
              Launch platform <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

export function PremiumFeatures() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="PLATFORM CAPABILITIES"
          title={<>Built to bring <em>order</em> to the market day.</>}
          description="Explore the tools, analytics, and level engines designed to help you plan, execute, and evaluate trades with rigor."
        />

        <section className="premium-section">
          <div className="trust-strip">
            <ShieldCheck size={20} />
            <div>
              <b>Designed for NIFTY 50, BANK NIFTY & SENSEX</b>
              <span>Optimized for NIFTY 50, BANK NIFTY, and SENSEX setups.</span>
            </div>
          </div>

          <div className="feature-list">
            {[
              ['01', 'High-conviction intraday setups', 'Pre-market and live-session setups derived from volume profile, key intraday levels, and derivatives positioning.', Target],
              ['02', 'Position sizing & risk engine', 'Calculate exact quantity and exposure based on your portfolio capital and risk-per-trade rules before entering any position.', BarChart3],
              ['03', 'Derivatives & volatility context', 'Monitor India VIX shifts, open interest builds, and option chain skew to align with broader market context.', TrendingUp],
              ['04', 'Post-trade performance analytics', 'Track win rates, profit factor, and drawdown metrics over time to continuously refine your edge.', Database],
            ].map(([num, title, desc, Icon]) => (
              <div key={num} className="feature-row">
                <span className="feature-number">{num}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                </div>
                <Icon size={20} />
              </div>
            ))}
          </div>
        </section>

        <section className="premium-section platform-cta">
          <div className="cta-panel">
            <div>
              <div className="eyebrow-line"><img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />LIVE MARKET INTELLIGENCE</div>
              <h2>Ready to upgrade your trading process?</h2>
            </div>
            <Link href="/login" className="luxury-button">
              Access portal <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

export function PremiumMethodology() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="THE RESEARCH FRAMEWORK"
          title={<>Process over <em>prediction.</em></>}
          description="How Elite Trading Hub evaluates price action, derivative flows, and market volatility to produce decision-grade intelligence."
        />

        <section className="premium-section">
          <div className="method-steps">
            {[
              ['01', 'Context', 'Identify macro trend, index alignment, and volatility regime before looking for trade setups.'],
              ['02', 'Location', 'Filter for high-confluence zones where price action converges with volume nodes or key option strikes.'],
              ['03', 'Trigger', 'Wait for explicit confirmation from intraday price action, momentum, and volume profile.'],
              ['04', 'Risk', 'Define maximum loss and position size before order entry. Never alter stop-loss during a live trade.'],
            ].map(([step, title, desc]) => (
              <article key={step}>
                <span>{step}</span>
                <h2>{title}</h2>
                <p>{desc}</p>
              </article>
            ))}
          </div>

          <div className="methodology-note dark-band">
            <div>
              <div className="eyebrow-line"><img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />DISCIPLINE MATTERS</div>
              <h2>Why rules beat intuition.</h2>
              <p>Discipline isn&apos;t about never taking losses—it&apos;s about ensuring every loss is controlled, deliberate, and within your risk model parameters.</p>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

export function PremiumAbout() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="ABOUT ELITE TRADING HUB"
          title={<>Built for traders who value <em>discipline.</em></>}
          description="We created Elite Trading Hub to provide NIFTY 50, BANK NIFTY and SENSEX traders with clean, structured, research-driven market intelligence without the noise."
        />

        <section className="premium-section">
          <div className="about-grid">
            <div className="about-statements">
              <div>
                <img src="/only-bull-head-icon.png" alt="Bull Icon" className="about-logo-icon" />
                <b>No noise. No hype.</b>
                <p>We do not publish get-rich-quick tips or speculative calls. Every setup is grounded in verifiable price action and derivatives data.</p>
              </div>
              <div>
                <ShieldCheck size={24} />
                <b>Risk management first</b>
                <p>Capital preservation is the foundation of long-term trading survival. Our engine forces position sizing discipline before trade execution.</p>
              </div>
            </div>

            <div className="quote-card">
              <Sparkles size={24} />
              <p>“Consistency in trading comes from consistent execution of a quantified edge, combined with non-negotiable risk parameters.”</p>
              <span>— ELITE TRADING HUB MISSION STATEMENT</span>
            </div>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

export function PremiumContact() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="GET IN TOUCH"
          title={<>We are here to <em>help.</em></>}
          description="Have questions about the platform, methodologies, or access? Reach out to our research and support team."
        />

        <section className="premium-section">
          <div className="contact-grid">
            <div className="contact-details">
              <div>
                <span>EMAIL SUPPORT</span>
                <a href="mailto:support@elite-tradinghub.com">support@elite-tradinghub.com</a>
              </div>
              <div>
                <span>TELEGRAM COMMUNITY</span>
                <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer">
                  t.me/EliteTradingHub
                </a>
              </div>
              <div>
                <span>LOCATION</span>
                <p>Mumbai & Bengaluru, India</p>
              </div>
            </div>

            <form className="premium-form" onSubmit={(e) => e.preventDefault()}>
              <label>
                NAME
                <input type="text" placeholder="Your full name" required />
              </label>
              <label>
                EMAIL
                <input type="email" placeholder="you@example.com" required />
              </label>
              <label>
                MESSAGE
                <textarea rows={4} placeholder="How can we assist you?" required />
              </label>
              <button type="submit" className="luxury-button">
                Send message <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

// Aliases matching page imports
export { 
  PremiumHome as HomePage, 
  PremiumFeatures as FeaturesPage, 
  PremiumMethodology as MethodologyPage, 
  PremiumAbout as AboutPage, 
  PremiumContact as ContactPage 
}
