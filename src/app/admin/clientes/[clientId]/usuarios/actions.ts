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

export async function inviteUserAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const name     = (formData.get("name") as string).trim();
  const email    = (formData.get("email") as string).trim().toLowerCase();
  const password = (formData.get("password") as string).trim();
  const role     = (formData.get("role") as string) || "owner";

  if (!password || password.length < 8) {
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        "A senha deve ter pelo menos 8 caracteres."
      )}`
    );
  }

  const supabaseAdmin = createAdminSupabaseClient();

  // Verificar se já existe no Auth
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const existingAuthUser = existingUsers?.users?.find((u) => u.email === email);

  let userId: string;

  if (existingAuthUser) {
    userId = existingAuthUser.id;

    // Verificar se já está vinculado a esta empresa
    const { data: existingLink } = await supabaseAdmin
      .from("client_users")
      .select("id")
      .eq("client_id", clientId)
      .eq("user_id", userId)
      .single();

    if (existingLink) {
      redirect(
        `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
          "Este usuário já está vinculado a esta empresa."
        )}`
      );
    }

    // Atualiza a senha e metadados do usuário existente
    await supabaseAdmin.auth.admin.updateUserById(userId, {
      password,
      user_metadata: { role: "client", name },
      email_confirm: true,
    });
  } else {
    // Criar usuário diretamente com senha — sem email de convite
    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
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

    userId = createData.user.id;
  }

  // Vincular à empresa — já ativo, sem precisar de convite
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
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao vincular usuário: ${linkError.message}`
      )}`
    );
  }

  // Buscar nome da empresa para o email de boas-vindas
  const { data: clientData } = await supabaseAdmin
    .from("clients")
    .select("company")
    .eq("id", clientId)
    .single();

  // Disparar webhook Make → envia email de boas-vindas com credenciais
  const webhookUrl = process.env.MAKE_WEBHOOK_USER_CREATED;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          password,
          company: clientData?.company ?? "",
          loginUrl: "https://zbrand.com.br/area-do-cliente",
        }),
      });
    } catch {
      // Não bloqueia o fluxo se o webhook falhar
    }
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  revalidatePath(`/admin/clientes/${clientId}`);
  redirect(`/admin/clientes/${clientId}/usuarios?success=created&name=${encodeURIComponent(name)}`);
}

export async function resendInviteAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const email    = formData.get("email") as string;
  const name     = formData.get("name") as string;

  const supabaseAdmin = createAdminSupabaseClient();

  const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
    redirectTo: "https://www.zbrand.com.br/area-do-cliente/nova-senha",
    data: { role: "client", name },
  });

  if (error && !error.message.includes("already registered")) {
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao reenviar convite: ${error.message}`
      )}`
    );
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  redirect(`/admin/clientes/${clientId}/usuarios?success=resent`);
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

  // Se não tem mais vínculos, deletar do Auth também
  // (permite reenviar convite para o mesmo email sem rate limit de usuário existente)
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
