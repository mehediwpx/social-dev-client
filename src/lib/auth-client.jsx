import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  // Mirrors the server's `jwt()` plugin and adds JWKS access on the client.
  plugins: [jwtClient()],
});
