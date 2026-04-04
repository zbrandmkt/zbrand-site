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
  gridSize = 40,
  gridColor = "rgba(255,97,0,0.08)",
  glowColor = "rgba(255,97,0,0.15)",
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

  const patternId = "infinite-grid-pattern";
  const patternIdHighlight = "infinite-grid-highlight";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Base grid */}
      <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
        <defs>
          <motion.pattern
            id={patternId}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            x={offsetX}
            y={offsetY}
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={gridColor}
              strokeWidth="1"
            />
          </motion.pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>

      {/* Mouse-following highlight grid */}
      <motion.svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <defs>
          <motion.pattern
            id={patternIdHighlight}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
            x={offsetX}
            y={offsetY}
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke={glowColor}
              strokeWidth="1.5"
            />
          </motion.pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternIdHighlight})`} />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
