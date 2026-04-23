"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

const rotatingPhrases = [
  "Bem vindo de volta 🦓",
  "Seus resultados te esperam...",
  "Borá vender!!",
  "Vai dar Zbra hoje?",
];

function TextRotate({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % texts.length), 2800);
    return () => clearInterval(t);
  }, [texts.length]);
  return (
    <span className="inline-block overflow-hidden h-6 relative w-full text-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center text-sm text-[#FF6100] font-semibold tracking-wide"
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function AnimatedGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const size = 48;
      const offset = offsetRef.current % size;
      ctx.strokeStyle = "rgba(255,97,0,0.08)";
      ctx.lineWidth = 1;
      for (let x = -size + offset; x < width + size; x += size) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = -size + offset; y < height + size; y += size) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      offsetRef.current += 0.3;
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function AreaDoClientePage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(
        error.message.includes("Invalid login")
          ? "E-mail ou senha incorretos."
          : "Erro ao entrar. Tente novamente."
      );
      setLoading(false);
    } else {
      router.push("/area-do-cliente/dashboard");
      router.refresh();
    }
  }, [email, password, router]);

  const handleResetPassword = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/area-do-cliente/nova-senha`,
    });

    if (error) {
      setError("Erro ao enviar e-mail. Verifique o endereço.");
    } else {
      setResetSent(true);
    }
    setLoading(false);
  }, [email]);

  return (
    <main className="relative min-h-screen bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
      <AnimatedGrid />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)" }}
      />

      <motion.div
        animate={{ opacity: [0.25, 0.45, 0.25], scale: [1, 1.06, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-3xl pointer-events-none"
        style={{
          width: 420, height: 560,
          background: "radial-gradient(ellipse at center, rgba(255,97,0,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "6px 6px 0px 0px #FF6100" }}
        >
          <div className="px-8 pt-8 pb-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-6"
            >
              <Image
                src="/images/logo-preto-zbrand.png"
                alt="ZBRAND"
                width={180} height={54}
                className="h-12 w-auto"
                priority
              />
            </motion.div>

            <AnimatePresence mode="wait">
              {resetMode ? (
                /* ── RESET MODE ── */
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h1 className="font-black text-[#1A1A1A] text-xl uppercase tracking-widest mb-1">
                      Recuperar Senha
                    </h1>
                    <p className="text-xs text-[#1A1A1A]/50">
                      Vamos enviar um link para o seu e-mail
                    </p>
                  </div>

                  {resetSent ? (
                    <div className="bg-[#AAFF00]/20 border-2 border-[#5a8a00] rounded-xl p-4 text-center">
                      <p className="text-sm font-bold text-[#3a6a00]">✓ E-mail enviado!</p>
                      <p className="text-xs text-[#3a6a00]/70 mt-1">Verifique sua caixa de entrada.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:border-[#FF6100]"
                        style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                      />
                      {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest border-2 border-[#1A1A1A] rounded-xl disabled:opacity-70"
                        style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
                      >
                        {loading ? "Enviando..." : "Enviar Link →"}
                      </button>
                    </form>
                  )}

                  <button
                    onClick={() => { setResetMode(false); setResetSent(false); setError(null); }}
                    className="w-full mt-4 text-[11px] font-semibold text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors uppercase tracking-wider"
                  >
                    ← Voltar ao login
                  </button>
                </motion.div>
              ) : (
                /* ── LOGIN MODE ── */
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-1">
                    <h1 className="font-black text-[#1A1A1A] text-xl uppercase tracking-widest">
                      Área do Cliente
                    </h1>
                  </div>

                  <div className="mb-7">
                    <TextRotate texts={rotatingPhrases} />
                  </div>

                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                        E-mail
                      </label>
                      <motion.div
                        animate={emailFocused ? { x: -2, y: -2 } : { x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      >
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onFocus={() => setEmailFocused(true)}
                          onBlur={() => setEmailFocused(false)}
                          placeholder="seu@email.com"
                          required
                          className="w-full border-2 rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none transition-all duration-200 bg-white"
                          style={{
                            borderColor: emailFocused ? "#FF6100" : "#1A1A1A",
                            boxShadow: emailFocused ? "3px 3px 0px 0px #FF6100" : "3px 3px 0px 0px #1A1A1A",
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                        Senha
                      </label>
                      <motion.div
                        animate={passFocused ? { x: -2, y: -2 } : { x: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="relative"
                      >
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onFocus={() => setPassFocused(true)}
                          onBlur={() => setPassFocused(false)}
                          placeholder="••••••••"
                          required
                          className="w-full border-2 rounded-xl px-4 py-3 pr-12 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none transition-all duration-200 bg-white"
                          style={{
                            borderColor: passFocused ? "#FF6100" : "#1A1A1A",
                            boxShadow: passFocused ? "3px 3px 0px 0px #FF6100" : "3px 3px 0px 0px #1A1A1A",
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </motion.div>
                    </div>

                    {/* Error message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3"
                        >
                          <p className="text-xs font-bold text-red-600">⚠ {error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Forgot password */}
                    <div className="flex justify-end -mt-1">
                      <button
                        type="button"
                        onClick={() => { setResetMode(true); setError(null); }}
                        className="text-[11px] font-semibold text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors uppercase tracking-wider"
                      >
                        Esqueci minha senha
                      </button>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 1, y: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="relative w-full py-3.5 bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest border-2 border-[#1A1A1A] rounded-xl overflow-hidden mt-1 disabled:opacity-70"
                      style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
                    >
                      <AnimatePresence mode="wait">
                        {loading ? (
                          <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                            Entrando...
                          </motion.span>
                        ) : (
                          <motion.span key="enter" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            Entrar →
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-8 py-4 border-t-2 border-[#1A1A1A]/10 bg-[#1A1A1A]/[0.03]">
            <p className="text-center text-[10px] font-medium text-[#1A1A1A]/30 uppercase tracking-widest">
              Acesso exclusivo para clientes ZBRAND
            </p>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 left-6 opacity-20 pointer-events-none">
        <div className="w-16 h-16 border-2 border-[#FF6100] rounded-xl rotate-12" />
      </div>
      <div className="absolute top-8 right-8 opacity-15 pointer-events-none">
        <div className="w-10 h-10 border-2 border-[#FF6100] rounded-lg -rotate-6" />
      </div>
    </main>
  );
}
