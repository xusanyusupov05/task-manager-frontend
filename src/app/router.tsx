import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/pages/layout";
import { routeList } from "@/shared/consts/routes-list";
import PersonalProfile from "@/pages/profile";
import { KanbanBoardPage } from "@/pages/kanban-board";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { AuthPage } from "@/pages/auth";
import { LoginPage } from "@/pages/login";

export const router = createBrowserRouter([
  {
    path: ROUTE_PATH.AUTH,
    element: <AuthPage />,
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      ...routeList.map((route) => ({
        path: route.key === "/" ? "" : route.key.replace(/^\//, ""),
        index: route.key === "/",
        element: route.element,
      })),
      {
        path: ROUTE_PATH.KANBAN_BOARD.replace(/^\//, ""),
        element: <KanbanBoardPage />,
      },
      {
        path: ROUTE_PATH.PROFILE.replace(/^\//, ""),
        element: <PersonalProfile />,
      },
    ],
  },
]);
