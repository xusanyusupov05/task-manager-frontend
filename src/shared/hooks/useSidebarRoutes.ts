import type { RootState } from "app/store";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { routeList } from "../consts/routes-list";

export const useSidebarRoutes = () => {
  const permissions = useSelector((state: RootState) => state.loginSlicer.permissions);

  return useMemo(
    () =>
      routeList
        .filter((route) => Boolean(route.icon || route.children?.length || route.element))
        .map((route) => ({
          key: route.key,
          label: route.labelKey,
          icon: route.icon,
        })),
    [permissions],
  );
};
