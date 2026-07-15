import * as z from "zod";
import { emailSchema, passwordSchema } from "./user-schema.js";
const signupFormSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
    confirm: passwordSchema
})
    .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ["confirm"]
});
export default signupFormSchema;
//# sourceMappingURL=sign-up-schema.js.map