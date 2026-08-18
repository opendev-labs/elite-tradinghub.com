'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, Check, Database, Send, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react'
import { PageFrame, PageHero, SectionHeading } from './site-shell'
import { MarketStrip } from './trading-dashboard'
import { InteractiveGridBackground } from './interactive-grid-background'

const capabilities = [
  ['Market coverage', 'NIFTY 50, BANK NIFTY, and SENSEX indices setups.', BarChart3],
  ['Signal discipline', 'A transparent framework combining price action, volume, volatility and derivatives context.', BarChart3],
  ['Risk first', 'Position sizing and stop-loss logic designed to put the downside before the trade idea.', ShieldCheck],
]

// Calm luxury spring & cubic-bezier transitions for $300M startup feel
const fadeInVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      delay: i * 0.12,
      ease: [0.16, 1, 0.3, 1]
    }
  })
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1
    }
  }
}

export function PremiumHome() {
  return (
    <PageFrame>
      <main>
        {/* Clean Pure Black Hero Section with Interactive Faded Grid */}
        <section className="pure-black-hero-section">
          {/* Interactive Animated Green Faded Grid Background Layer */}
          <InteractiveGridBackground />

          <motion.div 
            className="pure-black-hero-content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Centered Logo Image with subtle calm float motion */}
            <motion.div 
              className="hero-logo-transparent-wrapper"
              variants={fadeInVariants}
              animate={{
                y: [-4, 4, -4],
                transition: {
                  duration: 6,
                  ease: "easeInOut",
                  repeat: Infinity
                }
              }}
            >
              <img 
                src="/user-logo-transparent.png" 
                alt="Elite Trading Hub Official Logo" 
                className="hero-logo-transparent-img"
              />
            </motion.div>

            <motion.div className="hero-buttons hero-center-buttons" variants={fadeInVariants} custom={1}>
              <motion.div className="hero-btn-wrapper" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/features" className="luxury-button">
                  Explore the platform <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.div className="hero-btn-wrapper" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <a 
                  href="https://t.me/+la1ShIiNHJ5mYzk1" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="telegram-hero-button"
                >
                  <Send size={15} /> Join Telegram
                </a>
              </motion.div>
              <motion.div whileHover={{ x: 3 }}>
                <Link href="/methodology" className="quiet-link">
                  Our methodology <ArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div className="hero-micro hero-center-micro" variants={fadeInVariants} custom={2}>
              <span><Check size={14} /> Research-led</span>
              <span><Check size={14} /> Risk-aware</span>
              <span><Check size={14} /> No promises</span>
            </motion.div>
          </motion.div>
        </section>

        {/* Proof Bar - Only NIFTY 50, BANK NIFTY, SENSEX */}
        <motion.section 
          className="proof-bar"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span>Supported Indices</span>
          <b>NIFTY 50</b>
          <b>BANK NIFTY</b>
          <b>SENSEX</b>
        </motion.section>

        {/* Capability Overview Grid */}
        <section className="premium-section compact-top">
          <SectionHeading
            eyebrow="SYSTEM ARCHITECTURE"
            title="Institutional tools, built for independent traders."
            text="A clean breakdown of what Elite Trading Hub delivers every session."
          />
          <motion.div 
            className="capability-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
          >
            {capabilities.map(([title, desc, Icon], i) => (
              <motion.article 
                key={title} 
                className="capability-card"
                variants={fadeInVariants}
                custom={i}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={20} />
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
                <Link href="/features">
                  Open platform <ArrowRight size={14} />
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* Dark Band Philosophy Statement */}
        <motion.section 
          className="dark-band"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <div className="eyebrow-line">
              <img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />
              WHY ELITE
            </div>
            <h2>Clarity compounds.</h2>
            <p>
              Markets will always contain uncertainty. Your process does not have to. We make the work before the trade visible, repeatable and accountable.
            </p>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/methodology" className="luxury-button">
                See the framework <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <motion.div 
            className="quote-card"
            whileHover={{ y: -5, scale: 1.018, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
            whileTap={{ scale: 0.98 }}
          >
            <Sparkles size={18} />
            <p>
              “The goal is not to predict every move. It is to create a better decision than the one you would make without a process.”
            </p>
            <span>— ELITE TRADING HUB RESEARCH PRINCIPLE</span>
          </motion.div>
        </motion.section>

        {/* Platform CTA */}
        <motion.section 
          className="premium-section platform-cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
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
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/features" className="luxury-button">
                Launch platform <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </motion.section>
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
          <motion.div 
            className="trust-strip"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ShieldCheck size={20} />
            <div>
              <b>Designed for NIFTY 50, BANK NIFTY & SENSEX</b>
              <span>Optimized for NIFTY 50, BANK NIFTY, and SENSEX setups.</span>
            </div>
          </motion.div>

          <motion.div 
            className="feature-list"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              ['01', 'High-conviction intraday setups', 'Pre-market and live-session setups derived from volume profile, key intraday levels, and derivatives positioning.', Target],
              ['02', 'Position sizing & risk engine', 'Calculate exact quantity and exposure based on your portfolio capital and risk-per-trade rules before entering any position.', BarChart3],
              ['03', 'Derivatives & volatility context', 'Monitor India VIX shifts, open interest builds, and option chain skew to align with broader market context.', TrendingUp],
              ['04', 'Post-trade performance analytics', 'Track win rates, profit factor, and drawdown metrics over time to continuously refine your edge.', Database],
            ].map(([num, title, desc, Icon], i) => (
              <motion.div 
                key={num} 
                className="feature-row"
                variants={fadeInVariants}
                custom={i}
                whileHover={{ x: 6, transition: { duration: 0.25 } }}
              >
                <span className="feature-number">{num}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{desc}</p>
                </div>
                <Icon size={20} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section className="premium-section platform-cta">
          <div className="cta-panel">
            <div>
              <div className="eyebrow-line"><img src="/only-bull-head-icon.png" alt="Bull Icon" className="eyebrow-logo-icon" />LIVE MARKET INTELLIGENCE</div>
              <h2>Ready to upgrade your trading process?</h2>
            </div>
            <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/login" className="luxury-button">
                Access portal <ArrowRight size={16} />
              </Link>
            </motion.div>
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
          <motion.div 
            className="method-steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              ['01', 'Context', 'Identify macro trend, index alignment, and volatility regime before looking for trade setups.'],
              ['02', 'Location', 'Filter for high-confluence zones where price action converges with volume nodes or key option strikes.'],
              ['03', 'Trigger', 'Wait for explicit confirmation from intraday price action, momentum, and volume profile.'],
              ['04', 'Risk', 'Define maximum loss and position size before order entry. Never alter stop-loss during a live trade.'],
            ].map(([step, title, desc], i) => (
              <motion.article 
                key={step}
                variants={fadeInVariants}
                custom={i}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
              >
                <span>{step}</span>
                <h2>{title}</h2>
                <p>{desc}</p>
              </motion.article>
            ))}
          </motion.div>

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
              <motion.button 
                type="submit" 
                className="luxury-button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Send message <ArrowRight size={16} />
              </motion.button>
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
