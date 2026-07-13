import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users.js";

export const sessionsTable = pgTable("sessions", {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  token: text().notNull().unique(),
  expiresAt: timestamp({ precision: 6, withTimezone: true }).notNull()
});