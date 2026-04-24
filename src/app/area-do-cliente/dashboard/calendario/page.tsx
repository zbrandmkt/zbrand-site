import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { CalendarReadonly } from "./calendar-readonly";
import type { PostRow } from "@/types/posts";

export default async function CalendarioClientePage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) redirect("/area-do-cliente/aguardando");

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // Fetch 3 months of posts (prev + current + next)
  const start = new Date(year, month - 1, 1).toISOString();
  const end   = new Date(year, month + 2, 1).toISOString();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", client.id)
    .neq("status", "draft")
    .gte("scheduled_at", start)
    .lt("scheduled_at", end)
    .order("scheduled_at");

  return (
    <CalendarReadonly
      initialPosts={(posts ?? []) as PostRow[]}
      initialYear={year}
      initialMonth={month}
      today={now.toISOString().slice(0, 10)}
    />
  );
}
