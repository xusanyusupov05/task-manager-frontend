import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { KanbanColumn } from "@/widgets/kanban-board/kanban-column";
import { TaskCard } from "@/widgets/kanban-board/task-card";
import { Breadcrumb, Button, Flex, Typography } from "antd";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  PlusOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { KanbanCreate } from "@/widgets/kanban-board/kanban-create";
import {
  useGetWorkspaceColumnsQuery,
  usePatchReorderColumnsMutation,
} from "@/entities/workspaces-columns/api";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  labels: string[];
  members: string[];
}

interface ColumnItem {
  id: string | number;
  title?: string;
  order?: number;
  tasks?: Task[];
}

interface WorkspaceColumnsData {
  data?: ColumnItem[];
}

interface ColumnsState {
  [key: string]: {
    title: string;
    tasks: Task[];
  };
}

function getFormattedColumns(
  data: WorkspaceColumnsData | ColumnItem[] | undefined,
): ColumnsState {
  const rawColumns = (Array.isArray(data) ? data : data?.data) || [];
  if (!Array.isArray(rawColumns)) return {};

  const formatted: ColumnsState = {};
  [...rawColumns]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .forEach((col: ColumnItem) => {
      formatted[String(col.id)] = {
        title: col.title || "",
        tasks: col.tasks || [],
      };
    });
  return formatted;
}

export function KanbanBoard() {
  const [searchParams] = useSearchParams();
  const workspaceId = searchParams.get("workspaceId") || "";

  const [prevData, setPrevData] = useState<
    WorkspaceColumnsData | ColumnItem[] | undefined
  >(undefined);
  const [columns, setColumns] = useState<ColumnsState>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reorderColumns] = usePatchReorderColumnsMutation();

  const { data } = useGetWorkspaceColumnsQuery(
    { workspaceId },
    { skip: !workspaceId },
  );

  if (data !== prevData) {
    setPrevData(data);
    setColumns(getFormattedColumns(data));
  }

  const findTaskLocation = (taskId: string) => {
    for (const [colId, col] of Object.entries(columns)) {
      const idx = col.tasks?.findIndex((t) => t.id === taskId) ?? -1;
      if (idx !== -1) return { colId, task: col.tasks[idx], index: idx };
    }
    return null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    if (!operation?.source || !operation?.target) return;

    const sourceId = String(operation.source.id);
    const targetId = String(operation.target.id);
    if (sourceId === targetId) return;

    if (columns[sourceId]) {
      const targetColId = columns[targetId]
        ? targetId
        : findTaskLocation(targetId)?.colId;
      if (!targetColId || targetColId === sourceId) return;

      const entries = Object.entries(columns);
      const fromIdx = entries.findIndex(([id]) => id === sourceId);
      const toIdx = entries.findIndex(([id]) => id === targetColId);
      if (fromIdx === -1 || toIdx === -1 || fromIdx === toIdx) return;

      const updated = [...entries];
      const [moved] = updated.splice(fromIdx, 1);
      updated.splice(toIdx, 0, moved);

      setColumns(Object.fromEntries(updated));

      const rawColumns = (Array.isArray(data) ? data : data?.data) || [];
      const targetWorkspaceId = workspaceId || rawColumns[0]?.workspaceId || "";

      if (targetWorkspaceId) {
        const items = updated.map(([id], index) => ({
          id,
          order: index + 1,
        }));

        reorderColumns({
          workspaceId: targetWorkspaceId,
          items,
        })
          .unwrap()
          .catch((error) => {
            console.error("Ustunlar tartibini o'zgartirishda xatolik:", error);
            toast.error("Ustunlar tartibini saqlashda xatolik yuz berdi!");
            setColumns(getFormattedColumns(data));
          });
      }
      return;
    }

    const sourceLoc = findTaskLocation(sourceId);
    if (!sourceLoc) return;

    const targetLoc = columns[targetId]
      ? { colId: targetId, index: columns[targetId].tasks.length }
      : findTaskLocation(targetId);

    if (!targetLoc) return;
    if (
      sourceLoc.colId === targetLoc.colId &&
      sourceLoc.index === targetLoc.index
    )
      return;

    setColumns((prev) => {
      const sourceTasks = [...prev[sourceLoc.colId].tasks];
      const [dragged] = sourceTasks.splice(sourceLoc.index, 1);

      if (sourceLoc.colId === targetLoc.colId) {
        sourceTasks.splice(targetLoc.index, 0, dragged);
        return {
          ...prev,
          [sourceLoc.colId]: { ...prev[sourceLoc.colId], tasks: sourceTasks },
        };
      }

      const targetTasks = [...prev[targetLoc.colId].tasks];
      targetTasks.splice(targetLoc.index, 0, dragged);

      return {
        ...prev,
        [sourceLoc.colId]: { ...prev[sourceLoc.colId], tasks: sourceTasks },
        [targetLoc.colId]: { ...prev[targetLoc.colId], tasks: targetTasks },
      };
    });
  };

  return (
    <Flex vertical className="w-full h-full pt-3">
      <div className="w-full px-6 mb-3">
        <Breadcrumb
          className="sora"
          items={[
            {
              title: (
                <Link to={ROUTE_PATH.HOME}>
                  <Flex
                    align="center"
                    gap={6}
                    className="text-gray-500 hover:text-black"
                  >
                    <HomeOutlined />
                    <Typography.Text className="sora !text-gray-500 hover:!text-black">
                      Ayvon
                    </Typography.Text>
                  </Flex>
                </Link>
              ),
            },
            {
              title: (
                <Link to={ROUTE_PATH.KANBAN_MAIN}>
                  <Flex
                    align="center"
                    gap={6}
                    className="text-gray-500 hover:text-black"
                  >
                    <AppstoreOutlined />
                    <Typography.Text className="sora !text-gray-500 hover:!text-black">
                      G'alvalar
                    </Typography.Text>
                  </Flex>
                </Link>
              ),
            },
            {
              title: (
                <Typography.Text className="font-semibold text-slate-800 sora">
                  Bosh og'riqlar
                </Typography.Text>
              ),
            },
          ]}
        />
      </div>

      <DragDropProvider onDragEnd={handleDragEnd}>
        <Flex
          align="start"
          gap={20}
          className="w-full overflow-x-auto px-6 pt-3 pb-6 custom-scrollbar"
        >
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

          <Flex
            vertical
            gap={12}
            className="min-w-[320px] w-[320px] flex-shrink-0"
          >
            <Button
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-full !h-[52px] !bg-[#f8fafc] !border !border-dashed !border-gray-500 hover:!border-gray-900 hover:!bg-white !text-slate-700 hover:!text-black !rounded-2xl cursor-pointer sora font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Bu safar nima deymiz?
            </Button>
            {isModalOpen && (
              <KanbanCreate
                workspaceId={workspaceId}
                onClose={() => setIsModalOpen(false)}
              />
            )}
          </Flex>
        </Flex>
      </DragDropProvider>
    </Flex>
  );
}
