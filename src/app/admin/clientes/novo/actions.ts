"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function createClientAction(formData: FormData) {
  await requireAdmin();

  const company      = (formData.get("company") as string).trim();
  const plan         = (formData.get("plan") as string) || null;
  const whatsapp     = (formData.get("whatsapp") as string).trim() || null;
  const contractStart = (formData.get("contract_start") as string) || null;
  const contractEnd   = (formData.get("contract_end") as string) || null;
  const contractUrl   = (formData.get("contract_url") as string).trim() || null;

  // Dados do primeiro usuário (opcionais)
  const userName     = (formData.get("user_name") as string)?.trim() || null;
  const userEmail    = (formData.get("user_email") as string)?.trim().toLowerCase() || null;
  const userPassword = (formData.get("user_password") as string)?.trim() || null;
  const userRole     = (formData.get("user_role") as string) || "owner";

  const modules = ["trafego", "social", "calendario", "aprovacoes"];
  const permissions = modules.filter((m) => formData.get(`perm_${m}`) === "on");

  const supabaseAdmin = createAdminSupabaseClient();

  // 1. Criar a empresa
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({
      company,
      plan,
      whatsapp,
      permissions,
      status: "active",
      contract_start: contractStart || null,
      contract_end:   contractEnd || null,
      contract_url:   contractUrl || null,
      approved_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (clientError) {
    redirect(
      `/admin/clientes/novo?error=${encodeURIComponent(
        `Erro ao salvar empresa: ${clientError.message}`
      )}`
    );
  }

  // 2. Criar usuário de acesso (se preenchido)
  if (userEmail && userPassword && userName) {
    if (userPassword.length < 8) {
      redirect(
        `/admin/clientes/novo?error=${encodeURIComponent(
          "A senha deve ter pelo menos 8 caracteres."
        )}`
      );
    }

    // Verificar se email já existe
    const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
    const existingAuthUser = existingUsers?.users?.find((u) => u.email === userEmail);

    let userId: string;

    if (existingAuthUser) {
      userId = existingAuthUser.id;
      // Atualiza senha e metadados
      await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: userPassword,
        user_metadata: { role: "client", name: userName },
        email_confirm: true,
      });
    } else {
      const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: userEmail,
        password: userPassword,
        email_confirm: true,
        user_metadata: { role: "client", name: userName },
      });

      if (createError) {
        // Empresa já foi criada — redireciona para ela com erro de usuário
        redirect(
          `/admin/clientes/${client.id}/usuarios?error=${encodeURIComponent(
            `Empresa criada, mas erro ao criar usuário: ${createError.message}`
          )}`
        );
      }

      userId = createData.user.id;
    }

    // Vincular usuário à empresa
    await supabaseAdmin.from("client_users").insert({
      client_id:   client.id,
      user_id:     userId,
      name:        userName,
      email:       userEmail,
      role:        userRole,
      status:      "active",
      accepted_at: new Date().toISOString(),
    });

    // Disparar webhook Make → envia email de boas-vindas com credenciais
    const webhookUrl = process.env.MAKE_WEBHOOK_USER_CREATED;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email:    userEmail,
            name:     userName,
            password: userPassword,
            company,
            loginUrl: "https://zbrand.com.br/area-do-cliente",
          }),
        });
      } catch {
        // Não bloqueia o fluxo se o webhook falhar
      }
    }
  }

  redirect(`/admin/clientes/${client.id}?success=created`);
}
