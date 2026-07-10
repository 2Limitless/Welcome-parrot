"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, PhoneMissed, DollarSign, CalendarCheck } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardOverview() {
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);

  const supabase = createClient();

  useEffect(() => {
    let subscriptionChannel: any = null;

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

      // Realtime subscription
      subscriptionChannel = supabase
        .channel('messages_changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          (payload) => {
            if (payload.new.client_id === session.user.id) {
              setRecentActivity(prev => [payload.new, ...prev].slice(0, 5));
              setTotalMessages(prev => prev + 1);
            }
          }
        )
        .subscribe();
    };

    fetchDashboardData();

    return () => {
      if (subscriptionChannel) {
        supabase.removeChannel(subscriptionChannel);
      }
    };
  }, []);

  const formatPhone = (phone: string) => {
    if (!phone) return 'Unknown';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

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
          
          <div className="flex flex-col">
            {recentActivity.length === 0 ? (
              <div className="p-8 text-center text-white/40">
                <p className="font-mono text-xs uppercase tracking-widest">No recent activity found.</p>
                <p className="text-[10px] mt-2">Missed calls will appear here automatically.</p>
              </div>
            ) : (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex justify-between items-start p-5 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors group">
                  <div className="max-w-[70%]">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-black font-[family-name:var(--font-orbitron)] tracking-wider text-white text-sm group-hover:text-[#00bfff] transition-colors">{formatPhone(activity.customer_phone)}</p>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${activity.direction === 'outbound' ? 'bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff]/30' : 'bg-[#00ff99]/20 text-[#00ff99] border border-[#00ff99]/30'}`}>
                        {activity.direction === 'outbound' ? 'AI Agent' : 'Customer'}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed font-mono break-words">{activity.body}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{new Date(activity.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
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
