"use client";

import React from "react";
import { ArrowUpRight, PhoneMissed, DollarSign, CalendarCheck } from "lucide-react";

export default function DashboardOverview() {
  
  const stats = [
    {
      title: "Missed Calls Caught",
      value: "24",
      trend: "+12% this week",
      icon: PhoneMissed,
      color: "text-[#00bfff]"
    },
    {
      title: "Revenue Saved",
      value: "$12,450",
      trend: "+8% this week",
      icon: DollarSign,
      color: "text-white"
    },
    {
      title: "Appointments Booked",
      value: "8",
      trend: "+2 this week",
      icon: CalendarCheck,
      color: "text-white"
    }
  ];

  const recentActivity = [
    { id: 1, phone: "+1 (555) 019-2384", outcome: "QUALIFIED", time: "10 mins ago", color: "text-[#00bfff]", bg: "bg-[#00bfff]/10 border-[#00bfff]/30" },
    { id: 2, phone: "+1 (555) 837-9122", outcome: "BOOKED", time: "45 mins ago", color: "text-[#00bfff]", bg: "bg-[#00bfff]/10 border-[#00bfff]/30" },
    { id: 3, phone: "+1 (555) 234-9011", outcome: "NEEDS HUMAN", time: "2 hours ago", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30" },
    { id: 4, phone: "+1 (555) 773-4122", outcome: "SPAM", time: "5 hours ago", color: "text-red-500", bg: "bg-red-500/10 border-red-500/30" },
    { id: 5, phone: "+1 (555) 991-0023", outcome: "QUALIFIED", time: "Yesterday", color: "text-[#00bfff]", bg: "bg-[#00bfff]/10 border-[#00bfff]/30" },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-orbitron)] mb-2">Overview</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Your AI Receptionist metrics for the last 7 days.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0a0a0a] border border-white/10 p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{stat.title}</span>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-70`} />
            </div>
            
            <div>
              <div className={`text-4xl font-mono font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                <ArrowUpRight className="w-3 h-3 text-[#00bfff]" />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Log */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Recent Interceptions</h2>
        
        <div className="bg-[#0a0a0a] border border-white/10">
          <div className="grid grid-cols-4 p-4 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <div className="col-span-1">Timestamp</div>
            <div className="col-span-2">Origin</div>
            <div className="col-span-1 text-right">Outcome</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {recentActivity.map((log) => (
              <div key={log.id} className="grid grid-cols-4 p-4 items-center hover:bg-white/[0.02] transition-colors cursor-crosshair">
                <div className="col-span-1 font-mono text-xs text-white/50">{log.time}</div>
                <div className="col-span-2 font-mono text-xs text-white">{log.phone}</div>
                <div className="col-span-1 flex justify-end">
                  <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border ${log.bg} ${log.color}`}>
                    {log.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
