import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Typography } from "antd";
import { useDroppable } from "@dnd-kit/react";

interface KanbanColumnProps {
  id: string;
  title: string;
  count?: number;
  children?: React.ReactNode;
  onAddClick?: () => void;
}

export function KanbanColumn({
  id,
  title,
  count = 0,
  children,
  onAddClick,
}: KanbanColumnProps) {
  const { ref, isDropTarget } = useDroppable({
    id,
  });

  const item = [
    {
      key: 1,
      label: (
        <Typography.Text>
          <EditOutlined /> O'zgartirish
        </Typography.Text>
      ),
    },
    {
      key: 2,
      label: (
        <Typography.Text className="text-red-500">
          <DeleteOutlined /> O'chirish
        </Typography.Text>
      ),
    },
  ];

  return (
    <Flex
      vertical
      ref={ref}
      className={`min-w-[320px] w-[320px] h-[calc(100vh-120px)] rounded-2xl p-4 shadow-sm overflow-hidden flex-shrink-0 transition-all duration-200 ${
        isDropTarget
          ? "bg-blue-50/80 ring-2 ring-blue-500 ring-dashed"
          : "bg-[#f8fafc]"
      }`}
    >
      <Flex align="center" justify="space-between" className="mb-4">
        <Flex align="center" gap={8}>
          <Typography.Text className="sora font-semibold text-[17px] text-gray-800">
            {title}
          </Typography.Text>
          <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full rubik">
            {count}
          </span>
        </Flex>
        <Dropdown
          menu={{ items: item }}
          trigger={["click"]}
          placement="bottomRight"
        >
          <Button
            icon={<EllipsisOutlined />}
            type="text"
            className="!w-8 !h-8 text-gray-500 hover:text-black"
          />
        </Dropdown>
      </Flex>

      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-3 pr-1 pb-2 custom-scrollbar">
        {children}
      </div>

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAddClick}
        className="mt-2 w-full h-10 rounded-xl font-medium sora text-gray-600 hover:!text-blue-600 hover:!border-blue-500"
      >
        Yangi vazifa
      </Button>
    </Flex>
  );
}
