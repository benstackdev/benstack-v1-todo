import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { insertUser } from "db";

// Format: routerRouteAction

export const authSignupPost = async (c: Context) => {
  // Body should come in sanitized from api-client
  const body = await c.req.parseBody();

  if (!body.email ||
    !body.password ||
    typeof body.email !== 'string' ||
    typeof body.password !== 'string') {
    throw new HTTPException(401, { message: "Missing or malformed credentials" });
  }

  // Query the database to insert new user
  const newUser = await insertUser(body.email, body.password);

  if (newUser) {
    return c.json({ success: "ok" });
  } else {
    throw new HTTPException(500, { message: "User not created" });
  }
};