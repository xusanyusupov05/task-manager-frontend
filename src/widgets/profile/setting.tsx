import { Col, Flex, Row, Select, Typography } from "antd";

export function ProfileSetting() {
  const theme = [
    { label: "Yorug'", value: "light" },
    { label: "Qorong'u", value: "dark" },
    { label: "Ob havoga qarab", value: "system" },
  ];

  return (
    <Row gutter={[15, 15]}>
      <Col span={24}>
        <Flex vertical gap={6}>
          <Typography.Text className="rubik">Ko'chada ahvol qanaqa :</Typography.Text>
          <Select
            className="w-full"
            defaultValue="light"
            options={theme}
          />
        </Flex>
      </Col>
    </Row>
  );
}

