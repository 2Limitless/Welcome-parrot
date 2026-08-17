"use client";

import { motion } from "framer-motion";

export default function AboutExperience({ onBack }: { onBack: () => void }) {
  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-void)] flex flex-col md:flex-row items-center justify-center p-6 md:p-24 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl w-full my-auto flex flex-col-reverse md:flex-row items-center gap-12 pb-24 md:pb-0 pt-12 md:pt-0"
      >
        
        {/* Decorative Element */}
        <motion.div variants={itemVariants} className="flex w-full md:w-auto md:flex-[1.5] lg:flex-[2] relative h-auto justify-center items-center">
          <img 
            src="/restaurant_comparison.jpg" 
            alt="Restaurant Comparison" 
            className="w-full h-auto object-contain rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.5)] border border-[var(--color-acid)]/20" 
          />
        </motion.div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.button 
            variants={itemVariants}
            onClick={onBack}
            className="text-[var(--color-ice)]/50 text-xs tracking-[0.3em] uppercase mb-12 hover:text-[var(--color-acid)] transition-colors flex items-center gap-4 group w-max"
          >
            <span className="w-8 h-[1px] bg-[var(--color-ice)]/50 group-hover:w-12 group-hover:bg-[var(--color-acid)] transition-all" /> 
            Back to Hub
          </motion.button>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[var(--color-ice)] mb-8 leading-tight">
            Book a meeting to <br/>
            <span className="italic text-[var(--color-acid)] drop-shadow-[0_0_20px_rgba(204,255,0,0.2)]">Upgrade your business.</span>
          </motion.h2>

          <motion.p variants={itemVariants} className="text-[var(--color-ice)]/70 font-sans text-sm md:text-base font-light leading-relaxed mb-6">
            Stop renting your customers. It's time to own your digital real estate.
          </motion.p>
          <motion.p variants={itemVariants} className="text-[var(--color-ice)]/70 font-sans text-sm md:text-base font-light leading-relaxed mb-12">
            We build the exact enterprise-grade platform you need to automate loyalty, bypass third-party fees, and turn casual diners into lifelong regulars.
          </motion.p>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("Contact form opened")}
            className="bg-transparent border border-[var(--color-acid)]/30 text-[var(--color-acid)] hover:bg-[var(--color-acid)] hover:text-[var(--color-void)] px-8 py-4 rounded-full font-bold font-sans text-xs tracking-widest uppercase transition-all duration-500 w-max flex items-center gap-3 group shadow-[0_0_20px_rgba(204,255,0,0.1)]"
          >
            Claim Your Custom App Build
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
