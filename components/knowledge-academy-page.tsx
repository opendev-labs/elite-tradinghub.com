'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  LineChart,
  Shield,
  Layers,
  Activity,
  Scale,
  Brain,
  PieChart,
  Search,
  BookMarked,
  Clock,
  Award,
  Sparkles,
  Share2,
  Check,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { PageFrame, PageHero } from './site-shell';
import { ACADEMY_MODULES, AcademyModule, TopicDetail } from '@/lib/knowledge-data';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts';

const ICON_MAP: Record<string, any> = {
  LineChart,
  Search,
  Layers,
  Activity,
  Scale,
  Shield,
  Brain,
  PieChart,
};

// ── Sample Visual Diagrams / Chart Illustrators ──────────────────────────────
function ModuleChartVisualizer({ type }: { type: string }) {
  if (type === 'candlestick' || type === 'trends') {
    const data = [
      { name: 'Mon', price: 24200, volume: 120 },
      { name: 'Tue', price: 24350, volume: 180 },
      { name: 'Wed', price: 24280, volume: 140 },
      { name: 'Thu', price: 24520, volume: 290 },
      { name: 'Fri', price: 24680, volume: 340 },
    ];
    return (
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            NIFTY Price Action & Volatility Trend (Simulated)
          </span>
          <span className="text-[10px] font-mono text-zinc-500">20 EMA Alignment: BULLISH</span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="techGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#52525b" fontSize={11} />
              <YAxis domain={['dataMin - 100', 'dataMax + 100']} stroke="#52525b" fontSize={11} hide />
              <Tooltip contentStyle={{ background: '#18181b', borderColor: '#27272a', borderRadius: 8, color: '#f4f4f5' }} />
              <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={2} fill="url(#techGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  if (type === 'ev' || type === 'sizing') {
    const data = [
      { trade: 'T1', ev: -500 },
      { trade: 'T2', ev: 2500 },
      { trade: 'T3', ev: -500 },
      { trade: 'T4', ev: 3000 },
      { trade: 'T5', ev: -500 },
      { trade: 'T6', ev: 2800 },
    ];
    return (
      <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
            <Scale className="w-4 h-4" />
            Expected Value Distribution (+EV 1:2.5 R:R Ratio)
          </span>
          <span className="text-[10px] font-mono text-emerald-400">40% Win-Rate Net: +₹6,300</span>
        </div>
        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="trade" stroke="#52525b" fontSize={11} />
              <YAxis stroke="#52525b" fontSize={11} hide />
              <Tooltip contentStyle={{ background: '#18181b', borderColor: '#27272a', borderRadius: 8, color: '#f4f4f5' }} />
              <Bar dataKey="ev" fill="#a855f7" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  // Default Allocation Visualizer
  return (
    <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
        <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
          <PieChart className="w-4 h-4" />
          Institutional Portfolio Asset Model
        </span>
        <span className="text-[10px] font-mono text-zinc-400">SEBI Aligned Framework</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-500 font-mono">EQUITIES</span>
          <p className="text-base font-bold text-emerald-400">55%</p>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-500 font-mono">FIXED DEBT</span>
          <p className="text-base font-bold text-blue-400">25%</p>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-500 font-mono">TACTICAL ALPHA</span>
          <p className="text-base font-bold text-purple-400">12%</p>
        </div>
        <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 text-center">
          <span className="text-[10px] text-zinc-500 font-mono">CASH RESERVE</span>
          <p className="text-base font-bold text-amber-400">8%</p>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeAcademyPage({ moduleId }: { moduleId: string }) {
  const moduleData: AcademyModule | undefined = ACADEMY_MODULES[moduleId];
  const [copied, setCopied] = useState(false);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  if (!moduleData) {
    return (
      <PageFrame>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-zinc-100">Academy Lesson Not Found</h1>
          <p className="text-xs text-zinc-400">The requested knowledge module could not be found.</p>
          <Link href="/knowledge" className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl">
            ← Return to Free Knowledge
          </Link>
        </div>
      </PageFrame>
    );
  }

  const IconComponent = ICON_MAP[moduleData.iconName] || BookOpen;

  // Module keys for prev / next navigation
  const moduleKeys = Object.keys(ACADEMY_MODULES);
  const currentIndex = moduleKeys.indexOf(moduleId);
  const prevKey = currentIndex > 0 ? moduleKeys[currentIndex - 1] : null;
  const nextKey = currentIndex < moduleKeys.length - 1 ? moduleKeys[currentIndex + 1] : null;
  const prevModule = prevKey ? ACADEMY_MODULES[prevKey] : null;
  const nextModule = nextKey ? ACADEMY_MODULES[nextKey] : null;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PageFrame>
      {/* ── Breadcrumb & Top Navigation Bar ── */}
      <div className="w-full bg-zinc-950 border-b border-zinc-800/60 sticky top-16 z-30 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
          <Link
            href="/knowledge"
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Free Knowledge</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-zinc-500 font-mono text-[11px]">
              Module {currentIndex + 1} of 8
            </span>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white transition-all text-[11px]"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3" />}
              <span>{copied ? 'Link Copied' : 'Share Lesson'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Module Hero Header ── */}
      <section className="w-full py-10 sm:py-14 border-b border-zinc-800/80 bg-gradient-to-b from-purple-950/20 via-zinc-900/40 to-zinc-950 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[11px] font-mono text-purple-400">
              <IconComponent className="w-3.5 h-3.5" />
              {moduleData.category}
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              {moduleData.level}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {moduleData.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
            {moduleData.title}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl leading-relaxed">
            {moduleData.desc}
          </p>

          <div className="pt-2">
            <blockquote className="p-4 rounded-xl bg-zinc-900/70 border-l-4 border-purple-500 text-xs italic text-purple-200">
              “{moduleData.heroQuote}”
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Left Sidebar: Table of Contents & Quick Jump */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-32 space-y-6">

              {/* Table of Contents card */}
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-purple-400 font-bold border-b border-zinc-800 pb-2.5">
                  <BookMarked className="w-4 h-4" />
                  <span>Syllabus Table of Contents</span>
                </div>
                <nav className="space-y-1.5">
                  {moduleData.topics.map((tp, idx) => (
                    <a
                      key={tp.id}
                      href={`#${tp.id}`}
                      className="block px-3 py-2 rounded-xl text-xs text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all leading-snug group"
                    >
                      <span className="font-mono text-purple-400 mr-2">{idx + 1}.</span>
                      <span className="group-hover:translate-x-0.5 transition-transform inline-block">
                        {tp.title}
                      </span>
                    </a>
                  ))}
                </nav>
              </div>

              {/* Actionable Checklist Card */}
              <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 space-y-3">
                <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Execution Protocol Checklist
                </h4>
                <ul className="space-y-2">
                  {moduleData.checklist.map((chk, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Sources Preview */}
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-3">
                <h4 className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
                  Verified External Sources
                </h4>
                <div className="space-y-2">
                  {moduleData.topics.flatMap(t => t.externalSources).slice(0, 4).map((src, i) => (
                    <a
                      key={i}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-zinc-950/60 border border-zinc-800/80 hover:border-purple-500/40 text-[11px] text-zinc-300 hover:text-white transition-all group"
                    >
                      <span className="truncate pr-2">{src.name}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-purple-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Main Column: Deep-Dive Topics */}
          <main className="lg:col-span-8 space-y-12">

            {/* Interactive Chart Visualizer Banner */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                Interactive Visual Concept Diagram
              </h3>
              <ModuleChartVisualizer type={moduleData.chartType} />
            </div>

            {/* Deep-Dive Syllabus Topics */}
            <div className="space-y-12">
              {moduleData.topics.map((tp, idx) => (
                <section
                  key={tp.id}
                  id={tp.id}
                  className="p-6 sm:p-8 rounded-2xl border border-zinc-800/90 bg-zinc-900/50 space-y-6 scroll-mt-32 shadow-xl"
                >
                  {/* Topic Header */}
                  <div className="space-y-2 border-b border-zinc-800 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full font-bold">
                        Topic 0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Academy Core Curriculum
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-zinc-100">
                      {tp.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
                      {tp.summary}
                    </p>
                  </div>

                  {/* Topic Body Content */}
                  <div className="prose prose-invert prose-xs sm:prose-sm max-w-none text-zinc-300 leading-relaxed space-y-4">
                    {tp.content.split('\n\n').map((paragraph, pIdx) => {
                      if (paragraph.startsWith('### ')) {
                        return <h3 key={pIdx} className="text-base font-bold text-zinc-100 pt-2">{paragraph.replace('### ', '')}</h3>;
                      }
                      if (paragraph.startsWith('#### ')) {
                        return <h4 key={pIdx} className="text-sm font-bold text-purple-300 pt-1">{paragraph.replace('#### ', '')}</h4>;
                      }
                      if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={pIdx} className="space-y-1.5 pl-4 list-disc text-xs text-zinc-300">
                            {lines.map((ln, lIdx) => (
                              <li key={lIdx}>{ln.replace(/^[0-9]+\.\s+|^-\s+/, '')}</li>
                            ))}
                          </ul>
                        );
                      }
                      return <p key={pIdx} className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{paragraph}</p>;
                    })}
                  </div>

                  {/* Formulas or Quantitative Rules */}
                  {tp.formulasOrRules && tp.formulasOrRules.length > 0 && (
                    <div className="p-4 rounded-xl bg-zinc-950 border border-purple-500/30 space-y-2">
                      <span className="text-[10px] font-mono uppercase text-purple-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Quantitative Formula / Rule:
                      </span>
                      <div className="space-y-1 font-mono text-xs text-emerald-300 font-semibold bg-zinc-900/80 p-3 rounded-lg border border-zinc-800">
                        {tp.formulasOrRules.map((fml, fIdx) => (
                          <div key={fIdx}>• {fml}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key Takeaways Card */}
                  <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800 space-y-2">
                    <span className="text-xs font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Actionable Trader Takeaways:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {tp.keyTakeaways.map((kt, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{kt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* External Sources Links */}
                  <div className="pt-2 border-t border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-2">
                      Verified External References & Deep-Dive Links:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tp.externalSources.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-purple-500 text-xs text-zinc-300 hover:text-white transition-all"
                        >
                          <ExternalLink className="w-3 h-3 text-purple-400" />
                          <span>{src.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                </section>
              ))}
            </div>

            {/* Recommended Literature / Books */}
            <section className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-4">
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-purple-400" />
                Recommended Reading & Academic Literature
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {moduleData.recommendedBooks.map((bk, bIdx) => (
                  <div key={bIdx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-1">
                    <h4 className="text-xs font-bold text-zinc-100">{bk.title}</h4>
                    <p className="text-[11px] text-purple-400 font-mono">By {bk.author}</p>
                    <p className="text-xs text-zinc-400 pt-1 leading-relaxed">{bk.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Module Navigation (Prev / Next) */}
            <div className="pt-6 border-t border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevModule ? (
                <Link
                  href={`/knowledge/${prevModule.id}`}
                  className="p-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900 hover:border-zinc-700 transition-all flex items-center gap-3 group"
                >
                  <ArrowLeft className="w-5 h-5 text-purple-400 group-hover:-translate-x-1 transition-transform shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Previous Module</span>
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-white truncate block">{prevModule.title}</span>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextModule ? (
                <Link
                  href={`/knowledge/${nextModule.id}`}
                  className="p-4 rounded-2xl border border-purple-500/30 bg-purple-950/10 hover:bg-purple-950/20 hover:border-purple-500/60 transition-all flex items-center justify-between group text-right"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-purple-400 uppercase block">Next Module</span>
                    <span className="text-xs font-bold text-zinc-200 group-hover:text-white truncate block">{nextModule.title}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform shrink-0 ml-3" />
                </Link>
              ) : (
                <div />
              )}
            </div>

          </main>
        </div>
      </div>
    </PageFrame>
  );
}
