import Link from 'next/link'
import { ArrowRight, BarChart3, Check, Crosshair, Database, LockKeyhole, ShieldCheck, Sparkles, Target, TrendingUp } from 'lucide-react'
import { PageFrame, PageHero, SectionHeading } from './site-shell'
import { LiveOrbitBackground } from './live-orbit-background'
import TradingDashboard, { MarketStrip, Setups, RiskCalculator, Methodology } from './trading-dashboard'

const capabilities = [
  ['Market coverage', 'NIFTY 50, BANK NIFTY, NSE and BSE equities, indices and selected options setups.', BarChart3],
  ['Signal discipline', 'A transparent framework combining price action, volume, volatility and derivatives context.', Crosshair],
  ['Risk first', 'Position sizing and stop-loss logic designed to put the downside before the trade idea.', ShieldCheck],
]

export function PremiumHome() {
  return (
    <PageFrame>
      <main>
        {/* Full-Bleed Market Ticker Strip */}
        <MarketStrip />

        {/* Clean, Full-Bleed Hero Section with Interactive Mesh Background */}
        <section className="premium-hero">
          <LiveOrbitBackground />

          <div className="hero-content">
            <div className="eyebrow-line">
              <i />ELITE MARKET INTELLIGENCE / INDIA
            </div>
            <h1>
              The signal is only as good as the <em>decision</em> it creates.
            </h1>
            <p>
              Elite Trading Hub turns market complexity into a calm, structured operating layer for traders navigating Indian equities, indices and options.
            </p>
            <div className="hero-buttons">
              <Link href="/features" className="luxury-button">
                Explore the platform <ArrowRight size={16} />
              </Link>
              <Link href="/methodology" className="quiet-link">
                Our methodology <ArrowRight size={15} />
              </Link>
            </div>
            <div className="hero-micro">
              <span><Check size={14} /> Research-led</span>
              <span><Check size={14} /> Risk-aware</span>
              <span><Check size={14} /> No promises</span>
            </div>
          </div>
        </section>

        {/* Proof Bar */}
        <section className="proof-bar">
          <span>Built for the Indian market</span>
          <b>NIFTY 50</b>
          <b>BANK NIFTY</b>
          <b>NSE</b>
          <b>BSE</b>
          <b>OPTIONS</b>
        </section>

        {/* Capability Overview Grid */}
        <section className="premium-section">
          <SectionHeading
            eyebrow="THE PLATFORM"
            title="A sharper operating layer for market decisions."
            text="Everything is designed to help you see the market, define the risk and act with intention."
          />
          <div className="capability-grid">
            {capabilities.map(([title, text, Icon], index) => (
              <article className="capability-card" key={title as string}>
                <Icon size={20} />
                <span>0{index + 1}</span>
                <h3>{title as string}</h3>
                <p>{text as string}</p>
                <Link href="/features">
                  Open platform <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Dark Band Philosophy Quote */}
        <section className="dark-band">
          <div>
            <div className="eyebrow-line">
              <i />WHY ELITE
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

        {/* CTA Banner */}
        <section className="premium-section platform-cta">
          <div className="cta-panel">
            <div>
              <div className="eyebrow-line">
                <i />READY WHEN YOU ARE
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

export function FeaturesPage() {
  return (
    <PageFrame>
      <main className="platform-page-container">
        <PageHero
          eyebrow="THE PLATFORM / 01"
          title={<>The tools behind<br /><em>better decisions.</em></>}
          description="A focused, institutional-grade market intelligence terminal for traders who want structure, context and accountability."
        />

        {/* Dedicated Full Platform Terminal Experience */}
        <div className="dedicated-platform-wrapper" id="terminal">
          <TradingDashboard />
        </div>

        <section className="trust-strip" style={{ marginTop: '60px' }}>
          <LockKeyhole size={21} />
          <div>
            <b>Your data. Your decisions.</b>
            <span>We provide research and tools. You remain in control of every trade.</span>
          </div>
        </section>
      </main>
    </PageFrame>
  )
}

export function MethodologyPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="THE FRAMEWORK / 02"
          title={<>Process over<br /><em>prediction.</em></>}
          description="Our approach is intentionally unglamorous: observe the evidence, define the risk, then decide whether the opportunity deserves your attention."
        />
        
        {/* Model Performance & Edge Methodology */}
        <section className="premium-section compact-top">
          <Methodology />
        </section>

        <section className="premium-section compact-top">
          <div className="method-steps">
            {[
              ['01', 'Observe', 'Read the larger market context before isolating a trade: trend, breadth, volatility and participation.'],
              ['02', 'Qualify', 'Filter for setups where price action, volume and derivatives data point in the same direction.'],
              ['03', 'Define', 'Map the entry zone, target and invalidation level before a position is considered.'],
              ['04', 'Review', 'Measure execution quality and outcome without rewriting the process after the fact.'],
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span>
                <h2>{title}</h2>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="dark-band methodology-note">
          <div>
            <div className="eyebrow-line">
              <i />A NOTE ON PERFORMANCE
            </div>
            <h2>Historical data is context,<br />not a promise.</h2>
          </div>
          <p>
            Any performance references on this website are illustrative or based on historical and simulated conditions. They do not represent a guarantee of future returns. Actual results depend on execution, costs, liquidity and market conditions.
          </p>
        </section>
      </main>
    </PageFrame>
  )
}

export function AboutPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="THE COMPANY / 03"
          title={<>Built for people who<br /><em>take the work seriously.</em></>}
          description="Elite Trading Hub is a market intelligence brand focused on making research more structured, risk-aware and useful for the Indian trading community."
        />
        <section className="premium-section about-grid">
          <div>
            <SectionHeading
              eyebrow="OUR BELIEF"
              title="Better inputs create better decisions."
              text="We believe trading technology should reduce noise, not increase urgency. Our work sits between raw market data and independent decision-making."
            />
          </div>
          <div className="about-statements">
            <div>
              <Target size={20} />
              <b>Independent by design</b>
              <p>Tools and analysis that support your thinking rather than replace it.</p>
            </div>
            <div>
              <Database size={20} />
              <b>Evidence over excitement</b>
              <p>Every insight is framed by context, assumptions and risk.</p>
            </div>
            <div>
              <TrendingUp size={20} />
              <b>Built to compound</b>
              <p>The real edge is a process you can return to, trade after trade.</p>
            </div>
          </div>
        </section>
        <section className="contact-banner">
          <div>
            <div className="eyebrow-line">
              <i />WORK WITH US
            </div>
            <h2>
              Questions, partnerships,<br />
              <em>or just a sharper conversation?</em>
            </h2>
          </div>
          <Link href="/contact" className="luxury-button">
            Get in touch <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </PageFrame>
  )
}

export function ContactPage() {
  return (
    <PageFrame>
      <main>
        <PageHero
          eyebrow="CONTACT / 04"
          title={<>Start a more<br /><em>considered conversation.</em></>}
          description="For platform questions, partnerships or support, send us a note. Replace the details below with the client’s official company information before launch."
        />
        <section className="premium-section compact-top contact-grid">
          <div className="contact-details">
            <div>
              <span>SUPPORT EMAIL</span>
              <a href="mailto:support@yourdomain.com">support@yourdomain.com</a>
            </div>
            <div>
              <span>PHONE</span>
              <b>+91 [client phone number]</b>
            </div>
            <div>
              <span>REGISTERED OFFICE</span>
              <p>
                [Official company name]<br />
                [Registered office address]<br />
                India
              </p>
            </div>
          </div>
          <form className="premium-form">
            <label>Name<input placeholder="Your name" /></label>
            <label>Email<input type="email" placeholder="you@company.com" /></label>
            <label>How can we help?<textarea rows={5} placeholder="Tell us what you are looking for..." /></label>
            <button className="luxury-button" type="button">
              Send enquiry <ArrowRight size={16} />
            </button>
          </form>
        </section>
      </main>
    </PageFrame>
  )
}
