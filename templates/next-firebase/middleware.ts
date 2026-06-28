import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/profile"];

export function middleware(request: NextRequest) {
  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const hasClientSession = request.cookies.get("rapidbuild_auth")?.value === "1";

  if (isProtectedRoute && !hasClientSession) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === "/signin" && hasClientSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/signin"]
};
