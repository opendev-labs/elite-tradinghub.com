'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight, BarChart3, Check, Database, Send,
  ShieldCheck, Sparkles, Target, TrendingUp, Layers, CheckCircle2,
  PieChart, BookOpen, GraduationCap,
} from 'lucide-react';
import { PageFrame, PageHero, SectionHeading } from './site-shell';
import { InteractiveGridBackground } from './interactive-grid-background';
import { TestimonialsSection } from './testimonials-section';
import { pushRtdbData } from '@/lib/firebase';

const capabilities = [
  {
    title: 'Market Coverage',
    desc: 'Deep intraday analytics and signal tracking for NIFTY 50, BANK NIFTY, and SENSEX.',
    icon: BarChart3,
    step: '01',
  },
  {
    title: 'Signal Discipline',
    desc: 'Quant-backed framework integrating price action, volume profile, India VIX, and option chain skew.',
    icon: Target,
    step: '02',
  },
  {
    title: 'Risk Engine First',
    desc: 'Dynamic position sizing and automated stop-loss algorithms to enforce strict portfolio capital preservation.',
    icon: ShieldCheck,
    step: '03',
  },
];

const fadeInVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.12,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export function PremiumHome() {
  return (
    <PageFrame>
      <main className="bg-zinc-950 text-zinc-100 font-sans">
        {/* Animated Hero Section (EXACTLY PRESERVED AS REQUESTED) */}
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
                  ease: 'easeInOut',
                  repeat: Infinity,
                },
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/user-logo-transparent.png"
                alt="Elite Trading Hub Official Logo"
                className="hero-logo-transparent-img"
              />
            </motion.div>

            <motion.div className="hero-buttons hero-center-buttons" variants={fadeInVariants} custom={1}>
              <motion.div className="hero-btn-wrapper" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/features" className="luxury-button">
                  Explore <ArrowRight size={16} />
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

        {/* Proof Bar - $1M Shadcn Style */}
        <section className="py-6 bg-zinc-900/60 border-y border-zinc-800/80">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
            <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Supported Indices</span>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold shadow-sm">NIFTY 50</span>
              <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold shadow-sm">BANK NIFTY</span>
              <span className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-200 font-semibold shadow-sm">SENSEX</span>
            </div>
          </div>
        </section>

        {/* Capability Overview Grid - $1M Shadcn Cards */}
        <section className="py-20 w-full px-4 sm:px-6 lg:px-8">
          <SectionHeading
            kicker="SYSTEM ARCHITECTURE"
            title="Institutional tools, built for independent traders."
            desc="A clean breakdown of what Elite Trading Hub delivers every session."
          />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={staggerContainer}
          >
            {capabilities.map((c, i) => {
              const IconComponent = c.icon;
              return (
                <motion.div
                  key={c.title}
                  variants={fadeInVariants}
                  custom={i}
                  className="group bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-emerald-400 shadow-inner">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-800/50 border border-zinc-700/40 px-2.5 py-0.5 rounded-full">
                        {c.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 font-mono">Quantitative Engine</span>
                    <Link
                      href="/login"
                      className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>Open platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Philosophy Dark Band - $1M Shadcn Style */}
        <section className="py-16 w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-3.5 h-3.5 object-contain" />
                WHY ELITE TRADING HUB
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
                Clarity compounds.
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                Markets will always contain uncertainty. Your process does not have to. We make the work before the trade visible, repeatable, and accountable.
              </p>
              <div className="pt-2">
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs transition-all shadow-sm"
                >
                  <span>See the framework</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 bg-zinc-950/80 border border-zinc-800 rounded-2xl p-6 space-y-3 shadow-inner">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <p className="text-xs text-zinc-300 italic leading-relaxed">
                “The goal is not to predict every move. It is to create a better decision than the one you would make without a process.”
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 pt-2 border-t border-zinc-800">
                — ELITE RESEARCH PRINCIPLE
              </p>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Management & Free Knowledge Feature Section */}
        <section className="py-16 w-full px-4 sm:px-6 lg:px-8 border-t border-zinc-800/60">
          <SectionHeading
            kicker="PORTFOLIO & EDUCATION"
            title="Personalized Portfolio Solutions & Free Knowledge"
            desc="Disciplined capital management, technical research, and free trader education aligned with SEBI framework standards."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            {/* Portfolio Management Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 flex flex-col justify-between space-y-6 shadow-xl hover:border-emerald-500/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    <PieChart className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                    SEBI Framework Aligned
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                  Portfolio Management Service
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Tailored investment approaches based on client objectives, strict risk parameters, active market research, and transparent performance reporting.
                </p>

                <ul className="space-y-2.5 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Personalized asset allocation & risk parameters</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Fundamental & technical market trend analysis</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Transparent fee structure & benchmark reporting</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">Disciplined Management</span>
                <Link
                  href="/portfolio-management"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20"
                >
                  Explore Portfolio PMS <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>

            {/* Free Knowledge Hub Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 flex flex-col justify-between space-y-6 shadow-xl hover:border-purple-500/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                    Free Learning Hub
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                  Trading & Investment Education
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  Free comprehensive educational modules designed to empower traders with technical analysis, risk sizing, chart pattern recognition, and market psychology.
                </p>

                <ul className="space-y-2.5 pt-2">
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Technical & Fundamental Analysis Curriculum</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Risk/Reward expected value & position sizing math</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>Trading psychology & emotional discipline principles</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">Zero Cost Education</span>
                <Link
                  href="/knowledge"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all shadow-md shadow-purple-600/20"
                >
                  Access Free Knowledge <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3D Testimonials Section Replicated from Vishwaleader.com */}
        <TestimonialsSection />

        {/* Platform CTA */}
        <section className="py-16 w-full px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800/80 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-3.5 h-3.5 object-contain" />
                READY WHEN YOU ARE
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                Trade less reactively. <span className="text-emerald-400">Think more clearly.</span>
              </h2>
            </div>

            <Link
              href="/login"
              className="h-11 px-6 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs flex items-center gap-2 transition-all shadow-md hover:shadow-lg flex-shrink-0"
            >
              <span>Launch platform</span>
              <ArrowRight className="w-4 h-4 text-zinc-950" />
            </Link>
          </motion.div>
        </section>
      </main>
    </PageFrame>
  );
}

export function PremiumFeatures() {
  return (
    <PageFrame>
      <main className="bg-zinc-950 text-zinc-100 font-sans py-12">
        <PageHero
          kicker="PLATFORM CAPABILITIES"
          title={<>Built to bring <span className="text-emerald-400">order</span> to the market day.</>}
          desc="Explore the tools, analytics, and level engines designed to help you plan, execute, and evaluate trades with rigor."
        />

        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-zinc-100">Designed for NIFTY 50, BANK NIFTY & SENSEX</h4>
                <p className="text-xs text-zinc-400">Optimized for institutional Indian indices price action & derivatives.</p>
              </div>
            </div>

            <Link href="/login" className="h-9 px-4 rounded-lg bg-zinc-100 hover:bg-white text-zinc-900 font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm">
              <span>Access Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '01', title: 'High-conviction Intraday Setups', desc: 'Pre-market and live-session setups derived from volume profile, key intraday levels, and derivatives positioning.', icon: Target },
              { num: '02', title: 'Position Sizing & Risk Engine', desc: 'Calculate exact quantity and exposure based on your portfolio capital and risk-per-trade rules before entering any position.', icon: BarChart3 },
              { num: '03', title: 'Derivatives & Volatility Context', desc: 'Monitor India VIX shifts, open interest builds, and option chain skew to align with broader market context.', icon: TrendingUp },
              { num: '04', title: 'Post-trade Performance Analytics', desc: 'Track win rates, profit factor, and drawdown metrics over time to continuously refine your edge.', icon: Database },
            ].map((f) => {
              const IconComp = f.icon;
              return (
                <div key={f.num} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-4 hover:border-zinc-700 transition-all shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                        {f.num}
                      </span>
                      <IconComp className="w-5 h-5 text-zinc-400" />
                    </div>
                    <h3 className="text-base font-semibold text-zinc-100">{f.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{f.desc}</p>
                  </div>
                  <div className="pt-4 mt-2 border-t border-zinc-800/60 flex justify-end">
                    <Link
                      href="/login"
                      className="px-3 py-1.5 bg-white hover:bg-zinc-100 text-zinc-950 font-semibold text-xs rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <span>Open platform</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

export function PremiumMethodology() {
  return (
    <PageFrame>
      <main className="bg-zinc-950 text-zinc-100 font-sans py-12">
        <PageHero
          kicker="THE RESEARCH FRAMEWORK"
          title={<>Process over <span className="text-emerald-400">prediction.</span></>}
          desc="How Elite Trading Hub evaluates price action, derivative flows, and market volatility to produce decision-grade intelligence."
        />

        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Context', desc: 'Identify macro trend, index alignment, and volatility regime before looking for trade setups.' },
              { step: '02', title: 'Location', desc: 'Filter for high-confluence zones where price action converges with volume nodes or key option strikes.' },
              { step: '03', title: 'Trigger', desc: 'Wait for explicit confirmation from intraday price action, momentum, and volume profile.' },
              { step: '04', title: 'Risk', desc: 'Define maximum loss and position size before order entry. Never alter stop-loss during a live trade.' },
            ].map((m) => (
              <div key={m.step} className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-3 hover:border-zinc-700 transition-all shadow-sm">
                <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/60 inline-block">
                  STEP {m.step}
                </span>
                <h3 className="text-base font-semibold text-zinc-100">{m.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-3xl p-8 space-y-3 shadow-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-3.5 h-3.5 object-contain" />
              DISCIPLINE MATTERS
            </div>
            <h2 className="text-2xl font-bold text-zinc-100">Why rules beat intuition.</h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              Discipline isn&apos;t about never taking losses—it&apos;s about ensuring every loss is controlled, deliberate, and within your risk model parameters.
            </p>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

export function PremiumAbout() {
  return (
    <PageFrame>
      <main className="bg-zinc-950 text-zinc-100 font-sans py-12">
        <PageHero
          kicker="ABOUT ELITE TRADING HUB"
          title={<>Built for traders who value <span className="text-emerald-400">discipline.</span></>}
          desc="We created Elite Trading Hub to provide NIFTY 50, BANK NIFTY and SENSEX traders with clean, structured, research-driven market intelligence without the noise."
        />

        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/only-bull-head-icon.png" alt="Bull Icon" className="w-4 h-4 object-contain" />
                No noise. No hype.
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                We do not publish get-rich-quick tips or speculative calls. Every setup is grounded in verifiable price action and derivatives data.
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-2">
              <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Risk management first
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Capital preservation is the foundation of long-term trading survival. Our engine forces position sizing discipline before trade execution.
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-between space-y-4 shadow-xl">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <p className="text-sm text-zinc-200 italic leading-relaxed">
              “Consistency in trading comes from consistent execution of a quantified edge, combined with non-negotiable risk parameters.”
            </p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 pt-4 border-t border-zinc-800">
              — ELITE TRADING HUB MISSION STATEMENT
            </p>
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

export function PremiumContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setSubmitting(true);
    try {
      const newLead = {
        ref: `L-${Math.floor(1000 + Math.random() * 9000)}`,
        name: name.trim(),
        email: email.trim(),
        company: 'Website Contact Form',
        status: 'Qualified',
        source: 'Contact Form',
        message: message.trim() || 'No message provided',
        activity: 'Just now',
        createdAt: Date.now(),
      };
      await pushRtdbData('crm/leads', newLead).catch(() => {});
      await pushRtdbData('activity', {
        user: name.trim(),
        action: `Submitted inquiry via contact form (${email.trim()})`,
        time: 'Just now',
      }).catch(() => {});
      setSent(true);
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Failed to submit contact form:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageFrame>
      <main className="bg-zinc-950 text-zinc-100 font-sans py-12">
        <PageHero
          kicker="GET IN TOUCH"
          title={<>We are here to <span className="text-emerald-400">help.</span></>}
          desc="Have questions about the platform, methodologies, or access? Reach out to our research and support team."
        />

        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">EMAIL SUPPORT</span>
              <p className="text-sm font-semibold text-zinc-100">
                <a href="mailto:support@elite-tradinghub.com" className="hover:text-emerald-400 transition-colors">
                  support@elite-tradinghub.com
                </a>
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">TELEGRAM COMMUNITY</span>
              <p className="text-sm font-semibold text-zinc-100">
                <a href="https://t.me/+la1ShIiNHJ5mYzk1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  t.me/EliteTradingHub
                </a>
              </p>
            </div>

            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 space-y-1">
              <span className="text-[10px] font-mono uppercase text-zinc-500">LOCATION</span>
              <p className="text-sm font-semibold text-zinc-100">Mumbai & Bengaluru, India</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-base font-semibold text-zinc-100">Send us a message</h3>
            {sent ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl space-y-1 text-xs">
                <p className="font-semibold text-sm">Message received!</p>
                <p>Thank you for reaching out. Our support team will respond to your email shortly.</p>
                <button onClick={() => setSent(false)} className="text-xs text-zinc-400 hover:text-zinc-200 underline mt-2">Send another message</button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full h-10 px-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-10 px-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    required
                    className="w-full p-3 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-700 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-10 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </PageFrame>
  );
}

// Aliases matching page imports
export {
  PremiumHome as HomePage,
  PremiumFeatures as FeaturesPage,
  PremiumMethodology as MethodologyPage,
  PremiumAbout as AboutPage,
  PremiumContact as ContactPage,
};
