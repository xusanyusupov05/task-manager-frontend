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
  color?: string;
}

export const cardColors = [
  "#1a1b41", // Deep Indigo
  "#064e3b", // Dark Emerald
  "#4a0404", // Midnight Crimson
  "#18181b", // Charcoal Black
  "#0f766e", // Deep Teal
  "#1e3a8a", // Royal Navy
  "#4c1d95", // Rich Plum
  "#78350f", // Burnt Umber
];

export function CreateCard({ title, description, color = cardColors[0] }: CreateCardProps) {
  const [modal, setModal] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <Typography.Text className="text-[16px] font-medium">
          Chopish
        </Typography.Text>
      ),
      icon: <DeleteOutlined className="text-red-500 !text-[16px]" />,
    },
    {
      key: "2",
      label: (
        <Typography.Text className="text-[16px] font-medium">
          G'alva ta'miri
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
          style={{ background: color }}
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
          title={
            <span className="sora font-bold text-[18px]">
              Gapning indallosi akalar
            </span>
          }
          open={modal}
          onCancel={() => setModal(false)}
          styles={{ mask: { backdropFilter: "blur(15px)" } }}
          className="w-[350px]"
          footer={null}
        >
          <Typography.Text className="rubik">{description}</Typography.Text>
        </Modal>
      </Flex>
    </Flex>
  );
}
