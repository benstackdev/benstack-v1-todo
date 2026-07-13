import crypto from "node:crypto";

export const generateSessionToken = () => crypto.randomBytes(16).toString('hex');