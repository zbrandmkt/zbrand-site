"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { supabase } from "@/lib/supabase";

interface FormData {
  name: string;
  whatsapp: string;
  business_type: string;
  challenge: string;
}

const NETWORKS = ["Instagram", "TikTok", "LinkedIn"];

const BUSINESS_TYPES = [
  "Restaurante",
  "Padaria",
  "Confeitaria",
  "Cafeteria",
  "Gelateria",
  "Delivery / Ghost Kitchen",
  "Catering / Buffet",
  "Varejo Gourmet",
  "Outro",
];

const CHALLENGES = [
  "Falta de tempo",
  "Não vejo crescimento",
  "Conteúdo genérico",
  "Não sei se gera clientes",
  "Outro",
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://instagram.com/zbrand.mkt",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@zbrand.mkt",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.85V6.69h3.77z" />
      </svg>
    ),
  },
];

export function ZSocialCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>(["Instagram"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  function toggleNetwork(n: string) {
    setSelectedNetworks((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]
    );
  }

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const utm = new URLSearchParams(window.location.search);
      if (supabase) {
        await supabase.from("leads").insert({
          name: data.name,
          whatsapp: data.whatsapp,
          business_type: data.business_type,
          message: `Desafio: ${data.challenge} | Redes: ${selectedNetworks.join(", ")}`,
          services: "Social Media (Z-SOCIAL)",
          source: "z_social_cta",
          utm_source: utm.get("utm_source"),
          utm_medium: utm.get("utm_medium"),
          utm_campaign: utm.get("utm_campaign"),
          utm_content: utm.get("utm_content"),
        });
      }
      setSubmitted(true);
      reset();
      setSelectedNetworks(["Instagram"]);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-preto py-16 lg:py-24 relative overflow-hidden">
      {/* Zebra texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left col */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
              Vamos conversar
            </p>

            <h2 className="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight mb-4">
              Pronto pra{" "}
              <span className="text-laranja">transformar</span>{" "}
              seu social media?
            </h2>

            <p className="font-display text-sm text-white/55 mb-8 leading-relaxed">
              Sem compromisso, sem papo de vendedor. Só uma conversa descontraída sobre como a gente pode
              ajudar seu negócio a gerar mais clientes pelas redes sociais.
            </p>

            {/* WhatsApp direct */}
            <a
              href={getWhatsAppLink("social")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-laranja border-2 border-laranja text-white font-black uppercase tracking-widest text-sm px-7 py-4 rounded-xl transition-all hover:-translate-y-0.5 self-start mb-8"
              style={{ boxShadow: "4px 4px 0px 0px rgba(255,97,0,0.4)" }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar no WhatsApp agora
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 border-2 border-white/15 rounded-xl flex items-center justify-center text-white/50 hover:border-laranja hover:text-laranja hover:bg-laranja/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
              <span className="text-white/25 text-xs font-medium ml-1">Nos acompanhe</span>
            </div>
          </motion.div>

          {/* Right col: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div
                className="bg-white border-2 border-preto rounded-2xl p-8 text-center"
                style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
              >
                <span className="text-5xl mb-4 block">🦓</span>
                <h3 className="font-display font-black text-xl text-preto uppercase mb-2">
                  Formulário recebido!
                </h3>
                <p className="font-display text-sm text-cinza-dark font-medium leading-relaxed">
                  Você vai receber uma mensagem no WhatsApp em até 1 hora com os próximos passos.{" "}
                  <span className="text-laranja font-bold">Bora transformar seu social media!</span>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white border-2 border-preto rounded-2xl p-6 flex flex-col gap-4"
                style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
              >
                {/* Nome */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-preto/50">
                    Nome completo
                  </label>
                  <input
                    {...register("name", { required: true })}
                    placeholder="Como você se chama?"
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-preto/15 rounded-xl text-preto text-sm placeholder:text-preto/25 focus:border-laranja focus:outline-none transition-colors font-medium"
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 font-bold">Preencha seu nome</span>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-preto/50">
                    WhatsApp
                  </label>
                  <input
                    {...register("whatsapp", { required: true })}
                    placeholder="(00) 00000-0000"
                    type="tel"
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-preto/15 rounded-xl text-preto text-sm placeholder:text-preto/25 focus:border-laranja focus:outline-none transition-colors font-medium"
                  />
                  {errors.whatsapp && (
                    <span className="text-[10px] text-red-500 font-bold">Preencha seu WhatsApp</span>
                  )}
                </div>

                {/* Tipo de negócio */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-preto/50">
                    Qual é seu negócio?
                  </label>
                  <select
                    {...register("business_type", { required: true })}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-preto/15 rounded-xl text-preto text-sm focus:border-laranja focus:outline-none transition-colors font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.business_type && (
                    <span className="text-[10px] text-red-500 font-bold">Selecione seu tipo de negócio</span>
                  )}
                </div>

                {/* Maior desafio */}
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-widest text-preto/50">
                    Maior desafio
                  </label>
                  <select
                    {...register("challenge")}
                    className="w-full px-3.5 py-2.5 bg-white border-2 border-preto/15 rounded-xl text-preto text-sm focus:border-laranja focus:outline-none transition-colors font-medium appearance-none cursor-pointer"
                  >
                    <option value="">Selecione...</option>
                    {CHALLENGES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Redes */}
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-preto/50">
                    Qual rede você quer gerenciar?
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {NETWORKS.map((n) => {
                      const active = selectedNetworks.includes(n);
                      return (
                        <button
                          key={n}
                          type="button"
                          onClick={() => toggleNetwork(n)}
                          className="text-[11px] font-black px-3 py-1.5 rounded-full border-2 transition-all"
                          style={{
                            borderColor: active ? "#FF6100" : "rgba(26,26,26,0.15)",
                            backgroundColor: active ? "#FF6100" : "transparent",
                            color: active ? "#fff" : "rgba(26,26,26,0.5)",
                            boxShadow: active ? "2px 2px 0px 0px rgba(255,97,0,0.3)" : "none",
                          }}
                        >
                          {n}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-preto border-2 border-preto text-white font-black uppercase tracking-widest text-sm py-3.5 rounded-xl transition-all hover:-translate-y-0.5 disabled:opacity-50"
                  style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
                >
                  {loading ? "Enviando..." : "QUERO CONVERSAR →"}
                </button>

                <p className="text-[10px] text-preto/35 text-center font-medium">
                  Você receberá uma mensagem no WhatsApp em até 1 hora ⚡
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
