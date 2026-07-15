import * as z from "zod";
declare const signupFormSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
    confirm: z.ZodString;
}, z.core.$strip>;
export default signupFormSchema;
//# sourceMappingURL=sign-up-schema.d.ts.map