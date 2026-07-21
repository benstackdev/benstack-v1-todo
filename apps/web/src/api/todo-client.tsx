import * as z from "zod";
import { todoSchema } from "shared";

type APIMethodType = "GET" | "POST" | "PUT" | "DELETE";

export const todoRequest = async (path: string, method: APIMethodType, data?: z.infer<typeof todoSchema>) => {
  const response = await fetch(`http://localhost:8080/todo${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const result = await response.json();

  return result;
};

export const todoCreatePost = async (content: string, isComplete: boolean) => todoRequest("", "POST", { content, isComplete });

export const todoAllGet = async (query?: string) => todoRequest(`${query}`, "GET");

export const todoUpdatePut = async (id: string, content?: string, isComplete?: boolean) => todoRequest(`/${id}`, "PUT", { content, isComplete });

export const todoItemDelete = async (id: string) => todoRequest(`/${id}`, "DELETE");