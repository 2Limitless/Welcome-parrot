"use client";

import React, { useState } from "react";
import { Search, Filter, Clock, FileText } from "lucide-react";

export default function CallLogsPage() {
  const [filter, setFilter] = useState("ALL");

  const mockLogs = [
    { id: "LOG-001", time: "2026-07-07 10:45 AM", phone: "+1 (555) 019-2384", duration: "2m 14s", outcome: "QUALIFIED", recording: true },
    { id: "LOG-002", time: "2026-07-07 09:12 AM", phone: "+1 (555) 837-9122", duration: "5m 02s", outcome: "BOOKED", recording: true },
    { id: "LOG-003", time: "2026-07-06 04:30 PM", phone: "+1 (555) 234-9011", duration: "1m 15s", outcome: "NEEDS HUMAN", recording: true },
    { id: "LOG-004", time: "2026-07-06 02:15 PM", phone: "+1 (555) 773-4122", duration: "0m 10s", outcome: "SPAM", recording: false },
    { id: "LOG-005", time: "2026-07-05 11:20 AM", phone: "+1 (555) 991-0023", duration: "3m 45s", outcome: "QUALIFIED", recording: true },
    { id: "LOG-006", time: "2026-07-05 08:05 AM", phone: "+1 (555) 442-9988", duration: "1m 30s", outcome: "NEEDS HUMAN", recording: true },
  ];

  const filteredLogs = filter === "ALL" ? mockLogs : mockLogs.filter(log => log.outcome === filter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black uppercase tracking-tighter font-[family-name:var(--font-audiowide)] mb-2">Call Interceptions</h1>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Raw data feed of all missed calls handled by the system.</p>
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
          <button className="border border-white/10 p-2 hover:border-[#00bfff] hover:text-[#00bfff] transition-colors hidden md:block">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {["ALL", "QUALIFIED", "BOOKED", "NEEDS HUMAN", "SPAM"].map((f) => (
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
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02]">
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">ID</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Timestamp</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Origin</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Duration</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40">Outcome</th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-white/40 text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4 font-mono text-[10px] text-white/30">{log.id}</td>
                  <td className="p-4 font-mono text-[10px] text-white/60">{log.time}</td>
                  <td className="p-4 font-mono text-sm text-white">{log.phone}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-white/50">
                      <Clock className="w-3 h-3" />
                      {log.duration}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-block font-mono text-[10px] uppercase tracking-widest px-3 py-1 border ${
                      log.outcome === "QUALIFIED" || log.outcome === "BOOKED" ? "bg-[#00bfff]/10 border-[#00bfff]/30 text-[#00bfff]" :
                      log.outcome === "NEEDS HUMAN" ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-500" :
                      "bg-red-500/10 border-red-500/30 text-red-500"
                    }`}>
                      {log.outcome}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-white/30 hover:text-[#00bfff] transition-colors p-2" disabled={!log.recording}>
                      <FileText className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
