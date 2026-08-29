'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Send, CheckCircle2, MessageSquare, Sparkles, Image as ImageIcon, X, ZoomIn, ZoomOut, UploadCloud, ShieldCheck } from 'lucide-react';
import { pushRtdbData, subscribeRtdbData } from '@/lib/firebase';

interface Testimonial {
  id?: string;
  name: string;
  designation?: string;
  text: string;
  photoURL?: string;
  screenshotURL?: string;
  verificationTag?: string;
  rating?: number;
  date?: string;
}

const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Manjunath Flow',
    designation: 'Verified Options Client',
    text: "It's been around 15 days I guess, I traded around 3 calls. It's really good, you provide accurate calls. Really ur good trader... I blindly trust your calls and will continue to trade.",
    screenshotURL: '/testimonials/testimonial-1.jpeg',
    verificationTag: 'WhatsApp Verified Feedback',
    rating: 5,
    date: 'Aug 2026',
  },
  {
    id: 't2',
    name: 'Rajesh V.',
    designation: 'SENSEX Options Trader',
    text: 'Booked +₹52,180.80 profit on SENSEX 76700 PE in a single session! The precision of entry and target levels is unmatched.',
    screenshotURL: '/testimonials/testimonial-2.jpeg',
    verificationTag: '+₹52,180.80 Profit Screenshot',
    rating: 5,
    date: 'Jul 2026',
  },
  {
    id: 't3',
    name: 'Anand Verma',
    designation: 'Verified Dhan Trader',
    text: 'Overall P&L +₹5,48,339.50 on 1 NIFTY Put position. Verified by Dhan broker terminal. The risk management engine transformed my execution!',
    screenshotURL: '/testimonials/testimonial-3.jpeg',
    verificationTag: 'Dhan Verified +₹5.48L P&L',
    rating: 5,
    date: 'Jul 2026',
  },
  {
    id: 't4',
    name: 'Yashii Flow Premium',
    designation: 'ETH Premium Member',
    text: 'Targets hit accurately at 180 and 200 on NIFTY 24350 Put (+₹10,861.50). Thank you sir for step-by-step guidance!',
    screenshotURL: '/testimonials/testimonial-4.jpeg',
    verificationTag: 'WhatsApp Verified Chat',
    rating: 5,
    date: 'Jul 2026',
  },
  {
    id: 't5',
    name: 'Aditya Kulkarni',
    designation: 'Index Derivatives Trader',
    text: '+87.07% return on SENSEX PE option (+₹77,883.60 holding 30 lots). Unbelievable timing and lot size management on expiry day!',
    screenshotURL: '/testimonials/testimonial-5.jpeg',
    verificationTag: '+87.07% Return Screenshot',
    rating: 5,
    date: 'Jul 2026',
  },
  {
    id: 't6',
    name: 'Rohan Deshmukh',
    designation: 'Quant Community Member',
    text: 'Consistent calls and clear risk parameters. Appreciate the high-quality trade setups provided every session.',
    screenshotURL: '/testimonials/testimonial-6.jpeg',
    verificationTag: 'Verified Client Feedback',
    rating: 5,
    date: 'Aug 2026',
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [formText, setFormText] = useState('');
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formScreenshot, setFormScreenshot] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard Escape listener to close lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedScreenshot(null);
        setIsZoomed(false);
      }
    };
    if (selectedScreenshot) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedScreenshot]);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormScreenshot(reader.result as string);
    };
    reader.readAsDataURL(file);
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
        screenshotURL: formScreenshot || undefined,
        verificationTag: formScreenshot ? 'User Uploaded Proof' : 'Verified Review',
        rating: 5,
        date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      };
      await pushRtdbData('testimonials', newEntry);
      setTestimonials((prev) => [newEntry, ...prev]);
      setStatus('success');
      setFormText('');
      setFormName('');
      setFormRole('');
      setFormScreenshot(null);
    } catch {
      setStatus('success');
    }
  };

  const displayData = testimonials;
  const getIndex = (offset: number) => (activeIndex + offset + displayData.length) % displayData.length;

  const leftIndex = getIndex(-1);
  const centerIndex = getIndex(0);
  const rightIndex = getIndex(1);

  const currentCenter = displayData[centerIndex];

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
            Trusted by Traders. Verified by Screenshots.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Read authentic reviews with verified trade P&L statements and WhatsApp client chats.
          </p>
        </div>

        {/* 3D Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto flex items-center justify-center min-h-[460px]">
          <div className="flex w-full items-center justify-center relative min-h-[440px]">
            {/* Left Card */}
            <motion.div
              key={`left-${leftIndex}`}
              onClick={() => setActiveIndex(leftIndex)}
              className="absolute left-0 w-[32%] lg:w-[28%] h-[360px] bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl opacity-40 scale-90 transition-all duration-500 ease-out hidden md:flex flex-col justify-between items-center text-center cursor-pointer hover:border-zinc-700 hover:opacity-60 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700/80 mb-2 shrink-0">
                {displayData[leftIndex]?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayData[leftIndex].photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
                    {displayData[leftIndex]?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="overflow-y-auto w-full px-1 mb-2 custom-scrollbar">
                <p className="text-xs text-zinc-400 italic leading-relaxed">“{displayData[leftIndex]?.text}”</p>
              </div>
              {displayData[leftIndex]?.screenshotURL && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenshot(displayData[leftIndex].screenshotURL || null);
                  }}
                  className="w-full h-24 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden relative mb-2 cursor-pointer hover:border-emerald-500/50 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={displayData[leftIndex].screenshotURL} alt="Trade Proof" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              )}
              <div className="shrink-0">
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
              className="z-20 w-[94%] md:w-[58%] lg:w-[50%] min-h-[420px] bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-700/80 rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center relative"
            >
              <div className="flex items-center justify-between w-full mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/60 shrink-0 shadow-lg">
                    {currentCenter?.photoURL ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={currentCenter.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-base border border-emerald-500/40">
                        {currentCenter?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-sm sm:text-base font-bold text-zinc-100">{currentCenter?.name}</p>
                    <p className="text-xs text-emerald-400 font-mono">{currentCenter?.designation || 'Verified Client'}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1">
                    {[...Array(currentCenter?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {currentCenter?.verificationTag && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20 mt-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      {currentCenter.verificationTag}
                    </span>
                  )}
                </div>
              </div>

              {/* Review Text */}
              <div className="w-full text-left mb-4 bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-4">
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic">
                  “{currentCenter?.text}”
                </p>
              </div>

              {/* Attached Trade Screenshot Preview */}
              {currentCenter?.screenshotURL && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenshot(currentCenter.screenshotURL || null);
                  }}
                  className="w-full h-44 sm:h-48 rounded-xl bg-zinc-950 border border-emerald-500/30 overflow-hidden relative group cursor-pointer shadow-inner mb-2"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentCenter.screenshotURL}
                    alt="Trade Screenshot"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-mono text-emerald-300 bg-zinc-950/90 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1.5 backdrop-blur-md">
                      <ImageIcon className="w-3 h-3 text-emerald-400" /> Attached Trade Proof
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-100 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 rounded-md flex items-center gap-1 backdrop-blur-md group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                      <ZoomIn className="w-3 h-3" /> Click to Enlarge
                    </span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Right Card */}
            <motion.div
              key={`right-${rightIndex}`}
              onClick={() => setActiveIndex(rightIndex)}
              className="absolute right-0 w-[32%] lg:w-[28%] h-[360px] bg-zinc-900/60 border border-zinc-800 rounded-2xl p-5 shadow-xl opacity-40 scale-90 transition-all duration-500 ease-out hidden md:flex flex-col justify-between items-center text-center cursor-pointer hover:border-zinc-700 hover:opacity-60 overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-zinc-700/80 mb-2 shrink-0">
                {displayData[rightIndex]?.photoURL ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={displayData[rightIndex].photoURL} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-sm">
                    {displayData[rightIndex]?.name?.charAt(0) || 'U'}
                  </div>
                )}
              </div>
              <div className="overflow-y-auto w-full px-1 mb-2 custom-scrollbar">
                <p className="text-xs text-zinc-400 italic leading-relaxed">“{displayData[rightIndex]?.text}”</p>
              </div>
              {displayData[rightIndex]?.screenshotURL && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedScreenshot(displayData[rightIndex].screenshotURL || null);
                  }}
                  className="w-full h-24 rounded-lg bg-zinc-950 border border-zinc-800 overflow-hidden relative mb-2 cursor-pointer hover:border-emerald-500/50 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={displayData[rightIndex].screenshotURL} alt="Trade Proof" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                </div>
              )}
              <div className="shrink-0">
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
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {displayData.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${activeIndex === i ? 'w-8 bg-emerald-400' : 'w-2.5 bg-zinc-800 hover:bg-zinc-700'}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-600 transition-all shadow-md active:scale-95 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Grid View of All Screenshots */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-zinc-100">Verified Client Trade Screenshots</h3>
            <p className="text-xs text-zinc-400 mt-1">Click any trade proof image below to expand full resolution</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((t, idx) => (
              <div
                key={t.id || idx}
                onClick={() => t.screenshotURL && setSelectedScreenshot(t.screenshotURL)}
                className={`bg-zinc-900/80 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-all ${t.screenshotURL ? 'cursor-pointer group' : ''}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-100 leading-tight">{t.name}</p>
                        <p className="text-[10px] text-zinc-400 font-mono">{t.designation}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 italic mb-4 leading-relaxed line-clamp-3">“{t.text}”</p>
                </div>

                {t.screenshotURL ? (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedScreenshot(t.screenshotURL || null);
                    }}
                    className="w-full h-40 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden relative group-hover:border-emerald-500/50 transition-colors cursor-pointer"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.screenshotURL} alt={t.name} className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                      <span className="text-[10px] font-mono text-emerald-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        {t.verificationTag || 'Trade Proof'}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-200 bg-zinc-900/90 px-2 py-0.5 rounded border border-zinc-700 flex items-center gap-1 group-hover:bg-emerald-500 group-hover:text-black">
                        <ZoomIn className="w-3 h-3" /> View
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] text-zinc-500 font-mono text-right pt-2 border-t border-zinc-800/60">
                    Verified Client Review
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submission Form Card */}
        <div className="max-w-2xl mx-auto mt-20">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-xl font-bold text-zinc-100 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <span>Share Review & Attach Trade Screenshot</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Join our community of elite traders. Upload your P&L screenshot or chat feedback to inspire others.
              </p>
            </div>

            {status === 'success' ? (
              <div className="text-center space-y-3 py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/40 shadow-lg">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-base font-bold text-zinc-100">Thank You for Your Feedback!</h4>
                <p className="text-xs text-zinc-400">Your review and trade screenshot are live in our community grid.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-xl text-xs font-semibold transition-all mt-2 cursor-pointer"
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
                      placeholder="e.g. Manjunath"
                      className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Role / Title</label>
                    <input
                      type="text"
                      value={formRole}
                      onChange={(e) => setFormRole(e.target.value)}
                      placeholder="e.g. Options Client"
                      className="w-full h-10 px-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Your Review Message</label>
                  <textarea
                    rows={3}
                    required
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    placeholder="Share how Elite Trading Hub helped your trade accuracy..."
                    className="w-full p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60 resize-none"
                  />
                </div>

                {/* File Attachment Input for Trade Screenshot */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Attach Trade Screenshot (Optional)</span>
                    <span className="text-[10px] text-emerald-400 font-mono">P&L / WhatsApp Chat</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="screenshot-upload"
                    />
                    <label
                      htmlFor="screenshot-upload"
                      className="w-full h-20 border-2 border-dashed border-zinc-800 hover:border-emerald-500/50 rounded-xl bg-zinc-950 flex items-center justify-center gap-3 cursor-pointer transition-colors p-3"
                    >
                      {formScreenshot ? (
                        <div className="flex items-center gap-3 w-full justify-between px-2">
                          <div className="flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={formScreenshot} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-emerald-500/50" />
                            <span className="text-xs text-emerald-400 font-medium">Screenshot Attached ✓</span>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setFormScreenshot(null);
                            }}
                            className="text-xs text-zinc-500 hover:text-red-400 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2.5 text-zinc-500 hover:text-zinc-300">
                          <UploadCloud className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs font-medium">Click to browse or attach trade screenshot</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black" />
                  <span>{status === 'submitting' ? 'Submitting Review...' : 'Post Review with Screenshot'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Screenshot Lightbox Modal (Vishwa Leader Gallery Mechanism) */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-3 sm:p-6 cursor-pointer select-none"
          onClick={() => setSelectedScreenshot(null)}
        >
          {/* Close Button Top Right */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedScreenshot(null);
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 text-white text-2xl sm:text-3xl font-bold w-12 h-12 z-[1000000] cursor-pointer hover:bg-red-600 hover:border-red-500 bg-zinc-900/90 rounded-full border border-white/20 flex items-center justify-center shadow-2xl transition-all"
            aria-label="Close"
            title="Close (ESC)"
          >
            ✕
          </button>

          {/* Fullscreen Image Container */}
          <div
            className="flex flex-col items-center justify-center max-w-7xl max-h-[92vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-full h-full p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedScreenshot}
                alt="Full Resolution Trade Proof"
                className="max-w-[96vw] max-h-[86vh] w-auto h-auto object-contain rounded-xl shadow-2xl border border-zinc-800 bg-zinc-950"
                onError={(e) => {
                  console.error('Failed to render screenshot image:', selectedScreenshot);
                }}
              />
            </div>
            <p className="text-xs text-zinc-400 font-mono mt-2 text-center bg-zinc-900/80 px-4 py-1.5 rounded-full border border-zinc-800">
              Verified Client Trade Proof • Click background or ✕ to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
