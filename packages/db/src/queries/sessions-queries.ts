import { db } from "../../client.js";
import { session } from "../schema/sessions.js";
import type { user } from "../schema/users.js";

type NewSession = typeof session.$inferInsert;

export const insertSession = async (userId: NewSession["userId"], token: NewSession["token"], expiresAt: NewSession["expiresAt"]) => {
  try {
    const newSession = await db.insert(session).values({ userId, token, expiresAt }).returning();

    return newSession;
  } catch (error) {
    throw error;
  }
};