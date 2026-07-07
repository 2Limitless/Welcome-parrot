"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { TerminalSquare, ArrowLeft } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

const tierData = {
  baby: {
    name: "Basic",
    price: "$149/mo",
    description: "Missed-Call Auto-Catch to stop losing high-ticket jobs to voicemail.",
    features: ["Instant Missed-Call SMS", "Customizable Text Template", "Auto-Booking Link Delivery", "Dashboard Call Logging"],
    stripeLink: "https://buy.stripe.com/test_aFa4gz0F57KD4YYaIicjS00"
  },
  teen: {
    name: "Standard",
    price: "$297/mo",
    description: "AI Lead Qualifier that acts as a digital SDR to extract scope of work.",
    features: ["Missed-Call Auto-Catch", "2-Way AI Text Conversations", "Scope-of-Work Extraction", "Custom Knowledge Base Sync", "Direct Calendar Integration"],
    stripeLink: "https://buy.stripe.com/test_dRm14n9bBgh9ghG17IcjS01"
  },
  adult: {
    name: "Premium",
    price: "$897/mo",
    description: "24/7 AI Voice Receptionist that answers every call instantly.",
    features: ["Full Voice Emulation", "Smart Transfer"],
    stripeLink: "https://buy.stripe.com/test_bJe14nbjJaWPd5u4jUcjS02"
  }
};

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tierParam = searchParams.get("tier");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient();

  // Default to baby if no tier or invalid tier is provided
  const selectedTier = (tierParam && tierData[tierParam as keyof typeof tierData])
    ? tierData[tierParam as keyof typeof tierData]
    : tierData.baby;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: companyName,
          tier: selectedTier.name,
        }
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setIsLoading(false);
      return;
    }

    // Success! Redirect to Stripe Payment Link
    window.location.href = `${selectedTier.stripeLink}?prefilled_email=${encodeURIComponent(email)}`;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-[#00bfff] selection:text-[#050505] flex flex-col md:flex-row overflow-x-hidden relative z-10">

      {/* Left Column - Plan Summary */}
      <div className="w-full md:w-5/12 bg-[#0a0a0a] border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-16 flex flex-col justify-between">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-[10px] uppercase tracking-widest mb-16">
            <ArrowLeft className="w-4 h-4" /> Return Home
          </Link>

          <span className="text-[10px] text-[#00bfff] font-mono tracking-[0.2em] uppercase mb-4 block">[ Selected Protocol ]</span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-orbitron)] text-white mb-6">
            {selectedTier.name}
          </h1>
          <div className="text-5xl font-mono font-bold mb-8">{selectedTier.price}</div>
          <p className="font-mono text-xs text-white/70 leading-relaxed mb-12 max-w-sm">
            {selectedTier.description}
          </p>

          <ul className="space-y-4">
            {selectedTier.features.map((feature, idx) => (
              <li key={idx} className="font-mono text-[10px] text-white font-bold uppercase tracking-widest flex items-center gap-3">
                <TerminalSquare className="w-3 h-3 text-[#00bfff]" /> {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
            By initializing, you agree to our <Link href="/terms" className="text-white/60 hover:text-white underline">Terms of Service</Link> and <Link href="/privacy" className="text-white/60 hover:text-white underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>

      {/* Right Column - Signup Form */}
      <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center relative">
        {/* Subtle glow effect behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#00bfff]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-md mx-auto w-full relative z-10">
          <div className="mb-12">
            <span className="text-[10px] text-white/50 font-mono tracking-[0.2em] uppercase mb-4 block">[ System Init ]</span>
            <h2 className="text-3xl font-black uppercase tracking-widest text-white">Create Account</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 text-xs font-mono uppercase tracking-widest">
                [Error] {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">First Name</label>
                <input required type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" placeholder="JOHN" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Last Name</label>
                <input required type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" placeholder="DOE" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Company Name</label>
              <input required type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" placeholder="ACME CORP" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Email Address</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" placeholder="JOHN@ACME.COM" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-white/60">Secure Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/50 border border-white/10 px-4 py-3 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-[#00bfff] transition-colors" placeholder="••••••••" />
            </div>

            <button type="submit" disabled={isLoading} className="w-full mt-8 border border-[#00bfff] bg-[#00bfff]/10 text-[#00bfff] px-6 py-4 text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-[#00bfff] hover:text-black transition-colors shadow-[0_0_15px_rgba(0,255,153,0.1)] hover:shadow-[0_0_25px_rgba(0,255,153,0.3)] disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? "Initializing..." : "Continue to Payment"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
              Already initialized? <Link href="/login" className="text-[#00bfff] hover:underline">Client Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
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

      <Suspense fallback={<div className="min-h-screen bg-[#050505] flex items-center justify-center font-mono text-[#00bfff] text-xs tracking-widest uppercase">Initializing...</div>}>
        <SignupForm />
      </Suspense>
    </>
  );
}
