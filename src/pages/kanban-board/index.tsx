import { DragDropProvider } from "@dnd-kit/react";
import { KanbanColumn } from "@/widgets/kanban-board/kanban-column";
import { TaskCard } from "@/widgets/kanban-board/task-card";
import { Flex } from "antd";
import { useState } from "react";

interface Task {
  id: string;
  title: string;
  labels: string[];
  members: string[];
}

interface ColumnsState {
  [key: string]: {
    title: string;
    tasks: Task[];
  };
}

const INITIAL_DATA: ColumnsState = {
  todo: {
    title: "Rejadagilar (Todo)",
    tasks: [
      {
        id: "task-1",
        title: "Frontend qismini yakunlash va API integratsiya qilish",
        labels: ["frontend", "backend"],
        members: ["Yusupov Xusan", "Sotiboldiyev Otabek"],
      },
      {
        id: "task-2",
        title: "Figma dizayn asosida yangi modal komponentlarini tekshirish",
        labels: ["design"],
        members: ["Abdullayev Ixtiyor"],
      },
    ],
  },
  in_progress: {
    title: "Jarayonda (In Progress)",
    tasks: [
      {
        id: "task-3",
        title: "Backend ma'lumotlar bazasi modellarini optimallashtirish",
        labels: ["backend", "devops"],
        members: ["Yusupov Xusan"],
      },
    ],
  },
  done: {
    title: "Bajarildi (Done)",
    tasks: [
      {
        id: "task-4",
        title: "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
        labels: ["managment"],
        members: ["Sotiboldiyev Otabek"],
      },
    ],
  },
};

export function KanbanBoardPage() {
  const [columns, setColumns] = useState<ColumnsState>(INITIAL_DATA);

  const handleDragEnd = (event: any) => {
    const { operation } = event;
    const source = operation?.source;
    const target = operation?.target;

    if (!source || !target) return;

    const sourceCardId = String(source.id);
    const targetColumnId = String(target.id);

    // Qaysi ustundan tortilayotganini aniqlaymiz
    let sourceColumnId: string | null = null;
    let draggedTask: Task | null = null;

    for (const [colId, colData] of Object.entries(columns)) {
      const found = colData.tasks.find((t) => t.id === sourceCardId);
      if (found) {
        sourceColumnId = colId;
        draggedTask = found;
        break;
      }
    }

    if (!sourceColumnId || !draggedTask) return;

    // Agar o'sha ustunning o'ziga tashlansa hech narsa qilmaymiz
    if (sourceColumnId === targetColumnId) return;

    // Faqat mavjud ustunlarga tashlashga ruxsat beramiz
    if (!columns[targetColumnId]) return;

    // State'ni yangilaymiz (kartani bir ustundan ikkinchisiga ko'chiramiz)
    setColumns((prev) => {
      const newSourceTasks = prev[sourceColumnId!].tasks.filter(
        (t) => t.id !== sourceCardId
      );
      const newTargetTasks = [...prev[targetColumnId].tasks, draggedTask!];

      return {
        ...prev,
        [sourceColumnId!]: {
          ...prev[sourceColumnId!],
          tasks: newSourceTasks,
        },
        [targetColumnId]: {
          ...prev[targetColumnId],
          tasks: newTargetTasks,
        },
      };
    });
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <Flex align="start" gap={20} className="w-full h-full overflow-x-auto p-4">
        {Object.entries(columns).map(([columnId, column]) => (
          <KanbanColumn
            key={columnId}
            id={columnId}
            title={column.title}
            count={column.tasks.length}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                labels={task.labels}
                members={task.members}
              />
            ))}
          </KanbanColumn>
        ))}
      </Flex>
    </DragDropProvider>
  );
}
