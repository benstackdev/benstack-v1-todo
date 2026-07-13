import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

//! refactor to use env eventually
const db_url = "postgresql://ben:@localhost:5432/benstack_v1_todo_db";

const queryClient = postgres(db_url);
const db = drizzle({ client: queryClient });

export { db };
