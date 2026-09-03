import { Layout } from "antd";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/widgets/shared/header";

const { Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== '/auth' && !localStorage.getItem('accessToken')) {
      navigate('/auth', { replace: true });
    }
  }, [location.pathname, navigate]);

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
