"use client";

import { motion, Variants, useMotionValue, useMotionTemplate, useSpring, useTransform } from "framer-motion";
import { ArrowDownRight, Cpu, Network, Shield, TerminalSquare } from "lucide-react";
import React from "react";
import Link from "next/link";

// Awwwards-style cinematic bezier curve
const cinematicEase = [0.76, 0, 0.24, 1] as const;

const slideUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: cinematicEase } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const HeroWord = ({ word, strokeColor, defaultColor }: { word: string, strokeColor: string, defaultColor: string }) => {
  return (
    <span className="relative inline-flex overflow-visible px-[2vw] -mx-[2vw] py-[2vw] -my-[2vw] cursor-crosshair group">
      <motion.span
        variants={{
          hidden: { y: "110%", opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 1.2, ease: cinematicEase } }
        }}
        className="inline-block relative transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[1vw] group-hover:scale-[1.05] pointer-events-none"
      >
        {/* Default Text */}
        <span className="inline-block transition-opacity duration-300 group-hover:opacity-0" style={{ color: defaultColor }}>
          {word}
        </span>

        {/* Stroke Text (Fades in) */}
        <span
          className="absolute left-0 top-0 inline-block opacity-0 transition-all duration-300 group-hover:opacity-100"
          style={{
            color: 'transparent',
            WebkitTextStroke: `2px ${strokeColor}`,
            textShadow: `0px 15px 30px ${strokeColor}40`
          }}
        >
          {word}
        </span>
      </motion.span>
    </span>
  );
};

