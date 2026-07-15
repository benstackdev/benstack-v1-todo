import * as z from "zod";
import { emailSchema, passwordSchema } from "./user-schema.js";

const signinFormSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

export default signinFormSchema;