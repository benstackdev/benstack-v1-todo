import { eq } from "drizzle-orm";
import { db } from "../../client.js";
import { user } from "../schema/users.js";

type UserType = typeof user.$inferInsert;

export const insertUser = async (email: UserType["email"], password: UserType["password"]) => {
  try {
    const newUser = await db.insert(user).values({ email, password }).returning();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const selectUserByEmail = async (email: UserType["email"]) => {
  try {
    const fetchedUser = await db
      .select()
      .from(user)
      .where(
        eq(user.email, email)
      );
    return fetchedUser[0];
  } catch (error) {
    throw error;
  }
};