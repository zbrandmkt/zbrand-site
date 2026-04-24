"use client";

import { useState } from "react";
import type { PostRow } from "@/types/posts";
import {
  buildCalendarGrid, groupPostsByDate, toDateKey,
  MONTH_NAMES_PT, WEEKDAY_NAMES_PT, STATUS_COLORS, POST_TYPE_LABELS, PLATFORM_LABELS, PLATFORM_COLORS,
} from "@/lib/posts-utils";

interface CalendarReadonlyProps {
  initialPosts: PostRow[];
  initialYear: number;
  initialMonth: number;
  today: string;
}

export function CalendarReadonly({ initialPosts, initialYear, initialMonth, today }: CalendarReadonlyProps) {
  const [year,  setYear]  = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [selectedPost, setSelectedPost] = useState<PostRow | null>(null);

  const grid = buildCalendarGrid(year, month);
  const postsMap = groupPostsByDate(initialPosts);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  const STATUS_LEGEND = [
    { label: "Aguardando", color: "#FF6100" },
    { label: "Aprovado",   color: "#AAFF00" },
    { label: "Publicado",  color: "#00C2FF" },
    { label: "Revisão",    color: "#ef4444" },
  ];

  return (
    <div className="px-6 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Calendário de Conteúdo</h1>
          <p className="text-sm text-[#1A1A1A]/40 mt-0.5">Posts planejados pela equipe ZBRAND</p>
        </div>
        <div className="flex items-center gap-3">
          {STATUS_LEGEND.map(s => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-[10px] text-[#1A1A1A]/40 font-medium">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Month nav */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-xl border-2 border-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:border-[#FF6100] hover:text-[#FF6100] transition-colors font-bold">‹</button>
        <h2 className="text-lg font-black text-[#1A1A1A] min-w-[180px] text-center">{MONTH_NAMES_PT[month]} {year}</h2>
        <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-xl border-2 border-[#1A1A1A]/10 text-[#1A1A1A]/40 hover:border-[#FF6100] hover:text-[#FF6100] transition-colors font-bold">›</button>
      </div>

      {/* Calendar grid */}
      <div className="border-2 border-[#1A1A1A] rounded-2xl overflow-hidden" style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}>
        {/* Weekday headers */}
        <div className="grid grid-cols-7 bg-[#1A1A1A]">
          {WEEKDAY_NAMES_PT.map(d => (
            <div key={d} className="px-2 py-2 text-center text-[10px] font-black uppercase tracking-widest text-white/60">{d}</div>
          ))}
        </div>

        {/* Day rows */}
        {grid.map((row, ri) => (
          <div key={ri} className="grid grid-cols-7 border-t-2 border-[#1A1A1A]">
            {row.map((cell) => {
              const key = toDateKey(cell.date);
              const posts = postsMap.get(key) ?? [];
              const isToday = key === today;
              return (
                <div
                  key={key}
                  className={`border-r-2 border-[#1A1A1A] last:border-r-0 min-h-[90px] bg-white ${cell.isCurrentMonth ? "" : "bg-[#1A1A1A]/02"}`}
                >
                  <div className="px-2 pt-1.5">
                    <span className={`text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full ${
                      isToday ? "bg-[#FF6100] text-white" : cell.isCurrentMonth ? "text-[#1A1A1A]/60" : "text-[#1A1A1A]/20"
                    }`}>
                      {cell.date.getDate()}
                    </span>
                  </div>
                  <div className="px-1 pb-1 flex flex-col gap-0.5">
                    {posts.slice(0, 3).map(post => (
                      <button
                        key={post.id}
                        onClick={() => setSelectedPost(post)}
                        className="w-full text-left rounded-lg px-1.5 py-1 text-[9px] font-bold truncate transition-opacity hover:opacity-80"
                        style={{
                          backgroundColor: `${STATUS_COLORS[post.status]}20`,
                          color: STATUS_COLORS[post.status],
                          borderLeft: `2px solid ${STATUS_COLORS[post.status]}`,
                        }}
                      >
                        {post.title || "Post"}
                      </button>
                    ))}
                    {posts.length > 3 && (
                      <span className="text-[9px] text-[#1A1A1A]/30 font-medium px-1">+{posts.length - 3}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Post detail modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
          <div
            className="relative bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 w-full max-w-lg"
            style={{ boxShadow: "6px 6px 0px 0px #1A1A1A" }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-black text-[#1A1A1A] text-lg">{selectedPost.title}</h3>
                {selectedPost.scheduled_at && (
                  <p className="text-xs text-[#1A1A1A]/40 mt-0.5">
                    {new Date(selectedPost.scheduled_at).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" })}
                  </p>
                )}
              </div>
              <button onClick={() => setSelectedPost(null)} className="text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-colors text-lg font-bold">✕</button>
            </div>

            {/* Status + platforms */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span
                className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white"
                style={{ backgroundColor: STATUS_COLORS[selectedPost.status] }}
              >
                {selectedPost.status === "pending_approval" ? "Aguardando aprovação" :
                 selectedPost.status === "approved" ? "Aprovado" :
                 selectedPost.status === "published" ? "Publicado" :
                 selectedPost.status === "rejected" ? "Em revisão" : selectedPost.status}
              </span>
              <span className="text-[10px] font-bold text-[#1A1A1A]/40 px-2 py-0.5 bg-[#1A1A1A]/05 rounded-full border border-[#1A1A1A]/10">
                {POST_TYPE_LABELS[selectedPost.post_type]}
              </span>
              {selectedPost.platforms.map(p => (
                <span
                  key={p}
                  className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: PLATFORM_COLORS[p as keyof typeof PLATFORM_COLORS] }}
                >
                  {PLATFORM_LABELS[p as keyof typeof PLATFORM_LABELS]}
                </span>
              ))}
            </div>

            {/* Caption */}
            {selectedPost.caption && (
              <div className="bg-[#1A1A1A]/04 rounded-xl p-3 mb-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1">Caption</p>
                <p className="text-sm text-[#1A1A1A]/70 leading-relaxed">{selectedPost.caption}</p>
              </div>
            )}

            {/* Hashtags */}
            {selectedPost.hashtags && (
              <div className="flex flex-wrap gap-1">
                {selectedPost.hashtags.split(/\s+/).filter(h => h.startsWith("#")).map(h => (
                  <span key={h} className="text-[10px] text-[#FF6100] font-medium">{h}</span>
                ))}
              </div>
            )}

            {/* Rejection reason */}
            {selectedPost.status === "rejected" && selectedPost.rejection_reason && (
              <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">Motivo da revisão</p>
                <p className="text-xs text-red-600">{selectedPost.rejection_reason}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
