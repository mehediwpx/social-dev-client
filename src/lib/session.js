/**
 * Token access for the Express backend — CLIENT-SAFE module ("use client"
 * components import this). The server-side twin is session.server.js; keep
 * server-only imports (next/headers, @/lib/auth) out of this file or client
 * bundles break.
 *
 * Tokens come from better-auth's JWT plugin: with a valid session cookie,
 * `GET /api/auth/token` returns `{ token }` — a JWT whose payload is the
 * session user (`sub` = user id, plus `email`). The backend verifies the
 * signature against better-auth's JWKS and rejects anything else.
 */

/** The session cookie is sent automatically on this same-origin request. */
export async function getAccessTokenClientSide() {
  try {
    const res = await fetch("/api/auth/token", {
      credentials: "include", // send the better-auth session cookie
    });
    if (!res.ok) {
      if (res.status !== 401) {
        console.error("Token request failed:", res.status);
      }
      return null;
    }
    const data = await res.json();
    return data?.token ?? null;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    return null;
  }
}

/** Auth headers for a backend fetch; resolves to `{}` without a session. */
export async function getAuthHeaders() {
  const token = await getAccessTokenClientSide();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
