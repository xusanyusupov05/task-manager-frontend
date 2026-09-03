import { Layout } from "antd";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header } from "@/widgets/shared/header";
import { ROUTE_PATH } from "@/shared/consts/routes-path";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const location = useLocation();
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate to={ROUTE_PATH.LOGIN} replace state={{ from: location }} />
    );
  }

  return (
    <Layout className="min-h-screen">
      <Header />
      <Layout className="px-4">
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
