import { test, expect } from "@jest/globals";
import { signup } from "../auth/sign-up.js";
test('valid sign up credentials', async () => {
    const data = await signup("ben@example.com", "password1", "password1");
    expect(data).toBe({ success: "ok" });
});
//# sourceMappingURL=sign-up.test.js.map