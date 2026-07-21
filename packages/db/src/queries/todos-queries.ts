import { eq, and } from "drizzle-orm";
import { db } from "../../client.js";
import { todo } from "../schema/todo.js";

export type TodoType = typeof todo.$inferInsert;

export const insertTodo = async (userId: TodoType["userId"], content: TodoType["content"], isComplete: TodoType["isComplete"]) => {
  try {
    const newTodo = await db.insert(todo).values({
      userId, content, isComplete
    }).returning();

    return newTodo;
  } catch (error) {
    throw error;
  }
};

export const selectTodoById = async (id: TodoType["id"], userId: TodoType["userId"]) => {
  try {
    if (!id) return;

    const selectedTodo = await db
      .select()
      .from(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)));

    return selectedTodo[0];
  } catch (error) {
    throw error;
  }
};

export const selectAllTodosByUserId = async (userId: TodoType["userId"]) => {
  try {
    if (!userId) return;

    const userTodos = await db
      .select()
      .from(todo)
      .where(eq(todo.userId, userId));

    return userTodos;
  } catch (error) {
    throw error;
  }
};

export const updateTodoById = async (id: TodoType["id"], userId: TodoType["userId"], newContent?: TodoType["content"], newIsComplete?: TodoType["isComplete"]) => {
  try {
    if (!id) return;

    const updatedTodo = db
      .update(todo)
      .set({
        content: newContent ?? todo.content,
        isComplete: newIsComplete ?? todo.isComplete
      })
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning();

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoById = async (id: TodoType["id"], userId: TodoType["userId"]) => {
  try {
    if (!id) return;

    const deletedTodo = db
      .delete(todo)
      .where(and(eq(todo.id, id), eq(todo.userId, userId)))
      .returning();

    return deletedTodo;
  } catch (error) {
    throw error;
  }
};