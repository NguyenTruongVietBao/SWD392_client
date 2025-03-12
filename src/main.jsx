import { RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/index";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
