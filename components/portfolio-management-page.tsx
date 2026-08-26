'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  TrendingUp,
  BarChart3,
  BookOpen,
  PieChart,
  FileText,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  Sliders,
  Scale,
  Award,
  Lock,
  Search,
  Check,
  Building2,
  Compass,
} from 'lucide-react';
import { PageFrame, PageHero, SectionHeading } from './site-shell';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
};

const pillars = [
  {
    id: 1,
    icon: PieChart,
    title: '1. Personalized Portfolio Management',
    desc: 'Tailored strategy aligned with individual investment horizon and risk tolerance.',
    points: [
      "Customized investment approach based on the client's objectives and risk profile",
      'Portfolio monitoring and periodic review',
      'Focus on disciplined decision-making rather than emotional trading',
      'Strategies designed according to market conditions',
    ],
    badge: 'Custom Allocation',
    accent: 'emerald',
  },
  {
    id: 2,
    icon: Search,
    title: '2. Market Research & Analysis',
    desc: 'Deep quantitative, fundamental, and technical evaluation across Indian equities and derivative instruments.',
    points: [
      'Fundamental and technical market analysis',
      'Market trend identification',
      'Sector and instrument analysis',
      'Entry and exit planning',
      'Continuous monitoring of relevant market developments',
    ],
    badge: 'Quant Insights',
    accent: 'blue',
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: '3. Risk Management',
    desc: 'Algorithmic capital preservation rules and stop-loss execution models.',
    points: [
      'Defined risk parameters for each strategy',
      'Stop-loss and position-management principles',
      'Portfolio diversification where appropriate',
      'Capital-preservation focus',
      'Regular assessment of portfolio-level risk',
    ],
    badge: 'Capital Safety',
    accent: 'amber',
  },
  {
    id: 4,
    icon: BookOpen,
    title: '4. Trading & Investment Education',
    desc: 'Structured curriculum to help traders understand market mechanics and risk principles.',
    points: [
      'Technical analysis & indicator application',
      'Fundamental analysis & financial statement assessment',
      'Chart patterns & price action structures',
      'Market trends & regime identification',
      'Risk/reward concepts & expected value',
      'Position sizing & bankroll allocation',
      'Trading psychology & emotional discipline',
      'Portfolio-management principles',
    ],
    badge: 'Free Knowledge',
    accent: 'purple',
  },
  {
    id: 5,
    icon: BarChart3,
    title: '5. Portfolio Monitoring',
    desc: 'Continuous surveillance of positions with dynamic adjustment based on market state.',
    points: [
      'Regular review of portfolio positions',
      'Performance tracking against benchmarks',
      'Identification of changing market conditions',
      'Strategy review and adjustments when appropriate',
      'Periodic portfolio reports',
    ],
    badge: 'Active Oversight',
    accent: 'cyan',
  },
  {
    id: 6,
    icon: FileText,
    title: '6. Transparent Reporting',
    desc: 'Clear disclosure of fees, benchmarks, drawdowns, and strategy performance.',
    points: [
      'Portfolio performance reporting',
      'Applicable fees and charges breakdown',
      'Investment approach methodology',
      'Associated risks disclosure',
      'Relevant benchmarks comparison',
      'Clear terms and conditions',
    ],
    badge: 'Full Clarity',
    accent: 'indigo',
  },
];

