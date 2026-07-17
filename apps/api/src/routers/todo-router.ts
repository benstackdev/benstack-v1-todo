import { Hono } from "hono";
import { authVerify } from "../controllers/auth-controller.js";
import { todoIdDelete, todoIdGet, todoNewPost, todoUpdateByIdPost, todoUserAllGet } from "../controllers/todo-controller.js";

const todo = new Hono();

todo.get("/all", authVerify, todoUserAllGet);
todo.get("/:id", authVerify, todoIdGet);
todo.post("/new", authVerify, todoNewPost);
todo.put("/:id", authVerify, todoUpdateByIdPost);
todo.delete("/:id", authVerify, todoIdDelete);

export default todo;