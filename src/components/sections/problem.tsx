"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

function SpotlightCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const borderGradient = visible
    ? `radial-gradient(260px circle at ${pos.x}px ${pos.y}px, #FF6100 0%, #00C2FF 45%, #E5006D 75%, rgba(255,255,255,0.07) 100%)`
    : "rgba(255,255,255,0.07)";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="relative rounded-2xl p-px"
      style={{ background: borderGradient }}
    >
      {/* Outer glow */}
      <div
        className="pointer-events-none absolute rounded-2xl blur-xl"
        style={{
          inset: "-6px",
          zIndex: -1,
          opacity: visible ? 0.3 : 0,
          transition: "opacity 0.3s",
          background: `radial-gradient(200px circle at ${pos.x}px ${pos.y}px, #FF6100, #00C2FF 45%, #E5006D 75%, transparent)`,
        }}
      />
      {/* Inner card */}
      <div className={`relative overflow-hidden rounded-[calc(1rem-1px)] ${className ?? ""}`}>
        {/* Inner spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.3s",
            background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, rgba(255,97,0,0.07), transparent 60%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}

const problems = [
  {
    icon: "💬",
    title: "O orçamento chega no WhatsApp e se perde",
    desc: "\"Quanto fica pra dia 12, 100 pessoas?\" Você está no meio de um evento, responde horas depois e o cliente já fechou com outro.",
  },
  {
    icon: "📅",
    title: "Agenda cheia em alta, vazia no resto do ano",
    desc: "Casamento, 15 anos, festa junina, fim de ano… e depois os meses parados. Sem gerar demanda na data certa, o caixa vira montanha-russa.",
  },
  {
    image: "/images/não_sabe_de_onde_o_cliente_vem_icon.png",
    title: "Você depende de indicação",
    desc: "Cerimonialista e buffet indicam quando lembram. Sem canal próprio de pedidos, você não controla quantos orçamentos chegam no mês.",
  },
  {
    image: "/images/comida_e_boa_mas_icon.png",
    title: "Não tem site, ou o site não vende",
    desc: "O cliente pesquisa no Google antes de fechar. Sem uma página profissional com fotos, cardápio e botão de orçamento, ele vai pro concorrente.",
  },
  {
    image: "/images/grava_tudo_sozinho_icon.png",
    title: "Instagram parado porque você está no evento",
    desc: "Quem monta, opera e atende é você. No fim de semana não sobra tempo pra postar — e o perfil fica com cara de abandonado.",
  },
];

export function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative">
      {/* White → dark linear transition */}
      <div
        className="h-16 lg:h-20"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, #1A1A1A)" }}
      />

      {/* Lamp effect container */}
      <div className="relative bg-preto overflow-hidden">
        {/* Lamp effect */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>

          {/* Left beam — triangle from center-top spreading left+down */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 w-1/2"
            style={{
              height: "220px",
              background: "linear-gradient(to bottom, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
              clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%)",
            }}
          />

          {/* Right beam — triangle from center-top spreading right+down */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 right-0 w-1/2"
            style={{
              height: "220px",
              background: "linear-gradient(to bottom, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
              clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 100% 100%)",
            }}
          />

          {/* Glow ellipse below line */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              top: "0px",
              width: "600px",
              height: "140px",
              background: "radial-gradient(ellipse at 50% 0%, rgba(255,97,0,0.55) 0%, rgba(255,97,0,0.2) 40%, transparent 75%)",
            }}
          />

          {/* Neon line */}
          <motion.div
            initial={{ width: "8rem", opacity: 0 }}
            whileInView={{ width: "36rem", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: "2px",
              background: "linear-gradient(to right, transparent, #FF8C42, #FFFFFF, #FF8C42, transparent)",
              boxShadow: "0 0 10px 3px rgba(255,97,0,1), 0 0 30px 8px rgba(255,97,0,0.6), 0 0 70px 20px rgba(255,97,0,0.25)",
            }}
          />
        </div>

        {/* Content */}
        <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-section-title text-white uppercase tracking-tight">
              Você é ótimo no evento.{" "}
              <span className="text-laranja">O problema é fechar o orçamento.</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
            {problems.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                className={`md:col-span-2 ${i === 3 ? "md:col-start-2" : ""}`}
              >
                <SpotlightCard className="bg-preto-soft p-6 h-full">
                  <div className="mb-4">
                    {p.image ? (
                      <Image src={p.image} alt="" width={48} height={48} />
                    ) : (
                      <span className="text-4xl leading-none" aria-hidden>{p.icon}</span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-1.5 uppercase">
                    {p.title}
                  </h3>
                  <p className="font-display text-sm text-white/50 leading-relaxed">
                    {p.desc}
                  </p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-center font-display text-sm text-white/40 mt-8"
          >
            Se você se reconheceu em alguma dessas, a gente já viveu isso — e resolve.
          </motion.p>
        </div>
      </div>

    </section>
  );
}
