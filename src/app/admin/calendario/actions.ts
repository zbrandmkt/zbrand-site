"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

async function getAdminUser() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Acesso negado.");
  }
  return { supabase, user };
}

// ─── POST CRUD ────────────────────────────────────────────────────────────────

export async function createPost(formData: FormData) {
  const { supabase, user } = await getAdminUser();

  const clientId    = formData.get("clientId")   as string;
  const title       = formData.get("title")       as string;
  const caption     = formData.get("caption")     as string;
  const hashtags    = formData.get("hashtags")    as string;
  const postType    = formData.get("postType")    as string;
  const platforms   = formData.getAll("platforms") as string[];
  const scheduledAt = formData.get("scheduledAt") as string | null;
  const status      = (formData.get("status") as string) || "draft";

  const { data, error } = await supabase.from("posts").insert({
    client_id:    clientId,
    created_by:   user.id,
    title,
    caption,
    hashtags,
    post_type:    postType,
    platforms,
    scheduled_at: scheduledAt || null,
    status,
  }).select("id").single();

  if (error) throw new Error(error.message);

  revalidatePath("/admin/calendario");
  return data.id as string;
}

export async function updatePost(formData: FormData) {
  const { supabase } = await getAdminUser();

  const postId      = formData.get("postId")     as string;
  const title       = formData.get("title")      as string;
  const caption     = formData.get("caption")    as string;
  const hashtags    = formData.get("hashtags")   as string;
  const postType    = formData.get("postType")   as string;
  const platforms   = formData.getAll("platforms") as string[];
  const scheduledAt = formData.get("scheduledAt") as string | null;
  const status      = formData.get("status")     as string;
  const mediaUrls   = formData.get("mediaUrls");

  const update: Record<string, unknown> = {
    title,
    caption,
    hashtags,
    post_type:    postType,
    platforms,
    scheduled_at: scheduledAt || null,
    status,
  };

  if (mediaUrls !== null) {
    try { update.media_urls = JSON.parse(mediaUrls as string); } catch { /* skip */ }
  }

  const { error } = await supabase.from("posts").update(update).eq("id", postId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/calendario");
  revalidatePath(`/admin/calendario/${postId}`);
  revalidatePath("/area-do-cliente/dashboard/calendario");
}

export async function reschedulePost(postId: string, newScheduledAt: string) {
  const { supabase } = await getAdminUser();

  const { error } = await supabase
    .from("posts")
    .update({ scheduled_at: newScheduledAt })
    .eq("id", postId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/calendario");
  revalidatePath("/area-do-cliente/dashboard/calendario");
}

export async function sendForApproval(postId: string) {
  const { supabase } = await getAdminUser();

  const { error } = await supabase
    .from("posts")
    .update({ status: "pending_approval" })
    .eq("id", postId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/calendario");
  revalidatePath(`/admin/calendario/${postId}`);
  revalidatePath("/area-do-cliente/dashboard/aprovacoes");
  revalidatePath("/area-do-cliente/dashboard/calendario");
}

export async function deletePost(postId: string) {
  const { supabase } = await getAdminUser();

  // Get media_urls to clean up storage
  const { data: post } = await supabase
    .from("posts")
    .select("media_urls, client_id")
    .eq("id", postId)
    .single();

  if (post?.media_urls?.length) {
    await supabase.storage.from("post-media").remove(post.media_urls);
  }

  const { error } = await supabase.from("posts").delete().eq("id", postId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/calendario");
}

export async function addAdminComment(postId: string, body: string) {
  const { supabase, user } = await getAdminUser();

  const { error } = await supabase.from("post_comments").insert({
    post_id: postId,
    user_id: user.id,
    role:    "admin",
    body,
  });

  if (error) throw new Error(error.message);
  revalidatePath(`/admin/calendario/${postId}`);
  revalidatePath("/area-do-cliente/dashboard/aprovacoes");
}

export async function markAsPublished(postId: string) {
  const { supabase } = await getAdminUser();
  const { error } = await supabase.from("posts").update({ status: "published", published_at: new Date().toISOString() } as Record<string, unknown>).eq("id", postId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/calendario");
  revalidatePath("/area-do-cliente/dashboard/calendario");
}