export function PortfolioManagementPage() {
  const [portfolioCapital, setPortfolioCapital] = useState<number>(500000);
  const [riskPercent, setRiskPercent] = useState<number>(1.5);
  const [stopLossPips, setStopLossPips] = useState<number>(40);

  // Risk Math Calculator
  const riskAmount = (portfolioCapital * riskPercent) / 100;
  const recommendedLots = Math.max(1, Math.floor(riskAmount / (stopLossPips * 25))); // NIFTY lot size ~25

  return (
    <PageFrame>
      {/* Hero Section */}
      <PageHero
        kicker="SEBI Framework Aligned • Institutional Standards"
        title={
          <span>
            Elite Trading Hub — <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Portfolio Management Service
            </span>
          </span>
        }
        desc="Disciplined, quantitative, and risk-first portfolio solutions designed for Indian market participants in changing volatility regimes."
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* SEBI Compliance Notice Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-zinc-900/90 to-zinc-900/90 p-6 shadow-xl backdrop-blur-md"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                  Regulatory Compliance Disclosure
                </span>
                <span className="text-xs text-zinc-400">SEBI Regulatory Guidelines</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                SEBI’s portfolio-manager framework requires clear disclosure of services, fees, risks, and performance. 
                <strong className="text-zinc-100 font-semibold"> Portfolio managers cannot guarantee or assure returns.</strong> All investment strategies involve risk of capital loss.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action Banner Headline */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <Compass className="w-3.5 h-3.5" /> Website Call-To-Action
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-100">
            Learn. Analyze. Manage Risk. Trade With Discipline.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Elite Trading Hub provides education-focused market research and portfolio-management solutions designed to help clients make more informed decisions in changing market conditions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="#services-grid"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
            >
              Explore Our Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-sm transition-all hover:bg-zinc-800/60"
            >
              Talk to Our Team
            </Link>
            <Link
              href="/disclaimer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-amber-500/40 text-amber-400 font-medium text-sm transition-all"
            >
              <AlertTriangle className="w-4 h-4" /> Risk Disclosure
            </Link>
          </div>
        </div>

        {/* 6 Core Pillars Grid */}
        <section id="services-grid" className="space-y-8">
          <SectionHeading
            kicker="Service Architecture"
            title="6 Pillars of Portfolio Management"
            desc="Structured framework emphasizing risk management, technical rigor, and complete disclosure."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.id}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70 p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 group hover:shadow-2xl hover:shadow-emerald-950/20"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700/50 text-emerald-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        {pillar.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>

                    <div className="h-px bg-zinc-800/80 my-3" />

                    <ul className="space-y-2.5">
                      {pillar.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pillar.id === 4 && (
                    <div className="mt-6 pt-4 border-t border-zinc-800">
                      <Link
                        href="/knowledge"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Explore Free Knowledge Hub <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Realistic Expectations & Performance Disclaimer */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 space-y-6"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div>
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                Transparency Standard
              </span>
              <h3 className="text-xl font-bold text-zinc-100 mt-2">
                About Return Expectations & Accuracy Claims
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> SEBI Compliant Formulation
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/30 space-y-3">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
                <XCircle className="w-4 h-4" /> Claims We Explicitly Avoid:
              </div>
              <ul className="space-y-2 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <span className="text-red-400">❌</span> “85–95% Guaranteed Accuracy”
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">❌</span> “Guaranteed Profit”
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-400">❌</span> “95% Winning Trades Assurance”
                </li>
              </ul>
              <p className="text-[11px] text-zinc-400 pt-1">
                SEBI guidelines strictly prohibit unverified accuracy guarantees or return promises.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Our Realistic Website Formulation:
              </div>
              <blockquote className="text-xs text-zinc-200 leading-relaxed italic bg-zinc-950/60 p-3 rounded-lg border border-emerald-500/20">
                “Our educational strategies are developed using structured market research, technical analysis and risk-management principles. Certain strategies may demonstrate high historical signal accuracy in specific market conditions; however, past performance does not guarantee future results.”
              </blockquote>
              <p className="text-[11px] text-zinc-400 pt-1">
                Focuses on market regime evaluation, statistical edge, and disciplined execution.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Interactive Risk & Capital Management Calculator */}
        <section className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 mb-2">
                <Calculator className="w-3 h-3" /> Risk Principle Demo
              </div>
              <h3 className="text-xl font-bold text-zinc-100">
                Disciplined Position Sizing Calculator
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Calculate maximum risk allocation based on capital preservation guidelines.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
            <div className="space-y-4 lg:col-span-2">
              <div>
                <div className="flex justify-between text-xs text-zinc-300 mb-1 font-mono">
                  <span>Total Portfolio Capital:</span>
                  <span className="text-emerald-400 font-bold">₹{portfolioCapital.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={portfolioCapital}
                  onChange={(e) => setPortfolioCapital(Number(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1 font-mono">
                    <span>Risk Per Trade (%):</span>
                    <span className="text-emerald-400 font-bold">{riskPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-zinc-300 mb-1 font-mono">
                    <span>Stop-Loss Points (NIFTY):</span>
                    <span className="text-emerald-400 font-bold">{stopLossPips} Pts</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="100"
                    step="5"
                    value={stopLossPips}
                    onChange={(e) => setStopLossPips(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
                  Risk Engine Output
                </span>
                <div className="mt-2 space-y-3">
                  <div>
                    <div className="text-xs text-zinc-400">Max Allowed Risk Amount:</div>
                    <div className="text-2xl font-black text-emerald-400 font-mono">
                      ₹{riskAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400">Recommended Position Limit:</div>
                    <div className="text-lg font-bold text-zinc-100 font-mono">
                      ~{recommendedLots} Lots (NIFTY 25 Lot)
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 leading-tight">
                *Position sizing rules prevent catastrophic drawdowns and preserve trading longevity.
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Disclosure Footer Note */}
        <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-6 text-xs text-zinc-400 space-y-2 font-mono">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Building2 className="w-4 h-4 text-emerald-400" /> Statutory & Regulatory Notice
          </div>
          <p className="leading-relaxed text-zinc-400">
            <strong>Important:</strong> If Elite Trading Hub is actually offering regulated Portfolio Management Services (PMS) in India, make sure the business, service description and advertising match the applicable SEBI registration and regulatory requirements. SEBI&apos;s current Portfolio Managers Regulations are the relevant framework.
          </p>
        </div>
      </div>
    </PageFrame>
  );
}
