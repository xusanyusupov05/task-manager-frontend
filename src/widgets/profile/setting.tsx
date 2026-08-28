import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Row, Select, Typography } from "antd";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useState } from "react";

export function ProfileSetting() {
  
  const [open, setOpen] = useState(false);
  const theme = [
    { label: "Yorug'", value: "light" },
    { label: "Qorong'u", value: "dark" },
    { label: "Ob havoga qarab", value: "system" },
  ];


  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = ROUTE_PATH.LOGIN;
    return;
  };

  return (
    <>
      <Row gutter={[16, 16]} align="bottom" className="w-full">
        <Col span={12}>
          <Flex vertical gap={6}>
            <Typography.Text className="rubik text-sm text-gray-600">
              Ko'chada ahvol qanaqa :
            </Typography.Text>
            <Select className="w-full" defaultValue="light" options={theme} />
          </Flex>
        </Col>
        <Col span={12}>
          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={() => setOpen(true)}
            className="w-full flex items-center justify-center gap-2"
          >
            Endi bizga ruhsat
          </Button>
        </Col>
      </Row>
      <ConfirmDialog
        open={open}
        title="Oylik tushmay turib tizimdan chiqishga kim ruxsat berdi?"
        description="Karta hali ham bo'm-bo'sh, lekin siz allaqachon kompyuterni yopyapsiz. Mayli, ishlaringiz saqlab qo'yildi."
        cancelText="Oylikni kutib o'tiraman"
        confirmText="Karta kutsin, men kettim"
        onCancel={() => setOpen(false)}
        onConfirm={() => handleLogOut()}
      />
    </>
  );
}
