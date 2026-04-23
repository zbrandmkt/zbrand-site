import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

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

  // Refresh session (IMPORTANT: don't remove this)
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Proteger /area-do-cliente/dashboard — redireciona para login se não autenticado
  if (pathname.startsWith("/area-do-cliente/dashboard") && !user) {
    return NextResponse.redirect(new URL("/area-do-cliente", request.url));
  }

  // Se já está logado e tenta acessar o login, redireciona para o dashboard
  if (pathname === "/area-do-cliente" && user) {
    return NextResponse.redirect(new URL("/area-do-cliente/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/area-do-cliente/:path*"],
};
