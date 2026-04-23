"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase";
import { getWhatsAppLink } from "@/lib/whatsapp";

export default function AguardandoPage() {
  const router = useRouter();

  // Verifica a cada 15s se o status mudou para "active"
  useEffect(() => {
    const check = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("clients")
        .select("status")
        .eq("user_id", user.id)
        .single();
      if (data?.status === "active") {
        router.push("/area-do-cliente/dashboard");
      }
    };
    check();
    const interval = setInterval(check, 15000);
    return () => clearInterval(interval);
  }, [router]);

  return (
    <main className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Zebra texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "url('/images/zebra-texture-black.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      {/* Orange glow */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 500, height: 500,
          background: "radial-gradient(ellipse at center, rgba(255,97,0,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 max-w-md w-full"
      >
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "6px 6px 0px 0px #FF6100" }}
        >
          <div className="px-8 py-10 flex flex-col items-center text-center gap-5">
            {/* Logo */}
            <Image
              src="/images/logo-preto-zbrand.png"
              alt="ZBRAND"
              width={140} height={42}
              className="h-10 w-auto"
            />

            {/* Animated zebra emoji */}
            <motion.div
              animate={{ rotate: [0, -8, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              className="text-5xl"
            >
              🦓
            </motion.div>

            <div>
              <h1 className="font-black text-[#1A1A1A] text-2xl uppercase tracking-tight mb-2">
                Acesso em configuração
              </h1>
              <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                Nossa equipe está preparando o seu painel personalizado.
                Em breve você terá acesso completo aos seus resultados.
              </p>
            </div>

            {/* Pulsing status indicator */}
            <div className="flex items-center gap-2 bg-[#FF6100]/08 border border-[#FF6100]/20 rounded-full px-4 py-2">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 bg-[#FF6100] rounded-full"
              />
              <span className="text-xs font-bold text-[#FF6100] uppercase tracking-widest">
                Aguardando ativação
              </span>
            </div>

            <p className="text-xs text-[#1A1A1A]/40 leading-relaxed">
              Esta página verifica automaticamente seu status a cada 15 segundos.
              Assim que nossa equipe liberar seu acesso, você será redirecionado automaticamente.
            </p>

            {/* WhatsApp CTA */}
            <a
              href={getWhatsAppLink("geral")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#1A1A1A] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl transition-all hover:-translate-y-0.5"
              style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com a equipe ZBRAND
            </a>
          </div>

          <div className="px-8 py-3 border-t-2 border-[#1A1A1A]/08 bg-[#1A1A1A]/[0.02]">
            <p className="text-center text-[10px] font-medium text-[#1A1A1A]/30 uppercase tracking-widest">
              Área exclusiva para clientes ZBRAND
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
