"use client";

import React, { useEffect, useRef } from 'react';
import { X, Phone, User, Calendar, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  body: string;
  direction: string;
  created_at: string;
}

interface Prospect {
  phone: string;
  messages: Message[];
}

interface ChatModalProps {
  prospect: Prospect | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ prospect, isOpen, onClose }: ChatModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, prospect]);

  const formatPhone = (phone: string) => {
    if (!phone) return 'Unknown';
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^1?(\d{3})(\d{3})(\d{4})$/);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : phone;
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };
  
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <AnimatePresence>
      {isOpen && prospect && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111111] border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-[#151515] flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00bfff] to-[#00ff99] p-[1px]">
                    <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-black font-[family-name:var(--font-orbitron)] tracking-wider text-lg text-white">
                      {formatPhone(prospect.phone)}
                    </h2>
                    <p className="font-mono text-[10px] text-[#00ff99] uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00ff99] animate-pulse" /> Active Prospect
                    </p>
                  </div>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Bar */}
            <div className="flex bg-[#1a1a1a] border-b border-white/5">
              <button className="flex-1 py-3 flex justify-center items-center gap-2 hover:bg-white/5 transition-colors border-r border-white/5 text-white/70 hover:text-[#00bfff]">
                <Phone className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Call</span>
              </button>
              <button className="flex-1 py-3 flex justify-center items-center gap-2 hover:bg-white/5 transition-colors border-r border-white/5 text-white/70 hover:text-[#00bfff]">
                <MessageSquare className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Text</span>
              </button>
              <button className="flex-1 py-3 flex justify-center items-center gap-2 hover:bg-white/5 transition-colors text-white/70 hover:text-[#00bfff]">
                <Calendar className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase tracking-widest">Book</span>
              </button>
            </div>

            {/* Chat History */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-[#111] to-[#0a0a0a]"
            >
              {prospect.messages.map((msg, index) => {
                const isAI = msg.direction === 'outbound';
                const showDate = index === 0 || formatDate(prospect.messages[index - 1].created_at) !== formatDate(msg.created_at);
                
                return (
                  <div key={msg.id} className="flex flex-col">
                    {showDate && (
                      <div className="flex justify-center mb-6 mt-2">
                        <span className="bg-white/5 px-3 py-1 rounded-full font-mono text-[9px] uppercase tracking-widest text-white/40">
                          {formatDate(msg.created_at)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex w-full ${isAI ? 'justify-start' : 'justify-end'} mb-4`}>
                      <div className={`max-w-[85%] flex flex-col ${isAI ? 'items-start' : 'items-end'}`}>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 mb-1 px-1">
                          {isAI ? 'Parrot AI' : 'Prospect'}
                        </span>
                        
                        <div 
                          className={`
                            px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap break-words
                            ${isAI 
                              ? 'bg-[#1a1a1a] border border-white/10 text-white/90 rounded-2xl rounded-tl-sm' 
                              : 'bg-gradient-to-br from-[#00bfff] to-[#0077ff] text-white rounded-2xl rounded-tr-sm shadow-lg shadow-[#00bfff]/20'
                            }
                          `}
                        >
                          {msg.body}
                        </div>
                        
                        <span className="text-[9px] font-mono text-white/30 mt-1 px-1">
                          {formatTime(msg.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Takeover Input (Static for now) */}
            <div className="p-4 border-t border-white/10 bg-[#151515]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Take over conversation..."
                  className="w-full bg-[#111] border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-[#00bfff] transition-colors"
                  disabled
                />
                <button 
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#00bfff] flex items-center justify-center opacity-50 cursor-not-allowed"
                >
                  <svg className="w-4 h-4 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="text-center font-mono text-[9px] text-white/30 mt-3 uppercase tracking-widest">
                Manual SMS replies coming soon
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
