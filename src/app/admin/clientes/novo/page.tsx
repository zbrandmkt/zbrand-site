import Link from "next/link";
import { createClientAction } from "./actions";

const MODULES = [
  {
    id: "trafego",
    label: "Tráfego Pago",
    description: "Relatórios de Meta Ads e Google Ads",
    color: "#00C2FF",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    id: "social",
    label: "Social Media",
    description: "Métricas de Instagram, Facebook e TikTok",
    color: "#FF3D9A",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
  },
  {
    id: "calendario",
    label: "Calendário",
    description: "Calendário de conteúdo e posts agendados",
    color: "#AAFF00",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "aprovacoes",
    label: "Aprovações",
    description: "Fila de aprovação de posts e criativos",
    color: "#FF6100",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function NovoClientePage() {
  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/clientes"
          className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
        >
          ← Clientes
        </Link>
        <span className="text-[#1A1A1A]/20">/</span>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
          Novo cliente
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Cadastrar novo cliente</h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">
          Um email de boas-vindas será enviado automaticamente para o cliente criar a senha.
        </p>
      </div>

      <form action={createClientAction} className="flex flex-col gap-6">

        {/* Dados do cliente */}
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
          style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
        >
          <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-5">Dados do cliente</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Nome completo *
              </label>
              <input
                name="name"
                required
                placeholder="Ex: Bruna Costa"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Nome da empresa *
              </label>
              <input
                name="company"
                required
                placeholder="Ex: Churruts Hamburguer"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                E-mail *
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="cliente@empresa.com.br"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
              />
              <p className="text-[10px] text-[#1A1A1A]/35">
                Um link de convite será enviado para este email.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Plano
              </label>
              <select
                name="plan"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none bg-white transition-colors"
              >
                <option value="">Selecionar...</option>
                <option value="Starter">Starter</option>
                <option value="Full">Full</option>
                <option value="Personalizado">Personalizado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contrato */}
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
          style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
        >
          <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-5">Contrato</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Início do contrato
              </label>
              <input
                name="contract_start"
                type="date"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Término do contrato
              </label>
              <input
                name="contract_end"
                type="date"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Link do contrato
              </label>
              <input
                name="contract_url"
                type="url"
                placeholder="https://drive.google.com/..."
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#00C2FF] outline-none transition-colors"
              />
              <p className="text-[10px] text-[#1A1A1A]/35">
                Link do Google Drive, Notion ou outro serviço de armazenamento.
              </p>
            </div>
          </div>
        </div>

        {/* Permissões */}
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
          style={{ boxShadow: "5px 5px 0px 0px #AAFF00" }}
        >
          <div className="mb-5">
            <h2 className="font-black text-[#1A1A1A] text-base tracking-tight">Permissões de acesso</h2>
            <p className="text-xs text-[#1A1A1A]/40 font-medium mt-1">
              Selecione quais módulos este cliente poderá acessar.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {MODULES.map((mod) => (
              <label
                key={mod.id}
                className="flex items-center justify-between gap-4 p-4 border-2 border-[#1A1A1A]/10 rounded-xl cursor-pointer hover:border-[#1A1A1A]/25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${mod.color}20`, color: mod.color }}
                  >
                    {mod.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A] tracking-tight">{mod.label}</p>
                    <p className="text-[11px] text-[#1A1A1A]/40 font-medium">{mod.description}</p>
                  </div>
                </div>

                <input
                  type="checkbox"
                  name={`perm_${mod.id}`}
                  defaultChecked
                  className="w-5 h-5 rounded border-2 border-[#1A1A1A]/30 accent-[#FF6100] cursor-pointer shrink-0"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest py-3.5 rounded-xl hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
          >
            ✉ Cadastrar e enviar convite
          </button>
          <Link
            href="/admin/clientes"
            className="px-6 py-3.5 border-2 border-[#1A1A1A]/20 text-[#1A1A1A]/50 font-black text-sm uppercase tracking-widest rounded-xl hover:border-[#1A1A1A]/40 transition-colors"
          >
            Cancelar
          </Link>
        </div>

      </form>
    </div>
  );
}
