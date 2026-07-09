"use client";

import React from "react";
import { CreditCard, CheckCircle, ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
  
  // Mock data for UI layout
  const currentPlan = {
    name: "Automation",
    price: "$297",
    interval: "month",
    status: "ACTIVE",
    renewalDate: "Aug 07, 2026",
    cardLast4: "4242"
  };

  const invoices = [
    { id: "INV-2026-001", date: "Jul 07, 2026", amount: "$297.00", status: "PAID" },
    { id: "INV-2026-002", date: "Jun 07, 2026", amount: "$297.00", status: "PAID" },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">Billing & Subscription</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Manage your payment methods and view past invoices.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Current Plan */}
        <div className="lg:col-span-2 space-y-8">
          
          <section className="bg-[#0a0a0a] border border-white/10 p-8 relative overflow-hidden">
            {/* Subtle accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-[#00bfff]" />
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-2">Current Active Protocol</span>
                <h2 className="text-4xl font-black font-[family-name:var(--font-audiowide)] uppercase tracking-tighter">{currentPlan.name}</h2>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest px-3 py-1 bg-[#00ff99]/10 border border-[#00ff99]/30 text-[#00ff99]">
                <CheckCircle className="w-3 h-3" />
                {currentPlan.status}
              </span>
            </div>

            <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8">
              <span className="text-5xl font-mono font-bold">{currentPlan.price}</span>
              <span className="font-mono text-white/50 mb-2">/{currentPlan.interval}</span>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">Next Billing Date</span>
                <span className="font-mono text-sm text-white">{currentPlan.renewalDate}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 block mb-1">Payment Method</span>
                <div className="flex items-center gap-2 font-mono text-sm text-white">
                  <CreditCard className="w-4 h-4 text-white/50" />
                  •••• {currentPlan.cardLast4}
                </div>
              </div>
            </div>

            <button className="w-full sm:w-auto border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono uppercase tracking-widest py-3 px-6 text-[10px] transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              Open Stripe Customer Portal
            </button>
          </section>

          {/* Billing History */}
          <section className="bg-[#0a0a0a] border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h3 className="font-mono font-bold uppercase tracking-widest text-sm">Invoice History</h3>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/[0.02]">
                  <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Invoice ID</th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Date</th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Amount</th>
                  <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-[10px] text-white/60">{inv.id}</td>
                    <td className="p-4 font-mono text-xs text-white">{inv.date}</td>
                    <td className="p-4 font-mono text-xs text-white">{inv.amount}</td>
                    <td className="p-4 text-right">
                      <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-[#00ff99]">
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

        </div>

        {/* Right Column - Upgrade */}
        <div className="space-y-6">
          <section className="bg-[#00bfff] text-[#050505] border border-[#00bfff] p-6 group hover:bg-white hover:border-white transition-colors duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5" />
              <h3 className="font-black font-[family-name:var(--font-audiowide)] uppercase tracking-tighter text-2xl">Upgrade</h3>
            </div>
            <p className="font-mono text-xs text-[#050505]/80 leading-relaxed font-bold mb-6">
              Switch to the Autonomous protocol to unlock the 24/7 Voice Receptionist and advanced human routing.
            </p>
            <Link href="/" className="w-full border border-[#050505] bg-[#050505] text-[#00bfff] py-3 px-4 font-mono text-[10px] font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#050505] transition-colors block text-center">
              View Upgrade Options
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
