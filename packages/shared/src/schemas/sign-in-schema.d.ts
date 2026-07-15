import * as z from "zod";
declare const signinFormSchema: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export default signinFormSchema;
//# sourceMappingURL=sign-in-schema.d.ts.map