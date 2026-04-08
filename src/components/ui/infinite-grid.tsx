"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion";

interface InfiniteGridProps {
  className?: string;
  children?: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  glowColor?: string;
}

export function InfiniteGrid({
  className = "",
  children,
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  useAnimationFrame((_, delta) => {
    offsetX.set(offsetX.get() + delta * 0.005);
    offsetY.set(offsetY.get() + delta * 0.003);
  });

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const bgPosition = useMotionTemplate`${offsetX}px ${offsetY}px`;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Base zebra texture — mesma sutileza do grid anterior */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/zebra-texture-black.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
          backgroundPosition: bgPosition,
          opacity: 0.09,
        }}
      />

      {/* Mouse-following glow — radial orange reveal */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/zebra-texture-black.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
          backgroundPosition: bgPosition,
          opacity: 0.22,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
