import { PageWrapper } from "@/shared/ui/pege-wrapper";
import PersonalProfileMain from "@/widgets/profile";
import { Container } from "@/shared/ui/container";
import { Breadcrumb, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import { ROUTE_PATH } from "@/shared/consts/routes-path";

export default function PersonalProfile() {
  return (
    <Container className="pt-2">
      <Breadcrumb
        className="mb-4 px-5 sora"
        items={[
          {
            title: (
              <Link to={ROUTE_PATH.HOME}>
                <Flex
                  align="center"
                  gap={6}
                  className="text-gray-500 hover:text-black"
                >
                  <HomeOutlined />
                  <Typography.Text className="sora !text-gray-500 hover:!text-black">
                    Ayvon
                  </Typography.Text>
                </Flex>
              </Link>
            ),
          },
          {
            title: (
              <Typography.Text className="font-semibold text-slate-800 sora">
                Hujram
              </Typography.Text>
            ),
          },
        ]}
      />
      <PageWrapper title="Hujram">
        <PersonalProfileMain />
      </PageWrapper>
    </Container>
  );
}
