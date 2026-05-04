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

    // Lê sessão do cookie — sem chamada de rede
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = request.nextUrl;
    const hostname = request.headers.get("host") ?? "";
    const isAdminSubdomain = hostname.startsWith("admin.");

    // ── ADMIN SUBDOMAIN (admin.zbrand.com.br) ────────────────────────
    if (isAdminSubdomain) {
      // Sem sessão → manda para login do site principal
      if (!session) {
        const mainHostname = hostname.replace(/^admin\./, "");
        return NextResponse.redirect(
          `${request.nextUrl.protocol}//${mainHostname}/area-do-cliente`
        );
      }

      // Sessão existe mas não é admin → manda para home do site principal
      const role = session.user?.user_metadata?.role;
      if (role !== "admin") {
        const mainHostname = hostname.replace(/^admin\./, "");
        return NextResponse.redirect(
          `${request.nextUrl.protocol}//${mainHostname}/`
        );
      }

      // É admin: reescreve o path para /admin/*
      // / → /admin
      // /clientes → /admin/clientes
      // /admin/... → já está correto, passa direto
      if (!pathname.startsWith("/admin")) {
        const url = request.nextUrl.clone();
        url.pathname = pathname === "/" ? "/admin" : `/admin${pathname}`;
        return NextResponse.rewrite(url);
      }

      // Path já começa com /admin — deixa passar sem reescrita
      return supabaseResponse;
    }

    // ── SITE PRINCIPAL ────────────────────────────────────────────────

    // Protege o dashboard do cliente — redireciona para login sem sessão
    if (pathname.startsWith("/area-do-cliente/dashboard") && !session) {
      return NextResponse.redirect(new URL("/area-do-cliente", request.url));
    }

    // Protege rotas admin no site principal — sem sessão ou sem role admin
    if (pathname.startsWith("/admin")) {
      if (!session) {
        return NextResponse.redirect(new URL("/area-do-cliente", request.url));
      }
      const role = session.user?.user_metadata?.role;
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Já logado tentando acessar tela de login → vai para dashboard
    if (pathname === "/area-do-cliente" && session) {
      return NextResponse.redirect(
        new URL("/area-do-cliente/dashboard", request.url)
      );
    }

  } catch {
    // Se qualquer coisa falhar, deixa passar sem quebrar o site
    return NextResponse.next({ request });
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Aplica middleware em todas as rotas exceto:
     * - arquivos estáticos (_next/static, _next/image)
     * - favicon, imagens, ícones
     * Necessário para detectar o admin subdomain em qualquer path
     */
    "/((?!_next/static|_next/image|favicon\\.ico|icon\\.png|images|icons|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
