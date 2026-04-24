"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import type { PostRow, PostComment } from "@/types/posts";
import {
  STATUS_COLORS, STATUS_LABELS, PLATFORM_COLORS, PLATFORM_LABELS,
} from "@/lib/posts-utils";
import {
  createPost, updatePost, sendForApproval, deletePost, addAdminComment, markAsPublished,
} from "../actions";

interface Client { id: string; company: string }

const PLATFORMS = ["instagram", "facebook", "tiktok"] as const;
const POST_TYPES = [
  { value: "reel",     label: "Reel" },
  { value: "post",     label: "Post" },
  { value: "story",    label: "Story" },
  { value: "carousel", label: "Carrossel" },
] as const;

export function PostEditor({
  post,
  comments,
  clients,
}: {
  post: PostRow | null;
  comments: PostComment[];
  clients: Client[];
}) {
  const router = useRouter();
  const isNew = !post;

  const [title,       setTitle]       = useState(post?.title       ?? "");
  const [caption,     setCaption]     = useState(post?.caption     ?? "");
  const [hashtags,    setHashtags]    = useState(post?.hashtags    ?? "");
  const [postType,    setPostType]    = useState(post?.post_type   ?? "reel");
  const [platforms,   setPlatforms]   = useState<string[]>(post?.platforms   ?? ["instagram"]);
  const [scheduledAt, setScheduledAt] = useState(post?.scheduled_at ? post.scheduled_at.slice(0, 16) : "");
  const [status,      setStatus]      = useState(post?.status      ?? "draft");
  const [clientId,    setClientId]    = useState(post?.client_id   ?? "");
  const [mediaUrls,   setMediaUrls]   = useState<string[]>(post?.media_urls ?? []);
  const [uploading,   setUploading]   = useState(false);
  const [commentBody, setCommentBody] = useState("");

  const [isPending,   startTransition] = useTransition();
  const [saved,       setSaved]        = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ─── Platforms toggle ─────────────────────────────────────────────────────
  function togglePlatform(p: string) {
    setPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  }

  // ─── Build FormData from state ────────────────────────────────────────────
  function buildFormData(overrideStatus?: string): FormData {
    const fd = new FormData();
    if (post?.id) fd.append("postId", post.id);
    fd.append("clientId",    clientId);
    fd.append("title",       title);
    fd.append("caption",     caption);
    fd.append("hashtags",    hashtags);
    fd.append("postType",    postType);
    platforms.forEach(p => fd.append("platforms", p));
    fd.append("scheduledAt", scheduledAt);
    fd.append("status",      overrideStatus ?? status);
    fd.append("mediaUrls",   JSON.stringify(mediaUrls));
    return fd;
  }

  // ─── Save ─────────────────────────────────────────────────────────────────
  function handleSave() {
    startTransition(async () => {
      try {
        if (isNew) {
          const fd = buildFormData();
          const newId = await createPost(fd);
          router.replace(`/admin/calendario/${newId}`);
        } else {
          await updatePost(buildFormData());
          setSaved(true);
          setTimeout(() => setSaved(false), 2500);
        }
      } catch (e) { console.error(e); }
    });
  }

  // ─── Send for approval ────────────────────────────────────────────────────
  function handleSendApproval() {
    if (!post?.id) return;
    startTransition(async () => {
      await updatePost(buildFormData("pending_approval"));
      await sendForApproval(post.id);
      setStatus("pending_approval");
    });
  }

  // ─── Delete ───────────────────────────────────────────────────────────────
  function handleDelete() {
    if (!post?.id || !confirm("Excluir este post permanentemente?")) return;
    startTransition(async () => {
      await deletePost(post.id);
      router.push("/admin/calendario");
    });
  }

  // ─── Mark published ───────────────────────────────────────────────────────
  function handlePublished() {
    if (!post?.id) return;
    startTransition(async () => {
      await markAsPublished(post.id);
      setStatus("published");
    });
  }

  // ─── Media upload ─────────────────────────────────────────────────────────
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    let currentPostId = post?.id;

    // If new post, create it first so we have a real ID
    if (isNew && !currentPostId) {
      if (!clientId || !title) {
        alert("Preencha o cliente e o título antes de fazer upload.");
        return;
      }
      setUploading(true);
      const fd = buildFormData();
      currentPostId = await createPost(fd);
      router.replace(`/admin/calendario/${currentPostId}`);
    }

    if (!currentPostId) return;

    setUploading(true);
    const supabase = createClient();
    if (!supabase) { setUploading(false); return; }

    const newUrls: string[] = [];
    for (const file of files) {
      const ext = file.name.split(".").pop();
      const path = `${clientId}/${currentPostId}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage.from("post-media").upload(path, file, { upsert: true });
      if (!error) newUrls.push(path);
    }

    const updated = [...mediaUrls, ...newUrls];
    setMediaUrls(updated);

    // Persist to DB
    const fd = buildFormData();
    fd.set("postId", currentPostId);
    fd.set("mediaUrls", JSON.stringify(updated));
    await updatePost(fd);

    setUploading(false);
  }

  // ─── Remove media ─────────────────────────────────────────────────────────
  async function removeMedia(path: string) {
    const updated = mediaUrls.filter(u => u !== path);
    setMediaUrls(updated);
    if (post?.id) {
      const fd = buildFormData();
      fd.set("mediaUrls", JSON.stringify(updated));
      await updatePost(fd);
    }
  }

  // ─── Comment ──────────────────────────────────────────────────────────────
  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!post?.id || !commentBody.trim()) return;
    startTransition(async () => {
      await addAdminComment(post.id, commentBody.trim());
      setCommentBody("");
    });
  }

  const statusColor = STATUS_COLORS[status as keyof typeof STATUS_COLORS] ?? "#6b7280";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* ── LEFT: Main form ─────────────────────────────────────────────────── */}
      <div className="lg:col-span-2 flex flex-col gap-5">

        {/* Status banner */}
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border" style={{ borderColor: statusColor, backgroundColor: `${statusColor}12` }}>
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
          <span className="text-xs font-black uppercase tracking-widest" style={{ color: statusColor }}>
            {STATUS_LABELS[status as keyof typeof STATUS_LABELS] ?? status}
          </span>
        </div>

        {/* Client + Title */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Cliente</label>
            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-sm text-[#1A1A1A] font-bold focus:border-[#FF6100] outline-none"
            >
              <option value="">Selecionar cliente...</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.company}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Título interno</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reel — Promoção de segunda"
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none"
            />
          </div>

          {/* Platforms */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Plataformas</label>
            <div className="flex gap-2">
              {PLATFORMS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all ${
                    platforms.includes(p)
                      ? "text-white border-transparent"
                      : "text-[#1A1A1A]/40 border-[#e0e0e0] hover:border-[#1A1A1A]/25"
                  }`}
                  style={platforms.includes(p) ? { backgroundColor: PLATFORM_COLORS[p], borderColor: PLATFORM_COLORS[p] } : {}}
                >
                  {PLATFORM_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Post type */}
          <div className="flex flex-col gap-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Tipo de post</label>
            <div className="flex gap-2 flex-wrap">
              {POST_TYPES.map(t => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setPostType(t.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 transition-all ${
                    postType === t.value
                      ? "bg-[#FF6100] border-[#FF6100] text-white"
                      : "border-[#e0e0e0] text-[#1A1A1A]/40 hover:border-[#1A1A1A]/25"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Caption + Hashtags */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Caption</label>
              <span className="text-[10px] text-[#1A1A1A]/25">{caption.length} chars</span>
            </div>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={5}
              placeholder="Escreva o caption do post..."
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-sm text-[#1A1A1A]/80 placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Hashtags</label>
            <input
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#marketing #socialmedia #zbrand"
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-sm text-[#1A1A1A]/80 placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none"
            />
            {/* Pill preview */}
            {hashtags && (
              <div className="flex flex-wrap gap-1 mt-1">
                {hashtags.split(/\s+/).filter(h => h.startsWith("#")).map(h => (
                  <span key={h} className="text-[10px] px-2 py-0.5 bg-[#FF6100]/10 text-[#FF6100] rounded-full font-medium">
                    {h}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Media upload */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Mídias ({mediaUrls.length})</label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="text-xs font-black uppercase tracking-wider px-3 py-1.5 bg-[#f6f6f6] border border-[#e0e0e0] text-[#1A1A1A]/60 rounded-xl hover:border-[#FF6100] hover:text-[#FF6100] transition-colors disabled:opacity-40"
            >
              {uploading ? "Enviando..." : "+ Upload"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {mediaUrls.length === 0 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#e0e0e0] rounded-xl p-8 text-center cursor-pointer hover:border-[#FF6100]/40 transition-colors"
            >
              <p className="text-2xl mb-1">🖼️</p>
              <p className="text-xs text-[#1A1A1A]/40">Clique para adicionar imagens ou vídeos</p>
              <p className="text-[10px] text-[#1A1A1A]/25 mt-1">JPG, PNG, GIF, MP4 — máx 50MB por arquivo</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {mediaUrls.map((url, i) => (
                <div key={i} className="relative aspect-square bg-[#f6f6f6] rounded-xl overflow-hidden group">
                  <div className="w-full h-full flex items-center justify-center text-[#1A1A1A]/30 text-xs font-medium">
                    {url.includes(".mp4") || url.includes(".mov") ? "🎬 Vídeo" : `📷 ${i + 1}`}
                  </div>
                  <button
                    onClick={() => removeMedia(url)}
                    className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Scheduling + Actions + Comments ──────────────────────────── */}
      <div className="flex flex-col gap-5">

        {/* Scheduling */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-3">Agendamento</p>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className="w-full bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#FF6100] outline-none"
          />
        </div>

        {/* Actions */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 flex flex-col gap-2">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Ações</p>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="w-full py-2.5 rounded-xl bg-[#f6f6f6] border border-[#e0e0e0] text-xs font-black uppercase tracking-wider text-[#1A1A1A] hover:border-[#FF6100] hover:text-[#FF6100] transition-colors disabled:opacity-40"
          >
            {isPending ? "Salvando..." : saved ? "✓ Salvo!" : "Salvar rascunho"}
          </button>

          {status !== "pending_approval" && status !== "approved" && status !== "published" && !isNew && (
            <button
              onClick={handleSendApproval}
              disabled={isPending}
              className="w-full py-2.5 rounded-xl bg-[#FF6100] text-white font-black text-xs uppercase tracking-wider hover:-translate-y-0.5 transition-transform disabled:opacity-40"
              style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.15)" }}
            >
              📤 Enviar para aprovação
            </button>
          )}

          {status === "approved" && !isNew && (
            <button
              onClick={handlePublished}
              disabled={isPending}
              className="w-full py-2.5 rounded-xl border-2 border-[#00C2FF] text-[#0284c7] font-black text-xs uppercase tracking-wider hover:bg-[#00C2FF]/10 transition-colors"
            >
              ✓ Marcar como publicado
            </button>
          )}

          {!isNew && (
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="w-full py-2 rounded-xl text-xs text-[#1A1A1A]/25 font-medium hover:text-red-500 transition-colors mt-1"
            >
              Excluir post
            </button>
          )}
        </div>

        {/* Comment thread */}
        {!isNew && (
          <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5 flex flex-col gap-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Comentários</p>

            <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
              {comments.length === 0 && (
                <p className="text-xs text-[#1A1A1A]/30 text-center py-3">Nenhum comentário ainda.</p>
              )}
              {comments.map(c => (
                <div
                  key={c.id}
                  className={`rounded-xl px-3 py-2 text-xs ${
                    c.role === "admin"
                      ? "bg-[#FF6100]/10 border border-[#FF6100]/20 text-[#1A1A1A] ml-4"
                      : "bg-[#f6f6f6] border border-[#e8e8e8] text-[#1A1A1A]/70 mr-4"
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-black text-[9px] uppercase tracking-wider" style={{ color: c.role === "admin" ? "#FF6100" : "#16a34a" }}>
                      {c.role === "admin" ? "ZBRAND" : "Cliente"}
                    </span>
                    <span className="text-[9px] text-[#1A1A1A]/30">
                      {new Date(c.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                    </span>
                  </div>
                  <p>{c.body}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleComment} className="flex flex-col gap-2">
              <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                rows={2}
                placeholder="Adicionar comentário..."
                className="w-full bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:border-[#FF6100] outline-none resize-none"
              />
              <button
                type="submit"
                disabled={isPending || !commentBody.trim()}
                className="py-1.5 rounded-xl bg-[#FF6100]/10 border border-[#FF6100]/25 text-[#FF6100] font-black text-[10px] uppercase tracking-wider hover:bg-[#FF6100]/20 transition-colors disabled:opacity-30"
              >
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
