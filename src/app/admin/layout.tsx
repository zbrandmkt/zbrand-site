import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";

export const metadata = { title: "Admin — ZBRAND", robots: "noindex" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Só admins entram
  if (!user || user.user_metadata?.role !== "admin") {
    redirect("/");
  }

  return <>{children}</>;
}
