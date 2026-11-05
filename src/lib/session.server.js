import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * SERVER-ONLY token access for server components / route handlers. The
 * caller's better-auth session cookie (forwarded through next/headers) is
 * exchanged for a JWT via auth.api.getToken → `{ token }`, null if signed
 * out. The client-side twin is session.js ("use client" modules must never
 * import this file — next/headers breaks client bundles).
 */
export async function getAccessTokenServerSide() {
  try {
    const headerList = await headers();
    const { token } = await auth.api.getToken({ headers: headerList });
    return token ?? null;
  } catch {
    // 401 = no session
    return null;
  }
}
