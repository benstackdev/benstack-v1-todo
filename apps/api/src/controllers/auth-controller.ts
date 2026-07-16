import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { query } from "db";
import { hashPassword } from "../utils/hash-password.js";
import { verifyPassword } from "../utils/verify-password.js";
import { generateSessionToken } from "../utils/generate-session-token.js";
import { generateExpiryTimestamp } from "../utils/generate-expiry-timestamp.js";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";

//! Temporary fix, maybe include in .env eventually?
const sessionTokenName = 'session-token';

// Format: routerRouteAction

export const authSignupPost = async (c: Context) => {
  // Body should come in sanitized from api-client
  const body = await c.req.json<{
    email: string,
    password: string;
  }>();

  if (!body.email ||
    !body.password ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
    throw new HTTPException(401, { message: "Sign up failure: Missing or malformed credentials" });
  }

  // Hash plaintext password
  const hashedPassword = await hashPassword(body.password);

  // Check if user already exists in db; if they do, return error
  const userExists = await query.user.selectUserByEmail(body.email);
  if (userExists) {
    return c.json({ error: `User with email ${body.email} already exists.` });
  }

  // Query the database to insert new user
  const newUser = await query.user.insertUser(body.email, hashedPassword);

  if (newUser) {
    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Sign up failure: User not created" });
  }
};

export const authSigninPost = async (c: Context) => {
  const body = await c.req.json<{
    email: string,
    password: string;
  }>(); // sanitized from api-client

  if (!body.email ||
    !body.password ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
    throw new HTTPException(401, { message: "Sign in failure: missing or malformed credentials" });
  }

  const userRecord = await query.user.selectUserByEmail(body.email);

  if (!userRecord) {
    return c.json({ error: `User with email ${body.email} could not be found or does not exist.` });
  }

  // Check passwords match
  const passwordMatch = await verifyPassword(userRecord.password, body.password);

  if (!passwordMatch) {
    return c.json({ error: `Incorrect password for user ${body.email}.` });
  }

  // Clean up any expired sessions for user
  await query.session.deleteExpiredUserSessions(userRecord.id, new Date());

  // Create new session for user
  const sessionToken = generateSessionToken();
  const sessionExpiresAt = generateExpiryTimestamp(3600); // expire in 60 minutes (3600 seconds)

  const session = await query.session.insertSession(userRecord.id, sessionToken, sessionExpiresAt);

  if (session) {
    // Set session cookie
    setCookie(c, sessionTokenName, sessionToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: sessionExpiresAt
    });

    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Session not created" });
  }
};

export const authSignoutPost = async (c: Context) => {
  const body = await c.req.json<{
    email: string;
  }>();

  if (!body.email || typeof body.email !== 'string') {
    throw new HTTPException(401, { message: "Sign out failure: Missing or malformed credentials" });
  }

  const userRecord = await query.user.selectUserByEmail(body.email);
  const deletedSessions = await query.session.deleteAllUserSessions(userRecord.id);

  if (deletedSessions) {
    // Remove session cookie
    deleteCookie(c, sessionTokenName, {
      path: '/',
      httpOnly: true,
      sameSite: 'Lax'
    });

    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "Sign out failure: No sessions deleted or error deleting sessions" });
  }
};

export const authVerifyGet = async (c: Context) => {
  // Get token from body (which is from cookie passed from client)
  const token = getCookie(c, sessionTokenName);

  if (!token) {
    return c.json({ error: "User could not be authenticated" });
  }

  // Verify token is a session in db
  const sessionRecord = await query.session.selectSessionByToken(token);
  const sessionUser = await query.user.selectUserById(sessionRecord?.userId);

  if (sessionRecord && sessionUser) {
    return c.json({ success: "ok", user: sessionUser });
  } else {
    return c.json({ error: "User could not be authenticated" });
  }
};