"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "The ",
    titleHighlight: "Platform.",
    desc: "A complete ecosystem. We empower your kitchen operations while delivering a world-class experience to your customers.",
    b2b: {
      title1: "The Command Center",
      title2: "Restaurant Operations",
      desc: "Take complete control of your business. Our merchant dashboard and Kitchen Display Screen (KDS) eliminate paper tickets and chaos, giving you real-time analytics and 100% ownership of your customer data.",
      items: ['Real-time Kitchen Display Screen (KDS)', 'First-Party Data & Analytics', 'Menu & Inventory Management', 'Direct POS Integration']
    },
    b2c: {
      title1: "The Native App",
      title2: "Customer Experience",
      desc: "Turn casual diners into weekly regulars. We build you a custom, white-labeled mobile app that makes ordering completely frictionless, complete with automated rewards and direct push notifications.",
      items: ['White-Labeled iOS & Android App', 'Frictionless Mobile Ordering', 'Automated Loyalty & Rewards', 'Direct Push Notifications']
    }
  },
  es: {
    back: "Volver al Inicio",
    title: "La ",
    titleHighlight: "Plataforma.",
    desc: "Un ecosistema completo. Potenciamos las operaciones de tu cocina mientras brindamos una experiencia de primer nivel a tus clientes.",
    b2b: {
      title1: "El Centro de Mando",
      title2: "Operaciones del Restaurante",
      desc: "Toma el control total de tu negocio. Nuestro panel y Pantalla de Cocina (KDS) eliminan los tickets de papel y el caos, ofreciéndote análisis en tiempo real y propiedad del 100% de los datos de tus clientes.",
      items: ['Pantalla de Cocina en Tiempo Real (KDS)', 'Datos y Análisis Propios', 'Gestión de Menú e Inventario', 'Integración Directa con POS']
    },
    b2c: {
      title1: "La App Nativa",
      title2: "Experiencia del Cliente",
      desc: "Convierte a comensales en clientes habituales. Construimos una app móvil personalizada que hace los pedidos sin fricción, con recompensas automatizadas y notificaciones directas.",
      items: ['App iOS y Android Personalizada', 'Pedidos Móviles Rápidos', 'Lealtad y Recompensas', 'Notificaciones Push Directas']
    }
  }
};

export default function ServicesExperience({ lang, onBack }: { lang: Language, onBack: () => void }) {
  const t = dict[lang];

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
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-ice)] flex flex-col p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full pt-12 md:pt-0">
        <header className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 border-b border-[var(--color-void)]/10 pb-8 gap-8">
          <div>
            <button 
              onClick={onBack}
              className="text-[var(--color-void)]/50 text-xs tracking-[0.3em] uppercase mb-8 hover:text-[var(--color-cobalt)] transition-colors flex items-center gap-4 group w-max font-bold"
            >
              <span className="w-8 h-[2px] bg-[var(--color-void)]/30 group-hover:w-16 group-hover:bg-[var(--color-cobalt)] transition-all duration-500" /> 
              {t.back}
            </button>
            <h2 className="text-5xl md:text-7xl font-serif font-light text-[var(--color-void)] tracking-tight">
              {t.title} <span className="italic text-[var(--color-cobalt)] font-medium">{t.titleHighlight}</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-[var(--color-void)]/60 text-sm leading-relaxed">
              {t.desc}
            </p>
          </div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-24"
        >
          {/* Capability 1: B2B */}
          <motion.div 
            variants={itemVariants}
            className="group relative flex flex-col bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 border border-[var(--color-void)]/5 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 text-[200px] font-sans font-bold text-[var(--color-void)]/[0.05] group-hover:text-[var(--color-cobalt)]/[0.15] transition-colors duration-700 pointer-events-none select-none leading-none">
              B2B
            </div>

            <h3 className="relative font-serif text-3xl md:text-4xl text-[var(--color-void)] mb-6 z-10">
              {t.b2b.title1} <br/><span className="text-xl md:text-2xl text-[var(--color-void)]/50 font-sans tracking-widest uppercase mt-2 block">{t.b2b.title2}</span>
            </h3>
            <p className="relative text-[var(--color-void)]/70 leading-relaxed mb-10 z-10 text-sm md:text-base">
              {t.b2b.desc}
            </p>
            
            <div className="relative space-y-4 mb-12 z-10 flex-1">
              {t.b2b.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-medium text-[var(--color-void)]/80 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-cobalt)]/50 group-hover/item:text-[var(--color-cobalt)] transition-colors" />
                  <span className="group-hover/item:translate-x-2 transition-transform duration-300">{item}</span>
                </div>
              ))}
            </div>


          </motion.div>

          {/* Capability 2: B2C */}
          <motion.div 
            variants={itemVariants}
            className="group relative flex flex-col bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.08)] transition-all duration-700 border border-[var(--color-void)]/5 overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 text-[200px] font-sans font-bold text-[var(--color-void)]/[0.05] group-hover:text-[var(--color-cobalt)]/[0.15] transition-colors duration-700 pointer-events-none select-none leading-none">
              B2C
            </div>

            <h3 className="relative font-serif text-3xl md:text-4xl text-[var(--color-void)] mb-6 z-10">
              {t.b2c.title1} <br/><span className="text-xl md:text-2xl text-[var(--color-void)]/50 font-sans tracking-widest uppercase mt-2 block">{t.b2c.title2}</span>
            </h3>
            <p className="relative text-[var(--color-void)]/70 leading-relaxed mb-10 z-10 text-sm md:text-base">
              {t.b2c.desc}
            </p>
            
            <div className="relative space-y-4 mb-12 z-10 flex-1">
              {t.b2c.items.map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-medium text-[var(--color-void)]/80 group/item">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-cobalt)]/50 group-hover/item:text-[var(--color-cobalt)] transition-colors" />
                  <span className="group-hover/item:translate-x-2 transition-transform duration-300">{item}</span>
                </div>
              ))}
            </div>


          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
}
