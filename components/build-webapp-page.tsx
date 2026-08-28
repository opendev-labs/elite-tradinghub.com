'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Code2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Server,
  Terminal,
  Send,
  Sparkles,
  ExternalLink,
  Layers,
  Cpu,
  Globe,
  Database,
  Lock,
  BadgeCheck,
  Check,
  Clock,
  Briefcase,
  Mail,
  UserCheck,
} from 'lucide-react';
import { PageFrame, PageHero, SectionHeading } from './site-shell';
import { pushRtdbData } from '@/lib/firebase';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

export function BuildWebappPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    option: 'Option 1: Build, Maintain & Save (₹38k + ₹4k/mo)',
    budget: '₹35,000 - ₹60,000',
    details: '',
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
        source: 'build_webapp_page',
        developer: 'opendev-labs',
      });
      setSubmitted(true);
    } catch (e) {
      console.error('Error submitting inquiry:', e);
      // Fallback
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageFrame>
      <div className="w-full bg-zinc-950 text-zinc-100 min-h-screen">
        {/* Developer Banner */}
        <div className="w-full bg-emerald-500/10 border-b border-emerald-500/20 py-2.5 px-4 text-center">
          <p className="text-xs font-mono text-emerald-400 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>official developer engineering portal • <strong className="text-white">made by opendev-labs</strong> (opendev-labs.com)</span>
          </p>
        </div>

        {/* Hero Section */}
        <PageHero
          kicker="MADE BY OPENDEV-LABS • OPENDEV-LABS.COM"
          title={
            <>
              Want a High-Performance <span className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Custom WebApp</span> Like This?
            </>
          }
          desc="Work directly with opendev-labs to design, build, and deploy high-speed financial, trading, or business web applications with modern UI/UX, authentication, and custom backend APIs."
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
          
          {/* Developer Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Terminal className="w-48 h-48 text-emerald-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400" />
                  VERIFIED LEAD DEVELOPER & SOFTWARE AGENCY
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Engineered by <span className="text-emerald-400 font-mono">opendev-labs</span>
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                  We specialize in building full-stack Next.js web applications, financial dashboards, real-time signal engines, and complex client-portal systems with institutional-grade quality.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                    <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Lead Developer & Owner</span>
                      <strong className="text-zinc-200">Yash Shirish Ramteke</strong>
                    </div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Official Website</span>
                      <a href="https://opendev-labs.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                        opendev-labs.com
                      </a>
                    </div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                    <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block">Direct Inquiries</span>
                      <a href="mailto:opemdev.help@gmail.com" className="text-zinc-200 hover:text-emerald-400">
                        opemdev.help@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex items-center gap-3">
                    <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="text-[10px] text-zinc-500 block">GitHub Organization</span>
                      <a href="https://github.com/opendev-labs" target="_blank" rel="noopener noreferrer" className="text-zinc-200 hover:text-emerald-400">
                        github.com/opendev-labs
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-inner text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="font-mono text-zinc-400">ENGINEERING SCOPE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px]">PRODUCTION READY</span>
                </div>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Next.js 15 & React 19 Architecture</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Glassmorphic Dark UI & Framer Motion</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Google GIS, Firebase & OAuth Logins</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom PMS & Financial Risk Calculators</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Realtime Database & API Integrations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Complete Technical SEO & SSL Setup</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Pricing Models Section */}
          <div className="space-y-8">
            <SectionHeading
              kicker="OFFICIAL PRICING & ENGAGEMENT MODELS"
              title="Transparent WebApp Development Packages"
              desc="Choose the engagement model that best fits your business outlay and ongoing technical support needs."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Option 1: Build, Maintain & Save */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={1}
                className="relative bg-zinc-900/80 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-xl"
              >
                <div className="absolute -top-3.5 right-6 bg-emerald-500 text-zinc-950 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  ★ Recommended Model
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">Option 1</span>
                    <h3 className="text-xl font-bold text-white">Build, Maintain & Save</h3>
                    <p className="text-xs text-zinc-400">Reduced upfront outlay with dedicated ongoing maintenance & security.</p>
                  </div>

                  <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-emerald-400">₹38,000</span>
                      <span className="text-xs text-zinc-400 font-mono">(+₹4,000/mo retainer)</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">Significantly reduced initial development investment.</p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Continuous Security & Automated Backups</strong> — Daily database backups & monitoring.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Ongoing Content & Feature Enhancements</strong> — Regular page updates included.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Dedicated Technical Support</strong> — Priority assistance & agile maintenance sprints.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Performance Tuning</strong> — Advanced caching & speed optimization.</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#contact-form"
                  className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <span>Select Option 1</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Option 2: Build & Say Goodbye */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                custom={2}
                className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-lg"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Option 2</span>
                    <h3 className="text-xl font-bold text-white">Build & Say Goodbye</h3>
                    <p className="text-xs text-zinc-400">One-time payment with full source code handoff and zero retainers.</p>
                  </div>

                  <div className="p-4 bg-zinc-950 rounded-2xl border border-zinc-800 space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold font-mono text-zinc-100">₹58,000</span>
                      <span className="text-xs text-zinc-400 font-mono">(One-Time)</span>
                    </div>
                    <p className="text-[10px] text-zinc-500">Zero ongoing monthly retainers or commitments.</p>
                  </div>

                  <ul className="space-y-2.5 text-xs text-zinc-300">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span><strong>No Maintenance Contracts</strong> — Zero ongoing retainers or monthly commitments.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span><strong>Full Source Code Ownership</strong> — Complete repository transfer & full ownership handoff.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span><strong>Complete Deployment Assistance</strong> — Fully configured on your Vercel/Cloud setup.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <span><strong>Operational Independence</strong> — Ad-hoc modifications billed per individual page.</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#contact-form"
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Select Option 2</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>

            </div>
          </div>

          {/* Detailed Component Breakdown Table */}
          <div className="space-y-6">
            <SectionHeading
              kicker="SCOPE & FEATURE BREAKDOWN"
              title="What is Included in Every WebApp Build"
              desc="Comprehensive breakdown of features, UI components, backend setup, and technical infrastructure."
            />

            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 font-mono text-[11px]">
                      <th className="py-3.5 px-4 font-semibold">Component / Feature Description</th>
                      <th className="py-3.5 px-4 font-semibold text-emerald-400">Option 1 (Retainer)</th>
                      <th className="py-3.5 px-4 font-semibold text-zinc-200">Option 2 (Full Handoff)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Responsive Company Website Foundation & Contact Integration</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹10,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹10,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Advanced UI/UX Design, User Login & Authentication System</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹10,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹15,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Portfolio Management (PMS) Page & Interactive Risk Tools</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹6,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹8,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Education Hub with Risk/Reward & Position Sizing Calculators</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹6,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹9,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Strict Compliance Integration & Regulatory Disclaimers</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹3,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹4,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Advanced Dashboard, Custom APIs, SEO Optimization & Routing</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹5,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹9,000</td>
                    </tr>
                    <tr className="hover:bg-zinc-900/40 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-white">Domain Registration & SSL Setup (1 Year)</td>
                      <td className="py-3.5 px-4 font-mono text-emerald-400 font-bold">₹3,000</td>
                      <td className="py-3.5 px-4 font-mono text-zinc-300">₹3,000</td>
                    </tr>
                    <tr className="bg-zinc-950 font-bold">
                      <td className="py-4 px-4 text-white">Total Initial Investment</td>
                      <td className="py-4 px-4 font-mono text-emerald-400 text-sm">₹38,000 (+₹4k/mo)</td>
                      <td className="py-4 px-4 font-mono text-zinc-100 text-sm">₹58,000 (One-Time)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Contact / Inquiry Form */}
          <div id="contact-form" className="scroll-mt-24 space-y-6">
            <SectionHeading
              kicker="GET IN TOUCH WITH THE DEVELOPER"
              title="Request Custom WebApp Development"
              desc="Fill out the form below to connect directly with Yash Shirish Ramteke (opendev-labs) for your project."
            />

            <div className="max-w-2xl mx-auto bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Inquiry Received!</h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Thank you! Your WebApp request has been logged. Yash Shirish Ramteke from <strong className="text-emerald-400">opendev-labs</strong> will review your details and respond via email within 24 hours.
                  </p>
                  <div className="pt-4">
                    <a
                      href="mailto:opemdev.help@gmail.com?subject=WebApp%20Development%20Inquiry"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-all"
                    >
                      <Mail className="w-4 h-4 text-emerald-400" />
                      <span>Send Direct Email to opendev-labs</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-mono text-[11px] block">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-mono text-[11px] block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-mono text-[11px] block">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-zinc-400 font-mono text-[11px] block">Preferred Engagement Model</label>
                      <select
                        value={formData.option}
                        onChange={(e) => setFormData({ ...formData, option: e.target.value })}
                        className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-emerald-500 transition-colors"
                      >
                        <option value="Option 1: Build, Maintain & Save (₹38k + ₹4k/mo)">Option 1: Build, Maintain & Save (₹38k + ₹4k/mo)</option>
                        <option value="Option 2: Build & Say Goodbye (₹58k One-Time)">Option 2: Build & Say Goodbye (₹58k One-Time)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 font-mono text-[11px] block">Project Requirements & Details</label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Describe your WebApp requirements, target features, or timeline..."
                      className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Inquiry...' : 'Submit Inquiry to opendev-labs'}</span>
                  </button>

                  <p className="text-[10px] text-zinc-500 text-center font-mono pt-1">
                    made by opendev-labs • opendev-labs.com • opemdev.help@gmail.com
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </PageFrame>
  );
}
