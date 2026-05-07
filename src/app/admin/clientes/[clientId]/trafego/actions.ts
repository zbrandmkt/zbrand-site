"use server";

import { revalidatePath } from "next/cache";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

export async function updateWeeklyAction(weekId: string, actionText: string) {
  const supabase = createAdminSupabaseClient();

  const { error } = await supabase
    .from("trafego_weekly")
    .update({ action_text: actionText || null })
    .eq("id", weekId);

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath("/area-do-cliente/dashboard");
  return { success: true };
}
