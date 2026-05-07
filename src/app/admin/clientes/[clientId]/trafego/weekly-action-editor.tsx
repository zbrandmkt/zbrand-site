"use client";

import { useState, useTransition } from "react";
import { updateWeeklyAction } from "./actions";

interface Props {
  weekId: string;
  initialText: string;
  clientId: string;
}

export function WeeklyActionEditor({ weekId, initialText }: Props) {
  const [text, setText] = useState(initialText);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSave() {
    setError(null);
    setSaved(false);
    startTransition(async () => {
      const result = await updateWeeklyAction(weekId, text);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        setError(result.error ?? "Erro ao salvar");
      }
    });
  }

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-sm">📋</span>
        <p className="text-[9px] font-black uppercase tracking-widest text-[#FF6100]">Ação da Semana</p>
      </div>
      <p className="text-[10px] text-[#1A1A1A]/40 font-medium">
        Texto que aparece no dashboard do cliente como foco estratégico desta semana.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Ex: O custo por mensagem iniciada está dentro da meta. Esta semana vamos aumentar a verba em 20% no conjunto de anúncios com menor CPL para escalar os resultados..."
        className="w-full border-2 border-[#1A1A1A]/20 rounded-xl px-4 py-3 text-xs text-[#1A1A1A] font-medium placeholder:text-[#1A1A1A]/25 focus:outline-none focus:border-[#FF6100] resize-none transition-colors flex-1"
        style={{ minHeight: "120px" }}
      />
      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="px-4 py-2 bg-[#FF6100] text-white text-[10px] font-black uppercase tracking-widest rounded-xl border-2 border-[#1A1A1A] hover:opacity-90 disabled:opacity-50 transition-all"
          style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
        {saved && (
          <span className="text-[10px] font-black text-[#AAFF00] uppercase tracking-widest flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Salvo!
          </span>
        )}
        {error && (
          <span className="text-[10px] font-bold text-red-500">{error}</span>
        )}
        {text !== initialText && !saved && !isPending && (
          <span className="text-[9px] text-[#1A1A1A]/30 font-medium ml-auto">Alterações não salvas</span>
        )}
      </div>
    </div>
  );
}
