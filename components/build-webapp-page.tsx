'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  Terminal,
  Send,
  Sparkles,
  ExternalLink,
  Globe,
  BadgeCheck,
  Check,
  Mail,
  UserCheck,
  Briefcase,
  Laptop,
} from 'lucide-react';
import { PageFrame, PageHero } from './site-shell';
import { pushRtdbData } from '@/lib/firebase';

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

export function BuildWebappPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    try {
      await pushRtdbData('webapp_inquiries', {
        ...formData,
        createdAt: new Date().toISOString(),
        source: 'minimal_ad_page',
        developer: 'opendev-labs',
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Error submitting inquiry:', e);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFrame>
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen">
        {/* Minimal Developer Top Bar */}
        <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 py-2 px-4 text-center">
          <p className="text-[11px] font-mono text-emerald-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>official developer • <strong className="text-white">made by opendev-labs</strong> (opendev-labs.com)</span>
          </p>
        </div>

        {/* Hero Section */}
        <PageHero
          kicker="MADE BY OPENDEV-LABS • OPENDEV-LABS.COM"
          title={
            <>
              Want a Custom <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">WebApp Like This?</span>
            </>
          }
          desc="Designed & engineered by opendev-labs. We build ultra-fast web applications, financial dashboards, and custom software tailored to your business."
        />

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
          
          {/* Minimal Developer Ad Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  OFFICIAL DEVELOPER AD
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  opendev-labs
                </h2>
                <p className="text-xs text-zinc-400">
                  Full-stack WebApp Engineering & Design Studio
                </p>
              </div>

              <a
                href="https://opendev-labs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md shrink-0"
              >
                <span>Visit opendev-labs.com</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Quick Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Lead Developer</span>
                <p className="text-zinc-100 font-bold text-sm">Yash Shirish Ramteke</p>
                <p className="text-zinc-500 text-[10px]">Owner @ opendev-labs</p>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-2xl p-4 space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Direct Email</span>
                <a href="mailto:opemdev.help@gmail.com" className="text-emerald-400 font-bold hover:underline text-sm block truncate">
                  opemdev.help@gmail.com
                </a>
                <p className="text-zinc-500 text-[10px]">For projects & inquiries</p>
              </div>
            </div>

            {/* What We Build (Minimal Bullet Tags) */}
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400 block">
                Specialized WebApp Capabilities
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Custom Financial & Trading Terminals
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Next.js 15 & React 19 WebApps
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Google Authentication & Custom Dashboards
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Realtime Databases & API Integrations
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" /> Modern Dark UI & Technical SEO
                </span>
              </div>
            </div>

            {/* Direct Links Bar */}
            <div className="pt-4 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4 text-zinc-400 font-mono text-[11px]">
                <a href="https://github.com/opendev-labs" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  github.com/opendev-labs <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
                <span>•</span>
                <a href="https://opendev-labs.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                  opendev-labs.com <ExternalLink className="w-3 h-3 text-zinc-500" />
                </a>
              </div>

              <a
                href="mailto:opemdev.help@gmail.com?subject=Custom%20WebApp%20Inquiry"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center gap-2 transition-all"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Email Developer Directly</span>
              </a>
            </div>
          </motion.div>

          {/* Minimal Quick Contact Form */}
          <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Have a Project in Mind?</h3>
              <p className="text-xs text-zinc-400">Send a quick message directly to opendev-labs.</p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Message Sent!</h4>
                <p className="text-xs text-zinc-300">
                  Thank you! Your project request has been logged. Yash Shirish Ramteke from <strong>opendev-labs</strong> will get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name *"
                    className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your Email *"
                    className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>

                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us briefly about the website or WebApp you want to build..."
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to opendev-labs'}</span>
                </button>
              </form>
            )}

            <p className="text-[10px] text-zinc-500 font-mono text-center pt-2">
              made by opendev-labs • opendev-labs.com • opemdev.help@gmail.com
            </p>
          </div>

        </div>
      </div>
    </PageFrame>
  );
}
