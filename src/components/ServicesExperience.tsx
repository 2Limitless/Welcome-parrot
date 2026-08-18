"use client";

import { motion } from "framer-motion";
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
        { title: "White-Label App", desc: "A flawless, frictionless mobile ordering app matching your exact branding." },
        { title: "Command Center KDS", desc: "Digital kitchen display screen to completely eliminate messy paper tickets." },
        { title: "Automated Loyalty", desc: "Built-in points and rewards system to automatically drive repeat visits." },
        { title: "First-Party Analytics", desc: "Full ownership of your customer data, order history, and sales trends." }
      ]
    },
    complete: {
      headerSubtitle: "Tier 2",
      headerTitle: "The Complete Package.",
      headerDesc: "Everything in Tier 1, PLUS our 'Done-For-You' white-glove launch.",
      cards: [
        { title: "App Store Publishing", desc: "We build your developer accounts, pass Apple/Google review, and configure Stripe routing." },
        { title: "Menu Merchandising", desc: "Zero data entry. We manually ingest your menu, crop photos, and program smart upsells." },
        { title: "Physical Hardware", desc: "We ship a plug & play 10\" Android tablet in kiosk mode with a heavy-duty counter mount." },
        { title: "Launch Marketing Kit", desc: "We print and ship acrylic QR table stands, storefront vinyls, and bag-stuffer loyalty cards." },
        { title: "Advanced SMS Campaigns", desc: "We configure instant SMS pickup alerts and automated win-back texts for lapsed customers." },
        { title: "Live In-Person Support", desc: "We provide 15-minute staff training and stand in your kitchen during your first major rush." }
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
        { title: "App Personalizada", desc: "Una app móvil de pedidos impecable y sin fricción con tu marca." },
        { title: "KDS Centro de Mando", desc: "Pantalla digital de cocina para eliminar los desordenados tickets de papel." },
        { title: "Lealtad Automatizada", desc: "Sistema de puntos y recompensas para impulsar visitas recurrentes." },
        { title: "Análisis de Datos Propios", desc: "Propiedad total de los datos de tus clientes e historial de pedidos." }
      ]
    },
    complete: {
      headerSubtitle: "Nivel 2",
      headerTitle: "El Paquete Completo.",
      headerDesc: "Todo en el Nivel 1, MÁS nuestro lanzamiento VIP 'Hecho por Ti'.",
      cards: [
        { title: "Publicación en App Store", desc: "Creamos tus cuentas de desarrollador, pasamos la revisión de Apple/Google y configuramos Stripe." },
        { title: "Optimización de Menú", desc: "Cero captura de datos. Ingresamos tu menú, recortamos fotos y programamos ventas sugeridas." },
        { title: "Hardware Físico", desc: "Enviamos una tableta Android de 10\" lista para usar con soporte comercial resistente." },
        { title: "Kit de Marketing", desc: "Imprimimos soportes acrílicos QR, vinilos para tiendas y tarjetas de lealtad para entregas." },
        { title: "Campañas SMS Avanzadas", desc: "Configuramos alertas SMS de recolección y mensajes para recuperar clientes inactivos." },
        { title: "Soporte VIP en Persona", desc: "Entrenamos a tu personal y estamos en tu cocina durante tu primer gran turno." }
      ]
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
      className="absolute inset-0 z-40 w-full h-full bg-[var(--color-ice)] p-6 md:p-12 overflow-y-auto overflow-x-hidden pointer-events-auto"
    >
      <div className="w-full max-w-7xl mx-auto pt-12 md:pt-0 pb-32">
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
          <div className="max-w-xs flex flex-col items-start gap-8">
            <p className="text-[var(--color-void)]/60 text-sm leading-relaxed">
              {t.desc}
            </p>
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex items-center gap-2 text-[var(--color-cobalt)] font-medium text-xs tracking-widest uppercase"
            >
              <ChevronDown className="w-4 h-4" /> {t.scrollCompare}
            </motion.div>
          </div>
        </header>

        {/* Tier 1 */}
        <div className="mb-8 md:mb-24">
          <div className="max-w-3xl mb-8 md:mb-12">
            <h4 className="text-[var(--color-void)]/50 text-xs tracking-[0.3em] uppercase mb-4 font-bold">{t.tier1.headerSubtitle}</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--color-void)] tracking-tight mb-4">
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
            className="flex md:grid md:grid-cols-2 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0"
          >
            {[MonitorSmartphone, LayoutDashboard, Gift, BarChart3].map((Icon, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="w-[85vw] shrink-0 md:w-auto md:shrink snap-center bg-white p-6 md:p-8 rounded-[1.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 border border-[var(--color-void)]/5 flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-ice)] flex items-center justify-center text-[var(--color-cobalt)] group-hover:bg-[var(--color-cobalt)] group-hover:text-white transition-colors duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-[var(--color-void)] mt-2 leading-tight">{t.tier1.cards[idx].title}</h4>
                <p className="text-[var(--color-void)]/60 text-sm leading-relaxed">{t.tier1.cards[idx].desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* The Complete Package Tier */}
        <div className="mt-4 md:mt-24 mb-32 bg-[var(--color-void)] rounded-[2rem] md:rounded-[4rem] p-6 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-acid)]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00ff66]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl mb-8 md:mb-16 relative z-10">
            <h4 className="text-[var(--color-acid)] text-xs tracking-[0.3em] uppercase mb-4 font-bold">{t.complete.headerSubtitle}</h4>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-white tracking-tight mb-4">
              {t.complete.headerTitle}
            </h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed">
              {t.complete.headerDesc}
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {[Smartphone, BookOpen, Tablet, Megaphone, MessageSquare, HeartHandshake].map((Icon, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="bg-white/[0.03] p-6 md:p-8 rounded-[1.5rem] hover:bg-white/[0.08] transition-all duration-500 border border-white/[0.05] flex flex-col gap-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--color-acid)]/10 flex items-center justify-center text-[var(--color-acid)] group-hover:bg-[var(--color-acid)] group-hover:text-black transition-colors duration-500">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-xl text-white mt-2 leading-tight">{t.complete.cards[idx].title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{t.complete.cards[idx].desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
