"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Smartphone, BookOpen, MonitorSmartphone, Megaphone, MessageSquare, HeartHandshake, ChevronDown } from "lucide-react";
import type { Language } from "../app/page";

const dict = {
  en: {
    back: "Back to Hub",
    title: "The ",
    titleHighlight: "Platform.",
    desc: "A complete ecosystem. We empower your kitchen operations while delivering a world-class experience to your customers.",
    scrollCompare: "Compare Packages Below",
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
    },
    complete: {
      headerSubtitle: "Tier 2",
      headerTitle: "The Complete Package.",
      headerDesc: "We do absolutely everything. You just cook the food.",
      cards: [
        { title: "App Store Publishing", desc: "Dedicated iOS & Android listings, custom branding, and direct Stripe payouts every 24 hours." },
        { title: "Digital Merchandising", desc: "Zero data entry. We manually build your menu, program smart upsell workflows, and optimize all food photography." },
        { title: "Kitchen Hardware", desc: "Plug & play 10\" Android tablet in kiosk mode, heavy-duty commercial counter mount, and failover Wi-Fi." },
        { title: "Launch & Marketing Kit", desc: "Acrylic QR table stands, weatherproof storefront vinyls, and 500 premium bag-stuffer loyalty cards." },
        { title: "Retention Engine", desc: "Instant SMS pickup alerts, automated win-back messaging for lapsed customers, and built-in loyalty points." },
        { title: "White-Glove Support", desc: "15-minute staff training and live, in-person shift coverage during your first major lunch or dinner rush." }
      ]
    }
  },
  es: {
    back: "Volver al Inicio",
    title: "La ",
    titleHighlight: "Plataforma.",
    desc: "Un ecosistema completo. Potenciamos las operaciones de tu cocina mientras brindamos una experiencia de primer nivel a tus clientes.",
    scrollCompare: "Compara Paquetes Abajo",
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
    },
    complete: {
      headerSubtitle: "Nivel 2",
      headerTitle: "El Paquete Completo.",
      headerDesc: "Hacemos absolutamente todo. Tú solo te encargas de cocinar.",
      cards: [
        { title: "Publicación en App Store", desc: "Listados dedicados en iOS y Android, diseño personalizado y pagos directos por Stripe cada 24 horas." },
        { title: "Optimización de Menú", desc: "Cero entrada de datos. Construimos tu menú, programamos ventas sugeridas y optimizamos fotos de comida." },
        { title: "Hardware de Cocina", desc: "Tableta Android de 10\" lista para usar, soporte comercial resistente y red Wi-Fi de respaldo." },
        { title: "Kit de Lanzamiento", desc: "Soportes acrílicos con QR, vinilos para la tienda y 500 tarjetas premium de lealtad para bolsas de entrega." },
        { title: "Motor de Retención", desc: "Alertas SMS de recolección, mensajes automáticos para recuperar clientes inactivos y puntos de lealtad integrados." },
        { title: "Soporte VIP", desc: "Entrenamiento de 15 minutos para el personal y cobertura en persona durante tu primer gran turno de servicio." }
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

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 pb-12 md:pb-24"
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

        {/* The Complete Package Tier */}
        <div className="mt-8 md:mt-24 mb-32 bg-[var(--color-void)] rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-acid)]/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00ff66]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="max-w-3xl mb-12 relative z-10">
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
            {[Smartphone, BookOpen, MonitorSmartphone, Megaphone, MessageSquare, HeartHandshake].map((Icon, idx) => (
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
