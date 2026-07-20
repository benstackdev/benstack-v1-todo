import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import auth from './routers/auth-router.js';
import todo from './routers/todo-router.js';
import dotenv from "dotenv";

const app = new Hono();

dotenv.config();

app.use('/*', cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', (c) => c.text('Hello Hono!'));
app.route('/auth', auth);
app.route('/todo', todo);

serve({
  fetch: app.fetch,
  port: 8080
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
