import React from "react";
import Link from "next/link";

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f0f0f0] font-sans selection:bg-[#00ff99] selection:text-[#050505] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Noise Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.04] mix-blend-screen">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-20">
        <div className="mb-12 border-b border-white/20 pb-8">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-orbitron)] text-white">
            Terms of Service
          </h1>
          <p className="mt-4 font-mono text-sm text-white/50 uppercase tracking-widest">Last Updated: July 2026</p>
        </div>

        <div className="space-y-12 font-sans text-base leading-relaxed text-white/80">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00ff99] pl-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using the Welcome Parrot software and infrastructure ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you must immediately stop using the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00ff99] pl-4">2. Use of the Service</h2>
            <p className="mb-4">
              You agree to use the Service strictly for lawful business purposes. You are strictly prohibited from utilizing the system to:
            </p>
            <ul className="list-none space-y-2 pl-4">
              <li>— Spam, phish, or execute automated attacks against any third party.</li>
              <li>— Transmit malicious code, viruses, or any destructive software.</li>
              <li>— Impersonate other entities without explicit authorization.</li>
              <li>— Bypass the security measures established within the Service.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00ff99] pl-4">3. Subscription and Billing</h2>
            <p className="mb-4">
              Access to the Service requires a valid subscription tier. You will be billed on a recurring basis. All fees are non-refundable unless otherwise explicitly required by law. Downgrades or cancellations must be completed before the next billing cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00ff99] pl-4">4. Limitation of Liability</h2>
            <p className="mb-8">
              In no event shall Welcome Parrot, its directors, employees, or agents, be liable for any indirect, incidental, special, consequential or punitive damages, including loss of profits, data, or use, resulting from your access to or inability to access the Service. The software operates automatically; you hold sole responsibility for the actions executed on your behalf.
            </p>
            <Link href="/" className="inline-block border border-white/20 px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors">
              Return to Home
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
