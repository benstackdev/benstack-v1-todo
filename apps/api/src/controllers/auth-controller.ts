import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { query } from "db";
import { hashPassword } from "../utils/hash-password.js";
import { verifyPassword } from "../utils/verify-password.js";
import { generateSessionToken } from "../utils/generate-session-token.js";
import { generateExpiryTimestamp } from "../utils/generate-expiry-timestamp.js";

// Format: routerRouteAction

export const authSignupPost = async (c: Context) => {
  // Body should come in sanitized from api-client
  const body = await c.req.parseBody();

  if (!body.email ||
    !body.password ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
    throw new HTTPException(401, { message: "Sign up failure: Missing or malformed credentials" });
  }

  // Hash plaintext password (probably should be done on the client but whatever)
  const hashedPassword = await hashPassword(body.password);

  // Query the database to insert new user
  const newUser = await query.insertUser(body.email, hashedPassword);

  if (newUser) {
    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Sign up failure: User not created" });
  }
};

export const authSigninPost = async (c: Context) => {
  const body = await c.req.parseBody(); // sanitized from api-client

  if (!body.email ||
    !body.password ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
    throw new HTTPException(401, { message: "Sign in failure: missing or malformed credentials" });
  }

  const userRecord = await query.selectUserByEmail(body.email);

  if (!userRecord) {
    throw new HTTPException(404, { message: `Sign in failure: User with email ${body.email} could not be found or does not exist.` });
  }

  // Check passwords match
  const passwordMatch = await verifyPassword(userRecord.password, body.password);

  if (!passwordMatch) {
    throw new HTTPException(401, { message: "Sign in failure: Incorrect password" });
  }

  // Create new session for user
  const sessionToken = generateSessionToken();
  const sessionExpiresAt = generateExpiryTimestamp(3600); // expire in 60 minutes (3600 seconds)

  const session = await query.insertSession(userRecord.id, sessionToken, sessionExpiresAt);

  if (session) {
    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Session not created" });
  }
};

export const authSignoutPost = async (c: Context) => {
  const body = await c.req.parseBody();

  if (!body.email || typeof body.email !== 'string') {
    throw new HTTPException(401, { message: "Sign out failure: Missing or malformed credentials" });
  }

  const userRecord = await query.selectUserByEmail(body.email);
  const deletedSessions = await query.deleteAllUserSessions(userRecord.id);

  if (deletedSessions) {
    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Sign out failure: No sessions deleted or error deleting sessions" });
  }
};