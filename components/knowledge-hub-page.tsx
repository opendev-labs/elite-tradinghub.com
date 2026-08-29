'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  LineChart,
  Brain,
  Shield,
  Layers,
  PieChart,
  Search,
  Activity,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Download,
  GraduationCap,
  Scale,
  Compass,
} from 'lucide-react';
import { PageFrame, PageHero, SectionHeading } from './site-shell';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const eduModules = [
  {
    id: 'tech-analysis',
    title: '1. Technical Analysis',
    category: 'Chart Analytics',
    icon: LineChart,
    desc: 'Understanding price action, candlestick formations, moving averages, RSI, MACD, and key support & resistance zones.',
    topics: [
      'Candlestick Price Action Dynamics & Reversal Signals',
      'Exponential Moving Averages (EMA 20, 50, 200) for Trend Confirmation',
      'Relative Strength Index (RSI) & Momentum Divergence',
      'Volume Profile & High Volume Nodes (HVN)',
    ],
    level: 'Core Knowledge',
  },
  {
    id: 'fund-analysis',
    title: '2. Fundamental Analysis',
    category: 'Market Drivers',
    icon: Search,
    desc: 'Evaluating corporate earnings, macroeconomic indicators, RBI rate policy, yield curves, and sector relative strength.',
    topics: [
      'Quarterly Financial Statement Analysis & Earning Quality',
      'Macroeconomic Indicators: Inflation, GDP, RBI Interest Rates',
      'Sectoral Rotation & Institutional Capital Flows (FII / DII)',
      'Valuation Ratios: P/E, P/B, EV/EBITDA & DCF Basics',
    ],
    level: 'Market Fundamentals',
  },
  {
    id: 'chart-patterns',
    title: '3. Chart Patterns',
    category: 'Pattern Recognition',
    icon: Layers,
    desc: 'Identifying high-probability continuation and reversal chart patterns across multiple timeframes.',
    topics: [
      'Head and Shoulders & Inverse Head & Shoulders',
      'Double Tops, Double Bottoms & Triple Reversals',
      'Bull & Bear Flags, Pennants, and Symmetrical Triangles',
      'Breakout Validation vs False Breakout Traps',
    ],
    level: 'Execution Setup',
  },
  {
    id: 'market-trends',
    title: '4. Market Trends',
    category: 'Trend Structure',
    icon: Activity,
    desc: 'Classifying market regimes: Uptrend (higher highs/lows), Downtrend, and Range-bound sideways consolidations.',
    topics: [
      'Dow Theory Principles & Market Structure Breaks (MSB)',
      'Trendlines, Channels, and Dynamic Support/Resistance',
      'Identifying Market Regimes: Trending vs Choppy Volatility',
      'NIFTY / BANK NIFTY Intraday Trend Alignment',
    ],
    level: 'Regime Filter',
  },
  {
    id: 'risk-reward',
    title: '5. Risk/Reward Concepts',
    category: 'Math & Edge',
    icon: Scale,
    desc: 'Mathematical foundations of positive expected value (EV) trading and maintaining asymmetric risk/reward ratios.',
    topics: [
      'Calculating Expected Value: EV = (Win Rate × Win Size) - (Loss Rate × Loss Size)',
      'Structuring Trades with Minimum 1:2 or 1:3 R:R Ratio',
      'Why 40% Win-Rate with 1:2.5 R:R Outperforms 80% Win-Rate with Poor Risk',
      'Stop-Loss Placement based on Volatility (ATR)',
    ],
    level: 'Quant Edge',
  },
  {
    id: 'position-sizing',
    title: '6. Position Sizing',
    category: 'Capital Safety',
    icon: Shield,
    desc: 'Managing bankroll allocation to prevent drawdown spirals and withstand inevitable market loss streaks.',
    topics: [
      'The 1% - 2% Fixed Risk Rule per Trade',
      'Fractional Kelly Criterion & Volatility-Adjusted Allocation',
      'Futures & Options Margin Management & Leverage Limits',
      'Dynamic Position Reduction during Drawdown Phases',
    ],
    level: 'Risk Engine',
  },
  {
    id: 'trading-psychology',
    title: '7. Trading Psychology',
    category: 'Mindset & Discipline',
    icon: Brain,
    desc: 'Eliminating emotional bias, handling fear & greed, overcoming FOMO, and maintaining strict execution discipline.',
    topics: [
      'Accepting Risk & Embracing Market Uncertainty',
      'Overcoming FOMO (Fear of Missing Out) and Overtrading',
      'Building Emotional Neutrality During Win and Loss Series',
      'Maintaining a Structured Trading Journal & Review Ritual',
    ],
    level: 'Behavioral Edge',
  },
  {
    id: 'portfolio-principles',
    title: '8. Portfolio-Management Principles',
    category: 'Asset Allocation',
    icon: PieChart,
    desc: 'Long-term wealth building principles, multi-asset diversification, periodic rebalancing, and drawdowns mitigation.',
    topics: [
      'Strategic Asset Allocation Across Equities, Debt, and Cash',
      'Periodic Portfolio Rebalancing & Profit Harvesting',
      'Correlation Analysis to Avoid Over-Exposure to Single Sectors',
      'Hedging Portfolio Equity with Index Options',
    ],
    level: 'Wealth Longevity',
  },
];

