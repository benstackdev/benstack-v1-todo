import { db } from "../../client.js";
import { user } from "../schema/users.js";

type NewUser = typeof user.$inferInsert;

export const insertUser = async (email: NewUser["email"], password: NewUser["password"]) => {
  try {
    const newUser = await db.insert(user).values({ email, password }).returning();
    return newUser;
  } catch (error) {
    throw error;
  }
};