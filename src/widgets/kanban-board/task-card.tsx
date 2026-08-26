import { Avatar, Flex, Tag, Tooltip, Typography } from "antd";

type TaskLabelType =
  | "frontend"
  | "backend"
  | "design"
  | "managment"
  | "qa"
  | "devops"
  | "mobile";

// Label
const LABEL_CONFIG: Record<TaskLabelType, { label: string; bg: string }> = {
  frontend: { label: "Frontend", bg: "#85b0ff" },
  backend: { label: "Backend", bg: "#ceac76" },
  design: { label: "Design", bg: "#67e966" },
  managment: { label: "Management", bg: "#e6e865" },
  qa: { label: "QA", bg: "#87eebb" },
  devops: { label: "DevOps", bg: "#f6abad" },
  mobile: { label: "Mobile", bg: "#62d5d8" },
};
function getLabelTag(label: string, key?: React.Key) {
  const value = label.trim().toLowerCase() as TaskLabelType;
  const details = LABEL_CONFIG[value];
  if (!details) return null;
  return (
    <Tag
      key={key}
      className={`m-0 text-white font-medium text-[13px] rubik border-none`}
      style={{ background: details.bg }}
    >
      {details.label}
    </Tag>
  );
}
// Label

export function TaskCard({
  labels = ["backend", "frontend"],
  members = ["Yusupov Xusan", "Sotiboldiyev Otabek", "Abdullayev Ixtiyor"],
  title = "Rello refactor",
}: {
  labels?: string[];
  members: string[];
  title: string;
}) {
  return (
    <Flex
      vertical
      gap={8}
      className="w-full p-3 rounded-xl border border-gray-200 shadow-xl bg-white hover:cursor-pointer transition-shadow hover:shadow-md"
    >
      {labels.length > 0 && (
        <Flex align="center" gap={6} wrap="wrap">
          {labels.map((label, idx) => getLabelTag(label, idx))}
        </Flex>
      )}
      <Typography.Text className="sora font-medium line-clamp-4" title={title}>
        {title}
      </Typography.Text>
      <Flex align="center" justify="space-between">
        <Avatar.Group
          maxPopoverTrigger="click"
          maxStyle={{ cursor: "pointer" }}
        >
          {members.map((member, idx) => (
            <Tooltip title={member} key={idx}>
              <Avatar size={35}>{member[0]}</Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
        <Typography.Text className="rubik">WFM-204</Typography.Text>
      </Flex>
    </Flex>
  );
}
