import { createBrowserRouter } from "react-router";
import Root from "./routes/root.tsx";
import Home from "./routes/home.tsx";
import Signup from "./routes/signup.tsx";
import Signin from "./routes/signin.tsx";

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
      },
      {
        path: "sign-in",
        Component: Signin
      }
    ]
  },
]);

export default router;
