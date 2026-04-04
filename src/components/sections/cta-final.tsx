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
  message: string;
}

export function CTAFinal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      const utm = new URLSearchParams(window.location.search);
      await supabase.from("leads").insert({
        ...data,
        source: "home_cta",
        utm_source: utm.get("utm_source"),
        utm_medium: utm.get("utm_medium"),
        utm_campaign: utm.get("utm_campaign"),
        utm_content: utm.get("utm_content"),
      });
      setSubmitted(true);
      reset();
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-preto py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #fff 0px, #fff 10px, transparent 10px, transparent 20px)",
          }}
        />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-section-title text-white mb-3 uppercase tracking-tight">
              Bora tirar a zebra do seu marketing?
            </h2>
            <p className="font-display text-sm text-white/60 mb-6">
              Conta pra gente sobre o seu restaurante. A gente responde rápido.
            </p>

            <a
              href={getWhatsAppLink("geral")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm inline-flex !border-laranja"
            >
              QUERO FALAR COM A ZBRAND
            </a>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div className="bg-preto-soft border border-white/10 rounded-2xl p-6 text-center">
                <span className="text-4xl mb-3 block">🦓</span>
                <h3 className="font-display font-bold text-base text-white mb-1">
                  Recebemos sua mensagem!
                </h3>
                <p className="font-display text-xs text-white/50">
                  Respondemos em até 2 horas. Fique de olho no WhatsApp!
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-preto-soft border border-white/10 rounded-2xl p-5 flex flex-col gap-3"
              >
                <input
                  {...register("name", { required: true })}
                  placeholder="Seu nome"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-display text-xs placeholder:text-white/30 focus:border-laranja focus:outline-none transition-colors"
                />
                {errors.name && <span className="text-[10px] text-red-400 -mt-2">Preencha seu nome</span>}

                <input
                  {...register("whatsapp", { required: true })}
                  placeholder="Seu WhatsApp"
                  type="tel"
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-display text-xs placeholder:text-white/30 focus:border-laranja focus:outline-none transition-colors"
                />
                {errors.whatsapp && <span className="text-[10px] text-red-400 -mt-2">Preencha seu WhatsApp</span>}

                <select
                  {...register("business_type")}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-display text-xs focus:border-laranja focus:outline-none transition-colors"
                >
                  <option value="">Tipo de negócio</option>
                  <option value="restaurante">Restaurante</option>
                  <option value="hamburgueria">Hamburgueria</option>
                  <option value="pizzaria">Pizzaria</option>
                  <option value="cafeteria">Cafeteria</option>
                  <option value="bar">Bar</option>
                  <option value="outro">Outro</option>
                </select>

                <textarea
                  {...register("message")}
                  placeholder="Conte um pouco sobre o seu negócio..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-display text-xs placeholder:text-white/30 focus:border-laranja focus:outline-none transition-colors resize-none"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-soft w-full justify-center text-xs disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "ENVIAR MENSAGEM"}
                </button>

                <p className="font-display text-[10px] text-white/30 text-center">
                  Respondemos em até 2 horas ⚡
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
