import * as z from "zod";
export const Id = z.uuid();
export const Email = z.email({ pattern: z.regexes.html5Email });
export const Password = z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/);
//# sourceMappingURL=user-schema.js.map