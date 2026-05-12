"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const AMBER = "#FBBC05";

type Message = {
  from: "bot" | "user";
  text: string;
  delay: number;
  isButtons?: boolean;
  buttons?: string[];
};

const flows: {
  id: string;
  label: string;
  icon: string;
  messages: Message[];
}[] = [
  {
    id: "agendamento",
    label: "Agendamento",
    icon: "📅",
    messages: [
      { from: "bot", text: "Oi Ana! Bem-vinda ao Studio Beleza ✨", delay: 300 },
      { from: "bot", text: "Como posso te ajudar?", delay: 900, isButtons: true, buttons: ["Agendar horário", "Tirar dúvida", "Promoção"] },
      { from: "user", text: "Agendar horário", delay: 1800 },
      { from: "bot", text: "Ótimo! Qual serviço você procura?", delay: 2500 },
      { from: "user", text: "Corte + escova", delay: 3300 },
      { from: "bot", text: "Temos horários disponíveis 👇", delay: 4000, isButtons: true, buttons: ["Ter 14h", "Qua 10h", "Sex 16h"] },
      { from: "user", text: "Qua 10h", delay: 4800 },
      { from: "bot", text: "Agendado! Quarta às 10h ✅ Até lá! 💇‍♀️", delay: 5400 },
    ],
  },
  {
    id: "orcamento",
    label: "Orçamento",
    icon: "💰",
    messages: [
      { from: "bot", text: "Oi! Vamos montar seu orçamento 💰", delay: 300 },
      { from: "bot", text: "Qual serviço você procura?", delay: 900 },
      { from: "user", text: "Pacote noiva completo", delay: 1700 },
      { from: "bot", text: "Qual a data do evento?", delay: 2400 },
      { from: "user", text: "15 de março", delay: 3200 },
      { from: "bot", text: "Perfeito! Orçamento enviado por aqui ✅", delay: 4000 },
      { from: "bot", text: "Nossa equipe entra em contato em até 2h 📋", delay: 4700 },
    ],
  },
  {
    id: "promocao",
    label: "Disparo",
    icon: "📣",
    messages: [
      { from: "bot", text: "🔥 SEXTA ESPECIAL no Studio Beleza!", delay: 300 },
      { from: "bot", text: "30% OFF em todos os serviços hoje até às 20h ✨", delay: 1000 },
      { from: "bot", text: "Clique abaixo e agende agora:", delay: 1700, isButtons: true, buttons: ["AGENDAR AGORA 📅"] },
      { from: "user", text: "Quero agendar!", delay: 2600 },
      { from: "bot", text: "Ótimo! Abrindo seu agendamento... 🎉", delay: 3400 },
      { from: "bot", text: "Qual serviço você procura?", delay: 4100 },
    ],
  },
];

