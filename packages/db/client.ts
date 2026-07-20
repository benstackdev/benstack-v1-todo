import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import "dotenv/config";

const queryClient = postgres("postgresql://ben:@localhost:5432/benstack_v1_todo_db");
console.log(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });

export { db };
