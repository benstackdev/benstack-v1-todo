import * as argon2 from "argon2";

export const hashPassword = async (plaintext: string) => {
  const hash = await argon2.hash(plaintext);
  return hash;
};