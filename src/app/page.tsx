"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowUp } from "lucide-react";
import PortfolioExperience from "../components/PortfolioExperience";
import ServicesExperience from "../components/ServicesExperience";
import AboutExperience from "../components/AboutExperience";

export type ViewState = "hub" | "portfolio" | "services" | "about";

// Re-implementing the missing OverlayWrapper that was accidentally deleted
const OverlayWrapper = ({ children, onClose }: { children: React.ReactNode, onClose: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: "100%" }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: "100%" }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="fixed inset-0 z-[200] bg-black overflow-y-auto pointer-events-auto"
  >
    <button 
      onClick={onClose}
      className="absolute top-8 right-8 md:top-12 md:right-12 z-50 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition-colors"
    >
      <X size={24} />
    </button>
    {children}
  </motion.div>
);

export default function Home() {
  const [currentView, setCurrentView] = useState<ViewState>("hub");

  const handleNavClick = (view: ViewState) => {
    setCurrentView(view);
  };

  return (
    <main className="relative w-full min-h-screen overflow-x-hidden overflow-y-scroll bg-black flex flex-col">
      {/* Pure Apple Pro Black Background */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none" />
      
      {/* Subtle top light for an expensive studio feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50vh] bg-white opacity-[0.03] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Main Container */}
      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none">
        
        {/* Minimalist Apple-Style Header */}
        <header className="flex-none flex items-center justify-between px-8 py-8 md:px-16 md:py-10 pointer-events-auto">
          <div className="text-white font-sans text-xl font-bold tracking-tight">Welcome Parrot<span className="text-[#00ff66]">.</span></div>
          <nav className="hidden md:flex space-x-12">
            <button onClick={() => handleNavClick("portfolio")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">The No-Brainer</button>
            <button onClick={() => handleNavClick("services")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">The Platform</button>
            <button onClick={() => handleNavClick("about")} className="text-white/60 hover:text-white text-xs tracking-widest uppercase transition-colors">Book Demo</button>
          </nav>
          <button className="md:hidden text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </header>

        {/* View State Machine */}
        <div className="flex-1 flex flex-col relative pointer-events-auto">
          <AnimatePresence>
            
            {/* 1. THE HUB (Hero Section) */}
            {currentView === "hub" && (
                <motion.div 
                key="hub"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col w-full min-h-screen relative"
              >
                
                {/* Top: Massive Pro Typography */}
                <div className="flex-none w-full flex flex-col items-center justify-start pt-6 md:pt-12 px-4 z-20">
                  
                  {/* Glowing Feature Pills */}
                  <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {["Own Your Data", "Line-Busting KDS", "Automated Loyalty"].map((feature) => (
                      <span key={feature} className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/70 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Apple Metallic Gradient Typography */}
                  <h1 className="font-sans text-[12vw] md:text-[110px] leading-[0.9] text-center font-bold tracking-tighter bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent pb-4">
                    Own Your Customers.
                  </h1>
                  
                  <p className="text-white/60 font-sans text-sm md:text-base font-light max-w-xl text-center leading-relaxed mb-12">
                    The all-in-one direct mobile ordering, automated loyalty, and kitchen operations platform for food trucks and fast-casuals.
                  </p>

                  {/* Educational Statistics Bento - MOVED INTO INITIAL VIEWPORT */}
                  <div className="w-full max-w-5xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {/* Stat 1 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-white">25<span className="text-white/40 text-3xl">%</span></span>
                          <ArrowUp className="text-[#00ff66] w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]" strokeWidth={3} />
                        </div>
                        <h4 className="text-white text-sm font-bold mb-2 tracking-wide uppercase">Native App Upselling</h4>
                        <p className="text-white/50 text-xs leading-relaxed font-medium">
                          Native mobile apps drive 25% higher tickets through automated upselling and frictionless checkout.
                        </p>
                      </motion.div>

                      {/* Stat 2 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-white">35<span className="text-white/40 text-3xl">%</span></span>
                          <ArrowUp className="text-[#00ff66] w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]" strokeWidth={3} />
                        </div>
                        <h4 className="text-white text-sm font-bold mb-2 tracking-wide uppercase">Frictionless Loyalty</h4>
                        <p className="text-white/50 text-xs leading-relaxed font-medium">
                          Automated digital loyalty programs turn occasional diners into weekly regulars, driving 35% repeat visit rates.
                        </p>
                      </motion.div>

                      {/* Stat 3 */}
                      <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-2xl flex flex-col items-start text-left hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-4xl md:text-5xl font-bold font-sans tracking-tighter text-white">80<span className="text-white/40 text-3xl">%</span></span>
                          <ArrowUp className="text-[#00ff66] w-6 h-6 md:w-8 md:h-8 drop-shadow-[0_0_15px_rgba(0,255,102,0.6)]" strokeWidth={3} />
                        </div>
                        <h4 className="text-white text-sm font-bold mb-2 tracking-wide uppercase">Push Notifications</h4>
                        <p className="text-white/50 text-xs leading-relaxed font-medium">
                          Bypass the spam folder entirely. Direct push notifications command 80% open rates compared to 20% for email.
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-4 pointer-events-auto">
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("about")}
                      className="text-black bg-white shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] px-10 py-4 rounded-full font-bold transition-all duration-500 w-max text-xs md:text-sm tracking-[0.1em]"
                    >
                      Book a 10-Min Demo
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleNavClick("portfolio")}
                      className="text-white border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-bold transition-all duration-500 w-max text-xs md:text-sm tracking-[0.1em] flex items-center gap-2"
                    >
                      Why It's a No-Brainer <span className="text-[#00ff66] text-lg leading-none">&rarr;</span>
                    </motion.button>
                  </div>
                </div>

                {/* Bottom: The "Pro Display" Showcase Grid */}
                <div className="flex-none w-full flex items-center justify-center gap-6 md:gap-10 px-8 mt-12 z-10 pointer-events-none perspective-[1200px]">
                  
                  {/* Left Glass Panel */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                    className="w-[160px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50"
                  >
                    <img src="/mobile_app_mockup.jpg" alt="Mobile App UI" className="w-full h-full object-cover opacity-90" />
                  </motion.div>

                  {/* Center Glass Panel (Slightly larger, offset animation) */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="w-[180px] md:w-[260px] lg:w-[300px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/20 shadow-[0_60px_100px_rgba(0,0,0,0.8)] bg-black/50 z-20"
                  >
                    <img src="/kds_tablet_mockup.jpg" alt="KDS Tablet UI" className="w-full h-full object-cover" />
                  </motion.div>

                  {/* Right Glass Panel */}
                  <motion.div 
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
                    className="w-[160px] md:w-[220px] lg:w-[260px] aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] bg-black/50 hidden md:block"
                  >
                    <img src="/analytics_dashboard_panel.jpg" alt="Kitchen operations" className="w-full h-full object-cover opacity-90" />
                  </motion.div>

                </div>



              </motion.div>
            )}

            {/* 2. OVERLAYS */}
            {currentView === "portfolio" && (
              <OverlayWrapper key="portfolio" onClose={() => setCurrentView("hub")}>
                <PortfolioExperience onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}
            
            {currentView === "services" && (
              <OverlayWrapper key="services" onClose={() => setCurrentView("hub")}>
                <ServicesExperience onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}

            {currentView === "about" && (
              <OverlayWrapper key="about" onClose={() => setCurrentView("hub")}>
                <AboutExperience onBack={() => setCurrentView("hub")} />
              </OverlayWrapper>
            )}

          </AnimatePresence>
        </div>

        {/* Global Apple-Style Bottom Navigation Dock */}
        {(() => {
          const isLightMode = currentView === "services";
          return (
            <motion.nav
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className={`fixed bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 p-2 rounded-full backdrop-blur-xl z-[300] border shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-colors duration-500 ${
                isLightMode ? "bg-black/10 border-black/10" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-center gap-1 md:gap-2 pointer-events-auto">
                {[
                  { id: "hub", label: "Hub" },
                  { id: "portfolio", label: "The No-Brainer" },
                  { id: "services", label: "The Platform" },
                  { id: "about", label: "Book Demo" }
                ].map((item) => {
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id as ViewState)}
                      className={`relative px-5 md:px-8 py-3 rounded-full text-center transition-colors duration-500 ${
                        isActive
                          ? isLightMode ? "text-white" : "text-black"
                          : isLightMode ? "text-black/60 hover:text-black" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="liquid-nav-blob"
                          className={`absolute inset-0 rounded-full -z-10 shadow-lg ${isLightMode ? "bg-black" : "bg-white"}`}
                          transition={{ type: "spring", stiffness: 120, damping: 14, mass: 1.2 }}
                        />
                      )}
                      <span className="relative z-10 font-sans text-[10px] md:text-xs font-semibold tracking-[0.1em] uppercase">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.nav>
          );
        })()}

      </div>
    </main>
  );
}
