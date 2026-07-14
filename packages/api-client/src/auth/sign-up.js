import * as z from "zod";
import { User } from "shared";
import { API_URL } from "../index.js";
export const signup = async (email, password, passwordConfirm) => {
    const errors = [];
    // Check given passwords match
    if (password !== passwordConfirm)
        errors.push("Passwords do not match");
    // Validate given email and password
    try {
        User.Email.parse(email);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            errors.push("Invalid email address");
        }
    }
    try {
        User.Password.parse(password);
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            errors.push("Invalid email address");
        }
    }
    // POST to api: /auth/sign-up
    if (errors.length > 0)
        return errors;
    try {
        const response = await fetch(`${API_URL}/auth/sign-up`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        console.log(response);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        throw error;
    }
};
//# sourceMappingURL=sign-up.js.map