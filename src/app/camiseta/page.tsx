"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const services = [
  {
    icon: "📱",
    title: "Social Media",
    desc: "Conteúdo real, com o rosto do seu negócio. A gente filma, edita e publica. Você só precisa aparecer.",
    color: "#FF6100",
  },
  {
    icon: "🎯",
    title: "Tráfego Pago",
    desc: "Meta Ads e Google Ads que trazem cliente — não só curtida. Seu investimento vira resultado.",
    color: "#00C2FF",
  },
  {
    icon: "🎥",
    title: "Captação de Conteúdo",
    desc: "A gente vai até o seu restaurante gravar. Nada de banco de imagem. Conteúdo de verdade.",
    color: "#AAFF00",
  },
  {
    icon: "🌐",
    title: "Website & Landing Page",
    desc: "Site que vende, posiciona e converte. Feito pra aparecer no Google e encantar quem chega.",
    color: "#7B2FF7",
  },
  {
    icon: "📊",
    title: "Tráfego Orgânico",
    desc: "SEO e estratégia de conteúdo que colocam seu restaurante nas primeiras posições.",
    color: "#FBBC05",
  },
  {
    icon: "🤖",
    title: "Automação WhatsApp",
    desc: "Atendimento automático, confirmação de reservas e cardápio digital. Sem perder cliente por falta de resposta.",
    color: "#25D366",
  },
];

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const lines = ["FALEI QUE NÃO", "ERA PRA", "ESCANEAR"];

