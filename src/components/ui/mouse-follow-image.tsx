"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface MouseFollowImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  intensity?: number;
}

export function MouseFollowImage({
  width = 500,
  height = 500,
  className = "",
  intensity = 20,
}: MouseFollowImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [intensity, -intensity]);
  const rotateY = useTransform(mouseX, [0, 1], [-intensity, intensity]);
  const eyeX = useTransform(mouseX, [0, 1], [-8, 8]);
  const eyeY = useTransform(mouseY, [0, 1], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative ${className}`}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        style={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        className="relative"
      >
        {/* Zebra placeholder with eye tracking */}
        <div
          className="relative flex items-center justify-center rounded-2xl overflow-hidden"
          style={{ width, height }}
        >
          {/* Placeholder zebra silhouette */}
          <div className="absolute inset-0 bg-gradient-to-b from-preto-soft to-preto flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              className="w-3/4 h-3/4 opacity-80"
              fill="none"
            >
              {/* Zebra head silhouette */}
              <ellipse cx="100" cy="85" rx="55" ry="65" fill="#1A1A1A" stroke="#FF6100" strokeWidth="2" />
              {/* Ears */}
              <ellipse cx="70" cy="30" rx="12" ry="22" fill="#1A1A1A" stroke="#FF6100" strokeWidth="2" />
              <ellipse cx="130" cy="30" rx="12" ry="22" fill="#1A1A1A" stroke="#FF6100" strokeWidth="2" />
              {/* Snout */}
              <ellipse cx="100" cy="120" rx="30" ry="25" fill="#222" stroke="#FF6100" strokeWidth="2" />
              {/* Eyes - these follow the mouse */}
              <motion.g style={{ x: eyeX, y: eyeY }}>
                <circle cx="78" cy="75" r="10" fill="#FFF" />
                <circle cx="78" cy="75" r="5" fill="#000" />
                <circle cx="122" cy="75" r="10" fill="#FFF" />
                <circle cx="122" cy="75" r="5" fill="#000" />
              </motion.g>
              {/* Stripes */}
              <path d="M75 45 Q85 55 75 65" stroke="#FF6100" strokeWidth="2" fill="none" />
              <path d="M90 40 Q100 50 90 60" stroke="#FF6100" strokeWidth="2" fill="none" />
              <path d="M110 40 Q100 50 110 60" stroke="#FF6100" strokeWidth="2" fill="none" />
              <path d="M125 45 Q115 55 125 65" stroke="#FF6100" strokeWidth="2" fill="none" />
              {/* Nostrils */}
              <circle cx="92" cy="118" r="4" fill="#444" />
              <circle cx="108" cy="118" r="4" fill="#444" />
            </svg>
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-laranja/10 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
