import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { user } from "./users.js";

export const session = pgTable("session", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expiresAt", { precision: 6, withTimezone: true }).notNull()
});