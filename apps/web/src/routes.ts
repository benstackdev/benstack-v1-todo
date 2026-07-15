import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import Signup from "./routes/signup.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "sign-up",
        Component: Signup
      }
    ]
  },
]);

export default router;
