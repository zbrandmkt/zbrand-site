import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ApprovalCard } from "./approval-card";
import type { PostRow, PostComment } from "@/types/posts";

export default async function AprovacoesPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!client) redirect("/area-do-cliente/aguardando");

  // Fetch all non-draft posts for review (pending + approved + rejected)
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", client.id)
    .in("status", ["pending_approval", "approved", "rejected"])
    .order("scheduled_at", { ascending: true });

  // Fetch all comments for these posts
  const postIds = (posts ?? []).map(p => p.id);
  const { data: comments } = postIds.length > 0
    ? await supabase.from("post_comments").select("*").in("post_id", postIds).order("created_at")
    : { data: [] };

  const allPosts = (posts ?? []) as PostRow[];
  const allComments = (comments ?? []) as PostComment[];

  const pending  = allPosts.filter(p => p.status === "pending_approval");
  const approved = allPosts.filter(p => p.status === "approved");
  const rejected = allPosts.filter(p => p.status === "rejected");

  function postComments(postId: string) {
    return allComments.filter(c => c.post_id === postId);
  }

  return (
    <div className="px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Aprovação de Posts</h1>
        <p className="text-sm text-[#1A1A1A]/50 mt-1">
          {pending.length} aguardando aprovação · {approved.length} aprovados · {rejected.length} em revisão
        </p>
      </div>

      {allPosts.length === 0 ? (
        <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-16 text-center" style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}>
          <p className="text-3xl mb-3">📭</p>
          <p className="text-sm font-bold text-[#1A1A1A]/50">Nenhum post para revisar no momento.</p>
          <p className="text-xs text-[#1A1A1A]/30 mt-1">Quando a ZBRAND enviar posts para aprovação, eles aparecerão aqui.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-10">

          {/* Pending */}
          {pending.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-[#FF6100] mb-4 flex items-center gap-2">
                🔴 Aguardando sua aprovação ({pending.length})
              </h2>
              <div className="flex flex-col gap-5">
                {pending.map(post => (
                  <ApprovalCard key={post.id} post={post} comments={postComments(post.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Rejected (needs revision) */}
          {rejected.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-[#FF6100] mb-4 flex items-center gap-2">
                🔄 Em revisão pela equipe ({rejected.length})
              </h2>
              <div className="flex flex-col gap-5">
                {rejected.map(post => (
                  <ApprovalCard key={post.id} post={post} comments={postComments(post.id)} />
                ))}
              </div>
            </section>
          )}

          {/* Approved */}
          {approved.length > 0 && (
            <section>
              <h2 className="text-xs font-black uppercase tracking-widest text-[#AAFF00] mb-4 flex items-center gap-2">
                🟢 Aprovados ({approved.length})
              </h2>
              <div className="flex flex-col gap-5">
                {approved.map(post => (
                  <ApprovalCard key={post.id} post={post} comments={postComments(post.id)} />
                ))}
              </div>
            </section>
          )}

        </div>
      )}
    </div>
  );
}
