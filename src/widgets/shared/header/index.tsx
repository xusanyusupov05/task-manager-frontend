import { UserOutlined } from "@ant-design/icons";
import { Flex, Image, Layout, Menu, Typography, type MenuProps } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router";
import logo from "../../../../public/assets/images-removebg-preview.png";
import { useSidebarRoutes } from "@/shared/hooks/useSidebarRoutes";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { Container } from "../../../shared/ui/container";

const { Header: AntHeader } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = useSidebarRoutes();

  return (
    <Container className="relative">
      <AntHeader className="flex items-center rounded-xl justify-between px-6 bg-white border-b shadow-xl border-gray-100 h-16 z-10 w-full top-0">
        <Flex
          align="center"
          gap={12}
          className="cursor-pointer absolute left-9"
          onClick={() => navigate("/")}
        >
          <Image
            src={logo}
            preview={false}
            width={60}
            height={60}
            className="object-contain"
          />
          <Typography.Text className="!text-xl rubik mt-1">
            Choylashamiz
          </Typography.Text>
        </Flex>

        <div className="flex-1 min-w-0 flex justify-center">
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems as unknown as MenuItem[]}
            onClick={({ key }) => navigate(key)}
            className="border-none bg-transparent min-w-[300px] flex justify-center"
          />
        </div>

        <Flex align="center" gap={16}>
          <NavLink to={ROUTE_PATH.PROFILE} className="text-black text-xl">
            <UserOutlined />
          </NavLink>
        </Flex>
      </AntHeader>
    </Container>
  );
};
