'use client'

import { useMemo, useState } from 'react'
import { Area, AreaChart, ResponsiveContainer, Tooltip as RechartsTooltip, XAxis, YAxis } from 'recharts'
import { Activity, ArrowDownRight, ArrowUpRight, BarChart3, Bell, Calculator, Check, ChevronRight, Clock3, Crosshair, Info, LockKeyhole, ShieldCheck, Sparkles, TrendingUp, X, SlidersHorizontal } from 'lucide-react'

const market = [
  { name: 'NIFTY 50', value: '24,718.60', change: '+0.84%', up: true },
  { name: 'BANK NIFTY', value: '52,405.25', change: '+1.12%', up: true },
  { name: 'SENSEX', value: '81,332.60', change: '+0.76%', up: true },
]
const setups = [
  { symbol: 'NIFTY', bias: 'BULLISH', level: '24,650', target: '24,850', stop: '24,570', score: 92, tone: 'bull' },
  { symbol: 'BANK NIFTY', bias: 'BULLISH', level: '52,200', target: '52,700', stop: '51,980', score: 88, tone: 'bull' },
  { symbol: 'RELIANCE', bias: 'BEARISH', level: '2,940', target: '2,865', stop: '2,980', score: 85, tone: 'bear' },
]
const chartData = [
  { month: 'Jan', value: 100 }, { month: 'Feb', value: 104 }, { month: 'Mar', value: 102 }, { month: 'Apr', value: 111 }, { month: 'May', value: 116 }, { month: 'Jun', value: 114 }, { month: 'Jul', value: 124 }, { month: 'Aug', value: 131 }, { month: 'Sep', value: 128 }, { month: 'Oct', value: 141 }, { month: 'Nov', value: 149 }, { month: 'Dec', value: 158 },
]

function SectionLabel({ children }: { children: React.ReactNode }) { return <p className="section-label"><span />{children}</p> }
function Metric({ label, value, sub, positive = true }: { label: string; value: string; sub: string; positive?: boolean }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><small className={positive ? 'positive' : 'negative'}>{sub}</small></div> }

export function ComplianceNotice() {
  const [open, setOpen] = useState(true)
  if (!open) return <button className="notice-collapsed" onClick={() => setOpen(true)}><ShieldCheck size={14} /> SEBI COMPLIANCE NOTICE <ChevronRight size={14} /></button>
  return <div className="compliance"><ShieldCheck size={16} /><span><b>SEBI COMPLIANCE NOTICE</b> — This platform provides educational market analysis only. Not investment advice.</span><button aria-label="Dismiss notice" onClick={() => setOpen(false)}><X size={15} /></button></div>
}