export default function CamisetaPage() {
  const [copied, setCopied]       = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [muted, setMuted]         = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsTap, setNeedsTap]   = useState(false);
  const loopCount = useRef(0); // controla quantas vezes o vídeo tocou
  const videoRef  = useRef<HTMLVideoElement>(null);
  const textTimer = useRef<ReturnType<typeof setTimeout>>();

  function startPlaying(v: HTMLVideoElement) {
    setIsPlaying(true);
    setNeedsTap(false);
    setMuted(v.muted);
    clearTimeout(textTimer.current);
    textTimer.current = setTimeout(() => setTextVisible(true), 5000);
  }

  useEffect(() => {
    const tryPlay = async () => {
      const v = videoRef.current;
      if (!v) return;
      // 1ª tentativa: com som
      v.muted = false;
      try {
        await v.play();
        startPlaying(v);
        return;
      } catch {}
      // 2ª tentativa: mudo (política do browser)
      v.muted = true;
      try {
        await v.play();
        startPlaying(v);
      } catch {
        // Completamente bloqueado → tap overlay
        setNeedsTap(true);
      }
    };
    tryPlay();
    return () => clearTimeout(textTimer.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ao fim de cada reprodução: na 2ª vez fica mudo e continua em loop
  function handleVideoEnded() {
    const v = videoRef.current;
    if (!v) return;
    loopCount.current += 1;
    if (loopCount.current >= 1) {   // após a 1ª reprodução completa → mudo
      v.muted = true;
      setMuted(true);
    }
    v.play().catch(() => {});
  }

  // Tap overlay: usuário já interagiu → pode ligar som
  async function handleTap() {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;             // tenta com som (usuário tocou na tela)
    try {
      await v.play();
    } catch {
      v.muted = true;
      await v.play().catch(() => {});
    }
    startPlaying(v);
  }

  function handleVideoPlay() {
    if (!isPlaying) startPlaying(videoRef.current!);
  }

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  function copyUrl() {
    navigator.clipboard.writeText("zbrand.com.br");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-[#1A1A1A] min-h-screen font-display overflow-x-hidden">

      {/* ── VÍDEO HERO ── */}
      <section className="relative h-screen w-full overflow-hidden">

        {/* Container centraliza o vídeo — mobile: cover | desktop: proporção natural */}
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <video
            ref={videoRef}
            onPlay={handleVideoPlay}
            onEnded={handleVideoEnded}
            className="h-full w-full object-cover md:w-auto md:object-contain"
            src="/images/video_hero_pag_camseta_mobile.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

        {/* ── TAP OVERLAY — aparece quando autoplay é bloqueado ── */}
        {needsTap && (
          <button
            onClick={handleTap}
            className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 cursor-pointer"
            style={{ background: "rgba(0,0,0,0.72)" }}
          >
            {/* Anel pulsante + ícone play */}
            <div className="relative flex items-center justify-center">
              {/* Anel externo pulsante */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute w-28 h-28 rounded-full border-2 border-[#FF6100]"
              />
              {/* Anel médio */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.3, ease: "easeInOut" }}
                className="absolute w-20 h-20 rounded-full border-2 border-[#FF6100]"
              />
              {/* Botão central */}
              <div className="w-16 h-16 rounded-full bg-[#FF6100] border-2 border-white/20 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Texto */}
            <div className="flex flex-col items-center gap-1">
              <span className="font-black uppercase tracking-[0.2em] text-white text-sm">
                Toque para assistir
              </span>
              <span className="text-white/40 text-xs font-medium">
                A zebra te espera 🦓
              </span>
            </div>
          </button>
        )}

        {/* ── GRUPO: Texto + Badge + Scroll — posicionado no fundo ── */}
        <div className="absolute inset-x-0 bottom-10 flex flex-col items-center px-5" style={{ gap: 10 }}>

          {/* Texto — sobe de baixo em todos os dispositivos */}
          <div className="flex flex-col items-center text-center">
            {lines.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={textVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.18, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-black uppercase leading-none tracking-tight
                    text-4xl sm:text-5xl md:text-7xl lg:text-8xl
                    ${line === "ESCANEAR" ? "text-[#FF6100]" : "text-white"}`}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </div>

          {/* Badge "ANÚNCIO OFFLINE ATIVADO" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={textVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 bg-[#FF6100]/20 border border-[#FF6100]/50 backdrop-blur-sm rounded-full px-5 py-2"
          >
            <span className="text-base">🦓</span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6100]">
              Anúncio Offline Ativado
            </span>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={textVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Role pra baixo
            </span>
            <motion.div
              animate={{ y: [0, 7, 0] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className="w-9 h-9 rounded-full border-2 border-white/25 flex items-center justify-center text-white/50 text-base"
            >
              ↓
            </motion.div>
          </motion.div>
        </div>

        {/* Botão de som — canto superior direito */}
        {isPlaying && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            onClick={toggleMute}
            className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white/70 hover:text-white hover:border-white/40 transition-all"
          >
            {muted ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest">Som</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-[#FF6100]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                </svg>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">Mudo</span>
              </>
            )}
          </motion.button>
        )}
      </section>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-5 py-20 overflow-hidden">
        {/* Zebra texture bg */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/zebra-texture-white.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px",
          }}
        />
        {/* Orange glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#FF6100]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-sm mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Image
              src="/images/logo-zbrand.png"
              alt="ZBRAND"
              width={140}
              height={42}
              className="mx-auto h-10 w-auto"
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-[#FF6100]/15 border border-[#FF6100]/30 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-base">🦓</span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6100]">
              Anúncio offline ativado
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
            className="font-black text-4xl sm:text-5xl text-white uppercase tracking-tight leading-[1.05] mb-5"
          >
            Você realmente{" "}
            <span className="text-[#FF6100]">escaneou</span>{" "}
            o QR Code?!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.55 }}
            className="text-white/50 text-sm leading-relaxed mb-3 font-medium"
          >
            Calma. Isso não é vírus. É marketing.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.55 }}
            className="text-white/40 text-sm leading-relaxed mb-10"
          >
            Bem-vindo à ZBRAND — a agência de marketing feita pra quem vive de alimentar pessoas.
            Sem mimimi, sem enrolação, com resultado.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            href={getWhatsAppLink("geral")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl"
            style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero conversar agora
          </motion.a>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Role pra baixo</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-white/20 text-lg"
            >↓</motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── O QUE ACABOU DE ACONTECER ── */}
      <section className="bg-[#FF6100] py-16 px-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "url('/images/zebra-texture-white.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px",
          }}
        />
        <div className="max-w-sm mx-auto text-center relative z-10">
          <FadeUp>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 mb-3">
              Entenda o que rolou
            </p>
            <h2 className="font-black text-3xl text-white uppercase leading-tight mb-4">
              Você acabou de ser impactado por um anúncio offline.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              A ZBRAND faz as pessoas pararem, sorrirem e lembrarem da sua marca —
              seja com um QR Code numa camiseta, um post, um reel ou um anúncio no feed.
              Isso é marketing que funciona no mundo real, do jeito que acreditamos.
            </p>
            <div className="bg-white/15 border border-white/25 rounded-2xl px-5 py-4 text-center">
              <p className="text-white font-black text-sm">
                🎯 Sim, até a textura da zebra na camiseta foi proposital.
              </p>
              <p className="text-white/70 text-xs mt-1">
                Cada detalhe comunica. Bem-vindo à nossa estratégia.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POR QUE A ZEBRA ── */}
      <section className="bg-[#111] py-16 px-5">
        <div className="max-w-sm mx-auto text-center">
          <FadeUp>
            <div className="w-20 h-20 rounded-2xl border-2 border-white/10 flex items-center justify-center text-4xl mx-auto mb-6 bg-white/03">
              🦓
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
              Por que a zebra?
            </p>
            <h2 className="font-black text-2xl text-white uppercase leading-tight mb-5">
              Porque zebra não depende da sorte.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              A vida é cheia de zebras — mas no seu marketing, a gente garante{" "}
              <strong className="text-white">resultado previsível.</strong>{" "}
              A zebra é nosso símbolo contra o improvável.{" "}
              <strong className="text-white">Contra o &ldquo;azar&rdquo;.</strong>{" "}
              Com a ZBRAND, sua marca para de depender da sorte e começa a{" "}
              <strong className="text-[#FF6100]">gerar clientes de verdade.</strong>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── SERVIÇOS ── */}
      <section className="bg-[#1A1A1A] py-16 px-5">
        <div className="max-w-sm mx-auto">
          <FadeUp>
            <div className="text-center mb-10">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
                O que a gente faz (e faz bem)
              </p>
              <h2 className="font-black text-2xl text-white uppercase leading-tight">
                Tudo que seu restaurante precisa pra crescer online
              </h2>
            </div>
          </FadeUp>

          <div className="flex flex-col gap-3">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <div
                  className="bg-[#111] border-2 border-white/08 rounded-2xl p-5 flex items-start gap-4"
                  style={{ borderLeftColor: s.color, borderLeftWidth: 3 }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `${s.color}15` }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-white uppercase tracking-tight mb-1"
                      style={{ color: s.color }}>
                      {s.title}
                    </h3>
                    <p className="text-white/45 text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROVA SOCIAL ── */}
      <section className="bg-[#FF6100] py-14 px-5">
        <div className="max-w-sm mx-auto text-center">
          <FadeUp>
            <p className="font-black text-4xl text-white mb-2">+50</p>
            <p className="text-white/70 text-sm font-medium mb-8">restaurantes já cresceram com a ZBRAND</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { n: "+320%", label: "mais seguidores" },
                { n: "3×", label: "mais leads" },
                { n: "4 meses", label: "pra ver resultado" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/15 rounded-2xl p-3 text-center">
                  <p className="font-black text-xl text-white">{stat.n}</p>
                  <p className="text-white/60 text-[10px] font-medium leading-tight mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-[#1A1A1A] py-20 px-5 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "url('/images/zebra-texture-white.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "280px",
          }}
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#FF6100]/15 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-sm mx-auto text-center relative z-10">
          <FadeUp>
            <span className="text-5xl block mb-6">🦓</span>
            <h2 className="font-black text-3xl text-white uppercase leading-tight mb-3">
              Bora tirar a zebra do seu marketing?
            </h2>
            <p className="text-white/40 text-sm leading-relaxed mb-8">
              Sem compromisso. Sem papo de vendedor. Só uma conversa honesta sobre
              como a gente pode transformar o digital do seu restaurante.
            </p>

            <a
              href={getWhatsAppLink("geral")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black uppercase tracking-widest text-sm py-4 rounded-2xl mb-4"
              style={{ boxShadow: "4px 4px 0px 0px rgba(255,97,0,0.4)" }}
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Me chama no WhatsApp
            </a>

            <Link
              href="/"
              className="flex items-center justify-center w-full bg-transparent border-2 border-white/10 text-white/40 font-black uppercase tracking-widest text-xs py-3.5 rounded-2xl hover:border-white/20 hover:text-white/60 transition-all"
            >
              Conhecer o site completo →
            </Link>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-white/06">
              <a
                href="https://instagram.com/zbrand.mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @zbrand.mkt
              </a>
              <span className="text-white/10">·</span>
              <button
                onClick={copyUrl}
                className="flex items-center gap-1.5 text-white/25 hover:text-white/60 transition-colors text-xs font-medium"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                {copied ? "Copiado! ✓" : "zbrand.com.br"}
              </button>
            </div>

            <p className="text-white/15 text-[10px] font-medium mt-6">
              ZBRAND CONSULTORIA EM PUBLICIDADE LTDA · CNPJ 63.534.147/0001-81
            </p>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
