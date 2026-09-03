import { Avatar, Col, Flex, Row, Tabs, Typography } from "antd";
import { ProfileSetting } from "./setting";
import { ProfileStatus } from "./status";
import { AboutStatus } from "./about-status";
import { useGetMeQuery } from "@/entities/me";
import { Loader } from "@/shared/ui/loader";
interface tabProps {
  key: string;
  label: React.ReactNode;
  children: React.ReactNode;
}

// type UserRole = "admin" | "user";

export default function PersonalProfileMain() {
  const { data, isLoading } = useGetMeQuery();
  // const role: UserRole = "admin";

  if (isLoading) {
    return <Loader text="Choylashamiz..." />;
  }
  const itemTab: tabProps[] = [
    {
      key: "1",
      label: "Tegma buziladi",
      children: <ProfileSetting />,
    },
    {
      key: "2",
      label: "Kim kim o'zi ?",
      children: <AboutStatus/>,
    },
  ];

  return (
    <Row className="w-full">
      <Col span={12}>
        <Flex
          vertical
          justify="start"
          align="center"
          className="w-full h-full relative min-h-[200px]"
        >
          <Flex
            align="center"
            gap={24}
            className="w-full pt-10 pl-5"
          >
            <Avatar size={140} />
            <Flex vertical gap={10}>
              {/* {role === "admin" ? (
                <Typography.Text className="sora text-xs font-bold text-[#36a10f] mb-1">
                  ADMIN
                </Typography.Text>
              ) : (
                <Typography.Text className="sora text-xs font-bold text-blue-500 mb-1">
                  USER
                </Typography.Text>
              )} */}
              {data?.data?.fullName && (
                <Typography.Text className="text-3xl sora font-bold">
                  {data.data.fullName.split("")[0].toUpperCase() + data.data.fullName.slice(1).toLowerCase()}
                </Typography.Text>
              )}
              <ProfileStatus taskCount={20} />
            </Flex>
          </Flex>
        </Flex>
      </Col>
      <Col span={12}>
        <Tabs defaultActiveKey="1" items={itemTab} />
      </Col>
    </Row>
  );
}
