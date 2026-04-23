import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            supabaseResponse = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // getSession lê direto do cookie — sem chamada de rede, sem timeout
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = request.nextUrl;

    // Proteger dashboard — redireciona para login se não tem sessão
    if (pathname.startsWith("/area-do-cliente/dashboard") && !session) {
      return NextResponse.redirect(new URL("/area-do-cliente", request.url));
    }

    // Se já está logado e tenta acessar o login, vai para o dashboard
    if (pathname === "/area-do-cliente" && session) {
      return NextResponse.redirect(
        new URL("/area-do-cliente/dashboard", request.url)
      );
    }
  } catch {
    // Se qualquer coisa falhar no middleware, deixa passar (não quebra o site)
    return NextResponse.next({ request });
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/area-do-cliente/:path*"],
};
