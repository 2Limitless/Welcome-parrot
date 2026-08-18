"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone, BookOpen, MonitorSmartphone, Megaphone, MessageSquare, HeartHandshake, ChevronDown, LayoutDashboard, Gift, BarChart3, Tablet } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "The ",
    titleHighlight: "Platform.",
    desc: "A complete ecosystem. We empower your kitchen operations while delivering a world-class experience to your customers.",
    scrollCompare: "Compare Packages Below",
    tier1: {
      headerSubtitle: "Tier 1",
      headerTitle: "The Core Technology.",
      headerDesc: "The ultimate software stack to run your restaurant.",
      cards: [
        { title: "Custom App", desc: "Frictionless mobile ordering matching your exact branding." },
        { title: "Digital KDS", desc: "Eliminate paper tickets with a smart kitchen display." },
        { title: "Loyalty Engine", desc: "Automated points and rewards to drive repeat visits." },
        { title: "Live Analytics", desc: "100% ownership of your customer data and sales trends." }
      ]
    },
    complete: {
      headerSubtitle: "Tier 2",
      headerTitle: "The Complete Package.",
      headerDesc: "Everything in Tier 1, PLUS our 'Done-For-You' white-glove launch.",
      cards: [
        { title: "Store Publishing", desc: "We handle developer accounts, Apple/Google approval, and Stripe." },
        { title: "Menu Merchandising", desc: "We manually build your menu and program smart upsells." },
        { title: "Physical Hardware", desc: "Pre-configured 10\" Android tablet with a heavy-duty mount." },
        { title: "Marketing Kit", desc: "Printed QR table stands, vinyls, and physical loyalty cards." },
        { title: "SMS Campaigns", desc: "Automated pickup alerts and win-back texts for lapsed diners." },
        { title: "In-Person Support", desc: "On-site staff training and live coverage during your first rush." }
      ]
    }
  },
  es: {
    back: "Volver al Inicio",
    title: "La ",
    titleHighlight: "Plataforma.",
    desc: "Un ecosistema completo. Potenciamos las operaciones de tu cocina mientras brindamos una experiencia de primer nivel a tus clientes.",
    scrollCompare: "Compara Paquetes Abajo",
    tier1: {
      headerSubtitle: "Nivel 1",
      headerTitle: "Tecnología Principal.",
      headerDesc: "El software definitivo para operar tu restaurante.",
      cards: [
        { title: "App Personalizada", desc: "Pedidos móviles rápidos y sin fricción, con tu propia marca." },
        { title: "KDS Digital", desc: "Elimina los tickets de papel con una pantalla de cocina inteligente." },
        { title: "Motor de Lealtad", desc: "Puntos y recompensas automáticas para visitas recurrentes." },
        { title: "Análisis en Vivo", desc: "Propiedad del 100% de los datos de tus clientes y tendencias." }
      ]
    },
    complete: {
      headerSubtitle: "Nivel 2",
      headerTitle: "El Paquete Completo.",
      headerDesc: "Todo en el Nivel 1, MÁS nuestro lanzamiento VIP 'Hecho por Ti'.",
      cards: [
        { title: "Publicación en Tiendas", desc: "Manejamos cuentas, aprobación de Apple/Google y pagos." },
        { title: "Menú y Ventas", desc: "Construimos tu menú y programamos sugerencias de ventas." },
        { title: "Hardware Físico", desc: "Tableta de 10\" configurada con soporte de uso rudo." },
        { title: "Kit de Marketing", desc: "Soportes acrílicos QR, vinilos y tarjetas físicas impresas." },
        { title: "Campañas por SMS", desc: "Alertas automáticas y textos para recuperar clientes perdidos." },
        { title: "Soporte en Persona", desc: "Entrenamiento local y apoyo durante tu primer gran turno." }
      ]
    }
  }
};

