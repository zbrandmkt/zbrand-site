"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase";

const navItems = [
  {
    href: "/area-do-cliente/dashboard",
    label: "Dashboard",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/trafego",
    label: "Tráfego Pago",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/social",
    label: "Social Media",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/crm",
    label: "CRM",
    badge: "Em breve",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
];

export function DashboardSidebar({
  clientName = "Cliente",
  company = "ZBRAND",
}: {
  clientName?: string;
  company?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [clientOpen, setClientOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/area-do-cliente");
    router.refresh();
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1A1A1A] border-r-2 border-[#FF6100] flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo-preto-zbrand.png"
            alt="ZBRAND"
            width={110}
            height={33}
            className="h-8 w-auto brightness-0 invert"
          />
        </div>
        <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1 font-medium">
          Área do Cliente
        </p>
      </div>

      {/* Client selector */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1.5 font-bold">Cliente</p>
        <button
          onClick={() => setClientOpen(!clientOpen)}
          className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg px-3 py-2 hover:border-[#FF6100]/50 transition-colors"
        >
          <span className="text-xs font-bold text-white tracking-wide">{company.toUpperCase()}</span>
          <svg
            className={`w-3.5 h-3.5 text-white/40 transition-transform ${clientOpen ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <AnimatePresence>
          {clientOpen && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-1 bg-[#2A2A2A] border border-white/10 rounded-lg overflow-hidden"
            >
              {["CHURRUTS", "BRAHAUS", "CAIO FERRARI"].map((c) => (
                <button
                  key={c}
                  onClick={() => setClientOpen(false)}
                  className="w-full text-left px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors font-medium tracking-wide"
                >
                  {c}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <p className="text-[9px] text-white/30 uppercase tracking-widest px-2 mb-2 font-bold">Menu</p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const isDisabled = !!item.badge;
          return (
            <Link
              key={item.href}
              href={isDisabled ? "#" : item.href}
              onClick={(e) => isDisabled && e.preventDefault()}
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-[#FF6100] text-white"
                  : isDisabled
                  ? "text-white/25 cursor-not-allowed"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? "text-white" : ""}>{item.icon}</span>
                <span className="text-xs font-bold tracking-wide uppercase">{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-black uppercase bg-[#FF6100]/20 text-[#FF6100] px-1.5 py-0.5 rounded-full tracking-wider">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#FF6100] border border-[#FF6100]/50 flex items-center justify-center">
            <span className="text-white text-xs font-black">S</span>
          </div>
          <div>
            <p className="text-xs font-bold text-white leading-none">{clientName}</p>
            <p className="text-[10px] text-white/30 mt-0.5">Cliente</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-[11px] text-white/30 hover:text-red-400 transition-colors font-medium uppercase tracking-wider w-full"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sair
        </button>
      </div>
    </aside>
  );
}
