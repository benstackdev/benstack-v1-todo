import { Hono } from "hono";
import { authSigninPost, authSignupPost } from "../controllers/auth-controller.js";

const auth = new Hono();

auth.get('/', (c) => c.text('Auth API'));
auth.post('/sign-up', authSignupPost);
auth.post('/sign-in', authSigninPost);

export default auth;