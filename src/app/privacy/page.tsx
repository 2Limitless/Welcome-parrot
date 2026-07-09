import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#111111] text-[#f0f0f0] font-sans selection:bg-[#00bfff] selection:text-[#111111] pt-32 pb-24 px-6 lg:px-12 relative overflow-hidden">
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
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none font-[family-name:var(--font-audiowide)] text-white">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-sm text-white/50 uppercase tracking-widest">Last Updated: July 2026</p>
        </div>

        <div className="space-y-12 font-sans text-base leading-relaxed text-white/80">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00bfff] pl-4">1. Information We Collect</h2>
            <p className="mb-4">
              Welcome Parrot collects information you provide directly to us, such as when you create an account, connect integrations (e.g., Twilio, CRMs), or communicate with us. This includes your name, email, phone number, and billing information.
            </p>
            <p>
              We also automatically collect certain data regarding your usage of the system, including interaction logs, IP addresses, and device identifiers to ensure system integrity and train our underlying models.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00bfff] pl-4">2. How We Use Your Data</h2>
            <p className="mb-4">
              Your data is utilized to:
            </p>
            <ul className="list-none space-y-2 pl-4">
              <li>— Provide, maintain, and improve the Welcome Parrot software capabilities.</li>
              <li>— Process transactions and send related administrative information.</li>
              <li>— Respond to technical issues and provide customer support.</li>
              <li>— Monitor and analyze trends, usage, and activities in connection with our services.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00bfff] pl-4">3. Data Sharing and Security</h2>
            <p className="mb-4">
              We do not sell your personal data. We only share information with third-party vendors, consultants, and service providers who need access to such information to carry out work on our behalf (e.g., OpenAI, Twilio, Stripe). No mobile information will be shared with third parties or affiliates for marketing or promotional purposes.
            </p>
            <p>
              All data transmitted through our systems is encrypted in transit and at rest. We implement robust security measures to protect your leads and infrastructure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-widest text-white mb-4 border-l-2 border-[#00bfff] pl-4">4. Your Rights</h2>
            <p className="mb-8">
              Depending on your location, you may have the right to request access, correction, or deletion of your personal data. To execute these rights, please contact our support team.
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
