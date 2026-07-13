import { db } from "../../client.js";
import { session } from "../schema/sessions.js";
import { eq } from "drizzle-orm";

type SessionType = typeof session.$inferInsert;

export const insertSession = async (userId: SessionType["userId"], token: SessionType["token"], expiresAt: SessionType["expiresAt"]) => {
  try {
    const SessionType = await db.insert(session).values({ userId, token, expiresAt }).returning();

    return SessionType;
  } catch (error) {
    throw error;
  }
};

export const selectSessionById = async (id: SessionType["id"]) => {
  try {
    if (!id) return;

    const sessionRecord = await db
      .select().from(session)
      .where(eq(session.id, id));

    return sessionRecord[0];
  } catch (error) {
    throw error;
  }
};

export const deleteAllUserSessions = async (userId: SessionType["userId"]) => {
  try {
    if (!userId) return;

    const deletedSessions = await db.delete(session).where(eq(session.userId, userId)).returning();

    return deletedSessions;
  } catch (error) {
    throw error;
  }
};