"use client";

import React, { useState } from "react";
import { Save, Server, Shield, MessageSquare, Zap } from "lucide-react";

export default function SettingsPage() {
  const [knowledgeBase, setKnowledgeBase] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("Hi, this is the AI assistant for [Your Company]. How can I help you today?");
  const [isInstantSms, setIsInstantSms] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">AI Protocol Settings</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Configure your autonomous agent's parameters and knowledge base.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Main Settings */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Knowledge Base */}
          <section className="bg-[#0a0a0a] border border-white/10 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Server className="w-5 h-5 text-[#00bfff]" />
              <h2 className="text-xl font-bold uppercase tracking-widest font-mono">Knowledge Base</h2>
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Core Training Data</label>
              <p className="font-mono text-xs text-white/40 mb-4">Paste your business hours, pricing, FAQs, and any specific instructions. The AI will strictly adhere to this context when answering calls.</p>
              <textarea 
                value={knowledgeBase}
                onChange={(e) => setKnowledgeBase(e.target.value)}
                placeholder="e.g. We are open Monday-Friday 9am-5pm. Our minimum service fee is $150..."
                className="w-full h-64 bg-black border border-white/10 focus:border-[#00bfff] outline-none p-4 font-mono text-sm text-white/80 resize-y transition-colors"
              />
            </div>
          </section>

          {/* Interaction Protocols */}
          <section className="bg-[#0a0a0a] border border-white/10 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <MessageSquare className="w-5 h-5 text-[#00bfff]" />
              <h2 className="text-xl font-bold uppercase tracking-widest font-mono">Interaction Protocols</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-white/50 block">Initial Greeting</label>
                <input 
                  type="text"
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  className="w-full bg-black border border-white/10 focus:border-[#00bfff] outline-none p-4 font-mono text-sm text-white/80 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-white/5 bg-black/50">
                <div>
                  <h4 className="font-mono text-sm font-bold text-white uppercase tracking-widest">Instant Response Mode</h4>
                  <p className="font-mono text-[10px] text-white/40 mt-1 uppercase">Reply immediately vs waiting 60 seconds</p>
                </div>
                <button 
                  onClick={() => setIsInstantSms(!isInstantSms)}
                  className={`w-12 h-6 border transition-colors relative flex items-center ${isInstantSms ? 'bg-[#00bfff]/20 border-[#00bfff]' : 'bg-transparent border-white/20'}`}
                >
                  <div className={`w-4 h-4 bg-white transition-transform ${isInstantSms ? 'translate-x-7 bg-[#00bfff]' : 'translate-x-1 bg-white/50'}`} />
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column - System & Routing */}
        <div className="space-y-8">
          
          {/* Security & Routing */}
          <section className="bg-[#0a0a0a] border border-white/10 p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <Shield className="w-5 h-5 text-[#00bfff]" />
              <h2 className="text-xl font-bold uppercase tracking-widest font-mono">Escalation</h2>
            </div>
            
            <div className="space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">Where should the system route leads that require human intervention?</p>
              
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${notifyEmail ? 'border-[#00bfff] bg-[#00bfff]/20' : 'border-white/20 group-hover:border-[#00bfff]/50'}`}>
                  {notifyEmail && <div className="w-2 h-2 bg-[#00bfff]" />}
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/80">System Email</span>
                <input type="checkbox" className="hidden" checked={notifyEmail} onChange={() => setNotifyEmail(!notifyEmail)} />
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 border flex items-center justify-center transition-colors ${notifySms ? 'border-[#00bfff] bg-[#00bfff]/20' : 'border-white/20 group-hover:border-[#00bfff]/50'}`}>
                  {notifySms && <div className="w-2 h-2 bg-[#00bfff]" />}
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/80">Admin SMS</span>
                <input type="checkbox" className="hidden" checked={notifySms} onChange={() => setNotifySms(!notifySms)} />
              </label>
            </div>
          </section>

          {/* Save Action */}
          <button className="w-full bg-[#00bfff] text-[#050505] font-black font-mono uppercase tracking-widest py-4 px-6 flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-colors group">
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
          
          <div className="flex items-start gap-3 p-4 border border-white/10 bg-white/[0.02]">
            <Zap className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] text-white/50 leading-relaxed uppercase">Changes to the knowledge base take approximately 2 minutes to compile into the neural net.</p>
          </div>

        </div>
      </div>
    </div>
  );
}
