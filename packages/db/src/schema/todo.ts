import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { user } from "./users.js";

export const todo = pgTable("todo", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  content: text().notNull(),
  isComplete: boolean().default(false)
});