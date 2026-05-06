"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function createUserAction(formData: FormData) {
  await requireAdmin();

  const clientId   = formData.get("clientId") as string;
  const name       = (formData.get("name") as string).trim();
  const email      = (formData.get("email") as string).trim().toLowerCase();
  const password   = (formData.get("password") as string).trim();
  const role       = (formData.get("role") as string) || "owner";

  const supabaseAdmin = createAdminSupabaseClient();

  // Verificar se já existe vínculo com essa empresa
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const existingAuthUser = existingUsers?.users?.find((u) => u.email === email);

  if (existingAuthUser) {
    const { data: existingLink } = await supabaseAdmin
      .from("client_users")
      .select("id")
      .eq("client_id", clientId)
      .eq("user_id", existingAuthUser.id)
      .single();

    if (existingLink) {
      redirect(
        `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
          "Este email já está vinculado a esta empresa."
        )}`
      );
    }
  }

  // Criar usuário direto com senha (sem invite por email)
  // email_confirm: true → já confirma automaticamente, sem precisar de link
  const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: "client", name },
  });

  if (createError) {
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao criar usuário: ${createError.message}`
      )}`
    );
  }

  const userId = newUser.user.id;

  // Vincular à empresa
  const { error: linkError } = await supabaseAdmin.from("client_users").insert({
    client_id: clientId,
    user_id: userId,
    name,
    email,
    role,
    status: "active",
    accepted_at: new Date().toISOString(),
  });

  if (linkError) {
    // Reverter: deletar o usuário criado
    await supabaseAdmin.auth.admin.deleteUser(userId);
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao vincular usuário: ${linkError.message}`
      )}`
    );
  }

  // Disparar webhook para o Make enviar o email de boas-vindas
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_USER_CREATED;
  if (makeWebhookUrl) {
    try {
      await fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          loginUrl: "https://www.zbrand.com.br/area-do-cliente",
          role,
        }),
      });
    } catch {
      // Falha no webhook não impede o cadastro
    }
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  revalidatePath(`/admin/clientes/${clientId}`);
  redirect(`/admin/clientes/${clientId}/usuarios?success=created`);
}

export async function resetPasswordAction(formData: FormData) {
  await requireAdmin();

  const clientId  = formData.get("clientId") as string;
  const userId    = formData.get("userId") as string;
  const name      = formData.get("name") as string;
  const email     = formData.get("email") as string;
  const password  = (formData.get("password") as string).trim();

  const supabaseAdmin = createAdminSupabaseClient();

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password });

  if (error) {
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao redefinir senha: ${error.message}`
      )}`
    );
  }

  // Disparar webhook para o Make enviar email com nova senha
  const makeWebhookUrl = process.env.MAKE_WEBHOOK_USER_CREATED;
  if (makeWebhookUrl) {
    try {
      await fetch(makeWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          loginUrl: "https://www.zbrand.com.br/area-do-cliente",
          role: "reset",
        }),
      });
    } catch {
      // Falha no webhook não impede o reset
    }
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  redirect(`/admin/clientes/${clientId}/usuarios?success=reset`);
}

export async function removeUserAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const linkId   = formData.get("linkId") as string;

  const supabaseAdmin = createAdminSupabaseClient();

  // Buscar user_id antes de deletar
  const { data: link } = await supabaseAdmin
    .from("client_users")
    .select("user_id")
    .eq("id", linkId)
    .single();

  await supabaseAdmin.from("client_users").delete().eq("id", linkId);

  // Se não tem mais vínculos, deletar do Auth
  if (link?.user_id) {
    const { count } = await supabaseAdmin
      .from("client_users")
      .select("id", { count: "exact", head: true })
      .eq("user_id", link.user_id);

    if (!count || count === 0) {
      await supabaseAdmin.auth.admin.deleteUser(link.user_id);
    }
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  revalidatePath(`/admin/clientes/${clientId}`);
}
