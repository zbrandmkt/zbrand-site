"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  clientId: string;
  company: string;
  plan: string | null;
  status: string;
}

export function ClientPanelSidebar({ clientId, company, plan, status }: Props) {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Visão Geral",
      href: `/admin/clientes/${clientId}`,
      exact: true,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      label: "Relatórios",
      href: `/admin/clientes/${clientId}/relatorios`,
      exact: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      label: "Usuários",
      href: `/admin/clientes/${clientId}/usuarios`,
      exact: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
    {
      label: "Calendário",
      href: `/admin/clientes/${clientId}/calendario`,
      exact: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Aprovações",
      href: `/admin/clientes/${clientId}/aprovacoes`,
      exact: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string, exact: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  const statusColor =
    status === "active"
      ? "bg-[#AAFF00] text-[#1A1A1A]"
      : status === "suspended"
      ? "bg-red-100 text-red-600"
      : "bg-yellow-100 text-yellow-700";

  const statusLabel =
    status === "active" ? "Ativo" : status === "suspended" ? "Suspenso" : "Pendente";

  return (
    <aside className="sticky top-0 h-screen w-52 bg-white border-r-2 border-[#1A1A1A]/08 flex flex-col shrink-0">
      {/* Back */}
      <div className="px-4 pt-5 pb-3 border-b border-[#1A1A1A]/08">
        <Link
          href="/admin/clientes"
          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/35 hover:text-[#FF6100] transition-colors mb-4"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Clientes
        </Link>

        {/* Company card */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm border-2 border-[#1A1A1A] shrink-0"
            style={{ background: "#FF6100", boxShadow: "2px 2px 0px 0px #1A1A1A" }}
          >
            {company.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-black text-[#1A1A1A] tracking-tight truncate">{company}</p>
            {plan && (
              <p className="text-[10px] text-[#1A1A1A]/40 font-medium truncate">{plan}</p>
            )}
          </div>
        </div>

        <span
          className={`mt-2.5 inline-flex text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${statusColor}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
        <p className="text-[9px] text-[#1A1A1A]/25 uppercase tracking-widest px-2 mb-2 font-bold">
          Empresa
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 ${
                active
                  ? "bg-[#FF6100] text-white"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/05"
              }`}
            >
              <span>{item.icon}</span>
              <span className="text-xs font-bold tracking-wide">{item.label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#1A1A1A]/08">
        <p className="text-[9px] text-[#1A1A1A]/25 uppercase tracking-widest font-bold">
          ID: {clientId.slice(0, 8)}...
        </p>
      </div>
    </aside>
  );
}
