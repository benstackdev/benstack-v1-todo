import { Hono } from "hono";
import { authVerifyMiddleware } from "../controllers/auth-controller.js";
import { todoIdDelete, todoIdGet, todoNewPost, todoUpdateByIdPost, todoUserAllGet } from "../controllers/todo-controller.js";

const todo = new Hono();

todo.post("/", authVerifyMiddleware, todoNewPost);          // create
todo.get("/", authVerifyMiddleware, todoUserAllGet);        // read all
todo.get("/:id", authVerifyMiddleware, todoIdGet);          // read one
todo.put("/:id", authVerifyMiddleware, todoUpdateByIdPost); // update one
todo.delete("/:id", authVerifyMiddleware, todoIdDelete);    // delete one

export default todo;