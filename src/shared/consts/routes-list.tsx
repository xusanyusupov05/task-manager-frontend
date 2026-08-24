import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import type { ReactNode } from "react";
import HomePage from "@/pages/main";
import { ROUTE_PATH } from "./routes-path";
import { Typography } from "antd";
import { KanbanBoard } from "@/pages/kanban-board";

export interface IRouteChild {
  key?: string;
  index?: boolean;
  element: ReactNode;
}

export interface IMenu {
  key: string;
  labelKey: ReactNode;
  icon?: ReactNode;
  element?: ReactNode;
  children?: IRouteChild[];
}

export const routeList: IMenu[] = [
  {
    key: ROUTE_PATH.HOME,
    labelKey: (
      <Typography.Text className="!text-xl rubik">Ayvon</Typography.Text>
    ),
    icon: <HomeOutlined className="!text-xl !text-black" />,
    element: <HomePage />,
  },
  {
    key: ROUTE_PATH.KANBAN_MAIN,
    labelKey: (
      <Typography.Text className="!text-xl rubik">G'alvalar</Typography.Text>
    ),
    icon: <AppstoreOutlined className="!text-xl !text-black"/>,
    element: <KanbanBoard />,
  },
];
