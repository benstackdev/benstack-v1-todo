import { Context, Hono } from "hono";
import { authSigninPost, authSignoutPost, authSignupPost, authVerify } from "../controllers/auth-controller.js";

const auth = new Hono();

auth.get('/', (c) => c.text('Auth API'));
auth.get('/verify', authVerify, (c: Context) => c.json({ success: "ok" }));
auth.post('/sign-up', authSignupPost);
auth.post('/sign-in', authSigninPost);
auth.post('/sign-out', authSignoutPost);

export default auth;