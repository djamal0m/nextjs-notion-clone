import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: NextRequest) {
  const supabase = createClient();
  const response = await supabase.auth.getUser();
  const user = response.data?.user;
  const pageIsDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const pageIsLoginOrSignup: boolean = ["/login", "/signup"].includes(
    request.nextUrl.pathname
  );

  if (pageIsDashboard && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pageIsLoginOrSignup && user) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
