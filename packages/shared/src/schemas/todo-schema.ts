import * as z from "zod";

const todoContentSchema = z.object({
  content: z.string().min(3).max(100, {
    error: "Todo item must be between 3 and 100 characters."
  })
});