const faqs = [
  {
    q: 'Is this trading education completely free?',
    a: 'Yes, Elite Trading Hub provides free trading & investment educational resources to help market participants understand technical analysis, fundamental evaluation, position sizing, and risk management principles.',
  },
  {
    q: 'Does Elite Trading Hub guarantee specific accuracy or returns?',
    a: 'No. In strict accordance with SEBI compliance standards, Elite Trading Hub does NOT guarantee returns or assure specific accuracy percentages (e.g. 85-95%). Past performance does not guarantee future market results.',
  },
  {
    q: 'How does risk management protect portfolio capital?',
    a: 'Risk management enforces predefined stop-loss rules, position sizing limits (typically 1-2% risk per trade), and diversification so that no single loss significantly damages your overall portfolio.',
  },
  {
    q: 'What is the recommended approach for beginner traders?',
    a: 'Beginners should first master technical analysis fundamentals, study chart patterns, understand expected value math (Risk/Reward), and practice strict paper risk management before placing live trades.',
  },
];

export function KnowledgeHubPage() {
  const [selectedModule, setSelectedModule] = useState<string>(eduModules[0].id);

  const activeModuleData = eduModules.find((m) => m.id === selectedModule) || eduModules[0];

  return (
    <PageFrame>
      <PageHero
        kicker="Free Knowledge • Trading & Investment Education"
        title={
          <span>
            Master the Markets with <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent">
              Structured Free Knowledge
            </span>
          </span>
        }
        desc="Comprehensive educational modules covering Technical Analysis, Fundamental Evaluation, Risk/Reward Math, Position Sizing, Trading Psychology, and Portfolio Management Principles."
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Core Principles Header Banner */}
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-zinc-900/80 to-zinc-900/80 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-zinc-100">
                Disciplined Learning Framework
              </h2>
              <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                Education is designed to foster informed, structured decision-making rather than emotional trading or speculative guessing.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/portfolio-management"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/20"
            >
              Portfolio Services <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 8 Educational Modules Showcase */}
        <section className="space-y-8">
          <SectionHeading
            kicker="Curriculum Overview"
            title="8 Pillars of Trading & Investment Education"
            desc="Explore our free knowledge modules built on quantitative research, price action mechanics, and risk engineering."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eduModules.map((mod, idx) => {
              const Icon = mod.icon;
              const isSelected = mod.id === selectedModule;
              return (
                <motion.div
                  key={mod.id}
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  onClick={() => setSelectedModule(mod.id)}
                  className={`rounded-2xl border p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-950/20 shadow-lg shadow-purple-950/30 scale-[1.02]'
                      : 'border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-zinc-700'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' : 'bg-zinc-800/80 border-zinc-700/50 text-emerald-400'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50">
                        {mod.level}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-zinc-100 leading-snug">
                      {mod.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                      {mod.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <Link
                      href={`/knowledge/${mod.id}`}
                      className="font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1 group/link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Open Full Lesson</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                    <span className="text-[10px] text-zinc-500 font-mono">15 min</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Selected Module Detail Inspector */}
        <section className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <activeModuleData.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full">
                  Detailed Syllabus • {activeModuleData.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mt-1">
                  {activeModuleData.title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-xs text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 font-mono">
                Level: <span className="text-emerald-400 font-bold">{activeModuleData.level}</span>
              </div>
              <Link
                href={`/knowledge/${activeModuleData.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20 shrink-0"
              >
                <span>Read Full Academy Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-zinc-300 leading-relaxed">
              {activeModuleData.desc}
            </p>

            <div className="flex items-center justify-between pt-2">
              <h4 className="text-xs font-mono font-semibold uppercase text-purple-400 tracking-wider">
                Key Concepts & Syllabus Outline (Click topic to open full lesson):
              </h4>
              <span className="text-[10px] font-mono text-zinc-500">8 Modules Available</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeModuleData.topics.map((tp, idx) => (
                <Link
                  key={idx}
                  href={`/knowledge/${activeModuleData.id}`}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-purple-500/60 hover:bg-purple-950/20 flex items-start justify-between gap-3 group transition-all cursor-pointer shadow-sm"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5 group-hover:text-purple-400 transition-colors" />
                    <span className="text-xs text-zinc-200 group-hover:text-white font-medium leading-snug">
                      {tp}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-1 transition-all shrink-0 mt-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Free Knowledge FAQ Section (Professional SEO Schema-ready) */}
        <section className="space-y-6">
          <SectionHeading
            kicker="Clear Disclosures"
            title="Frequently Asked Questions"
            desc="Transparent answers regarding free education, risk management, and compliance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <h4 className="text-sm font-bold text-zinc-100 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Website CTAs */}
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-8 text-center space-y-4 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-zinc-100">
            Learn. Analyze. Manage Risk. Trade With Discipline.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400">
            Elevate your market understanding with structured quantitative analytics and disciplined portfolio principles.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/portfolio-management"
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20"
            >
              [Explore Our Services]
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs transition-all"
            >
              [Talk to Our Team]
            </Link>
            <Link
              href="/disclaimer"
              className="px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-amber-400 font-medium text-xs transition-all"
            >
              [Risk Disclosure]
            </Link>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
