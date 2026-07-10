"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, PhoneMissed, DollarSign, CalendarCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardOverview() {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, count } = await supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .eq('client_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (data) {
        setRecentActivity(data);
      }
      if (count !== null) {
        setTotalMessages(count);
      }
    };
    
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Interactions Handled",
      value: totalMessages.toString(),
      trend: "All time records",
      icon: PhoneMissed,
      color: "text-[#00bfff]"
    },
    {
      title: "Revenue Saved",
      value: "TBD",
      trend: "Pending CRM Sync",
      icon: DollarSign,
      color: "text-white/30"
    },
    {
      title: "Appointments Booked",
      value: "TBD",
      trend: "Pending Calendar Sync",
      icon: CalendarCheck,
      color: "text-white/30"
    }
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">Overview</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Your AI Receptionist metrics.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-white/10 p-6 relative overflow-hidden group hover:border-white/30 transition-colors">
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="flex justify-between items-start mb-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">{stat.title}</span>
              <stat.icon className={`w-4 h-4 ${stat.color} opacity-70`} />
            </div>
            
            <div>
              <div className={`text-4xl font-mono font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40">
                <ArrowUpRight className={`w-3 h-3 ${stat.color !== 'text-white/30' ? 'text-[#00bfff]' : 'text-white/20'}`} />
                {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Log */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Recent Interceptions</h2>
        
        <div className="bg-[#1a1a1a] border border-white/10">
          <div className="grid grid-cols-4 p-4 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-white/40">
            <div className="col-span-1">Timestamp</div>
            <div className="col-span-2">Origin</div>
            <div className="col-span-1 text-right">Direction</div>
          </div>
          
          <div className="divide-y divide-white/5">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-white/50 font-mono text-xs uppercase tracking-widest">
                No recent activity found.
              </div>
            ) : (
              recentActivity.map((log) => (
                <div key={log.id} className="grid grid-cols-4 p-4 items-center hover:bg-white/[0.02] transition-colors cursor-crosshair">
                  <div className="col-span-1 font-mono text-xs text-white/50">
                    {new Date(log.created_at).toLocaleDateString()}
                  </div>
                  <div className="col-span-2 font-mono text-xs text-white">{log.customer_phone}</div>
                  <div className="col-span-1 flex justify-end">
                    <span className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1 border ${
                      log.direction === 'outbound' ? 'bg-[#00bfff]/10 border-[#00bfff]/30 text-[#00bfff]' : 'bg-[#00ff99]/10 border-[#00ff99]/30 text-[#00ff99]'
                    }`}>
                      {log.direction}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      
    </div>
  );
}
