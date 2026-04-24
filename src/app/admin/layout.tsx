import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { AdminSidebar } from "./sidebar";

export const metadata = { title: "Admin — ZBRAND", robots: "noindex" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || user.user_metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-[#f6f6f6]">
      <AdminSidebar />
      <main className="flex-1 ml-56 min-h-screen text-[#1A1A1A]">
        {children}
      </main>
    </div>
  );
}
