"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TextRotateProps {
  texts: string[];
  interval?: number;
  className?: string;
  colorClasses?: string[];
}

export function TextRotate({
  texts,
  interval = 3000,
  className = "",
  colorClasses,
}: TextRotateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  const colorClass = colorClasses
    ? colorClasses[currentIndex % colorClasses.length]
    : "text-laranja";

  return (
    <span className={`inline-flex justify-center ${colorClass} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
