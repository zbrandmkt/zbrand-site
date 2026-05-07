"use client";

import { useState, useTransition } from "react";
import { updateClientPermissions } from "./actions";

// ─── Platform sub-options for trafego ───────────────────────
const TRAFEGO_PLATFORMS = [
  {
    id: "trafego_meta",
    label: "Meta Ads",
    description: "Facebook & Instagram Ads",
    color: "#1877F2",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    id: "trafego_google",
    label: "Google Ads",
    description: "Google Search & Display",
    color: "#FBBC05",
    icon: (
      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
      </svg>
    ),
  },
  // Future: linkedin, tiktok, etc.
];

// ─── Main modules ────────────────────────────────────────────
const MODULES = [
  {
    id: "trafego",
    label: "Tráfego Pago",
    description: "Relatórios de anúncios pagos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "#00C2FF",
    hasPlatforms: true,
  },
  {
    id: "social",
    label: "Social Media",
    description: "Métricas de Instagram, Facebook e TikTok",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    color: "#FF3D9A",
    hasPlatforms: false,
  },
  {
    id: "calendario",
    label: "Calendário",
    description: "Calendário de conteúdo e posts agendados",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "#AAFF00",
    hasPlatforms: false,
  },
  {
    id: "aprovacoes",
    label: "Aprovações",
    description: "Fila de aprovação de posts e criativos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#FF6100",
    hasPlatforms: false,
  },
];

// ─── Toggle Switch ───────────────────────────────────────────
function Toggle({
  checked,
  onChange,
  color = "#1A1A1A",
  small = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  color?: string;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative shrink-0 rounded-full border-2 transition-all focus:outline-none ${
        small ? "w-9 h-5" : "w-11 h-6"
      } ${checked ? "border-[#1A1A1A]" : "border-[#1A1A1A]/20"}`}
      style={{ background: checked ? "#1A1A1A" : undefined }}
    >
      <div
        className={`absolute rounded-full transition-all ${
          small ? "w-3 h-3 top-0.5" : "w-4 h-4 top-1"
        } ${checked ? (small ? "left-4.5" : "left-6") : (small ? "left-0.5" : "left-1")}`}
        style={{ background: checked ? color : "#1A1A1A30" }}
      />
    </button>
  );
}

// ─── Main Form ───────────────────────────────────────────────
export function PermissionsForm({
  clientId,
  initialPermissions,
}: {
  clientId: string;
  initialPermissions: string[];
}) {
  const [permissions, setPermissions] = useState<Set<string>>(
    new Set(initialPermissions)
  );
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function toggle(id: string, value: boolean) {
    setPermissions((prev) => {
      const next = new Set(prev);
      if (value) {
        next.add(id);
        // When enabling trafego, auto-enable Meta Ads by default
        if (id === "trafego" && !next.has("trafego_meta") && !next.has("trafego_google")) {
          next.add("trafego_meta");
        }
      } else {
        next.delete(id);
        // When disabling trafego, also remove all sub-permissions
        if (id === "trafego") {
          next.delete("trafego_meta");
          next.delete("trafego_google");
        }
      }
      return next;
    });
    setSaved(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    formData.set("clientId", clientId);
    permissions.forEach((p) => formData.set(`perm_${p}`, "on"));

    startTransition(async () => {
      await updateClientPermissions(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  const hasTrafico = permissions.has("trafego");

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {MODULES.map((mod) => {
        const enabled = permissions.has(mod.id);
        return (
          <div key={mod.id}>
            {/* Main module row */}
            <div
              className={`flex items-center justify-between gap-4 p-4 border-2 rounded-xl transition-colors ${
                enabled ? "border-[#1A1A1A]/20 bg-white" : "border-[#1A1A1A]/08 bg-[#f9f9f9]"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity"
                  style={{
                    background: `${mod.color}20`,
                    color: mod.color,
                    opacity: enabled ? 1 : 0.4,
                  }}
                >
                  {mod.icon}
                </div>
                <div>
                  <p className={`text-sm font-black tracking-tight ${enabled ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"}`}>
                    {mod.label}
                  </p>
                  <p className="text-[11px] text-[#1A1A1A]/40 font-medium">{mod.description}</p>
                </div>
              </div>
              <Toggle
                checked={enabled}
                onChange={(v) => toggle(mod.id, v)}
                color={mod.color}
              />
            </div>

            {/* Tráfego sub-options (platforms) */}
            {mod.hasPlatforms && hasTrafico && (
              <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-[#00C2FF]/30 pl-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1 mt-1">
                  Plataformas habilitadas
                </p>
                {TRAFEGO_PLATFORMS.map((platform) => {
                  const platEnabled = permissions.has(platform.id);
                  return (
                    <div
                      key={platform.id}
                      className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border transition-colors ${
                        platEnabled
                          ? "border-[#1A1A1A]/15 bg-white"
                          : "border-[#1A1A1A]/08 bg-[#f5f5f5]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                          style={{
                            background: `${platform.color}18`,
                            color: platform.color,
                            opacity: platEnabled ? 1 : 0.4,
                          }}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <p className={`text-xs font-black ${platEnabled ? "text-[#1A1A1A]" : "text-[#1A1A1A]/40"}`}>
                            {platform.label}
                          </p>
                          <p className="text-[10px] text-[#1A1A1A]/30">{platform.description}</p>
                        </div>
                        {!platEnabled && (
                          <span className="text-[9px] font-black bg-[#FBBC05]/15 text-[#8a6200] px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Upsell
                          </span>
                        )}
                      </div>
                      <Toggle
                        checked={platEnabled}
                        onChange={(v) => toggle(platform.id, v)}
                        color={platform.color}
                        small
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        disabled={isPending}
        className={`mt-2 w-full border-2 border-[#1A1A1A] font-black text-sm uppercase tracking-widest py-3 rounded-xl transition-all disabled:opacity-60 ${
          saved
            ? "bg-[#AAFF00] text-[#1A1A1A]"
            : "bg-[#1A1A1A] text-white hover:-translate-y-0.5"
        }`}
        style={{ boxShadow: saved ? "3px 3px 0px 0px #1A1A1A" : "3px 3px 0px 0px #AAFF00" }}
      >
        {isPending ? "Salvando..." : saved ? "✓ Salvo!" : "Salvar permissões"}
      </button>
    </form>
  );
}
