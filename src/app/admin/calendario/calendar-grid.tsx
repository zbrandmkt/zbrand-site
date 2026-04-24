import type { PostRow } from "@/types/posts";
import type { CalendarCell } from "@/lib/posts-utils";
import { toDateKey, WEEKDAY_NAMES_PT } from "@/lib/posts-utils";

interface CalendarGridProps {
  grid: CalendarCell[][];
  postsMap: Map<string, PostRow[]>;
  today: string; // "YYYY-MM-DD"
  renderCell: (cell: CalendarCell, posts: PostRow[], dateKey: string) => React.ReactNode;
}

export function CalendarGrid({ grid, postsMap, today, renderCell }: CalendarGridProps) {
  return (
    <div className="border border-white/08 rounded-2xl overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-white/08">
        {WEEKDAY_NAMES_PT.map((d) => (
          <div key={d} className="px-2 py-2 text-center text-[10px] font-black uppercase tracking-widest text-white/30">
            {d}
          </div>
        ))}
      </div>

      {/* Rows */}
      {grid.map((row, ri) => (
        <div key={ri} className="grid grid-cols-7 border-b border-white/08 last:border-b-0">
          {row.map((cell) => {
            const key = toDateKey(cell.date);
            const posts = postsMap.get(key) ?? [];
            const isToday = key === today;
            return (
              <div
                key={key}
                className={`border-r border-white/08 last:border-r-0 min-h-[100px] ${
                  cell.isCurrentMonth ? "" : "opacity-30"
                }`}
              >
                {/* Day number */}
                <div className={`flex items-center justify-between px-2 pt-1.5 pb-1`}>
                  <span
                    className={`text-[11px] font-black w-5 h-5 flex items-center justify-center rounded-full ${
                      isToday
                        ? "bg-[#FF6100] text-white"
                        : "text-white/40"
                    }`}
                  >
                    {cell.date.getDate()}
                  </span>
                  {posts.length > 2 && (
                    <span className="text-[9px] text-white/30 font-bold">{posts.length}</span>
                  )}
                </div>
                {/* Injected cell content (droppable + draggable cards) */}
                {renderCell(cell, posts, key)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
