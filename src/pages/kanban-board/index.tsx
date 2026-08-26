import { KanbanColumn } from "@/widgets/kanban-board/kanban-column";
import { Flex } from "antd";

export function KanbanBoardPage() {
  return (
    <>
      <Flex align="center" gap={20}>
        <KanbanColumn />
      </Flex>
    </>
  );
}
