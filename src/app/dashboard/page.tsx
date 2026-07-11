"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, PhoneMissed, DollarSign, CalendarCheck, MessageSquare, ChevronRight } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import ChatModal from "@/components/ChatModal";

export default function DashboardOverview() {
  const [prospects, setProspects] = useState<any[]>([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [selectedProspect, setSelectedProspect] = useState<any | null>(null);

  const supabase = createClient();

  useEffect(() => {
    let subscriptionChannel: any = null;

    const fetchDashboardData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const res = await fetch(`/api/messages?clientId=${session.user.id}`);
      const { data, count } = await res.json();

      if (data) {
        processMessagesIntoProspects(data);
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
              setTotalMessages(prev => prev + 1);
              // Trigger a full re-fetch to safely group prospects on new message
              fetch(`/api/messages?clientId=${session.user.id}`)
                .then(r => r.json())
                .then(d => {
                  if (d.data) processMessagesIntoProspects(d.data);
                });
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

  const processMessagesIntoProspects = (messages: any[]) => {
    const prospectMap = new Map();
    
    // Sort ascending by time so when we push to array, it's chronological
    const sortedMessages = [...messages].sort((a, b) => 
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    sortedMessages.forEach(msg => {
      const phone = msg.customer_phone;
      if (!prospectMap.has(phone)) {
        prospectMap.set(phone, {
          phone: phone,
          messages: [],
          lastInteraction: msg.created_at,
          latestMessage: msg.body
        });
      }
      const prospect = prospectMap.get(phone);
      prospect.messages.push(msg);
      prospect.lastInteraction = msg.created_at;
      prospect.latestMessage = msg.body;
    });

    // Convert map to array and sort by last interaction descending
    const prospectsArray = Array.from(prospectMap.values()).sort((a, b) => 
      new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime()
    );

    setProspects(prospectsArray);
    
    // Update selected prospect if modal is open
    setProspects(currentProspects => {
      setSelectedProspect((prevSelected: any) => {
        if (!prevSelected) return null;
        return currentProspects.find(p => p.phone === prevSelected.phone) || null;
      });
      return prospectsArray;
    });
  };

  const formatPhone = (phone: string) => {
    if (!phone) return 'Unknown';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const sampleProspects = [
    {
      phone: "555-019-8273",
      lastInteraction: new Date().toISOString(),
      latestMessage: "Yes, I'd like to get an estimate for my roof.",
      messages: [
        { role: "user", body: "Hi, do you do residential roofing?", created_at: new Date(Date.now() - 100000).toISOString() },
        { role: "assistant", body: "Hello! Yes, we specialize in residential roofing. Are you looking for a repair or a full replacement?", created_at: new Date(Date.now() - 80000).toISOString() },
        { role: "user", body: "Yes, I'd like to get an estimate for my roof.", created_at: new Date().toISOString() }
      ]
    },
    {
      phone: "555-012-3948",
      lastInteraction: new Date(Date.now() - 3600000).toISOString(),
      latestMessage: "Thanks, I'll check my calendar.",
      messages: [
        { role: "user", body: "How much for a standard driveway pressure wash?", created_at: new Date(Date.now() - 3800000).toISOString() },
        { role: "assistant", body: "Our standard driveway pressure washing starts at $150. Would you like to schedule an appointment?", created_at: new Date(Date.now() - 3700000).toISOString() },
        { role: "user", body: "Thanks, I'll check my calendar.", created_at: new Date(Date.now() - 3600000).toISOString() }
      ]
    }
  ];

  const displayProspects = prospects.length > 0 ? prospects : sampleProspects;
  const displayTotalMessages = totalMessages > 0 ? totalMessages : 6;
  const isDemoMode = prospects.length === 0;

  const stats = [
    {
      title: "Interactions Handled",
      value: displayTotalMessages.toString(),
      trend: "All time records",
      icon: PhoneMissed,
      color: "text-[#00bfff]"
    },
    {
      title: "Total Prospects",
      value: displayProspects.length.toString(),
      trend: "Unique phone numbers",
      icon: DollarSign,
      color: "text-[#00ff99]"
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
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">CRM Dashboard</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Your active leads and conversations.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#1a1a1a] border border-white/10 p-6 relative overflow-hidden group hover:border-white/30 transition-colors cursor-default">
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

      {/* Prospects Sheet */}
      <div>
        <h2 className="text-xl font-black uppercase tracking-widest mb-6 border-b border-white/10 pb-4 flex justify-between items-end">
          <span className="flex items-center gap-4">
            Active Prospects
            {isDemoMode && <span className="px-3 py-1 bg-[#00bfff]/20 text-[#00bfff] text-[10px] font-mono rounded-full border border-[#00bfff]/50 uppercase tracking-widest">Sample Data</span>}
          </span>
          <span className="font-mono text-[10px] text-white/40 font-normal">Click a prospect to view chat history</span>
        </h2>
        
        <div className="bg-[#1a1a1a] border border-white/10 rounded-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-4 border-b border-white/5 font-mono text-[10px] uppercase tracking-widest text-white/40 bg-[#111]">
            <div className="col-span-3">Prospect ID / Phone</div>
            <div className="col-span-6">Latest Interaction Summary</div>
            <div className="col-span-2 text-center">Last Active</div>
            <div className="col-span-1 text-right">Action</div>
          </div>
          
          <div className="flex flex-col">
            {displayProspects.map((prospect) => (
              <div 
                key={prospect.phone} 
                onClick={() => setSelectedProspect(prospect)}
                className="grid grid-cols-12 items-center p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-all cursor-pointer group"
              >
                <div className="col-span-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00bfff]/20 to-[#00ff99]/20 flex items-center justify-center border border-white/10 group-hover:border-[#00bfff]/50 transition-colors">
                    <span className="font-mono text-[10px] text-white/70">ID</span>
                  </div>
                  <p className="font-black font-[family-name:var(--font-orbitron)] tracking-wider text-white text-sm group-hover:text-[#00bfff] transition-colors">
                    {formatPhone(prospect.phone)}
                  </p>
                </div>
                
                <div className="col-span-6 pr-6">
                  <p className="text-sm text-white/60 truncate font-mono">
                    <span className="text-[#00ff99] opacity-70 mr-2">»</span>
                    {prospect.latestMessage}
                  </p>
                </div>
                
                <div className="col-span-2 text-center">
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                    {new Date(prospect.lastInteraction).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                
                <div className="col-span-1 flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#00bfff] transition-colors">
                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <ChatModal 
        isOpen={!!selectedProspect} 
        onClose={() => setSelectedProspect(null)} 
        prospect={selectedProspect} 
      />
    </div>
  );
}
