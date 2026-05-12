"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const passed = checks.filter(Boolean).length;
  const colors = ["#ef4444", "#FF6100", "#FBBC05", "#AAFF00"];
  const labels = ["Fraca", "Razoável", "Boa", "Forte"];

  if (!password) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i < passed ? colors[passed - 1] : "rgba(26,26,26,0.1)" }}
          />
        ))}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: colors[passed - 1] }}>
        {labels[passed - 1]}
      </p>
    </div>
  );
}

export default function PerfilPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const passwordsMatch = newPassword === confirmPassword;
  const canSubmit = currentPassword.length > 0 && newPassword.length >= 8 && passwordsMatch && !loading;

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    const supabase = createClient();

    // Verify current password by re-authenticating
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      setError("Erro ao identificar usuário.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

    if (signInError) {
      setError("Senha atual incorreta.");
      setLoading(false);
      return;
    }

    // Update to new password
    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError("Erro ao atualizar senha. Tente novamente.");
    } else {
      setSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  }

  const EyeIcon = ({ show, toggle }: { show: boolean; toggle: () => void }) => (
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
      tabIndex={-1}
    >
      {show ? (
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
  );

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-2xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-lg sm:text-2xl font-black text-[#1A1A1A] uppercase tracking-wider">
          Meu Perfil
        </h1>
        <p className="text-xs sm:text-sm text-[#1A1A1A]/50 mt-1">
          Gerencie sua conta e altere sua senha
        </p>
      </motion.div>

      {/* Password Change Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
        style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
      >
        <div className="px-4 sm:px-6 py-4 border-b-2 border-[#1A1A1A]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF6100] flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider">Alterar Senha</h2>
              <p className="text-[10px] text-[#1A1A1A]/40 mt-0.5">Defina uma nova senha para sua conta</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="px-4 sm:px-6 py-5 flex flex-col gap-5">
          {/* Current Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
              Senha Atual
            </label>
            <div className="relative">
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
                required
                className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 pr-12 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:border-[#FF6100] transition-colors"
                style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
              />
              <EyeIcon show={showCurrent} toggle={() => setShowCurrent(!showCurrent)} />
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                required
                minLength={8}
                className="w-full border-2 border-[#1A1A1A] rounded-xl px-4 py-3 pr-12 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:border-[#FF6100] transition-colors"
                style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
              />
              <EyeIcon show={showNew} toggle={() => setShowNew(!showNew)} />
            </div>
            <PasswordStrength password={newPassword} />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]/60">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repita a nova senha"
              required
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none transition-colors ${
                confirmPassword && !passwordsMatch
                  ? "border-red-400 focus:border-red-500"
                  : "border-[#1A1A1A] focus:border-[#FF6100]"
              }`}
              style={{ boxShadow: `3px 3px 0px 0px ${confirmPassword && !passwordsMatch ? "#ef4444" : "#1A1A1A"}` }}
            />
            {confirmPassword && !passwordsMatch && (
              <p className="text-[10px] font-bold text-red-500">As senhas não coincidem</p>
            )}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-red-50 border-2 border-red-200 rounded-xl px-4 py-3"
              >
                <p className="text-xs font-bold text-red-600">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-[#AAFF00]/20 border-2 border-[#5a8a00] rounded-xl px-4 py-3"
              >
                <p className="text-xs font-bold text-[#3a6a00]">Senha alterada com sucesso!</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileHover={canSubmit ? { x: -2, y: -2 } : {}}
            whileTap={canSubmit ? { x: 1, y: 1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full py-3.5 bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest border-2 border-[#1A1A1A] rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                  Salvando...
                </motion.span>
              ) : (
                <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Salvar Nova Senha
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
