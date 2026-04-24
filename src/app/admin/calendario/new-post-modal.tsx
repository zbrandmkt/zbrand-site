"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "./actions";

interface Client {
  id: string;
  company: string;
}

export function NewPostModal({ clients, defaultDate }: { clients: Client[]; defaultDate?: string }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);

    startTransition(async () => {
      try {
        const postId = await createPost(fd);
        setOpen(false);
        router.push(`/admin/calendario/${postId}`);
      } catch (err) {
        console.error(err);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-[#FF6100] text-white font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-transform"
        style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.4)" }}
      >
        + Novo Post
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div
            className="relative bg-[#111] border-2 border-white/10 rounded-2xl p-6 w-full max-w-md"
            style={{ boxShadow: "6px 6px 0px 0px #FF6100" }}
          >
            <h2 className="text-sm font-black uppercase tracking-widest text-white mb-5">Novo Post</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Client */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Cliente</label>
                <select
                  name="clientId"
                  required
                  className="bg-[#1A1A1A] border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-bold focus:border-[#FF6100] outline-none"
                >
                  <option value="">Selecionar...</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>{c.company}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Título</label>
                <input
                  name="title"
                  required
                  placeholder="Ex: Reel — Promoção de segunda"
                  className="bg-[#1A1A1A] border border-white/15 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/20 focus:border-[#FF6100] outline-none"
                />
              </div>

              {/* Post type */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Tipo</label>
                <select
                  name="postType"
                  required
                  className="bg-[#1A1A1A] border border-white/15 rounded-xl px-3 py-2 text-sm text-white font-bold focus:border-[#FF6100] outline-none"
                >
                  <option value="reel">Reel</option>
                  <option value="post">Post</option>
                  <option value="story">Story</option>
                  <option value="carousel">Carrossel</option>
                </select>
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Data agendada</label>
                <input
                  type="datetime-local"
                  name="scheduledAt"
                  defaultValue={defaultDate ? `${defaultDate}T12:00` : ""}
                  className="bg-[#1A1A1A] border border-white/15 rounded-xl px-3 py-2 text-sm text-white focus:border-[#FF6100] outline-none"
                />
              </div>

              {/* Hidden defaults */}
              <input type="hidden" name="status" value="draft" />
              <input type="hidden" name="caption" value="" />
              <input type="hidden" name="hashtags" value="" />
              <input type="hidden" name="platforms" value="instagram" />

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/15 text-xs text-white/40 font-bold hover:border-white/30 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF6100] text-white font-black text-xs uppercase tracking-wider hover:-translate-y-0.5 transition-transform disabled:opacity-50"
                >
                  {isPending ? "Criando..." : "Criar e Editar →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
