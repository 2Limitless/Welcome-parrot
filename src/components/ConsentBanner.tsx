"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if they haven't dismissed it before
    const hasDismissed = localStorage.getItem("consentBannerDismissed");
    if (!hasDismissed) {
      // Delay it slightly for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem("consentBannerDismissed", "true");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:max-w-md bg-[#1a1a1a] border border-[#00bfff]/30 shadow-[0_0_30px_rgba(0,191,255,0.15)] p-6 z-[200] flex flex-col gap-4"
        >
          <div className="flex justify-between items-start gap-4">
            <h4 className="font-[family-name:var(--font-audiowide)] text-[#00bfff] text-sm uppercase tracking-widest">
              Welcome Parrot Sales & Support
            </h4>
            <button
              onClick={handleDismiss}
              className="text-white/50 hover:text-white transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <p className="font-mono text-xs text-white/80 leading-relaxed">
            Support: (502) 401-1305<br /><br />
            By calling or texting this number, you agree to receive text messages from Welcome Parrot. Reply STOP to opt out. Message & data rates may apply.
          </p>
          
          <div className="mt-2">
            <button 
              onClick={handleDismiss}
              className="w-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 text-white px-4 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors"
            >
              I Understand
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
