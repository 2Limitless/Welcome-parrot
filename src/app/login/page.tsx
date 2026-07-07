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

  // Eye tracking logic
  const maxLookX = 5; // Reduced max radius so pupils stay inside the eyes perfectly
  const maxChars = 32;
  const calculatedX = (Math.min(email.length, maxChars) / maxChars) * (maxLookX * 2) - maxLookX;
  const lookX = isEmailFocused ? calculatedX : 0;
  const lookY = isEmailFocused ? 3 : 0;

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
            
            {/* Peekaboo Parrot */}
            <div className="relative w-32 h-32 -mb-8 z-20 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
                {/* Body/Head outline */}
                <path d="M 20 100 C 15 30, 85 30, 80 100 Z" className="stroke-[#00bfff] stroke-[3px] fill-[#050505]" />
                
                {/* Feathers on top of head */}
                <path d="M 40 25 Q 35 5, 45 15 Q 50 0, 55 15 Q 65 5, 60 25" className="stroke-[#00bfff] stroke-[3px] fill-transparent" strokeLinecap="round" strokeLinejoin="round" />

                {/* Eyes Group */}
                <g>
                  {/* Sclera (White part) */}
                  <circle cx="32" cy="40" r="12" fill="white" />
                  <circle cx="68" cy="40" r="12" fill="white" />
                  
                  {/* Pupils tracking input */}
                  <circle cx={32 + lookX} cy={40 + lookY} r="5" fill="black" className="transition-all duration-75" />
                  <circle cx={68 + lookX} cy={40 + lookY} r="5" fill="black" className="transition-all duration-75" />
                </g>

                {/* Parrot Beak (renders over eyes slightly) */}
                <g>
                  {/* Top Beak */}
                  <path d="M 38 48 Q 50 38, 62 48 C 65 65, 55 75, 50 75 C 45 75, 35 65, 38 48 Z" className="stroke-[#00bfff] stroke-[3px] fill-[#050505]" />
                  {/* Beak dividing line */}
                  <path d="M 42 55 Q 50 65, 58 55" className="stroke-[#00bfff] stroke-[2px] fill-transparent" strokeLinecap="round" />
                </g>

                {/* Left Wing (Covers left eye on password focus) */}
                <g style={{ transform: isPasswordFocused ? 'translate(18px, -28px) rotate(35deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '20px 80px' }} className="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]">
                  {/* Wing Outline */}
                  <path d="M 15 85 C -5 85, -5 45, 15 45 C 35 45, 35 85, 15 85 Z" className="stroke-[#00bfff] stroke-[3px] fill-[#050505]" />
                  {/* Feather Details */}
                  <path d="M 8 55 L 8 75 M 15 50 L 15 78 M 22 55 L 22 75" className="stroke-[#00bfff] stroke-[2px] fill-transparent" strokeLinecap="round" />
                </g>
                
                {/* Right Wing (Covers right eye on password focus) */}
                <g style={{ transform: isPasswordFocused ? 'translate(-18px, -28px) rotate(-35deg)' : 'translate(0px, 0px) rotate(0deg)', transformOrigin: '80px 80px' }} className="transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.26,1.55)]">
                  {/* Wing Outline */}
                  <path d="M 85 85 C 105 85, 105 45, 85 45 C 65 45, 65 85, 85 85 Z" className="stroke-[#00bfff] stroke-[3px] fill-[#050505]" />
                  {/* Feather Details */}
                  <path d="M 92 55 L 92 75 M 85 50 L 85 78 M 78 55 L 78 75" className="stroke-[#00bfff] stroke-[2px] fill-transparent" strokeLinecap="round" />
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
