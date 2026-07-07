"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, KeySquare } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function LoginForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get("message");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Improved Eye Tracking Math
  const maxLookX = 8;
  const maxLookY = 4;
  // Assume a standard email input shows ~35 characters before scrolling.
  // We map the string length to a progress percentage (0.0 to 1.0),
  // then map that percentage to the range [-maxLookX, maxLookX].
  const typingProgress = Math.min(email.length / 35, 1);
  const calculatedX = -maxLookX + (typingProgress * (maxLookX * 2));
  
  const lookX = isEmailFocused ? calculatedX : 0;
  const lookY = isEmailFocused ? maxLookY : 0;

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsLoading(false);
      return;
    }

    // Success! Redirect to dashboard (which we will build later)
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-[#00bfff] selection:text-[#050505] flex flex-col md:flex-row overflow-x-hidden relative z-10">

      {/* Left Column - Aesthetic Visuals */}
      <div className="w-full md:w-5/12 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest mb-16">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>

          <span className="text-[10px] text-[#00bfff] font-mono tracking-[0.2em] uppercase mb-4 block">[ Secure Access ]</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-orbitron)] text-white mb-6">
            Client<br />Portal
          </h1>
          <p className="font-mono text-xs text-white/70 leading-relaxed max-w-xs">
            Authenticate to manage your AI receptionist, view missed-call analytics, and adjust your active protocols.
          </p>
        </div>

        <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/40">
            <KeySquare className="w-8 h-8" />
            <p className="text-[10px] font-mono uppercase tracking-widest leading-relaxed">
              End-to-End Encrypted.<br /> SOC2 Compliant Infrastructure.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Login Form */}
      <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative">
        {/* Subtle glow effect behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00bfff]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-md mx-auto w-full relative z-10">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <span className="text-[10px] text-white/50 font-mono tracking-[0.2em] uppercase mb-4 block">[ System Login ]</span>
              <h2 className="text-3xl font-black uppercase tracking-widest text-white">Initialize</h2>
            </div>
            
            {/* Cool Cyberpunk/High-Depth Parrot */}
            <div className="relative w-40 h-40 -mb-6 z-20 mx-auto">
              <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                <defs>
                  {/* Heavy metallic gradients for depth */}
                  <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#000000" />
                  </linearGradient>
                  <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>
                  <linearGradient id="beakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00bfff" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00bfff" stopOpacity="0" />
                  </radialGradient>
                  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.9"/>
                  </filter>
                </defs>

                {/* Cyber-Claws (Feet) */}
                <path d="M 75 160 L 65 190 M 75 160 L 75 190 M 75 160 L 85 190" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
                <path d="M 125 160 L 115 190 M 125 160 L 125 190 M 125 160 L 135 190" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" />

                {/* Main Body - Sharper, sleeker stealth angles */}
                <path d="M 60 50 C 60 20, 140 20, 140 50 L 150 120 C 150 160, 130 180, 100 180 C 70 180, 50 160, 50 120 Z" fill="url(#bodyGrad)" filter="url(#shadow)" stroke="#334155" strokeWidth="1" />
                
                {/* Tech/Armor plates on belly */}
                <path d="M 75 90 L 125 90 L 115 150 L 85 150 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <path d="M 80 100 L 120 100 M 82 115 L 118 115 M 84 130 L 116 130" stroke="#00bfff" strokeWidth="1" strokeOpacity="0.3" />

                {/* Eyes - Deep sockets with glowing camera lenses */}
                <g>
                  {/* Eye sockets */}
                  <circle cx="75" cy="75" r="16" fill="#020617" stroke="#334155" strokeWidth="2" filter="url(#shadow)" />
                  <circle cx="125" cy="75" r="16" fill="#020617" stroke="#334155" strokeWidth="2" filter="url(#shadow)" />
                  
                  {/* Glowing Pupils tracking input */}
                  <circle cx={75 + lookX} cy={75 + lookY} r="6" fill="#00bfff" className="transition-all duration-100 ease-out" />
                  <circle cx={125 + lookX} cy={75 + lookY} r="6" fill="#00bfff" className="transition-all duration-100 ease-out" />
                  
                  {/* Neon Glow overlay */}
                  <circle cx={75 + lookX} cy={75 + lookY} r="12" fill="url(#eyeGlow)" className="transition-all duration-100 ease-out pointer-events-none" />
                  <circle cx={125 + lookX} cy={75 + lookY} r="12" fill="url(#eyeGlow)" className="transition-all duration-100 ease-out pointer-events-none" />
                  
                  {/* Inner Lens reflection */}
                  <circle cx={73 + lookX} cy={73 + lookY} r="2" fill="white" opacity="0.8" className="transition-all duration-100 ease-out pointer-events-none" />
                  <circle cx={123 + lookX} cy={73 + lookY} r="2" fill="white" opacity="0.8" className="transition-all duration-100 ease-out pointer-events-none" />
                </g>

                {/* Sharp Hooked Beak (Metallic) */}
                <path d="M 85 85 L 115 85 L 100 120 Z" fill="url(#beakGrad)" filter="url(#shadow)" stroke="#475569" strokeWidth="1" />
                <path d="M 100 85 L 100 115" stroke="#1e293b" strokeWidth="2" />

                {/* Left Wing (Armored Geometry) */}
                <g style={{ transform: isPasswordFocused ? 'translate(25px, -55px) rotate(45deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '40px 130px' }} className="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]">
                  <path d="M 60 90 Q 10 120, 20 180 Q 50 160, 65 110 Z" fill="url(#wingGrad)" stroke="#475569" strokeWidth="1" filter="url(#shadow)" />
                  <path d="M 45 110 L 25 150 M 55 125 L 35 165" stroke="#1e293b" strokeWidth="2" />
                </g>
                
                {/* Right Wing (Armored Geometry) */}
                <g style={{ transform: isPasswordFocused ? 'translate(-25px, -55px) rotate(-45deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '160px 130px' }} className="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]">
                  <path d="M 140 90 Q 190 120, 180 180 Q 150 160, 135 110 Z" fill="url(#wingGrad)" stroke="#475569" strokeWidth="1" filter="url(#shadow)" />
                  <path d="M 155 110 L 175 150 M 145 125 L 165 165" stroke="#1e293b" strokeWidth="2" />
                </g>

              </svg>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {message && (
              <div className="bg-[#00bfff]/10 border border-[#00bfff]/50 text-[#00bfff] p-4 text-xs font-mono uppercase tracking-widest">
                [Notice] {message}
              </div>
            )}

            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 text-xs font-mono uppercase tracking-widest">
                [Error] {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Email Address</label>
              <input 
                required 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" 
                placeholder="COMMANDER@ACME.COM" 
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Password</label>
                <Link href="/forgot-password" className="text-[10px] font-mono text-[#00bfff] hover:underline uppercase tracking-widest">
                  Reset Protocol?
                </Link>
              </div>
              <input 
                required 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" 
                placeholder="••••••••" 
              />
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-8 border border-[#00bfff] bg-[#00bfff]/10 text-[#00bfff] px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#00bfff] hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,153,0.1)] hover:shadow-[0_0_25px_rgba(0,255,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Authenticating..." : "Access System"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
              Need authorization? <Link href="/#pricing" className="text-[#00bfff] hover:underline">Deploy Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] mix-blend-screen">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>
      <div className="pointer-events-none fixed inset-4 border border-white/10 z-[90] mix-blend-difference hidden md:block" />

      <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-[#00bfff] text-xs tracking-widest uppercase">Initializing Portal...</div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
