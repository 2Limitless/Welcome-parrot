"use client";

import { motion } from "framer-motion";
import { Database, Zap, Gift, MonitorSmartphone, TrendingUp, Bell } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "The ",
    titleHighlight: "No-Brainer.",
    desc: "Why leaving DoorDash for a direct first-party mobile app is the easiest decision you'll ever make.",
    profit: {
      market: "Marketplace Delivery",
      marketDesc1: "Take-home on a $25 order via DoorDash or UberEats.",
      marketDesc2: "Standard 30% Commission.",
      direct: "Direct App Orders",
      directDesc1: "Take-home on a $25 order via your own app.",
      directDesc2: "Standard Processing. You keep the revenue."
    },
    cards: [
      {
        title: "Build Your Digital Empire",
        desc: "Keep every email, phone number, and order history. Power your marketing and own your audience instead of renting it."
      },
      {
        title: "Line-Busting Speed",
        desc: "Turn massive lines into fast, frictionless throughput instantly."
      },
      {
        title: "Automated Loyalty",
        desc: "Digital points effortlessly turn casual diners into loyal regulars."
      },
      {
        title: "Kitchen Sync",
        desc: "Included KDS replaces messy paper tickets with clear, digital firing."
      },
      {
        title: "Command Attention",
        desc: "Instantly drive foot traffic on slow days with direct mobile alerts. Enjoy massive open rates compared to email marketing."
      },
      {
        title: "Upsize Every Order",
        desc: "Automated upselling drives up to 25% larger average tickets."
      }
    ]
  },
  es: {
    back: "Volver al Inicio",
    title: "La Decisión ",
    titleHighlight: "Obvia.",
    desc: "Por qué dejar las apps de terceros por una app móvil directa es la decisión más fácil que tomarás.",
    profit: {
      market: "Apps de Terceros",
      marketDesc1: "Ganancia de un pedido de $25 vía DoorDash o UberEats.",
      marketDesc2: "Comisión estándar del 30%.",
      direct: "Tu Propia App",
      directDesc1: "Ganancia de un pedido de $25 mediante tu propia app.",
      directDesc2: "Procesamiento estándar. Tú te quedas con las ganancias."
    },
    cards: [
      {
        title: "Construye tu Imperio Digital",
        desc: "Guarda cada correo, teléfono e historial de pedidos. Potencia tu marketing y sé dueño de tu audiencia en lugar de alquilarla."
      },
      {
        title: "Velocidad Ultra Rápida",
        desc: "Convierte filas masivas en un rendimiento rápido y sin fricción al instante."
      },
      {
        title: "Lealtad Automatizada",
        desc: "Los puntos digitales convierten sin esfuerzo a los comensales casuales en clientes habituales."
      },
      {
        title: "Sincronización de Cocina",
        desc: "El KDS incluido reemplaza los boletos de papel con pedidos digitales claros."
      },
      {
        title: "Llama la Atención",
        desc: "Atrae clientes en días lentos con alertas móviles directas. Disfruta de tasas de apertura masivas frente al correo."
      },
      {
        title: "Incrementa los Pedidos",
        desc: "Las ventas adicionales automáticas generan tickets en promedio 25% más altos."
      }
    ]
  }
};

export default function PortfolioExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-void)] flex flex-col p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full pt-12 md:pt-0">
        <header className="flex justify-between items-end mb-16 border-b border-[var(--color-glass-border)] pb-8">
          <div>
            <button 
              onClick={onBack}
              className="text-[var(--color-ice)]/60 text-xs tracking-[0.3em] uppercase mb-6 hover:text-[var(--color-acid)] transition-colors flex items-center gap-4 group w-max"
            >
              <span className="w-8 h-[1px] bg-[var(--color-ice)]/60 group-hover:w-12 group-hover:bg-[var(--color-acid)] transition-all" /> 
              {t.back}
            </button>
            <h2 className="text-4xl md:text-6xl font-serif font-light text-[var(--color-ice)]">
              {t.title} <span className="italic text-[var(--color-acid)]">{t.titleHighlight}</span>
            </h2>
          </div>
          <p className="hidden md:block text-[var(--color-ice)]/50 font-sans text-sm max-w-sm text-right leading-relaxed">
            {t.desc}
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-col gap-4 p-6 md:p-8 rounded-[1.5rem] border border-red-500/20 bg-red-950/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] tracking-widest uppercase text-red-500 font-bold">{t.profit.market}</h3>
            <div><span className="text-5xl md:text-6xl font-sans font-bold text-white tracking-tighter">$17.50</span></div>
            <p className="text-white/70 text-sm md:text-base font-medium">{t.profit.marketDesc1}</p>
            <div className="w-full h-[1px] bg-red-500/20 my-4" />
            <p className="text-red-400 text-sm font-semibold">{t.profit.marketDesc2}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="flex flex-col gap-4 p-6 md:p-8 rounded-[1.5rem] border border-[#00ff66]/20 bg-[#00ff66]/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#00ff66]/10 blur-[80px] rounded-full pointer-events-none" />
            <h3 className="font-sans text-[10px] tracking-widest uppercase text-[#00ff66] font-bold">{t.profit.direct}</h3>
            <div><span className="text-5xl md:text-6xl font-sans font-bold text-white tracking-tighter">$23.97</span></div>
            <p className="text-white/70 text-sm md:text-base font-medium">{t.profit.directDesc1}</p>
            <div className="w-full h-[1px] bg-[#00ff66]/20 my-4" />
            <p className="text-[#00ff66]/80 text-sm font-semibold">{t.profit.directDesc2}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className="md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[var(--color-acid)]/10 blur-[80px] rounded-full group-hover:bg-[var(--color-acid)]/20 transition-all duration-700" />
            <Database className="w-8 h-8 text-[var(--color-acid)] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-2xl mb-3">{t.cards[0].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[0].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <Zap className="w-8 h-8 text-[var(--color-ice)] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-xl mb-3">{t.cards[1].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[1].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }} className="md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <Gift className="w-8 h-8 text-[#00ff66] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-xl mb-3">{t.cards[2].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[2].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.5 }} className="md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <MonitorSmartphone className="w-8 h-8 text-[#00ff66] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-xl mb-3">{t.cards[3].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[3].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }} className="md:col-span-2 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#00ff66]/10 blur-[80px] rounded-full group-hover:bg-[#00ff66]/20 transition-all duration-700" />
            <Bell className="w-8 h-8 text-[#00ff66] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-2xl mb-3">{t.cards[4].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[4].desc}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.5 }} className="md:col-span-1 bg-[var(--color-ice)]/5 border border-[var(--color-ice)]/10 p-8 rounded-[2rem] hover:bg-[var(--color-ice)]/10 transition-colors group relative overflow-hidden flex flex-col justify-between min-h-[240px]">
            <TrendingUp className="w-8 h-8 text-[var(--color-ice)] mb-6 group-hover:-translate-y-1 transition-transform" />
            <div>
              <h4 className="text-[var(--color-ice)] font-serif text-xl mb-3">{t.cards[5].title}</h4>
              <p className="text-[var(--color-ice)]/60 text-sm leading-relaxed">{t.cards[5].desc}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
