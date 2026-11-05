import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Proxy (Next 16's replacement for middleware.js) securing the frontend:
 * private routes require a better-auth session cookie, otherwise the user
 * is redirected to /login. Any page turned private should be added to the
 * matcher below.
 */
const PROTECTED_ROUTES = ["/add-event", "/joined-events", "/manage-events"];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some(
    (route) =>
      pathname === route || pathname.startsWith(`${route}/`),
  );
  if (!isProtected) {
    return NextResponse.next();
  }

  // Cookie-presence check (full session verification happens later in the
  // better-auth session lookup — these pages are client-guarded too).
  const sessionCookie = getSessionCookie(request, {
    cookiePrefix: "better-auth",
  });
  if (sessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/add-event/:path*",
    "/joined-events/:path*",
    "/manage-events/:path*",
  ],
};
