import { Hono } from "hono";
import { authSigninPost, authSignoutPost, authSignupPost } from "../controllers/auth-controller.js";

const auth = new Hono();

auth.get('/', (c) => c.text('Auth API'));
auth.post('/sign-up', authSignupPost);
auth.post('/sign-in', authSigninPost);
auth.post('/sign-out', authSignoutPost);

export default auth;