function ChatBubble({ msg, visible }: { msg: Message; visible: boolean }) {
  if (!visible) return null;
  const isBot = msg.from === "bot";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-2`}
    >
      <div className="max-w-[85%]">
        {msg.isButtons && msg.buttons ? (
          <div className="flex flex-col gap-1.5 mt-1">
            {msg.buttons.map((btn) => (
              <div
                key={btn}
                className="px-3 py-1.5 rounded-lg border text-[11px] font-bold text-center cursor-default"
                style={{ borderColor: AMBER, color: AMBER, background: `${AMBER}15` }}
              >
                {btn}
              </div>
            ))}
          </div>
        ) : (
          <div
            className={[
              "px-3 py-2 rounded-2xl text-[12px] font-medium leading-snug",
              isBot
                ? "bg-white text-[#1A1A1A] rounded-tl-sm"
                : "text-white rounded-tr-sm",
            ].join(" ")}
            style={!isBot ? { background: AMBER, color: "#1A1A1A" } : {}}
          >
            {msg.text}
          </div>
        )}
        <p className={`text-[9px] mt-0.5 ${isBot ? "text-white/30 text-left" : "text-white/30 text-right"}`}>
          {isBot ? "🤖 Bot" : "você"} • agora
        </p>
      </div>
    </motion.div>
  );
}

function PhoneMockup({ flowId }: { flowId: string }) {
  const flow = flows.find((f) => f.id === flowId)!;
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    flow.messages.forEach((msg, i) => {
      const t = setTimeout(() => {
        setVisibleCount(i + 1);
      }, msg.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [flowId, flow.messages]);

  return (
    <div className="relative mx-auto w-[240px] sm:w-[260px]">
      {/* Phone frame */}
      <div
        className="relative rounded-[2rem] border-[3px] border-preto overflow-hidden"
        style={{ boxShadow: `6px 6px 0px 0px ${AMBER}` }}
      >
        {/* Status bar */}
        <div className="bg-[#075E54] px-4 py-2 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#128C7E] border-2 border-white/30 flex items-center justify-center text-xs">
            🦓
          </div>
          <div>
            <p className="text-white text-[10px] font-bold leading-none">Studio Beleza</p>
            <p className="text-white/60 text-[8px] mt-0.5">online agora</p>
          </div>
          <div className="ml-auto flex gap-1.5">
            <div className="w-1 h-1 rounded-full bg-green-400" />
          </div>
        </div>

        {/* Chat area */}
        <div
          className="h-[360px] overflow-y-auto px-3 pt-3 pb-4 flex flex-col justify-end"
          style={{ background: "#ECE5DD" }}
        >
          <AnimatePresence mode="wait">
            <div key={flowId}>
              {flow.messages.map((msg, i) => (
                <ChatBubble key={i} msg={msg} visible={i < visibleCount} />
              ))}
              {/* Typing indicator */}
              {visibleCount < flow.messages.length && visibleCount > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start mb-2"
                >
                  <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 flex gap-1 items-center">
                    {[0, 1, 2].map((d) => (
                      <motion.div
                        key={d}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: d * 0.15 }}
                        className="w-1.5 h-1.5 rounded-full bg-[#999]"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </AnimatePresence>
        </div>

        {/* Input bar */}
        <div className="bg-[#F0F0F0] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[10px] text-[#999]">
            Mensagem...
          </div>
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "#075E54" }}
          >
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Glow */}
      <div
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-10 rounded-full blur-2xl opacity-40"
        style={{ background: AMBER }}
      />
    </div>
  );
}

export function ZAutomaçaoBotPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFlow, setActiveFlow] = useState("agendamento");

  return (
    <section className="bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-10"
        style={{ background: AMBER }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: text + flow selectors */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
              style={{ color: AMBER }}
            >
              Bot em Ação
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight mb-4">
              Veja como o{" "}
              <span style={{ color: AMBER }}>bot funciona</span>{" "}
              na prática
            </h2>
            <p className="font-display text-sm text-white/50 mb-10 leading-relaxed">
              Escolha um fluxo e veja a conversa automática acontecendo em tempo real.
              É exatamente assim que seus clientes serão atendidos — 24h por dia, sem você precisar responder.
            </p>

            {/* Flow selector buttons */}
            <div className="flex flex-col gap-3">
              {flows.map((flow) => {
                const isActive = flow.id === activeFlow;
                return (
                  <motion.button
                    key={flow.id}
                    onClick={() => setActiveFlow(flow.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left transition-all duration-200"
                    style={{
                      borderColor: isActive ? AMBER : "rgba(255,255,255,0.1)",
                      background: isActive ? `${AMBER}15` : "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span className="text-2xl">{flow.icon}</span>
                    <div>
                      <p
                        className="font-display font-black text-sm uppercase tracking-tight"
                        style={{ color: isActive ? AMBER : "rgba(255,255,255,0.6)" }}
                      >
                        {flow.label === "Disparo" ? "Disparo em Massa" : `Fluxo de ${flow.label}`}
                      </p>
                      <p className="text-[10px] text-white/30 mt-0.5">
                        {flow.id === "agendamento" && "Atendimento e confirmação de horário"}
                        {flow.id === "orcamento" && "Solicitação automática de orçamento"}
                        {flow.id === "promocao" && "Promoção enviada para todos os contatos"}
                      </p>
                    </div>
                    {isActive && (
                      <div
                        className="ml-auto w-2 h-2 rounded-full shrink-0"
                        style={{ background: AMBER }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Note */}
            <p className="text-[11px] text-white/20 mt-6 leading-relaxed">
              * Conteúdo das mensagens personalizado para o seu negócio. O bot entende perguntas fora do script com IA generativa.
            </p>
          </motion.div>

          {/* Right: phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center"
          >
            <PhoneMockup flowId={activeFlow} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
