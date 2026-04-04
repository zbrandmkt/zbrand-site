"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface AnimatedGradientBackgroundProps {
  colors?: string[];
  speed?: number;
  breathe?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AnimatedGradientBackground({
  colors = ["#FF6100", "#FFD600", "#FF6100"],
  speed = 0.02,
  breathe = true,
  className = "",
  children,
}: AnimatedGradientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widthRef = useRef(60);
  const directionRef = useRef(1);
  const frameRef = useRef<number>();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const animate = () => {
      if (breathe) {
        widthRef.current += speed * directionRef.current;
        if (widthRef.current >= 80) directionRef.current = -1;
        if (widthRef.current <= 40) directionRef.current = 1;
      }

      const gradient = `radial-gradient(ellipse ${widthRef.current}% 60% at 50% 0%, ${colors.join(", ")}, transparent)`;
      container.style.background = gradient;

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [colors, speed, breathe]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}
