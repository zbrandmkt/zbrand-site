"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";

const ALL_NAV_ITEMS = [
  {
    href: "/area-do-cliente/dashboard",
    label: "Dashboard",
    permission: null,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/trafego/meta",
    label: "Meta Ads",
    permission: "trafego_meta_or_legacy",
    icon: (
      <img src="/images/icon_metaads.png" alt="Meta Ads" className="w-4 h-4 object-contain" />
    ),
  },
  {
    href: "/area-do-cliente/dashboard/trafego/google",
    label: "Google Ads",
    permission: "trafego_google",
    icon: (
      <img src="/images/icon_googleads.webp" alt="Google Ads" className="w-4 h-4 object-contain" />
    ),
  },
  {
    href: "/area-do-cliente/dashboard/social",
    label: "Social Media",
    permission: "social",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/aprovacoes",
    label: "Aprovações",
    permission: "aprovacoes",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/calendario",
    label: "Calendário",
    permission: "calendario",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    href: "/area-do-cliente/dashboard/crm",
    label: "CRM",
    permission: null,
    badge: "Em breve",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
];

function SidebarContent({
  clientName,
  company,
  selectedClientId,
  allClients,
  pendingCount,
  expandedPerms,
  pathname,
  onNavigate,
  handleSwitch,
  handleLogout,
  switching,
}: {
  clientName: string;
  company: string;
  selectedClientId?: string;
  allClients: { id: string; company: string }[];
  pendingCount: number;
  expandedPerms: string[];
  pathname: string;
  onNavigate?: () => void;
  handleSwitch: (id: string) => void;
  handleLogout: () => void;
  switching: boolean;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const hasMultipleClients = allClients.length > 1;

  return (
    <div className="flex flex-col h-full">
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

      {/* Client switcher */}
      <div className="px-4 py-3 border-b border-white/10">
        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-1.5 font-bold">Cliente</p>

        {hasMultipleClients ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              className="w-full flex items-center justify-between gap-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg px-3 py-2 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                {switching ? (
                  <svg className="w-2 h-2 animate-spin text-[#FF6100] shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#FF6100] shrink-0" />
                )}
                <span className="text-xs font-bold text-white tracking-wide truncate">
                  {company.toUpperCase()}
                </span>
              </div>
              <svg
                className={`w-3.5 h-3.5 text-white/40 shrink-0 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#2A2A2A] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl">
                {allClients.map((c) => {
                  const isSelected = c.id === selectedClientId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => { handleSwitch(c.id); setDropdownOpen(false); }}
                      disabled={switching}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors text-xs font-bold tracking-wide disabled:opacity-50 ${
                        isSelected
                          ? "bg-[#FF6100]/20 text-[#FF6100]"
                          : "text-white/60 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-[#FF6100]" : "bg-white/20"}`} />
                      {c.company.toUpperCase()}
                      {isSelected && (
                        <svg className="w-3 h-3 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
            <div className="w-2 h-2 rounded-full bg-[#FF6100] shrink-0" />
            <span className="text-xs font-bold text-white tracking-wide truncate">{company.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        <p className="text-[9px] text-white/30 uppercase tracking-widest px-2 mb-2 font-bold">Menu</p>
        {ALL_NAV_ITEMS.filter((item) =>
          item.permission === null || expandedPerms.includes(item.permission)
        ).map((item) => {
          const isActive = item.href === "/area-do-cliente/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const isDisabled = !!item.badge;
          const isAprovacoes = item.href === "/area-do-cliente/dashboard/aprovacoes";
          return (
            <Link
              key={item.href}
              href={isDisabled ? "#" : item.href}
              onClick={(e) => {
                if (isDisabled) e.preventDefault();
                else onNavigate?.();
              }}
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
              {isAprovacoes && pendingCount > 0 && !isActive && (
                <span className="text-[9px] font-black bg-[#FF6100] text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {pendingCount}
                </span>
              )}
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
            <span className="text-white text-xs font-black">{clientName.charAt(0).toUpperCase()}</span>
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
    </div>
  );
}

export function DashboardSidebar({
  clientName = "Cliente",
  company = "ZBRAND",
  selectedClientId,
  allClients = [],
  pendingCount = 0,
  permissions = ["trafego", "social", "calendario", "aprovacoes"],
  switchClient,
}: {
  clientName?: string;
  company?: string;
  selectedClientId?: string;
  allClients?: { id: string; company: string }[];
  pendingCount?: number;
  permissions?: string[];
  switchClient?: (formData: FormData) => Promise<void>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  // Fecha o menu mobile ao navegar
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Trava o scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const expandedPerms = [...permissions];
  const hasSubTrafegoPerms = permissions.some((p) => p.startsWith("trafego_"));
  if (permissions.includes("trafego_meta") || (permissions.includes("trafego") && !hasSubTrafegoPerms)) {
    expandedPerms.push("trafego_meta_or_legacy");
  }

  async function handleSwitch(clientId: string) {
    if (clientId === selectedClientId || switching) return;
    setSwitching(true);
    await fetch("/api/switch-client", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clientId }),
    });
    router.refresh();
    setSwitching(false);
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/area-do-cliente");
    router.refresh();
  }

  const sharedProps = {
    clientName,
    company,
    selectedClientId,
    allClients,
    pendingCount,
    expandedPerms,
    pathname,
    handleSwitch,
    handleLogout,
    switching,
  };

  return (
    <>
      {/* ── DESKTOP: sidebar fixa ── */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-[#1A1A1A] border-r-2 border-[#FF6100] flex-col z-40">
        <SidebarContent {...sharedProps} />
      </aside>

      {/* ── MOBILE: top bar ── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#1A1A1A] border-b-2 border-[#FF6100] flex items-center justify-between px-4">
        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Abrir menu"
        >
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo centralizada */}
        <Image
          src="/images/logo-preto-zbrand.png"
          alt="ZBRAND"
          width={90}
          height={27}
          className="h-6 w-auto brightness-0 invert"
        />

        {/* Avatar da empresa */}
        <div className="w-9 h-9 rounded-xl bg-[#FF6100] flex items-center justify-center">
          <span className="text-white text-xs font-black">
            {company.charAt(0).toUpperCase()}
          </span>
        </div>
      </header>

      {/* ── MOBILE: overlay ── */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── MOBILE: drawer slide-in ── */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-[#1A1A1A] border-r-2 border-[#FF6100] z-50 flex flex-col
          transition-transform duration-300 ease-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Botão fechar */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Fechar menu"
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <SidebarContent
          {...sharedProps}
          onNavigate={() => setMobileOpen(false)}
        />
      </aside>
    </>
  );
}
