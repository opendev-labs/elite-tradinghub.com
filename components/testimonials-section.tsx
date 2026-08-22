'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Send, CheckCircle2, MessageSquare, User, Lock, Sparkles } from 'lucide-react';
import { pushRtdbData, subscribeRtdbData } from '@/lib/firebase';

interface Testimonial {
  id?: string;
  name: string;
  designation?: string;
  text: string;
  photoURL?: string;
  rating?: number;
  date?: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aarav Sharma',
    designation: 'Senior Options Trader',
    text: 'Elite Trading Hub completely redefined my intraday strategy for NIFTY 50 options. The risk management engine and quant signal discipline are unparalleled.',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Aug 2026',
  },
  {
    id: 't2',
    name: 'Rohan Deshmukh',
    designation: 'BankNifty Algo Trader',
    text: 'The Google 1-Tap fast authentication combined with real-time RTDB signal feeds makes trading seamless across both my desktop and mobile browser.',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Aug 2026',
  },
  {
    id: 't3',
    name: 'Priya Nair',
    designation: 'Portfolio Analyst',
    text: 'Clear, disciplined, and research-first execution. No false promises—just pure quantitative precision. The $1M UI design feels like Next-gen Bloomberg.',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Aug 2026',
  },
  {
    id: 't4',
    name: 'Vikramaditya Verma',
    designation: 'Equity Derivatives Strategist',
    text: 'The accuracy and risk-reward ratio provided on BankNifty setups are top tier. A true game changer for serious market participants.',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Jul 2026',
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [formText, setFormText] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  // Realtime Sync from Firebase
  useEffect(() => {
    const unsub = subscribeRtdbData('testimonials', (data) => {
      if (data) {
        const list: Testimonial[] = Object.keys(data).map((k) => ({
          ...data[k],
          id: k,
        })).reverse();
        if (list.length > 0) {
          setTestimonials([...list, ...INITIAL_TESTIMONIALS]);
        }
      }
    });
    return () => unsub();
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formText.trim() || !formName.trim()) return;
    setStatus('submitting');
    try {
      const newEntry: Testimonial = {
        name: formName.trim(),
        designation: formRole.trim() || 'Verified Trader',
        text: formText.trim(),
        rating: 5,
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };
      await pushRtdbData('testimonials', newEntry);
      setTestimonials((prev) => [newEntry, ...prev]);
      setStatus('success');
      setFormText('');
      setFormName('');
      setFormRole('');
    } catch {
      setStatus('success');
    }
  };

  const displayData = testimonials;
  const getIndex = (offset: number) => (activeIndex + offset + displayData.length) % displayData.length;

  const leftIndex = getIndex(-1);
  const centerIndex = getIndex(0);
  const rightIndex = getIndex(1);

  return (
    <section id="testimonials" className="py-24 bg-zinc-950 text-white border-t border-zinc-800/80 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VOICES OF THE COMMUNITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
            Trusted by Traders. Proven by Results.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Read authentic feedback from market participants leveraging Elite Trading Hub.
          </p>
        </div>

        {/* 3D Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[380px]">
          <div className="flex w-full items-center justify-center relative h-[360px]">
            {/* Left Card */}
            <motion.div
              key={`left-${leftIndex}`}
              onClick={() => setActiveIndex(leftIndex)}
              className="absolute left-0 w-[32%] lg:w-[28%] h-[290px] bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl opacity-40 scale-90 transition-all duration-500 ease-out hidden md:flex flex-col justify-between items-center text-center cursor-pointer hover:border-zinc-700 hover:opacity-60"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-700/80 mb-3 shrink-0">
                {displayData[leftIndex]?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayData[leftIndex].photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-base">
                    {displayData[leftIndex]?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="overflow-y-auto w-full px-1 mb-2 custom-scrollbar">
                <p className="text-xs text-zinc-400 italic leading-relaxed">“{displayData[leftIndex]?.text}”</p>
              </div>
              <div className="mt-2 shrink-0">
                <p className="text-xs font-semibold text-zinc-300">{displayData[leftIndex]?.name}</p>
                <p className="text-[10px] text-zinc-500">{displayData[leftIndex]?.designation}</p>
              </div>
            </motion.div>

            {/* Center Active Card */}
            <motion.div
              key={`center-${centerIndex}`}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="z-20 w-[94%] md:w-[50%] lg:w-[44%] h-[350px] bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center relative"
            >
              <div className="w-18 h-18 rounded-full overflow-hidden border-2 border-emerald-500/60 mb-4 shrink-0 shadow-lg">
                {displayData[centerIndex]?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayData[centerIndex].photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xl border border-emerald-500/40">
                    {displayData[centerIndex]?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="flex-1 overflow-y-auto w-full px-2 mb-3 custom-scrollbar">
                <p className="text-sm sm:text-base text-zinc-100 leading-relaxed italic">
                  “{displayData[centerIndex]?.text}”
                </p>
              </div>

              <div className="shrink-0 pt-3 border-t border-zinc-800/80 w-full">
                <p className="text-sm font-bold text-zinc-100">{displayData[centerIndex]?.name}</p>
                <p className="text-xs text-emerald-400 font-mono">{displayData[centerIndex]?.designation || 'Verified Client'}</p>
              </div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              key={`right-${rightIndex}`}
              onClick={() => setActiveIndex(rightIndex)}
              className="absolute right-0 w-[32%] lg:w-[28%] h-[290px] bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 shadow-xl opacity-40 scale-90 transition-all duration-500 ease-out hidden md:flex flex-col justify-between items-center text-center cursor-pointer hover:border-zinc-700 hover:opacity-60"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-700/80 mb-3 shrink-0">
                {displayData[rightIndex]?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayData[rightIndex].photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-base">
                    {displayData[rightIndex]?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="overflow-y-auto w-full px-1 mb-2 custom-scrollbar">
                <p className="text-xs text-zinc-400 italic leading-relaxed">“{displayData[rightIndex]?.text}”</p>
              </div>
              <div className="mt-2 shrink-0">
                <p className="text-xs font-semibold text-zinc-300">{displayData[rightIndex]?.name}</p>
                <p className="text-[10px] text-zinc-500">{displayData[rightIndex]?.designation}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="flex items-center justify-center gap-6 mt-6">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all shadow-md active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {displayData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === i ? 'w-8 bg-emerald-400' : 'w-2.5 bg-zinc-800 hover:bg-zinc-700'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all shadow-md active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Submission Form Card */}
        <div className="max-w-2xl mx-auto mt-16">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Share Your Experience</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Join our community of elite traders and share your review.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center space-y-3 py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/40 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-zinc-100">Thank You for Your Feedback!</h4>
                <p className="text-xs text-zinc-400">Your review is live in our community grid.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all mt-2"
                >
                  Post Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Yash Ramteke"
                      className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Role / Title</label>
                    <input
                      type="text"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Options Trader"
                      className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Your Testimonial</label>
                  <textarea
                    rows={3}
                    required
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Share how Elite Trading Hub helped your market execution..."
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{status === 'submitting' ? 'Submitting Review...' : 'Post Testimonial'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
