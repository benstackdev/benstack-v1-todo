import { Hono } from "hono";
import { authSigninPost, authSignoutPost, authSignupPost, authVerifyGet } from "../controllers/auth-controller.js";

const auth = new Hono();

auth.get('/', (c) => c.text('Auth API'));
auth.get('/verify', authVerifyGet);
auth.post('/sign-up', authSignupPost);
auth.post('/sign-in', authSigninPost);
auth.post('/sign-out', authSignoutPost);

export default auth;