"use client";

import { useState, useTransition } from "react";
import type { PostRow, PostComment } from "@/types/posts";
import {
  PLATFORM_LABELS, PLATFORM_COLORS, POST_TYPE_LABELS,
} from "@/lib/posts-utils";
import { approvePost, requestChanges, addClientComment } from "./approval-actions";

interface ApprovalCardProps {
  post: PostRow;
  comments: PostComment[];
  onDone?: () => void;
}

export function ApprovalCard({ post, comments: initialComments }: ApprovalCardProps) {
  const [comments,      setComments]      = useState(initialComments);
  const [commentBody,   setCommentBody]   = useState("");
  const [rejReason,     setRejReason]     = useState("");
  const [showRejForm,   setShowRejForm]   = useState(false);
  const [localStatus,   setLocalStatus]   = useState(post.status);
  const [isPending,     startTransition]  = useTransition();

  function handleApprove() {
    startTransition(async () => {
      await approvePost(post.id);
      setLocalStatus("approved");
    });
  }

  function handleRequestChanges(e: React.FormEvent) {
    e.preventDefault();
    if (!rejReason.trim()) return;
    startTransition(async () => {
      await requestChanges(post.id, rejReason);
      setLocalStatus("rejected");
      setShowRejForm(false);
    });
  }

  function handleComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentBody.trim()) return;
    const body = commentBody.trim();
    startTransition(async () => {
      await addClientComment(post.id, body);
      setComments(prev => [...prev, {
        id: Date.now().toString(),
        post_id: post.id,
        user_id: "",
        role: "client",
        body,
        created_at: new Date().toISOString(),
      }]);
      setCommentBody("");
    });
  }

  const scheduledDate = post.scheduled_at
    ? new Date(post.scheduled_at).toLocaleDateString("pt-BR", {
        weekday: "long", day: "2-digit", month: "long", year: "numeric",
      })
    : "Sem data definida";

  return (
    <div
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: localStatus === "approved" ? "4px 4px 0px 0px #AAFF00" : "4px 4px 0px 0px #FF6100" }}
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#1A1A1A]/10 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-black text-[#1A1A1A]">{post.title}</h3>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5">{scheduledDate}</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#1A1A1A]/08 text-[#1A1A1A]/60 rounded-full border border-[#1A1A1A]/10">
            {POST_TYPE_LABELS[post.post_type] ?? post.post_type}
          </span>
          {post.platforms.map(p => (
            <span
              key={p}
              className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: PLATFORM_COLORS[p as keyof typeof PLATFORM_COLORS] }}
            >
              {PLATFORM_LABELS[p as keyof typeof PLATFORM_LABELS]}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#1A1A1A]/10">

        {/* LEFT: Content preview */}
        <div className="px-5 py-4">
          {/* Media placeholder */}
          {post.media_urls.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {post.media_urls.slice(0, 4).map((_, i) => (
                <div key={i} className="aspect-square bg-[#1A1A1A]/05 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🖼️</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="aspect-video bg-[#1A1A1A]/05 rounded-xl flex items-center justify-center mb-4">
              <span className="text-3xl">📭</span>
            </div>
          )}

          {/* Caption */}
          {post.caption && (
            <div className="mb-3">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1">Caption</p>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed whitespace-pre-wrap">{post.caption}</p>
            </div>
          )}

          {/* Hashtags */}
          {post.hashtags && (
            <div className="flex flex-wrap gap-1">
              {post.hashtags.split(/\s+/).filter(h => h.startsWith("#")).map(h => (
                <span key={h} className="text-[10px] font-medium text-[#FF6100]">{h}</span>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Comments + Actions */}
        <div className="px-5 py-4 flex flex-col gap-4">

          {/* Comments */}
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-2">Comentários</p>
            <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-3">
              {comments.length === 0 && (
                <p className="text-xs text-[#1A1A1A]/30 text-center py-2">Nenhum comentário ainda.</p>
              )}
              {comments.map(c => (
                <div
                  key={c.id}
                  className={`rounded-xl px-3 py-2 text-xs ${
                    c.role === "admin"
                      ? "bg-[#FF6100]/10 border border-[#FF6100]/20 mr-6"
                      : "bg-[#1A1A1A]/05 border border-[#1A1A1A]/10 ml-6"
                  }`}
                >
                  <p className={`text-[9px] font-black uppercase tracking-wider mb-0.5 ${c.role === "admin" ? "text-[#FF6100]" : "text-[#1A1A1A]/50"}`}>
                    {c.role === "admin" ? "ZBRAND" : "Você"}
                  </p>
                  <p className="text-[#1A1A1A]/70">{c.body}</p>
                </div>
              ))}
            </div>

            {/* Comment input */}
            <form onSubmit={handleComment} className="flex gap-2">
              <input
                value={commentBody}
                onChange={e => setCommentBody(e.target.value)}
                placeholder="Deixar comentário..."
                className="flex-1 border border-[#1A1A1A]/20 rounded-xl px-3 py-1.5 text-xs text-[#1A1A1A] focus:border-[#FF6100] outline-none"
              />
              <button
                type="submit"
                disabled={isPending || !commentBody.trim()}
                className="px-3 py-1.5 bg-[#1A1A1A]/08 border border-[#1A1A1A]/15 text-[#1A1A1A]/60 text-xs font-bold rounded-xl hover:border-[#FF6100] transition-colors disabled:opacity-30"
              >
                Enviar
              </button>
            </form>
          </div>

          {/* Approval actions */}
          {localStatus === "pending_approval" && (
            <div className="flex flex-col gap-2 pt-2 border-t border-[#1A1A1A]/10">
              <button
                onClick={handleApprove}
                disabled={isPending}
                className="w-full py-2.5 rounded-xl border-2 border-[#1A1A1A] bg-[#AAFF00] text-[#1A1A1A] font-black text-sm uppercase tracking-widest hover:-translate-y-0.5 transition-transform disabled:opacity-50"
                style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
              >
                ✓ Aprovar post
              </button>

              {!showRejForm ? (
                <button
                  onClick={() => setShowRejForm(true)}
                  className="w-full py-2 rounded-xl border-2 border-[#FF6100] text-[#FF6100] font-black text-sm uppercase tracking-widest hover:bg-[#FF6100]/05 transition-colors"
                >
                  ✗ Solicitar alteração
                </button>
              ) : (
                <form onSubmit={handleRequestChanges} className="flex flex-col gap-2">
                  <textarea
                    value={rejReason}
                    onChange={e => setRejReason(e.target.value)}
                    rows={2}
                    placeholder="Descreva o que precisa ser alterado..."
                    autoFocus
                    className="border-2 border-[#FF6100]/40 rounded-xl px-3 py-2 text-sm text-[#1A1A1A] focus:border-[#FF6100] outline-none resize-none"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setShowRejForm(false)}
                      className="flex-1 py-2 text-xs font-bold text-[#1A1A1A]/40 border border-[#1A1A1A]/15 rounded-xl hover:border-[#1A1A1A]/30 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isPending || !rejReason.trim()}
                      className="flex-1 py-2 text-xs font-black uppercase tracking-wider bg-[#FF6100] text-white rounded-xl border-2 border-[#1A1A1A] hover:-translate-y-0.5 transition-transform disabled:opacity-40"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {localStatus === "approved" && (
            <div className="flex items-center gap-2 pt-2 border-t border-[#1A1A1A]/10">
              <div className="w-2 h-2 bg-[#AAFF00] rounded-full" />
              <span className="text-xs font-black text-[#5a8a00] uppercase tracking-wider">Post aprovado ✓</span>
            </div>
          )}

          {localStatus === "rejected" && (
            <div className="pt-2 border-t border-[#1A1A1A]/10">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-xs font-black text-red-500 uppercase tracking-wider">Alteração solicitada</span>
              </div>
              {post.rejection_reason && (
                <p className="text-xs text-[#1A1A1A]/50 italic">{post.rejection_reason}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
