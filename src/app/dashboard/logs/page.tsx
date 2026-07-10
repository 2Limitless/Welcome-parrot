"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, History, RefreshCcw } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function CallLogsPage() {
  const [filter, setFilter] = useState("ALL");
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  const fetchLogs = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('client_id', session.user.id)
      .order('created_at', { ascending: false });

    if (data) {
      setLogs(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatPhone = (phone: string) => {
    if (!phone) return 'Unknown';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const filteredLogs = filter === "ALL" 
    ? logs 
    : logs.filter(log => log.direction === filter.toLowerCase());

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">Message Logs</h1>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Raw data feed of all texts handled by the system.</p>
        </div>
        <button 
          onClick={fetchLogs} 
          disabled={loading}
          className="border border-white/10 p-2 hover:border-[#00bfff] hover:text-[#00bfff] transition-colors flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/50"
        >
          <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#1a1a1a] border border-white/10 p-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64 text-white/50 focus-within:text-[#00bfff]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
            <input 
              type="text" 
              placeholder="SEARCH PHONE..." 
              className="w-full bg-transparent border border-white/10 px-10 py-2 font-mono text-[10px] uppercase tracking-widest outline-none focus:border-[#00bfff] transition-colors"
            />
          </div>
          <button className="border border-white/10 p-2 hover:border-[#00bfff] hover:text-[#00bfff] transition-colors hidden md:block text-white/50">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["ALL", "OUTBOUND", "INBOUND"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`whitespace-nowrap px-4 py-2 font-mono text-[10px] uppercase tracking-widest border transition-colors ${
                filter === f 
                  ? "bg-[#00bfff]/10 border-[#00bfff] text-[#00bfff]" 
                  : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-[#1a1a1a] border border-white/10 overflow-hidden">
        {loading && logs.length === 0 ? (
          <div className="p-12 text-center font-mono text-xs text-white/50 uppercase tracking-widest">
            Syncing Database...
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center text-white/50">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="font-mono text-xs uppercase tracking-widest">No conversations recorded yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {filteredLogs.length === 0 ? (
              <div className="p-12 text-center text-white/50">
                <p className="font-mono text-sm uppercase tracking-widest">No logs found.</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="flex justify-between items-start p-5 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors group">
                    <div className="max-w-[75%]">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-black font-[family-name:var(--font-orbitron)] tracking-wider text-white text-sm group-hover:text-[#00bfff] transition-colors">{formatPhone(log.customer_phone)}</p>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm ${log.direction === 'outbound' ? 'bg-[#00bfff]/20 text-[#00bfff] border border-[#00bfff]/30' : 'bg-[#00ff99]/20 text-[#00ff99] border border-[#00ff99]/30'}`}>
                          {log.direction === 'outbound' ? 'AI Agent' : 'Customer'}
                        </span>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed font-mono whitespace-pre-wrap break-words">{log.body}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{new Date(log.created_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