const HeroTitle = ({ text, className, strokeColor, defaultColor }: { text: string, className?: string, strokeColor: string, defaultColor: string }) => {
  const words = text.split(" ");
  return (
    <motion.h1
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap gap-x-[1.5vw] ${className || ""}`}
    >
      {words.map((word, index) => (
        <HeroWord key={index} word={word} strokeColor={strokeColor} defaultColor={defaultColor} />
      ))}
    </motion.h1>
  );
};

const RevenueCalculator = () => {
  const [jobRevenue, setJobRevenue] = React.useState<number>(5000);
  const [missedCalls, setMissedCalls] = React.useState<number>(10);
  const [closeRate, setCloseRate] = React.useState<number>(50);

  const weeklyLost = jobRevenue * missedCalls * (closeRate / 100);
  const monthlyLost = weeklyLost * 4.33;
  const yearlyLost = weeklyLost * 52;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section className="relative z-20 w-full bg-[#050505] border-b border-white/20 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Column: Inputs */}
        <motion.div
          initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
          className="p-6 md:p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/20 flex flex-col justify-center"
        >
          <span className="text-[10px] text-white/50 font-mono tracking-[0.2em] uppercase mb-4 block">[ Cost of Inaction ]</span>
          <h2 className="text-4xl md:text-5xl font-black font-[family-name:var(--font-orbitron)] uppercase tracking-tighter mb-4 text-white">
            Lost Revenue<br />Calculator
          </h2>
          <p className="font-mono text-xs text-white/60 mb-12 max-w-md leading-relaxed">
            Plug in your numbers below to see exactly how much money your business is bleeding by sending leads to voicemail.
          </p>

          <div className="space-y-12 max-w-xl w-full">
            {/* Input 1 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="font-mono text-xs uppercase tracking-widest text-white/70">Avg. Job Revenue</label>
                <span className="font-mono text-xl text-white">{formatMoney(jobRevenue)}</span>
              </div>
              <input
                type="range" min="100" max="25000" step="100"
                value={jobRevenue} onChange={(e) => setJobRevenue(Number(e.target.value))}
                className="w-full h-1 bg-white/20 appearance-none outline-none hover:bg-white/40 transition-colors cursor-crosshair"
              />
            </div>

            {/* Input 2 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="font-mono text-xs uppercase tracking-widest text-white/70">Missed Calls (Weekly)</label>
                <span className="font-mono text-xl text-white">{missedCalls}</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={missedCalls} onChange={(e) => setMissedCalls(Number(e.target.value))}
                className="w-full h-1 bg-white/20 appearance-none outline-none hover:bg-white/40 transition-colors cursor-crosshair"
              />
            </div>

            {/* Input 3 */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="font-mono text-xs uppercase tracking-widest text-white/70">Close Rate</label>
                <span className="font-mono text-xl text-[#00ff99]">{closeRate}%</span>
              </div>
              <input
                type="range" min="1" max="100" step="1"
                value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full h-1 bg-[#00ff99]/30 appearance-none outline-none hover:bg-[#00ff99]/60 transition-colors cursor-crosshair"
              />
            </div>
          </div>
        </motion.div>

        {/* Right Column: Output */}
        <motion.div
          initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}
          className="p-6 md:p-12 lg:p-24 flex flex-col justify-center bg-[#0a0a0a]"
        >
          <h3 className="text-3xl md:text-5xl font-black font-[family-name:var(--font-orbitron)] uppercase tracking-tighter mb-12">
            You are losing:
          </h3>

          <div className="space-y-8">
            <div className="flex flex-col border-b border-white/10 pb-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-2">Per Week</span>
              <span className="text-4xl md:text-5xl font-mono text-white/80">{formatMoney(weeklyLost)}</span>
            </div>
            <div className="flex flex-col border-b border-white/10 pb-8">
              <span className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-2">Per Month</span>
              <span className="text-5xl md:text-6xl font-mono text-white/90">{formatMoney(monthlyLost)}</span>
            </div>
            <div className="flex flex-col pt-4">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#00ff99]/70 mb-4">Per Year (Projected)</span>
              <span className="text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-black font-[family-name:var(--font-orbitron)] leading-none text-[#00ff99] drop-shadow-[0_0_30px_rgba(0,255,153,0.3)] whitespace-nowrap overflow-hidden text-ellipsis">
                {formatMoney(yearlyLost)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-screen">
    <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const Manifesto = () => {
  return (
    <section className="relative z-20 w-full bg-[#050505] py-24 md:py-32 flex flex-col items-center justify-center border-t border-white/20 group cursor-crosshair">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center flex flex-col items-center">
        <span className="text-[10px] text-[#00ff99] font-mono tracking-[0.2em] uppercase mb-12 block">[ THE REALITY ]</span>
        <motion.h2
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }} whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-[6vw] font-black font-[family-name:var(--font-audiowide)] uppercase tracking-tighter leading-[0.9] text-white md:text-white/10 transition-colors duration-500 md:group-hover:text-white"
        >
          EVERY MISSED CALL <br className="hidden md:block" /> IS <span className="text-[#ff0055] md:text-white/10 md:group-hover:text-[#ff0055] transition-colors duration-700">BLEEDING</span> REVENUE.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }}
          className="font-mono text-sm md:text-base text-white/60 md:text-white/40 mt-8 md:mt-12 max-w-2xl text-center leading-relaxed opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100"
        >
          Stop ignoring the math. You are literally paying marketing agencies to generate leads, only to let them die in voicemail.
        </motion.p>
      </div>
    </section>
  );
};

const IntegrationMarquee = () => {
  const integrations = [
    "SALESFORCE", "HUBSPOT", "SLACK", "ZAPIER", "G-CALENDAR", "STRIPE", "ZENDESK", "TWILIO"
  ];
  const marqueeItems = [...integrations, ...integrations, ...integrations];

  return (
    <section className="relative z-20 w-full bg-[#050505] border-y border-white/10 py-3 md:py-4 overflow-hidden flex flex-col">
      <div className="relative flex whitespace-nowrap">
        <motion.div
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
          className="flex items-center"
          style={{ willChange: "transform" }}
        >
          {marqueeItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center group/item"
            >
              <div className="px-6 md:px-10 py-1 text-white/30 hover:bg-white hover:text-[#050505] transition-colors duration-200 cursor-crosshair">
                <span className="text-xl md:text-2xl font-bold font-mono uppercase tracking-widest leading-none block">
                  {item}
                </span>
              </div>
              <span className="text-white/10 px-6 md:px-10 block">—</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};





export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f0f0f0] selection:bg-[#00bfff] selection:text-[#050505] font-sans overflow-x-hidden relative">
      <NoiseOverlay />

      {/* Persistent Framing Borders */}
      <div className="pointer-events-none fixed inset-4 border border-white/10 z-[90] mix-blend-difference hidden md:block" />

      {/* Navigation */}
      <nav className="absolute top-0 left-0 w-full z-[100] px-6 lg:px-16 py-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-4 cursor-pointer group relative">
          {/* Logo Glow Effect */}
          <div className="absolute inset-0 bg-[#00bfff] opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-full" />

          {/* Mobile Logo */}
          <img src="/logo-v3.png" alt="Welcome Parrot Logo" className="h-[120px] w-auto -my-4 md:hidden relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] object-contain" />

          {/* Desktop Logo */}
          <img src="/logo-v3.png" alt="Welcome Parrot" className="h-[180px] w-auto -my-8 hidden md:block relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)] object-contain" />
        </div>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-[10px] font-mono font-bold uppercase tracking-widest text-white/70 hover:text-[#00bfff] transition-colors hidden md:block">
            Client Login
          </Link>
          <Link href="#pricing" className="text-[10px] font-mono font-bold uppercase tracking-widest border border-[#00bfff] text-[#00bfff] px-6 py-3 hover:bg-[#00bfff] hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,153,0.2)] hover:shadow-[0_0_25px_rgba(0,255,153,0.4)] block text-center">
            Get Started
          </Link>
        </div>
      </nav>

      {/* 1. Hero Section - Brutalist & Asymmetric */}
      <section className="relative w-full h-screen flex flex-col items-start justify-end pb-12 px-6 lg:px-12 overflow-hidden border-b border-white/20">

        {/* Full-bleed Spline Background */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-0MYylckC1BHF4Fs7FAxjT2ki/"
            frameBorder="0"
            width="100%"
            height="100%"
            style={{ background: 'transparent' }}
            title="Nexbot 3D Character"
            className="w-full h-full object-cover grayscale mix-blend-screen opacity-60"
            allow="pointer-lock"
          />
        </div>

        {/* Harsh Gradient for text contrast only */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent z-10 pointer-events-none" />

        {/* Foreground Content - Slammed bottom left */}
        <div className="relative z-20 w-full pointer-events-none flex flex-col items-start justify-end">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start w-full"
          >
            <motion.div variants={slideUp} className="flex items-center gap-4 mb-2">
              <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-[#00bfff] border border-[#00bfff] px-4 py-2 bg-[#00bfff]/10">Intelligent</span>
              <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase text-white/50">[ Welcome Parrot ]</span>
            </motion.div>

            <HeroTitle
              text="AUTOMATED"
              className="text-[11vw] font-black font-[family-name:var(--font-audiowide)] uppercase leading-[0.8] tracking-normal pointer-events-auto"
              strokeColor="#00bfff"
              defaultColor="#ffffff"
            />
            <HeroTitle
              text="LEAD GEN"
              className="text-[11vw] font-black font-[family-name:var(--font-audiowide)] uppercase leading-[0.8] tracking-normal pointer-events-auto"
              strokeColor="#ffffff"
              defaultColor="#00bfff"
            />

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between w-full mt-12 gap-8 border-t border-white/20 pt-8">
              <motion.p variants={slideUp} className="text-sm md:text-lg text-white/60 max-w-xl font-medium leading-relaxed md:pr-12">
                Integrate our advanced conversational AI directly into your sales funnel. Let Welcome Parrot instantly qualify, engage, and convert your leads. Professional, reliable, and built for conversion.
              </motion.p>

              <motion.div variants={slideUp} className="pointer-events-auto shrink-0 w-full md:w-auto">
                <Link href="#pricing" className="w-full md:w-auto group relative px-12 py-6 bg-white text-[#050505] font-black uppercase tracking-widest text-xs transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_10px_0_#00bfff] border border-white block text-center">
                  <span className="relative z-10 flex items-center justify-center gap-4">
                    Get Started <ArrowDownRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero 2: Cost of Inaction Calculator */}
      <RevenueCalculator />

      {/* Manifesto */}
      <Manifesto />

      {/* 2. Core Capabilities - Ultra Concise Brutalist Index */}
      <section className="relative z-20 w-full bg-[#050505] pt-24 lg:pt-32 pb-12 lg:pb-16 flex flex-col overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
          className="px-6 lg:px-12 mb-12 flex justify-between items-end"
        >
          <h2 className="text-5xl md:text-7xl font-black font-[family-name:var(--font-audiowide)] uppercase tracking-tighter leading-none text-white">
            Architecture.
          </h2>
          <span className="text-[10px] text-[#00ff99] font-mono tracking-[0.2em] uppercase hidden md:block">[ Core Features ]</span>
        </motion.div>

        <div className="w-full flex flex-col border-t border-white/20">

          {/* Row 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} viewport={{ once: true, margin: "-50px" }}
            className="w-full border-b border-white/20 p-6 lg:px-12 py-8 group hover:bg-white hover:text-[#050505] transition-colors duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-crosshair"
          >
            <div className="flex items-center gap-4 md:gap-8 lg:gap-16 w-full lg:w-1/2">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 shrink-0">[001]</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-[family-name:var(--font-audiowide)] uppercase leading-none group-hover:-translate-y-1 transition-transform break-words">AI Qualification</h3>
            </div>
            <p className="font-mono text-sm leading-relaxed max-w-xl lg:text-right opacity-60 group-hover:opacity-100 group-hover:font-medium">
              Powered by advanced natural language processing, Welcome Parrot understands context and intent, instantly identifying your most valuable leads 24/7.
            </p>
          </motion.div>

          {/* Row 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} viewport={{ once: true, margin: "-50px" }}
            className="w-full border-b border-white/20 p-6 lg:px-12 py-8 group hover:bg-white hover:text-[#050505] transition-colors duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-crosshair"
          >
            <div className="flex items-center gap-4 md:gap-8 lg:gap-16 w-full lg:w-1/2">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 shrink-0">[002]</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-[family-name:var(--font-audiowide)] uppercase leading-none group-hover:-translate-y-1 transition-transform break-words">Seamless API</h3>
            </div>
            <p className="font-mono text-sm leading-relaxed max-w-xl lg:text-right opacity-60 group-hover:opacity-100 group-hover:font-medium">
              Connects natively to your CRM, Slack, and email infrastructure in seconds. No complex middleware, just direct data pipelines.
            </p>
          </motion.div>

          {/* Row 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }} viewport={{ once: true, margin: "-50px" }}
            className="w-full border-b border-white/20 p-6 lg:px-12 py-8 group hover:bg-white hover:text-[#050505] transition-colors duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-crosshair"
          >
            <div className="flex items-center gap-4 md:gap-8 lg:gap-16 w-full lg:w-1/2">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 shrink-0">[003]</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-[family-name:var(--font-audiowide)] uppercase leading-none group-hover:-translate-y-1 transition-transform break-words">Enterprise Security</h3>
            </div>
            <p className="font-mono text-sm leading-relaxed max-w-xl lg:text-right opacity-60 group-hover:opacity-100 group-hover:font-medium">
              SOC2 compliant infrastructure. Every conversation is end-to-end encrypted, ensuring your business data and lead information remains strictly confidential.
            </p>
          </motion.div>

          {/* Row 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} viewport={{ once: true, margin: "-50px" }}
            className="w-full border-b border-white/20 p-6 lg:px-12 py-8 group hover:bg-white hover:text-[#050505] transition-colors duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 cursor-crosshair"
          >
            <div className="flex items-center gap-4 md:gap-8 lg:gap-16 w-full lg:w-1/2">
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-50 shrink-0">[004]</span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-[family-name:var(--font-audiowide)] uppercase leading-none group-hover:-translate-y-1 transition-transform break-words">Rapid Deployment</h3>
            </div>
            <p className="font-mono text-sm leading-relaxed max-w-xl lg:text-right opacity-60 group-hover:opacity-100 group-hover:font-medium">
              Launch your AI receptionist in minutes. We've simplified the setup process so you can focus on closing deals rather than managing complex software integrations.
            </p>
          </motion.div>

        </div>
      </section>



      {/* Integration Marquee */}
      <IntegrationMarquee />

      {/* 3. Pricing Options - Monolithic & Stark */}
      <section id="pricing" className="relative z-20 py-16 px-6 lg:px-12 w-full bg-[#050505] overflow-hidden" style={{ perspective: "1000px" }}>
        <motion.div
          initial={{ opacity: 0, rotateX: 90 }} whileInView={{ opacity: 1, rotateX: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
          style={{ transformOrigin: "bottom" }}
          className="w-full mb-12 border-b border-white/20 pb-8 flex flex-col md:flex-row items-end justify-between gap-8"
        >
          <div>
            <span className="text-[10px] text-white/50 font-mono tracking-[0.2em] uppercase mb-4 block">[ Pricing Plans ]</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-audiowide)] text-white mb-6">
              Pricing.
            </h2>
            <div className="max-w-2xl border-l-2 border-[#00bfff] pl-6 py-2">
              <h4 className="text-[#00bfff] font-mono font-bold uppercase tracking-widest text-xs mb-2">The 14-Day ROI Guarantee</h4>
              <p className="font-mono text-xs text-white/70 leading-relaxed">
                We build it, we connect it, and we let it run. If Welcome Parrot doesn't catch enough missed revenue to pay for itself in the first 14 days, you don't pay a dime.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 w-full border border-white/20">

          {/* Baby Parrot */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true, margin: "-100px" }}
            className="w-full border-b lg:border-b-0 lg:border-r border-white/20 p-8 lg:p-12 flex flex-col justify-between hover:border-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all duration-300 group"
          >
            <div>
              <span className="text-[10px] text-current/50 font-mono tracking-widest uppercase block mb-4">[ Tier 01 - Missed-Call Auto-Catch ]</span>
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 font-[family-name:var(--font-audiowide)]">Basic</h3>
              <div className="text-4xl font-mono font-bold mb-6">$149<span className="text-sm opacity-50">/mo</span></div>
              <p className="font-mono text-xs text-current/70 leading-relaxed mb-8">
                For less than $5 a day, you stop losing high-ticket jobs to voicemail. The instant a call drops, the system texts them back—delivering pre-approved, high-converting responses to lock in the lead before they dial a competitor.
              </p>
              <ul className="space-y-3 mb-12">
                <li className="font-mono text-[10px] text-current font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00bfff] group-hover:text-white shrink-0 transition-colors" /> Instant Missed-Call SMS</li>
                <li className="font-mono text-[10px] text-current font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00bfff] group-hover:text-white shrink-0 transition-colors" /> Customizable Text Template</li>
                <li className="font-mono text-[10px] text-current font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00bfff] group-hover:text-white shrink-0 transition-colors" /> All AI Texting Protocols</li>
                <li className="font-mono text-[10px] text-current font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00bfff] group-hover:text-white shrink-0 transition-colors" /> Dashboard Call Logging</li>
              </ul>
            </div>
            <Link href="https://calendar.app.google/DW6EyNY2BRDA1h1PA" target="_blank" className="w-full border border-current px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest bg-transparent text-current group-hover:bg-black group-hover:text-white transition-colors block text-center">
              Claim This Tier
            </Link>
          </motion.div>

          {/* Teen Parrot - High Contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }} viewport={{ once: true, margin: "-100px" }}
            className="w-full border-b lg:border-b-0 lg:border-r border-[#0ea5e9] bg-[#0ea5e9] text-[#050505] p-8 lg:p-12 flex flex-col justify-between group hover:shadow-[0_0_50px_rgba(14,165,233,0.6)] transition-all duration-300 z-10 relative"
          >
            <div>
              <span className="text-[10px] text-current/70 font-mono tracking-widest uppercase block mb-4">[ Tier 02 - AI Lead Qualifier ]</span>
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 font-[family-name:var(--font-audiowide)]">Standard</h3>
              <div className="text-4xl font-mono font-bold text-[#050505] mb-6">$297<span className="text-sm opacity-70">/mo</span></div>
              <p className="font-mono text-xs text-[#050505]/80 leading-relaxed mb-8 font-bold">
                By the time you finish your current job, you have a fully qualified lead sitting on your phone. The AI acts as a digital SDR, answering initial questions and extracting the full scope of work using strict guardrails based on your actual company data.
              </p>
              <ul className="space-y-3 mb-12">
                <li className="font-mono text-[10px] text-[#050505] font-black uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#050505] shrink-0" /> Missed-Call Auto-Catch</li>
                <li className="font-mono text-[10px] text-[#050505] font-black uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#050505] shrink-0" /> 2-Way AI Text Conversations</li>
                <li className="font-mono text-[10px] text-[#050505] font-black uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#050505] shrink-0" /> Scope-of-Work Extraction</li>
                <li className="font-mono text-[10px] text-[#050505] font-black uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#050505] shrink-0" /> Custom Knowledge Base Sync</li>
                <li className="font-mono text-[10px] text-[#050505] font-black uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#050505] shrink-0" /> Direct Calendar Integration</li>
              </ul>
            </div>
            <Link href="https://calendar.app.google/DW6EyNY2BRDA1h1PA" target="_blank" className="w-full border border-[#050505] bg-[#050505] text-[#0ea5e9] px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#050505] hover:text-white transition-colors block text-center">
              Book My Custom Setup
            </Link>
          </motion.div>

          {/* Adult Parrot */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1, y: 50 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} viewport={{ once: true, margin: "-100px" }}
            className="w-full bg-[#0a0a0a] text-white p-8 lg:p-12 flex flex-col justify-between border-t lg:border-t-0 border-[#00ff99]/20 hover:border-[#00ff99] transition-all duration-300 group shadow-[inset_0_0_50px_rgba(0,255,153,0.02)] hover:shadow-[0_0_60px_rgba(0,255,153,0.3),inset_0_0_50px_rgba(0,255,153,0.05)]"
          >
            <div>
              <span className="text-[10px] text-[#00ff99] font-mono tracking-widest uppercase block mb-4">[ VIP Protocol - 24/7 Voice ]</span>
              <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-4 font-[family-name:var(--font-audiowide)] text-white">Premium</h3>
              <div className="text-4xl font-mono font-bold mb-6 text-white">$897<span className="text-sm text-white/50">/mo</span></div>
              <p className="font-mono text-xs text-white/70 leading-relaxed mb-8">
                A hyper-realistic voice agent answers every call instantly. It executes your exact sales frameworks to handle typical conversations and book appointments. If a call requires a human touch, it seamlessly transfers them directly to your phone.
              </p>
              <ul className="space-y-3 mb-12">
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Missed-Call Auto-Catch</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> 2-Way AI Text Conversations</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Scope-of-Work Extraction</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Custom Knowledge Base Sync</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Direct Calendar Integration</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> 24/7 AI Voice Receptionist</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Hyper-Realistic Voice Engine</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Advanced Objection Handling</li>
                <li className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-widest flex items-center gap-3"><TerminalSquare className="w-3 h-3 text-[#00ff99] shrink-0" /> Smart Live Call Routing</li>
              </ul>
            </div>
            <Link href="https://calendar.app.google/DW6EyNY2BRDA1h1PA" target="_blank" className="w-full border border-[#00ff99] bg-[#00ff99]/10 text-[#00ff99] px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#00ff99] hover:text-black transition-colors block text-center">
              Talk to the Founders
            </Link>
          </motion.div>

        </div>
      </section>

    </main>
  );
}
