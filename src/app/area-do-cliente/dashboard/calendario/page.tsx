import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { CalendarReadonly } from "./calendar-readonly";
import type { PostRow } from "@/types/posts";

export default async function CalendarioClientePage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";

  const supabaseAdmin = createAdminSupabaseClient();
  const { data: link } = await supabaseAdmin
    .from("client_users")
    .select("client_id, clients(permissions)")
    .eq("user_id", user.id)
    .neq("status", "suspended")
    .single();

  if (!link) redirect("/area-do-cliente/aguardando");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permissions: string[] = (link?.clients as any)?.permissions ?? ["calendario"];
  if (!isAdmin && !permissions.includes("calendario")) {
    redirect("/area-do-cliente/dashboard");
  }

  const clientId = link.client_id as string;

  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const start = new Date(year, month - 1, 1).toISOString();
  const end   = new Date(year, month + 2, 1).toISOString();

  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", clientId)
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
