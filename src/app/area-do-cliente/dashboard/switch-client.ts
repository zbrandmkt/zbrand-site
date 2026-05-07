"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function switchClientAction(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const pathname = (formData.get("pathname") as string) || "/area-do-cliente/dashboard";

  if (clientId) {
    cookies().set("selected_client_id", clientId, {
      path: "/area-do-cliente",
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      httpOnly: true,
      sameSite: "lax",
    });
  }

  redirect(pathname);
}
