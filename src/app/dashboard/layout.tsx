"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  PhoneCall, 
  Settings, 
  CreditCard, 
  LogOut,
  TerminalSquare
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [userName, setUserName] = useState<string>("COMMANDER");

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.first_name || "COMMANDER");
      }
    };
    fetchUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Call Logs", href: "/dashboard/logs", icon: PhoneCall },
    { name: "AI Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-[#111111] text-[#f0f0f0] font-sans selection:bg-[#00bfff] selection:text-[#111111] flex overflow-hidden">
      {/* Background Noise */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] mix-blend-screen">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/10 bg-[#1a1a1a] flex flex-col relative z-20 hidden md:flex">
        <div className="p-8 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 group">
            <TerminalSquare className="w-5 h-5 text-[#00bfff] group-hover:scale-110 transition-transform" />
            <span className="font-[family-name:var(--font-audiowide)] font-black tracking-widest uppercase text-sm">
              Welcome Parrot.OS
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  isActive 
                    ? "bg-[#00bfff]/10 text-[#00bfff] border-l-2 border-[#00bfff]" 
                    : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full font-mono text-[10px] uppercase tracking-widest text-red-500/70 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            End Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative z-10 h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 bg-[#111111]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#00bfff] animate-pulse shadow-[0_0_10px_#00bfff]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#00bfff]">System Online</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
              User: <span className="text-white">{userName}</span>
            </span>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-8 md:p-12 pb-24 md:pb-12">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-[#1a1a1a] border-t border-white/10 z-50 flex justify-around items-center p-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? "text-[#00bfff]" 
                  : "text-white/40 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[8px] font-mono uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
