import { Avatar, Flex, Tag, Tooltip, Typography } from "antd";
import { useDraggable, useDroppable } from "@dnd-kit/react";
import React from "react";

type TaskLabelType =
  | "frontend"
  | "backend"
  | "design"
  | "managment"
  | "qa"
  | "devops"
  | "mobile";

// Label
const LABEL_CONFIG: Record<
  TaskLabelType,
  { label: string; bg: string; text: string }
> = {
  frontend: { label: "Frontend", bg: "#85b0ff", text: "#200df2" },
  backend: { label: "Backend", bg: "#ceac76", text: "#934019" },
  design: { label: "Design", bg: "#d2ffc8", text: "#16c705" },
  managment: { label: "Management", bg: "#e3d961", text: "#ad8c21" },
  qa: { label: "QA", bg: "#87eebb", text: "#18b4aa" },
  devops: { label: "DevOps", bg: "#f6abad", text: "#e9504a" },
  mobile: { label: "Mobile", bg: "#e6e4dc", text: "#8b7f63" },
};

function getLabelTag(label: string, key?: React.Key) {
  const value = label.trim().toLowerCase() as TaskLabelType;
  const details = LABEL_CONFIG[value];
  if (!details) return null;
  return (
    <Tag
      key={key}
      className={`m-0 font-medium text-[13px] rubik border-none`}
      style={{
        background: details.bg,
        color: details.text,
        border: `1px solid ${details.text}`,
      }}
    >
      {details.label}
    </Tag>
  );
}
// Label

export interface TaskCardProps {
  id: string;
  labels?: string[];
  members?: string[];
  title: string;
}

export function TaskCard({
  id,
  labels = ["backend", "frontend"],
  members = ["Yusupov Xusan", "Sotiboldiyev Otabek", "Abdullayev Ixtiyor"],
  title = "Rello refactor",
}: TaskCardProps) {
  const { ref: draggableRef, isDragging } = useDraggable({
    id,
  });
  const { ref: droppableRef, isDropTarget } = useDroppable({
    id,
  });

  return (
    <div ref={droppableRef} className="w-full">
      <div ref={draggableRef} className="w-full">
        <Flex
          vertical
          gap={8}
          className={`w-full p-3 rounded-xl border bg-white hover:!cursor-pointer active:cursor-grabbing transition-all shadow-xl ${
            isDropTarget ? "border-blue-500 border-t-4" : "border-gray-200"
          } ${
            isDragging
              ? "opacity-40 scale-95 shadow-2xl rotate-1"
              : "shadow-sm hover:shadow-md"
          }`}
        >
          {labels.length > 0 && (
            <Flex align="center" gap={6} wrap="wrap">
              {labels.map((label, idx) => getLabelTag(label, idx))}
            </Flex>
          )}
          <Tooltip title={title}>
            <Typography.Text className="sora font-medium line-clamp-4 select-none">
              {title}
            </Typography.Text>
          </Tooltip>
          <Flex align="center" justify="space-between">
            <Avatar.Group
              maxPopoverTrigger="click"
              maxStyle={{ cursor: "pointer" }}
            >
              {members.map((member, idx) => (
                <Tooltip title={member} key={idx}>
                  <Avatar
                    size={35}
                    className="!border !border-red-600"  
                  >
                    {member[0]}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
            <Typography.Text className="sora font-medium text-gray-500">
              WFM-204
            </Typography.Text>
          </Flex>
        </Flex>
      </div>
    </div>
  );
}
