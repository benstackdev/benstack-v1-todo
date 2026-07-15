import * as z from "zod";

export const emailSchema = z
  .email("Invalid email address");

export const passwordSchema = z
  .string()
  .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, {
    error: "Passwords must be 8 characters or longer and contain at least one letter and number"
  });