import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Typography } from "antd";
import { useDroppable } from "@dnd-kit/react";

// 1. Komponent qabul qiladigan props turlari
interface KanbanColumnProps {
  id: string; // Ustunning unikal ID-si
  title: string; // Ustun nomi (masalan: Todo, In Progress)
  count?: number; // Ustundagi kartalar soni
  children?: React.ReactNode; // Ichidagi task kartalari (TaskCard)
  onAddClick?: () => void; // Yangi vazifa qo'shish tugmasi bosilganda ishlaydi
}

// 2. Asosiy Kanban ustuni komponenti
export function KanbanColumn({
  id,
  title,
  count = 0,
  children,
  onAddClick,
}: KanbanColumnProps) {
  // 2.1 Drag-and-drop: Ustunni kartalar tashlanadigan hudud (drop target) sifatida belgilash
  const { ref, isDropTarget } = useDroppable({
    id,
  });

  // 2.2 Ustun nomiga qarab tepa chiziq rangini aniqlash
  const borderStyle = title.toLocaleLowerCase();

  // 2.3 Ustun menyusi amallari (O'zgartirish, O'chirish)
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
    // 2.4 Asosiy ustun bloki (karta ustiga kelganda isDropTarget orqali vizual ko'rsatadi)
    <Flex
      vertical
      ref={ref}
      className={`min-w-[320px] w-[320px] h-[calc(100vh-145px)] rounded-2xl p-4 shadow-xl overflow-hidden flex-shrink-0 transition-all duration-200 ${
        isDropTarget
          ? "bg-blue-50/80 "
          : "bg-[#f8fafc] border border-gray-100"
      } ${
        borderStyle === "dushanbadan boshlaymiz"
          ? "border-t-4 border-t-blue-500"
          : borderStyle === "qozonda qaynayapti"
          ? "border-t-4 border-t-yellow-600"
          : borderStyle === "yuzimiz yorug'"
          ? "border-t-4 border-t-green-600"
          : borderStyle === "oq soqollar ruxsat bermadi"
          ? "border-t-4 border-t-red-600"
          : borderStyle === "ko'z tegdi"
          ? "border-t-4 border-t-green-900"
          : "border-none"
      }`}
    >
      {/* 2.5 Ustun sarlavhasi, vazifalar soni va sozlamalar tugmasi */}
      <Flex align="center" justify="space-between" className="mb-4">
        <Flex align="center" gap={8}>
          <Typography.Text className="sora font-semibold text-[17px] text-gray-800 line-clamp-2 whitespace-nowrap">
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

      {/* 2.6 Task kartalari joylashadigan skroll qismi */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-3 pr-1 pb-2 custom-scrollbar">
        {children}
      </div>

      {/* 2.7 Yangi vazifa qo'shish tugmasi */}
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={onAddClick}
        className="mt-2 w-full h-10 rounded-xl font-medium sora text-gray-600 hover:!text-blue-600 hover:!border-blue-500"
      >
        Bosh og'riq
      </Button>
    </Flex>
  );
}
