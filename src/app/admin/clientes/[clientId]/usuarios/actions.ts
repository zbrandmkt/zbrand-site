"use server";

import { revalidatePath } from "next/cache";
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

export async function inviteUserAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const role = (formData.get("role") as string) || "owner";

  const supabaseAdmin = createAdminSupabaseClient();

  // Check if user already exists in auth
  const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
  const existingAuthUser = existingUsers?.users?.find((u) => u.email === email);

  let userId: string;

  if (existingAuthUser) {
    userId = existingAuthUser.id;
    // User already exists — check if already linked to this company
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

    // Only resend invite if user is NOT yet confirmed (pending invite)
    // Confirmed users (email_confirmed_at set) must NOT receive inviteUserByEmail — Supabase rejects it
    const isConfirmed = !!existingAuthUser.email_confirmed_at;
    if (!isConfirmed) {
      const { error: resendError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        redirectTo: "https://www.zbrand.com.br/area-do-cliente/nova-senha",
        data: { role: "client", name },
      });

      if (resendError && !resendError.message.includes("already registered")) {
        redirect(
          `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
            `Erro ao enviar convite: ${resendError.message}`
          )}`
        );
      }
    }
    // If already confirmed: skip invite — just link to company below
  } else {
    // New user — send invite
    const { data: inviteData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: "https://www.zbrand.com.br/area-do-cliente/nova-senha",
      data: { role: "client", name },
    });

    if (inviteError) {
      redirect(
        `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
          `Erro ao enviar convite: ${inviteError.message}`
        )}`
      );
    }

    userId = inviteData.user.id;
  }

  // Insert into client_users
  // If user already existed and is confirmed, mark as active immediately
  const alreadyConfirmed = existingAuthUser?.email_confirmed_at != null;
  const { error: linkError } = await supabaseAdmin.from("client_users").insert({
    client_id: clientId,
    user_id: userId,
    name,
    email,
    role,
    status: alreadyConfirmed ? "active" : "invited",
    ...(alreadyConfirmed ? { accepted_at: new Date().toISOString() } : {}),
  });

  if (linkError) {
    redirect(
      `/admin/clientes/${clientId}/usuarios?error=${encodeURIComponent(
        `Erro ao vincular usuário: ${linkError.message}`
      )}`
    );
  }

  revalidatePath(`/admin/clientes/${clientId}/usuarios`);
  revalidatePath(`/admin/clientes/${clientId}`);
  redirect(`/admin/clientes/${clientId}/usuarios?success=invited`);
}

export async function removeUserAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const linkId = formData.get("linkId") as string;

  const supabaseAdmin = createAdminSupabaseClient();

  // Buscar o user_id antes de deletar o vínculo
  const { data: link } = await supabaseAdmin
    .from("client_users")
    .select("user_id")
    .eq("id", linkId)
    .single();

  // Remover da junction table
  await supabaseAdmin.from("client_users").delete().eq("id", linkId);

  // Se o usuário não está vinculado a nenhuma outra empresa, deletar do Auth também
  // Assim o convite pode ser reenviado sem conflito ou rate limit
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

export async function resendInviteAction(formData: FormData) {
  await requireAdmin();

  const clientId = formData.get("clientId") as string;
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;

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
