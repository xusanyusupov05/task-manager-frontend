import { useMemo } from "react";
import { routeList } from "../consts/routes-list";

export const useSidebarRoutes = () => {

  return useMemo(
    () =>
      routeList
        .filter((route) => Boolean(route.icon || route.children?.length || route.element))
        .map((route) => ({
          key: route.key,
          label: route.labelKey,
          icon: route.icon,
        })),
    [routeList],
  );
};

