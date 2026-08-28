import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import { store } from "./app/store";
import { router } from "./app/router";
import { AntdRouters } from "./app/providers/antd-provider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AntdRouters>
        <Toaster richColors position="top-right" />
        <RouterProvider router={router} />
      </AntdRouters>
    </Provider>
  </StrictMode>
);
