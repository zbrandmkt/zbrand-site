"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const diffs = [
  {
    icon: "📋",
    color: "#AAFF00",
    title: "Roteiro Pré-Montado",
    desc: "Chegamos com roteiro pronto baseado no seu negócio. Você não precisa inventar nada no dia — só executar. Nenhum tempo perdido.",
  },
  {
    icon: "🎥",
    color: "#FF6100",
    title: "Mobile ou Câmera Pro",
    desc: "Escolha o nível: celular com setup completo (lapela + iluminação) para social — ou câmera profissional para conteúdo institucional e corporativo.",
  },
  {
    icon: "🗓️",
    color: "#00C2FF",
    title: "10 Vídeos em 1 Dia",
    desc: "Uma sessão de 4h vira 10 vídeos editados. Mais conteúdo do que a maioria dos negócios produz em 2 meses — de uma vez só.",
  },
  {
    icon: "☁️",
    color: "#7B2FF7",
    title: "Tudo Organizado no Drive",
    desc: "Vídeos editados + banco de imagens (Mobile) ou fotos editadas (Pro) entregues em pasta Google Drive. Acesso direto pra você e sua equipe.",
  },
  {
    icon: "⚡",
    color: "#FF3D9A",
    title: "Entrega em 10 Dias",
    desc: "Gravou hoje. Em 10 dias úteis o conteúdo editado está no Drive, pronto para publicar no Instagram, TikTok, YouTube — onde você quiser.",
  },
];

function Card({ d, delay, inView }: { d: typeof diffs[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col gap-4"
      style={{ boxShadow: `5px 5px 0px 0px ${d.color}` }}
    >
      <div
        className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
        style={{ borderColor: d.color, background: `${d.color}18` }}
      >
        {d.icon}
      </div>
      <div>
        <h3
          className="font-display font-black text-base uppercase tracking-tight mb-2"
          style={{ color: d.color }}
        >
          {d.title}
        </h3>
        <p className="font-display text-sm text-cinza-dark leading-relaxed">
          {d.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function ZCaptacaoDiferenciais() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            Por que ZBRAND
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O que nos faz{" "}
            <span style={{ color: LIME }}>diferentes</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Não somos cinegrafistas de plantão. Somos estrategistas de conteúdo que filmam, editam
            e entendem do seu tipo de negócio.
          </p>
        </motion.div>

        {/* Cards — row 1: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Cards — row 2: 2 centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
