"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedGradientBackground } from "@/components/ui/animated-gradient-background";

const stats = [
  { value: "10k", label: "seguidores em 1 ano" },
  { value: "R$7k", label: "em vendas sem anúncio" },
  { value: "3k", label: "subs YouTube em 3 meses" },
  { value: "2", label: "anos de Churruts na pele" },
];

function AnimatedNumber({ value, inView }: { value: string; inView: boolean }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!inView) return;

    const numMatch = value.match(/(\d+)/);
    if (!numMatch) {
      setDisplayed(value);
      return;
    }

    const target = parseInt(numMatch[1]);
    const prefix = value.slice(0, value.indexOf(numMatch[1]));
    const suffix = value.slice(value.indexOf(numMatch[1]) + numMatch[1].length);
    const duration = 1500;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplayed(`${prefix}${current >= 1000 ? `${(current / 1000).toFixed(current >= target ? 0 : 1)}k`.replace(".0k", "k") : current}${suffix}`);
      if (step >= steps) {
        setDisplayed(value);
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [inView, value]);

  return <span>{displayed || "0"}</span>;
}

export function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <AnimatedGradientBackground
      colors={["#FF6100", "#FFD600", "#FF6100"]}
      speed={0.03}
      breathe
      className="py-8"
    >
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <p className="font-display font-extrabold text-3xl md:text-4xl text-white">
                <AnimatedNumber value={stat.value} inView={inView} />
              </p>
              <p className="font-display text-xs font-medium text-white/80 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedGradientBackground>
  );
}
