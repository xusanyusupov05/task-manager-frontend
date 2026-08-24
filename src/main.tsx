import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { router } from "./app/router";
import { AntdRouters } from "../public/antd-route";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AntdRouters>
        <RouterProvider router={router} />
      </AntdRouters>
    </Provider>
  </StrictMode>
);
