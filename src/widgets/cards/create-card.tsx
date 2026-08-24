import { Button, Dropdown, Flex, Typography, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Text } = Typography;

interface CreateCardProps {
  title: string;
  description?: string;
  type:
    | "default"
    | "cash"
    | "born"
    | "uzbekistan"
    | "pomegranate"
    | "doppi"
    | "piala"
}

export function CreateCard({ title, description, type }: CreateCardProps) {
  const [modal, setModal] = useState(false);
  const gradients: Record<string, string> = {
    default: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    cash: "#100495", 
    born: "#072c15", 
    uzbekistan: "#891010", 
  };

  const currentBackground = gradients[type] || gradients.default;

  const items = [
    {
      key: "1",
      label: <Typography.Text className="text-[16px] font-medium">Chopish</Typography.Text>,
      icon: <DeleteOutlined className="text-red-500 !text-[16px]" />,
    },
    {
      key: "2",
      label: (
        <Typography.Text className="text-[16px] font-medium">
          Choyxona ta'miri
        </Typography.Text>
      ),
      icon: <EditOutlined className="text-yellow-500 !text-[16px]" />,
    },
    ...(description
      ? [
          {
            key: "3",
            label: (
              <Typography.Text className="text-[16px] font-medium">
                Gapning indallosi
              </Typography.Text>
            ),
            icon: <InfoCircleOutlined className="text-blue-500 !text-[16px]" />,
            onClick: () => setModal(true),
          },
        ]
      : []),
  ];

  return (
    <Flex
      vertical
      className="w-full !h-[250px] bg-white rounded-2xl overflow-hidden shadow-sm transition-shadow border border-gray-100 mb-6 group cursor-pointer"
    >
      <div className="w-full h-[150px] relative overflow-hidden bg-gray-50">
        <div
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          style={{ background: currentBackground }}
        />
      </div>

      <Flex vertical className="p-4">
        <Text className="font-bold text-[18px] sora text-gray-800">
          {title}
        </Text>
        <Dropdown menu={{ items }}>
          <Button
            className="absolute !w-8 !h-8 right-4 hover:!text-black hover:!border-[#D9D9D9]"
            icon={<EllipsisOutlined />}
          />
        </Dropdown>
        <Modal
          title={<span className="sora font-bold text-[18px]">Gapning indallosi akalar</span>}
          open={modal}
          onCancel={() => setModal(false)}
          maskStyle={{ backdropFilter: "blur(5px)" }}
          className="w-[350px]"
          footer={null}
        >
          <Typography.Text className="rubik">{description}</Typography.Text>
        </Modal>
      </Flex>
    </Flex>
  );
}
