import { query } from "db";
import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";

// Format: routerRouteAction

// POST NEW TODO FOR USER
export const todoNewPost = async (c: Context) => {
  const userId = c.var.userId;
  const body = await c.req.json<{
    content: string;
  }>();

  if (!userId || typeof userId !== 'string') {
    throw new HTTPException(401, { message: "Failed to create todo item: invalid user ID" });
  }

  if (!body.content || typeof body.content !== 'string') {
    throw new HTTPException(401, { message: "Failed to create todo item: content could not be found" });
  }

  const newTodo = await query.todo.insertTodo(userId, body.content);

  if (newTodo) {
    return c.json({ success: "ok", data: newTodo });
  } else {
    throw new HTTPException(500, { message: "Failed to create todo item: internal server error" });
  }
};

// GET ALL TODOS BY USER
export const todoUserAllGet = async (c: Context) => {
  const userId = c.var.userId;
  // can only be true or false, but queries are strings
  const completed: string | undefined = c.req.query('completed');

  if (!userId || typeof userId !== 'string') {
    throw new HTTPException(401, { message: "Failed to fetch todo items: invalid user ID" });
  }

  const todosList = await query.todo.selectAllTodosByUserId(userId);

  if (todosList) {
    if (completed !== undefined) {
      switch (completed) {
        case "true":
          return c.json({ success: "ok", data: todosList.filter(todo => todo.isComplete) });
        case "false":
          return c.json({ success: "ok", data: todosList.filter(todo => !todo.isComplete) });
        default:
          return c.json({ error: "Invalid query" });
      }
    }
    return c.json({ success: "ok", data: todosList });
  } else {
    throw new HTTPException(500, { message: "Failed to fetch todos" });
  }
};

// GET TODO BY ID
export const todoIdGet = async (c: Context) => {
  const userId = c.var.userId;

  if (!userId || typeof userId !== 'string') {
    throw new HTTPException(401, { message: "Failed to fetch todo item: invalid user ID" });
  }

  const todoId = c.req.param('id');

  if (!todoId || typeof todoId !== 'string') {
    throw new HTTPException(400, { message: "Failed to fetch todo item: unknown or invalid todo item ID" });
  }

  const todoItem = await query.todo.selectTodoById(todoId, userId);

  if (todoItem) {
    return c.json({ success: "ok", data: todoItem });
  } else {
    throw new HTTPException(500, { message: "Failed to fetch todo" });
  }
};

// UPDATE TODO BY ID
export const todoUpdateByIdPost = async (c: Context) => {
  const userId = c.var.userId;

  if (!userId || typeof userId !== 'string') {
    throw new HTTPException(401, { message: "Failed to update todo item: invalid user ID" });
  }

  const todoId = c.req.param('id');

  if (!todoId || typeof todoId !== 'string') {
    throw new HTTPException(400, { message: "Failed to update todo item: invalid todo ID" });
  }

  const body = await c.req.json<{
    content: string,
    isComplete: boolean;
  }>();

  const updatedTodoItem = await query.todo.updateTodoById(todoId, userId, body.content, body.isComplete);

  if (updatedTodoItem) {
    return c.json({ success: "ok", data: updatedTodoItem });
  } else {
    throw new HTTPException(500, { message: "Failed to update todo item: internal server error" });
  }
};

// DELETE TODO BY ID
export const todoIdDelete = async (c: Context) => {
  const userId = c.var.userId;

  if (!userId || typeof userId !== 'string') {
    throw new HTTPException(401, { message: "Failed to delete todo item: invalid user ID" });
  }

  const todoId = c.req.param('id');

  if (!todoId || typeof todoId !== 'string') {
    throw new HTTPException(400, { message: "Failed to delete todo item: invalid todo ID" });
  }

  const deletedTodoItem = await query.todo.deleteTodoById(todoId, userId);

  if (deletedTodoItem) {
    return c.json({ success: "ok", data: deletedTodoItem });
  } else {
    throw new HTTPException(500, { message: "Failed to delete todo item: internal server error" });
  }
};