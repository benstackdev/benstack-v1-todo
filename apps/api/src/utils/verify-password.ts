import * as argon2 from "argon2";

export const verifyPassword = async (hash: string, plaintext: string) => {
  try {
    const isMatch = await argon2.verify(hash, plaintext);
    return isMatch;
  } catch (error) {
    throw error;
  }
};