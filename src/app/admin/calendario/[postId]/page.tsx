import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { PostEditor } from "./post-editor";
import type { PostRow } from "@/types/posts";
import type { PostComment } from "@/types/posts";

interface PageProps {
  params: { postId: string };
}

export default async function PostEditorPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient();
  const isNew = params.postId === "new";

  const [{ data: clients }, postResult, commentsResult] = await Promise.all([
    supabase.from("clients").select("id, company").eq("status", "active").order("company"),
    isNew ? Promise.resolve({ data: null }) : supabase.from("posts").select("*").eq("id", params.postId).single(),
    isNew ? Promise.resolve({ data: [] }) : supabase.from("post_comments").select("*").eq("post_id", params.postId).order("created_at"),
  ]);

  if (!isNew && !postResult.data) notFound();

  return (
    <div className="px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {isNew ? "Novo Post" : postResult.data?.title || "Editar Post"}
          </h1>
          <p className="text-sm text-white/40 mt-0.5">
            {isNew ? "Preencha os dados e faça o upload das mídias" : "Edite e envie para aprovação"}
          </p>
        </div>
        <a href="/admin/calendario" className="text-xs text-white/30 hover:text-white/60 transition-colors">
          ← Calendário
        </a>
      </div>

      <PostEditor
        post={isNew ? null : postResult.data as PostRow}
        comments={(commentsResult.data ?? []) as PostComment[]}
        clients={clients ?? []}
      />
    </div>
  );
}
