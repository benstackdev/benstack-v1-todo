import { Hono } from "hono";
import { authSignupPost } from "../controllers/auth-controller.js";

const auth = new Hono();

auth.get('/', (c) => c.text('Auth API'));
auth.post('/sign-up', authSignupPost);

export default auth;