export default function ServicesExperience({ lang, onBack, onThemeChange }: { lang: Language, onBack: () => void, onThemeChange?: (theme: "dark" | "light") => void }) {
  const t = dict[lang];
  const [activeTier, setActiveTier] = useState<"tier1" | "complete">("complete");

  const handleTierChange = (tier: "tier1" | "complete") => {
    setActiveTier(tier);
    if (onThemeChange) {
      onThemeChange(tier === "tier1" ? "light" : "dark");
    }
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: "10%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute inset-0 z-40 w-full h-full transition-colors duration-700 p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto ${activeTier === "tier1" ? "bg-[var(--color-ice)]" : "bg-[var(--color-void)]"}`}
    >
      <div className="w-full max-w-7xl mx-auto pt-12 md:pt-0 pb-32 relative z-10">
        
        {/* Decorative Glows for Complete Package */}
        <AnimatePresence>
          {activeTier === "complete" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none -z-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--color-acid)]/5 blur-[120px] rounded-full" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00ff66]/5 blur-[120px] rounded-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <header className={`flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b pb-8 gap-8 transition-colors duration-700 ${activeTier === "tier1" ? "border-[var(--color-void)]/10" : "border-white/10"}`}>
          <div>
            <button 
              onClick={onBack}
              className={`text-xs tracking-[0.3em] uppercase mb-6 transition-colors flex items-center gap-4 group w-max ${activeTier === "tier1" ? "text-[var(--color-void)]/60 hover:text-[var(--color-cobalt)]" : "text-white/60 hover:text-[var(--color-acid)]"}`}
            >
              <span className={`w-8 h-[2px] transition-all duration-500 group-hover:w-16 ${activeTier === "tier1" ? "bg-[var(--color-void)]/30 group-hover:bg-[var(--color-cobalt)]" : "bg-white/30 group-hover:bg-[var(--color-acid)]"}`} /> 
              {t.back}
            </button>
            <h2 className={`text-4xl md:text-6xl font-serif font-light transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-void)]" : "text-white"}`}>
              {t.title} <span className={`italic transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-cobalt)]" : "text-[var(--color-acid)]"}`}>{t.titleHighlight}</span>
            </h2>
          </div>
          <p className={`font-sans text-sm max-w-sm md:text-right leading-relaxed transition-colors duration-700 ${activeTier === "tier1" ? "text-[var(--color-void)]/50" : "text-white/50"}`}>
            {t.desc}
          </p>
        </header>

        {/* The Toggle Switch */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className={`p-1.5 rounded-full flex gap-1 relative transition-colors duration-700 ${activeTier === "tier1" ? "bg-[var(--color-void)]/5 border border-[var(--color-void)]/10" : "bg-white/5 border border-white/10"}`}>
            <button
              onClick={() => handleTierChange("tier1")}
              className={`relative px-6 md:px-10 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500 z-10 ${activeTier === "tier1" ? "text-white" : "text-white/50 hover:text-white"}`}
            >
              {activeTier === "tier1" && (
                <motion.div layoutId="tier-toggle" className="absolute inset-0 bg-[var(--color-void)] rounded-full -z-10 shadow-lg" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              {t.tier1.headerSubtitle}
            </button>
            <button
              onClick={() => handleTierChange("complete")}
              className={`relative px-6 md:px-10 py-3 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-colors duration-500 z-10 ${activeTier === "complete" ? "text-black" : "text-[var(--color-void)]/50 hover:text-[var(--color-void)]"}`}
            >
              {activeTier === "complete" && (
                <motion.div layoutId="tier-toggle" className="absolute inset-0 bg-[var(--color-acid)] rounded-full -z-10 shadow-[0_0_20px_rgba(204,255,0,0.4)]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
              )}
              {t.complete.headerSubtitle}
            </button>
          </div>
        </div>

             {/* Dynamic Content Area */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTier === "tier1" ? (
              <motion.div 
                key="tier1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="max-w-3xl mb-8 md:mb-12 mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-light text-[var(--color-void)] tracking-tight mb-4">
                    {t.tier1.headerTitle}
                  </h2>
                  <p className="text-[var(--color-void)]/60 text-base md:text-lg leading-relaxed">
                    {t.tier1.headerDesc}
                  </p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 gap-3 md:gap-6"
                >
                  {[MonitorSmartphone, LayoutDashboard, Gift, BarChart3].map((Icon, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="bg-white p-4 md:p-8 rounded-[1rem] md:rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-[var(--color-void)]/5 flex flex-col gap-2 md:gap-4 group"
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-ice)] flex items-center justify-center text-[var(--color-cobalt)] group-hover:bg-[var(--color-cobalt)] group-hover:text-white transition-colors duration-500">
                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h4 className="font-serif text-base md:text-xl text-[var(--color-void)] mt-1 md:mt-2 leading-tight">{t.tier1.cards[idx].title}</h4>
                      <p className="text-[var(--color-void)]/60 text-xs md:text-sm leading-relaxed">{t.tier1.cards[idx].desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="complete"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <div className="max-w-3xl mb-8 md:mb-12 mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-serif font-light text-white tracking-tight mb-4">
                    {t.complete.headerTitle}
                  </h2>
                  <p className="text-white/60 text-base md:text-lg leading-relaxed">
                    {t.complete.headerDesc}
                  </p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6"
                >
                  {[Smartphone, BookOpen, Tablet, Megaphone, MessageSquare, HeartHandshake].map((Icon, idx) => (
                    <motion.div 
                      key={idx}
                      variants={itemVariants}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 p-4 md:p-8 rounded-[1rem] md:rounded-[1.5rem] transition-all duration-500 flex flex-col gap-2 md:gap-4 group"
                    >
                      <div className="w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-[var(--color-acid)]/10 flex items-center justify-center text-[var(--color-acid)] group-hover:bg-[var(--color-acid)] group-hover:text-black transition-colors duration-500">
                        <Icon className="w-4 h-4 md:w-6 md:h-6" />
                      </div>
                      <h4 className="font-serif text-base md:text-xl text-white mt-1 md:mt-2 leading-tight">{t.complete.cards[idx].title}</h4>
                      <p className="text-white/50 text-xs md:text-sm leading-relaxed">{t.complete.cards[idx].desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