export function Header() {
  const [menu, setMenu] = useState(false)
  return (
    <header className="topbar">
      <a className="brand" href="#top">
        <span className="brand-mark"><Crosshair size={18} /></span>
        <span>ELITE<span>TRADING</span><em>HUB</em></span>
      </a>
      <nav className={menu ? 'nav open' : 'nav'}>
        <a href="#setups">Setups</a>
        <a href="#calculator">Risk Calculator</a>
        <a href="#methodology">Methodology</a>
        <a href="#disclosures">Disclosures</a>
      </nav>
      <div className="header-actions">
        <span className="live"><i /> MARKET OPEN</span>
        <button className="icon-btn" aria-label="Notifications"><Bell size={17} /></button>
        <button className="mobile-hamburger-btn" aria-label="Toggle Menu" onClick={() => setMenu(!menu)}>
          {menu ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  )
}

function MarketStrip() { return <div className="market-strip">{market.map((item) => <div className="ticker" key={item.name}><span>{item.name}</span><b>{item.value}</b><small className={item.up ? 'positive' : 'negative'}>{item.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{item.change}</small></div>)}</div> }

function SetupCard({ setup }: { setup: typeof setups[number] }) { return <article className={`setup-card ${setup.tone}`}><div className="setup-top"><div><span className="symbol">{setup.symbol}</span><span className="badge">{setup.bias}</span></div><span className="score"><strong>{setup.score}</strong>/100</span></div><div className="setup-grid"><div><span>ENTRY ZONE</span><b>{setup.level}</b></div><div><span>TARGET</span><b className="positive">{setup.target}</b></div><div><span>STOP LOSS</span><b className="negative">{setup.stop}</b></div></div><div className="setup-bottom"><span><Clock3 size={13} /> Intraday</span><span><Activity size={13} /> High conviction</span><button aria-label={`View ${setup.symbol} setup`}><ChevronRight size={17} /></button></div></article> }

export function Setups() { const [tab, setTab] = useState('Index') ; return <section id="setups" className="section"><div className="section-head"><div><SectionLabel>REAL-TIME ANALYSIS</SectionLabel><h2>Today&apos;s high-conviction setups</h2><p>System-generated levels built from price action, volume and derivatives data.</p></div><div className="tabs">{['Index', 'Equities', 'Options'].map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}</div></div><div className="setup-list">{setups.map(s => <SetupCard key={s.symbol} setup={s} />)}</div></section> }

export function RiskCalculator() { const [capital, setCapital] = useState(100000); const [risk, setRisk] = useState(1); const [entry, setEntry] = useState(24700); const [stop, setStop] = useState(24600); const result = useMemo(() => { const amount = capital * risk / 100; const perUnit = Math.abs(entry - stop); return { amount, qty: perUnit ? Math.floor(amount / perUnit) : 0, exposure: perUnit ? Math.floor(amount / perUnit) * entry : 0 } }, [capital, risk, entry, stop]); return <section id="calculator" className="section calculator-section"><div className="section-head"><div><SectionLabel>POSITION SIZING ENGINE</SectionLabel><h2>Know your risk before you enter.</h2><p>Define your risk. Let the system calculate your position size.</p></div><Calculator className="section-icon" size={32} /></div><div className="calculator"><div className="calc-fields"><label>AVAILABLE CAPITAL<input type="number" value={capital} onChange={e => setCapital(+e.target.value)} /></label><label>RISK PER TRADE <span className="input-suffix">{risk}%</span><input type="range" min="0.25" max="5" step="0.25" value={risk} onChange={e => setRisk(+e.target.value)} /></label><div className="field-row"><label>ENTRY PRICE<input type="number" value={entry} onChange={e => setEntry(+e.target.value)} /></label><label>STOP LOSS<input type="number" value={stop} onChange={e => setStop(+e.target.value)} /></label></div></div><div className="calc-result"><span>RECOMMENDED QUANTITY</span><strong>{result.qty.toLocaleString('en-IN')}</strong><div className="result-line"><span>Max loss</span><b>₹{result.amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</b></div><div className="result-line"><span>Position exposure</span><b>₹{result.exposure.toLocaleString('en-IN')}</b></div><button className="primary-btn">Apply to setup <ChevronRight size={16} /></button></div></div></section> }

export function Methodology() { return <section id="methodology" className="section"><div className="section-head"><div><SectionLabel>THE EDGE</SectionLabel><h2>Process over prediction.</h2><p>A rules-based framework designed to remove emotion from your trading decisions.</p></div></div><div className="method-grid"><div className="performance"><div className="card-head"><div><span>MODEL PERFORMANCE</span><strong>+58.4%</strong><small className="positive">12-month simulated return</small></div><select aria-label="Performance range"><option>12 months</option><option>24 months</option></select></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData}><defs><linearGradient id="fillPerformance" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--emerald)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--emerald)" stopOpacity={0} /></linearGradient></defs><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} /><YAxis hide domain={['dataMin - 5', 'dataMax + 5']} /><RechartsTooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--foreground)' }} /><Area type="monotone" dataKey="value" stroke="var(--emerald)" strokeWidth={2} fill="url(#fillPerformance)" /></AreaChart></ResponsiveContainer></div></div><div className="stats-card"><Metric label="WIN RATE" value="67.2%" sub="+4.8% vs benchmark" /><Metric label="PROFIT FACTOR" value="1.84" sub="Strong edge" /><Metric label="MAX DRAWDOWN" value="-12.6%" sub="Within model limits" positive={false} /></div></div></section> }

export function Disclosure() { return <footer id="disclosures" className="footer"><div className="footer-brand"><a className="brand" href="#top"><span className="brand-mark"><Crosshair size={18} /></span><span>ELITE<span>TRADING</span><em>HUB</em></span></a><p>Institutional-grade market intelligence<br />for the serious Indian trader.</p></div><div className="footer-copy"><h3>Important risk disclosure</h3><p>Trading in securities and derivatives involves substantial risk of loss. The information provided by Elite Trading Hub is for educational and informational purposes only and should not be construed as investment advice, a recommendation, or an offer to buy or sell any security.</p><p>Past performance is not indicative of future results. Historical accuracy of our setups has ranged between 85–95% in backtested conditions. Actual results may vary. There are no guaranteed returns.</p><div className="footer-meta"><span>© 2024 Elite Trading Hub</span><span>SEBI Registered Research Analyst: INH0000XXXX</span><span><LockKeyhole size={13} /> Data encrypted & secure</span></div></div></footer> }

export default function TradingDashboard({ showHeader = false }: { showHeader?: boolean }) {
  return (
    <div id="top" className="app-shell">
      <ComplianceNotice />
      {showHeader && <Header />}
      <MarketStrip />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="pulse" /> YOUR MARKET INTELLIGENCE TERMINAL</div>
            <h1>Trade with <i>clarity.</i><br />Not conviction.</h1>
            <p>Real-time setups, quantified risk, and institutional-grade analysis — built for traders who treat the market like a business.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#setups">Explore today&apos;s setups <ChevronRight size={16} /></a>
              <a className="text-link" href="#methodology">How it works <ChevronRight size={15} /></a>
            </div>
            <div className="hero-proof">
              <span><Check size={14} /> Rules-based analysis</span>
              <span><Check size={14} /> No noise. No hype.</span>
            </div>
          </div>
          <div className="hero-terminal">
            <div className="terminal-top"><span><i /> LIVE SIGNAL</span><span>09:42:18 IST</span></div>
            <div className="terminal-main">
              <span className="terminal-kicker">NIFTY 50 · 5 MIN</span>
              <strong>24,718.60</strong>
              <small className="positive">+205.40 (+0.84%)</small>
              <div className="sparkline">
                <svg viewBox="0 0 360 90" preserveAspectRatio="none" aria-label="Nifty intraday price trend">
                  <path d="M0 72 C 20 68, 28 76, 48 60 S 75 67, 92 45 S 120 55, 140 42 S 170 48, 190 30 S 220 45, 240 34 S 280 30, 305 18 S 340 28, 360 8" fill="none" stroke="var(--emerald)" strokeWidth="2" />
                </svg>
              </div>
            </div>
            <div className="terminal-grid">
              <span>OPEN <b>24,512.20</b></span>
              <span>HIGH <b>24,781.45</b></span>
              <span>LOW <b>24,401.80</b></span>
              <span>VOLUME <b>218.4M</b></span>
            </div>
          </div>
        </section>
        <Setups />
        <RiskCalculator />
        <Methodology />
      </main>
      <Disclosure />
    </div>
  )
}

export { MarketStrip }
