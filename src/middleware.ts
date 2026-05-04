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

    // Lê sessão do cookie — sem chamada de rede, sem timeout
    const { data: { session } } = await supabase.auth.getSession();

    const { pathname } = request.nextUrl;

    // Protege /admin — redireciona para login se sem sessão ou sem role admin
    if (pathname.startsWith("/admin")) {
      if (!session) {
        return NextResponse.redirect(new URL("/area-do-cliente", request.url));
      }
      const role = session.user?.user_metadata?.role;
      if (role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Protege dashboard do cliente — redireciona para login se sem sessão
    if (pathname.startsWith("/area-do-cliente/dashboard") && !session) {
      return NextResponse.redirect(new URL("/area-do-cliente", request.url));
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
  matcher: ["/admin/:path*", "/area-do-cliente/:path*"],
};
