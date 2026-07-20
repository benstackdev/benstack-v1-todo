import * as z from "zod";

export const todoSchema = z.object({
  content: z.string().min(3, {
    error: "Todo item must have more than 3 characters."
  }).max(100, {
    error: "Todo item must have less than 100 characters."
  }),
  isComplete: z.boolean()
});