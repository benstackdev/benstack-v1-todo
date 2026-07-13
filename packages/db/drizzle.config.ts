import { defineConfig } from "drizzle-kit";

const db_url = "postgresql://ben:@localhost:5432/benstack_v1_todo_db";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/*",
  dbCredentials: {
    url: db_url
  },
  out: "./drizzle"
});
