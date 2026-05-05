"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

type Step = "loading" | "form" | "success" | "error";

export default function NovaSenhaPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("loading");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    // Ouve eventos de auth (hash-based flow para recovery / SIGNED_IN)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setStep("form");
      }
    });

    // PKCE flow: convite de admin e recuperação moderna chegam com ?code=... na URL
    // Precisamos trocar o code por sessão antes do onAuthStateChange disparar
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      supabase.auth
        .exchangeCodeForSession(code)
        .then(({ error }) => {
          if (error) {
            setStep("error");
          }
          // Sucesso: onAuthStateChange vai disparar SIGNED_IN automaticamente
        });
    } else {
      // Hash-based fallback: verifica se já tem sessão ativa
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setStep("form");
      });

      // Timeout somente quando não tem code (sem code = sem PKCE = esperamos evento)
      const timeout = setTimeout(() => {
        setStep((prev) => (prev === "loading" ? "error" : prev));
      }, 5000);

      return () => {
        subscription.unsubscribe();
        clearTimeout(timeout);
      };
    }

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError("Erro ao atualizar a senha. O link pode ter expirado.");
      setLoading(false);
    } else {
      setStep("success");
      setTimeout(() => router.push("/area-do-cliente/dashboard"), 2500);
    }
  }

  return (
    <main className="relative min-h-screen bg-[#1A1A1A] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,97,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,97,0,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none"
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
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-preto-zbrand.png"
                alt="ZBRAND"
                width={180} height={54}
                className="h-12 w-auto"
                priority
              />
            </div>

            <AnimatePresence mode="wait">
              {/* LOADING */}
              {step === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4 py-8"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-10 h-10 border-4 border-[#FF6100]/20 border-t-[#FF6100] rounded-full"
                  />
                  <p className="text-sm font-bold text-[#1A1A1A]/40 uppercase tracking-widest">
                    Verificando link...
                  </p>
                </motion.div>
              )}

              {/* FORM */}
              {step === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center mb-6">
                    <h1 className="font-black text-[#1A1A1A] text-xl uppercase tracking-widest mb-1">
                      Nova Senha
                    </h1>
                    <p className="text-xs text-[#1A1A1A]/50">
                      Escolha uma senha segura com no mínimo 8 caracteres
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Nova senha */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                        Nova Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showPass ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          minLength={8}
                          className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 pr-12 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:border-[#FF6100] transition-colors bg-white"
                          style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
                          tabIndex={-1}
                        >
                          {showPass ? (
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
                      </div>
                      {/* Força da senha */}
                      {password.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className="h-1 flex-1 rounded-full transition-colors duration-300"
                              style={{
                                backgroundColor:
                                  password.length >= 12 ? "#AAFF00" :
                                  password.length >= 10 && i < 3 ? "#FF6100" :
                                  password.length >= 8 && i < 2 ? "#FBBC05" :
                                  i < 1 ? "#ef4444" : "#1A1A1A10"
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Confirmar senha */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
                        Confirmar Senha
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={confirm}
                          onChange={(e) => setConfirm(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 pr-12 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:border-[#FF6100] transition-colors bg-white"
                          style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirm ? (
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
                      </div>
                      {/* Match indicator */}
                      {confirm.length > 0 && (
                        <p className={`text-[11px] font-semibold mt-0.5 ${password === confirm ? "text-[#3a8a00]" : "text-red-500"}`}>
                          {password === confirm ? "✓ Senhas coincidem" : "✗ Senhas não coincidem"}
                        </p>
                      )}
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3"
                        >
                          <p className="text-xs font-bold text-red-600">⚠ {error}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ x: -2, y: -2 }}
                      whileTap={{ x: 1, y: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="w-full py-3.5 bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest border-2 border-[#1A1A1A] rounded-xl disabled:opacity-70"
                      style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
                    >
                      {loading ? "Salvando..." : "Salvar Nova Senha →"}
                    </motion.button>
                  </form>

                  <button
                    onClick={() => router.push("/area-do-cliente")}
                    className="w-full mt-4 text-[11px] font-semibold text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors uppercase tracking-wider"
                  >
                    ← Voltar ao login
                  </button>
                </motion.div>
              )}

              {/* SUCCESS */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-16 h-16 bg-[#AAFF00] border-2 border-[#1A1A1A] rounded-full flex items-center justify-center"
                    style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
                  >
                    <svg className="w-8 h-8 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <div>
                    <h2 className="font-black text-[#1A1A1A] text-lg uppercase tracking-widest">Senha atualizada!</h2>
                    <p className="text-xs text-[#1A1A1A]/50 mt-1">Redirecionando para o dashboard...</p>
                  </div>
                </motion.div>
              )}

              {/* ERROR */}
              {step === "error" && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="font-black text-[#1A1A1A] text-lg uppercase tracking-widest">Link inválido</h2>
                    <p className="text-xs text-[#1A1A1A]/50 mt-1">
                      Este link expirou ou já foi utilizado.<br />Solicite um novo link de recuperação.
                    </p>
                  </div>
                  <button
                    onClick={() => router.push("/area-do-cliente")}
                    className="mt-2 px-6 py-2.5 bg-[#FF6100] text-white font-black text-xs uppercase tracking-widest border-2 border-[#1A1A1A] rounded-xl"
                    style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                  >
                    Voltar ao login
                  </button>
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
