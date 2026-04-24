"use client";

import { useState, useTransition } from "react";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";
import type { PostRow } from "@/types/posts";
import type { CalendarCell } from "@/lib/posts-utils";
import { buildCalendarGrid, groupPostsByDate, MONTH_NAMES_PT } from "@/lib/posts-utils";
import { CalendarGrid } from "./calendar-grid";
import { PostCard } from "./post-card";
import { NewPostModal } from "./new-post-modal";
import { reschedulePost } from "./actions";

interface Client {
  id: string;
  company: string;
}

interface CalendarClientProps {
  initialPosts: PostRow[];
  clients: Client[];
  initialYear: number;
  initialMonth: number; // 0-indexed
  today: string;
  selectedClientId: string;
}

export function CalendarClient({
  initialPosts,
  clients,
  initialYear,
  initialMonth,
  today,
  selectedClientId,
}: CalendarClientProps) {
  const [posts, setPosts] = useState<PostRow[]>(initialPosts);
  const [year, setYear]   = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [clientId, setClientId] = useState(selectedClientId);
  const [, startTransition] = useTransition();

  const grid = buildCalendarGrid(year, month);
  const postsMap = groupPostsByDate(posts);

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  function handleFilterChange(newClientId: string) {
    setClientId(newClientId);
    // Reload page with new filter via URL
    const url = new URL(window.location.href);
    if (newClientId) url.searchParams.set("clientId", newClientId);
    else url.searchParams.delete("clientId");
    window.location.href = url.toString();
  }

  function handleDragEnd(result: DropResult) {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    if (!destination.droppableId.startsWith("day-")) return;

    const newDateStr = destination.droppableId.replace("day-", ""); // "YYYY-MM-DD"
    const post = posts.find(p => p.id === draggableId);
    if (!post) return;

    const oldDate = post.scheduled_at?.slice(0, 10);
    if (oldDate === newDateStr) return; // same day, no-op

    // Preserve original time if exists, else default to noon
    const time = post.scheduled_at ? post.scheduled_at.slice(11, 16) : "12:00";
    const newScheduledAt = `${newDateStr}T${time}:00+00:00`;

    // Optimistic update
    setPosts(prev => prev.map(p =>
      p.id === draggableId ? { ...p, scheduled_at: newScheduledAt } : p
    ));

    // Server update
    startTransition(async () => {
      try {
        await reschedulePost(draggableId, newScheduledAt);
      } catch {
        // Revert on error
        setPosts(prev => prev.map(p =>
          p.id === draggableId ? { ...p, scheduled_at: post.scheduled_at } : p
        ));
      }
    });
  }

  // Legend
  const STATUS_LEGEND = [
    { label: "Rascunho",    color: "#6b7280" },
    { label: "Aguardando", color: "#FF6100" },
    { label: "Aprovado",   color: "#AAFF00" },
    { label: "Rejeitado",  color: "#ef4444" },
    { label: "Publicado",  color: "#00C2FF" },
  ];

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Month navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/15 text-white/50 hover:border-[#FF6100] hover:text-white transition-colors"
            >
              ‹
            </button>
            <h1 className="text-xl font-black text-white min-w-[180px] text-center">
              {MONTH_NAMES_PT[month]} {year}
            </h1>
            <button
              onClick={nextMonth}
              className="w-8 h-8 flex items-center justify-center rounded-xl border border-white/15 text-white/50 hover:border-[#FF6100] hover:text-white transition-colors"
            >
              ›
            </button>
          </div>

          {/* Client filter */}
          <select
            value={clientId}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="bg-[#1A1A1A] border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-bold focus:border-[#FF6100] outline-none"
          >
            <option value="">Todos os clientes</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.company}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          {/* Legend */}
          <div className="flex items-center gap-3">
            {STATUS_LEGEND.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span className="text-[10px] text-white/30 font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          <NewPostModal clients={clients} />
        </div>
      </div>

      {/* Calendar with DnD */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <CalendarGrid
          grid={grid}
          postsMap={postsMap}
          today={today}
          renderCell={(cell: CalendarCell, cellPosts: PostRow[], dateKey: string) => (
            <Droppable droppableId={`day-${dateKey}`} key={dateKey}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`px-1 pb-1 min-h-[72px] transition-colors ${
                    snapshot.isDraggingOver ? "bg-[#FF6100]/10" : ""
                  }`}
                >
                  {cellPosts.map((post, index) => (
                    <Draggable key={post.id} draggableId={post.id} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className="mb-0.5"
                        >
                          <PostCard post={post} isDragging={dragSnapshot.isDragging} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          )}
        />
      </DragDropContext>
    </div>
  );
}
