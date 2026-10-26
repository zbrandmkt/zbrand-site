import Image from "next/image";
import { cn } from "@/lib/utils";

// Único ponto do logo no site. Para trocar a arte, substitua os SVGs em
// public/images/brand/ (mesmo nome) — nenhum outro arquivo precisa mudar.
const LOGOS = {
  escuro: "/images/brand/logo-zibrand.svg", // texto escuro, para fundo claro
  claro: "/images/brand/logo-zibrand-branco.svg", // texto branco, para fundo escuro
} as const;

// Proporção do SVG recortado (1935 × 581)
const RATIO = 1935 / 581;

interface LogoProps {
  variant?: keyof typeof LOGOS;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = "escuro", height = 32, className, priority }: LogoProps) {
  return (
    <Image
      src={LOGOS[variant]}
      alt="Zibrand"
      width={Math.round(height * RATIO)}
      height={height}
      className={cn("w-auto", className)}
      priority={priority}
    />
  );
}
