import { Layout } from "antd";
import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Header } from "@/widgets/shared/header";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const token = useSelector((state: RootState) => state.loginSlicer.token);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== "/auth") {
      navigate("/auth");
    }
  }, [token, navigate, location.pathname]);

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
