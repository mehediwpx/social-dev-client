import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URL);
const db = client.db("socialDevDB");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // JWT plugin: adds GET /api/auth/token (issues a JWT for the session user),
  // GET /api/auth/jwks (public keys the Express backend verifies against) and
  // POST /api/auth/verify-jwt. The default payload is the session user
  // (sub = user id, plus email/name) signed with EdDSA.
  plugins: [jwt()],
});
