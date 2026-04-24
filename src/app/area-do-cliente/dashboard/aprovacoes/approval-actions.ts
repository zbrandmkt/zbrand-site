"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

async function getClientRecord() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Não autenticado.");

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) throw new Error("Cliente não encontrado.");
  return { supabase, user, client };
}

export async function approvePost(postId: string) {
  const { supabase, user, client } = await getClientRecord();

  // Verify post belongs to client
  const { data: post } = await supabase
    .from("posts")
    .select("client_id")
    .eq("id", postId)
    .single();

  if (!post || post.client_id !== client.id) throw new Error("Acesso negado.");

  const { error } = await supabase.from("posts").update({
    status:      "approved",
    approved_at: new Date().toISOString(),
    approved_by: user.id,
  }).eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/area-do-cliente/dashboard/aprovacoes");
  revalidatePath("/area-do-cliente/dashboard/calendario");
  revalidatePath("/area-do-cliente/dashboard");
  revalidatePath("/admin/calendario");
}

export async function requestChanges(postId: string, reason: string) {
  const { supabase, client } = await getClientRecord();

  const { data: post } = await supabase
    .from("posts")
    .select("client_id")
    .eq("id", postId)
    .single();

  if (!post || post.client_id !== client.id) throw new Error("Acesso negado.");

  const { error } = await supabase.from("posts").update({
    status:           "rejected",
    rejection_reason: reason,
  }).eq("id", postId);

  if (error) throw new Error(error.message);

  revalidatePath("/area-do-cliente/dashboard/aprovacoes");
  revalidatePath("/area-do-cliente/dashboard/calendario");
  revalidatePath("/admin/calendario");
}

export async function addClientComment(postId: string, body: string) {
  const { supabase, user, client } = await getClientRecord();

  const { data: post } = await supabase
    .from("posts")
    .select("client_id")
    .eq("id", postId)
    .single();

  if (!post || post.client_id !== client.id) throw new Error("Acesso negado.");

  const { error } = await supabase.from("post_comments").insert({
    post_id: postId,
    user_id: user.id,
    role:    "client",
    body,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/area-do-cliente/dashboard/aprovacoes");
  revalidatePath("/admin/calendario");
}
