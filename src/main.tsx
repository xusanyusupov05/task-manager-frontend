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
        <Toaster
          closeButton
          richColors
          position="top-right"
          toastOptions={{
            style: {
              fontSize: "16px",
              padding: "16px 20px",
              borderRadius: "16px",
            },
            classNames: {
              toast: "sora !p-4.5 !rounded-2xl !shadow-xl",
              title: "font-bold !text-[16px]",
              description: "rubik !text-[14px] !mt-1",
              icon: "!text-xl",
              closeButton: "!border-gray-200 !bg-white hover:!bg-gray-100 !text-gray-600",
            },
          }}
        />
        <RouterProvider router={router} />
      </AntdRouters>
    </Provider>
  </StrictMode>
);
