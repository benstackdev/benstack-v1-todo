import { Hono } from "hono";
import { authVerifyMiddleware } from "../controllers/auth-controller.js";
import { todoIdDelete, todoIdGet, todoNewPost, todoUpdateByIdPut, todoUserAllGet } from "../controllers/todo-controller.js";

const todo = new Hono();

todo.use("/*", authVerifyMiddleware);

todo.post("/", todoNewPost);          // create
todo.get("/", todoUserAllGet);        // read all
todo.get("/:id", todoIdGet);          // read one
todo.put("/:id", todoUpdateByIdPut); // update one
todo.delete("/:id", todoIdDelete);    // delete one

export default todo;