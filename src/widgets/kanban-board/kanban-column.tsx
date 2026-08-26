import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Flex, Typography } from "antd";
import { TaskCard } from "./task-card";

export function KanbanColumn() {
  const item = [
    {
      key: 1,
      label: (
        <Typography.Text>
          <EditOutlined />
          Update
        </Typography.Text>
      ),
    },
    {
      key: 2,
      label: (
        <Typography.Text>
          <DeleteOutlined />
          Delete
        </Typography.Text>
      ),
    },
  ];
  return (
    <>
    <Flex
      vertical
      className="min-w-[320px] w-[320px] h-[calc(100vh-120px)] bg-white rounded-xl p-4 shadow-xl overflow-hidden flex-shrink-0"
    >
      <Flex align="center" justify="space-between" className="mb-4">
        <Typography.Text className="sora font-semibold text-[18px]">
          Todo
        </Typography.Text>
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
        <TaskCard
          title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, incidunt non tempora adipisci, cum totam consequuntur harum facilis quidem mollitia optio molestiae consequatur eius sunt!"
          labels={["frontend", "backend"]}
          members={["Sotiboldiyev Otabek", "Yusupov Xusan"]}
        />
      </div>
    </Flex>
    
    <Flex
      vertical
      className="min-w-[320px] w-[320px] h-[calc(100vh-120px)] bg-white rounded-xl p-4 shadow-xl overflow-hidden flex-shrink-0"
    >
      <Flex align="center" justify="space-between" className="mb-4">
        <Typography.Text className="sora font-semibold text-[18px]">
          Todo
        </Typography.Text>
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
        <TaskCard
          title="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, incidunt non tempora adipisci, cum totam consequuntur harum facilis quidem mollitia optio molestiae consequatur eius sunt!"
          labels={["frontend", "backend"]}
          members={["Sotiboldiyev Otabek", "Yusupov Xusan"]}
        />
      </div>
    </Flex>
    </>
  );
}
