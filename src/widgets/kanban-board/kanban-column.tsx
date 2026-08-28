import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Typography } from "antd";
import { useDraggable, useDroppable } from "@dnd-kit/react";

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
  // 2.1 Drag-and-drop: Ustunni boshqa elementlarni qabul qiluvchi (droppable) qilish
  const { ref: droppableRef, isDropTarget } = useDroppable({
    id,
  });

  // 2.2 Drag-and-drop: Ustunning o'zini ham suriladigan (draggable) qilish
  const {
    ref: draggableRef,
    isDragging,
    handleRef,
  } = useDraggable({
    id,
  });

  // 2.3 Ustun nomiga qarab tepa chiziq rangini aniqlash
  const borderStyle = title.toLocaleLowerCase();

  // 2.4 Ustun menyusi amallari (O'zgartirish, O'chirish)
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
    // 2.5 Tashqi droppable va draggable qobiqlar
    <div ref={droppableRef} className="h-full flex-shrink-0">
      <div ref={draggableRef} className="h-full">
        <Flex
          vertical
          className={`min-w-[320px] w-[320px] h-[calc(100vh-145px)] rounded-2xl p-4 shadow-xl overflow-hidden transition-all duration-200 ${
            isDropTarget
              ? "bg-blue-50/80 ring-2 ring-blue-400 ring-dashed"
              : "bg-[#f8fafc] border border-gray-100"
          } ${isDragging ? "opacity-40 scale-95 rotate-1 shadow-2xl" : ""} ${
            borderStyle === "dushanbadan boshlaymiz"
              ? "border-t-4 border-t-blue-500"
              : borderStyle === "qozonda qaynayapti"
                ? "border-t-4 border-t-yellow-600"
                : borderStyle === "ish bitdi"
                  ? "border-t-4 border-t-green-600"
                  : borderStyle === "oq soqollar ruxsat bermadi"
                    ? "border-t-4 border-t-red-600"
                    : borderStyle === "ko'z tegdi"
                      ? "border-t-4 border-t-green-900"
                      : "border-none"
          }`}
        >
          {/* 2.6 Ustun sarlavhasi, soni va sozlamalar */}
          <Flex
            align="center"
            justify="space-between"
            className="mb-4 select-none"
          >
            {/* Faqat sarlavha va son qismi surish tutqichi (handleRef) bo'ladi */}
            <Flex
              ref={handleRef}
              align="center"
              gap={8}
              className="flex-1 min-w-0 cursor-grab active:cursor-grabbing mr-2 py-1"
            >
              <Typography.Text className="sora font-semibold text-[17px] text-gray-800 line-clamp-2">
                {title}
              </Typography.Text>
              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs font-semibold rounded-full rubik shrink-0">
                {count}
              </span>
            </Flex>

            {/* 3 nuqta menyusi handleRef dan tashqarida, DnD xalal bermaydi */}
            <Dropdown
              menu={{ items: item }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                icon={<EllipsisOutlined />}
                type="text"
                className="!w-8 !h-8 text-gray-500 hover:text-black cursor-pointer shrink-0"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </Flex>

          {/* 2.7 Task kartalari joylashadigan skroll qismi */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-3 pr-1 pb-2 custom-scrollbar">
            {children}
          </div>

          {/* 2.8 Yangi vazifa qo'shish tugmasi */}
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={onAddClick}
            className="mt-2 w-full h-10 rounded-xl font-medium sora text-gray-600 hover:!text-blue-600 hover:!border-blue-500"
          >
            Bosh og'riq
          </Button>
        </Flex>
      </div>
    </div>
  );
}
