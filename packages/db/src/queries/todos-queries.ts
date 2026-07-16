import { eq } from "drizzle-orm";
import { db } from "../../client.js";
import { todo } from "../schema/todo.js";

type TodoType = typeof todo.$inferInsert;

export const insertTodo = async (userId: TodoType["userId"], content: TodoType["content"]) => {
  try {
    const newTodo = await db.insert(todo).values({
      userId, content
    }).returning();

    return newTodo;
  } catch (error) {
    throw error;
  }
};

export const selectTodoById = async (id: TodoType["id"]) => {
  try {
    if (!id) return;

    const selectedTodo = await db
      .select()
      .from(todo)
      .where(eq(todo.id, id));

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

export const updateTodoContentById = async (id: TodoType["id"], newContent: TodoType["content"]) => {
  try {
    if (!id) return;

    const updatedTodo = db
      .update(todo)
      .set({ content: newContent })
      .where(eq(todo.id, id));

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

export const toggleTodoById = async (id: TodoType["id"]) => {
  try {
    if (!id) return;

    const updatedTodo = db
      .update(todo)
      .set({ isComplete: !todo.isComplete })
      .where(eq(todo.id, id));

    return updatedTodo;
  } catch (error) {
    throw error;
  }
};

export const deleteTodoById = async (id: TodoType["id"]) => {
  try {
    if (!id) return;

    const deletedTodo = db
      .delete(todo)
      .where(eq(todo.id, id))
      .returning();

    return deletedTodo;
  } catch (error) {
    throw error;
  }
};