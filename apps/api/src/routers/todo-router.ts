import { Hono } from "hono";
import { authVerify } from "../controllers/auth-controller.js";
import { todoIdDelete, todoIdGet, todoNewPost, todoUpdateByIdPost, todoUserAllGet } from "../controllers/todo-controller.js";

const todo = new Hono();

todo.post("/", authVerify, todoNewPost);          // create
todo.get("/", authVerify, todoUserAllGet);        // read all
todo.get("/:id", authVerify, todoIdGet);          // read one
todo.put("/:id", authVerify, todoUpdateByIdPost); // update one
todo.delete("/:id", authVerify, todoIdDelete);    // delete one

export default todo;