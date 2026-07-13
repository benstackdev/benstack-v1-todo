import * as z from "zod";

export const UsersSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  password: z.string()
});