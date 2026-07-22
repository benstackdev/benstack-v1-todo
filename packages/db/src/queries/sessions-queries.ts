import { db } from "../../client.js";
import { session } from "../schema/sessions.js";
import { and, eq, lt, desc } from "drizzle-orm";

type SessionType = typeof session.$inferInsert;

export const insertSession = async (userId: SessionType["userId"], token: SessionType["token"], expiresAt: SessionType["expiresAt"]) => {
  try {
    const newSession = await db.insert(session).values({ userId, token, expiresAt }).returning();

    return newSession;
  } catch (error) {
    throw error;
  }
};

export const selectSessionByToken = async (token: SessionType["token"]) => {
  try {
    if (!token) return;

    const sessionRecord = await db
      .select().from(session)
      .where(eq(session.token, token));

    return sessionRecord[0];
  } catch (error) {
    throw error;
  }
};

export const selectAllUserSessions = async (userId: SessionType["userId"]) => {
  try {
    const userSessions = await db
      .select().from(session)
      .where(eq(session.userId, userId));

    return userSessions;
  } catch (error) {
    throw error;
  }
};

export const deleteSessionById = async (id: SessionType["id"]) => {
  try {
    if (!id) return;

    const deletedSession = await db.delete(session)
      .where(eq(session.id, id)).returning();

    return deletedSession;

  } catch (error) {
    throw error;
  }
};

export const deleteExpiredUserSessions = async (userId: SessionType["userId"], date: Date) => {
  try {
    if (!userId) return;

    const deletedSessions = await db.delete(session)
      .where(and(
        eq(session.userId, userId),
        lt(session.expiresAt, date)
      ));

    return deletedSessions;
  } catch (error) {
    throw error;
  }
};

export const deleteAllUserSessions = async (userId: SessionType["userId"]) => {
  try {
    if (!userId) return;

    const deletedSessions = await db.delete(session)
      .where(eq(session.userId, userId)).returning();

    return deletedSessions;
  } catch (error) {
    throw error;
  }
};