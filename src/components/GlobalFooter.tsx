"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GlobalFooter() {
  const pathname = usePathname();

  // Don't show the global footer on dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="w-full border-t border-white/20 py-8 px-6 lg:px-12 bg-[#111111] flex flex-col z-[100] relative mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between w-full">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">© 2026 Welcome Parrot. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/privacy" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-[#00bfff] transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="font-mono text-[10px] text-white/50 uppercase tracking-widest hover:text-[#00bfff] transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
