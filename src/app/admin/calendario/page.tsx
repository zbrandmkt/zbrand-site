import { createServerSupabaseClient } from "@/lib/supabase-server";
import { CalendarClient } from "./calendar-client";
import type { PostRow } from "@/types/posts";

interface PageProps {
  searchParams: { month?: string; year?: string; clientId?: string };
}

export default async function CalendarioPage({ searchParams }: PageProps) {
  const supabase = createServerSupabaseClient();
  const now = new Date();

  const year  = parseInt(searchParams.year  ?? String(now.getFullYear()));
  const month = parseInt(searchParams.month ?? String(now.getMonth())); // 0-indexed
  const selectedClientId = searchParams.clientId ?? "";

  // Month range for query
  const start = new Date(year, month, 1).toISOString();
  const end   = new Date(year, month + 1, 1).toISOString();

  // Fetch posts
  let query = supabase
    .from("posts")
    .select("*")
    .gte("scheduled_at", start)
    .lt("scheduled_at", end)
    .order("scheduled_at");

  if (selectedClientId) {
    query = query.eq("client_id", selectedClientId);
  }

  const [{ data: posts }, { data: clients }] = await Promise.all([
    query,
    supabase.from("clients").select("id, company").eq("status", "active").order("company"),
  ]);

  const today = now.toISOString().slice(0, 10);

  return (
    <CalendarClient
      initialPosts={(posts ?? []) as PostRow[]}
      clients={clients ?? []}
      initialYear={year}
      initialMonth={month}
      today={today}
      selectedClientId={selectedClientId}
    />
  );
}
