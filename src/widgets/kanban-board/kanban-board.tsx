import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { KanbanColumn } from "@/widgets/kanban-board/kanban-column";
import { TaskCard } from "@/widgets/kanban-board/task-card";
import { Breadcrumb, Button, Flex, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  HomeOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { KanbanCreate } from "@/widgets/kanban-board/kanban-create";

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
    title: "Dushanbadan boshlaymiz",
    tasks: [
      {
        id: "task-1",
        title: "Frontend qismini yakunlash va API integratsiya qilish",
        labels: ["frontend", "backend"],
        members: ["Yusupov Xusan", "Sotiboldiyev Otabek"],
      },
      {
        id: "task-2",
        title: "QA qismini yakunlash ",
        labels: ["mobile", "qa"],
        members: ["Qodirov Alisher", "Murodjon Madaminjonov"],
      },
      {
        id: "task-3",
        title: "Figma dizayn asosida yangi modal komponentlarini tekshirish",
        labels: ["design"],
        members: ["Abdullayev Ixtiyor"],
      },
    ],
  },
  in_progress: {
    title: "Qozonda qaynayapti",
    tasks: [
      {
        id: "task-4",
        title: "Backend ma'lumotlar bazasi modellarini optimallashtirish",
        labels: ["backend", "devops"],
        members: ["Yusupov Xusan", "Sotiboldiyev Otabek"],
      },
    ],
  },
  done: {
    title: "Ish bitdi",
    tasks: [
      {
        id: "task-5",
        title:
          "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
        labels: ["managment"],
        members: ["Sotiboldiyev Otabek"],
      },
    ],
  },
  block: {
    title: "Oq soqollar ruxsat bermadi",
    tasks: [
      {
        id: "task-6",
        title:
          "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
        labels: ["backend"],
        members: ["Sotiboldiyev Otabek"],
      },
    ],
  },
  bugs: {
    title: "Ko'z tegdi",
    tasks: [
      {
        id: "task-7",
        title:
          "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
        labels: ["frontend"],
        members: ["Sotiboldiyev Otabek"],
      },
    ],
  },
};

export function KanbanBoard() {
  // 4.1 Ustunlar va undagi kartalar holatini saqlovchi state
  const [columns, setColumns] = useState<ColumnsState>(INITIAL_DATA);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 4.2 Drag-and-drop yakunlanganda (karta yoki ustun qo'yib yuborilganda) ishlaydigan asosiy funksiya
  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    const source = operation?.source; // Tortilgan element (karta yoki ustun)
    const target = operation?.target; // Tashlangan joy (ustun yoki karta)

    // Agar tortilgan yoki tashlangan joy mavjud bo'lmasa, funksiyani to'xtatish
    if (!source || !target) return;
    const sourceId = String(source.id);
    const targetId = String(target.id);

    // =========================================================================
    // A) USTUNNING O'ZI SURILAYOTGAN BO'LSA (O'NGGA VA CHAPGA ALMASHTIRISH)
    // =========================================================================
    if (columns[sourceId]) {
      let targetColumnId: string | null = null;

      if (columns[targetId]) {
        // To'g'ridan-to'g'ri boshqa ustun ustiga tashlansa
        targetColumnId = targetId;
      } else {
        // Boshqa ustun ichidagi kartaning ustiga tashlansa
        for (const [colId, colData] of Object.entries(columns)) {
          if (colData.tasks.some((t) => t.id === targetId)) {
            targetColumnId = colId;
            break;
          }
        }
      }

      if (!targetColumnId || targetColumnId === sourceId) return;

      // Ustunlarning ketma-ketlik o'rnini almashtiramiz
      setColumns((prev) => {
        const entries = Object.entries(prev);
        const sourceIndex = entries.findIndex(([colId]) => colId === sourceId);
        const targetIndex = entries.findIndex(
          ([colId]) => colId === targetColumnId,
        );

        if (
          sourceIndex === -1 ||
          targetIndex === -1 ||
          sourceIndex === targetIndex
        )
          return prev;

        const newEntries = [...entries];
        const [movedColumn] = newEntries.splice(sourceIndex, 1);
        newEntries.splice(targetIndex, 0, movedColumn);

        return Object.fromEntries(newEntries);
      });
      return;
    }

    // =========================================================================
    // B) KARTA (TASK) SURILAYOTGAN BO'LSA
    // =========================================================================
    const sourceCardId = sourceId;

    // 4.3 Karta qaysi ustundan tortib olinganini va uning indeksini aniqlash
    let sourceColumnId: string | null = null; // Tortilgan ustun ID-si (masalan: "todo")
    let draggedTask: Task | null = null; // Tortilgan kartaning to'liq ma'lumotlari (obyekti)
    let sourceIndex: number = -1; // Karta eski ustunida turgan indeks (tartib raqami)

    // Barcha ustunlarni birma-bir aylanib chiqamiz
    for (const [colId, colData] of Object.entries(columns)) {
      // Shu ustundagi tasklar orasidan tortilgan karta ID-sini qidiramiz
      const idx = colData.tasks.findIndex((t) => t.id === sourceCardId);

      // Agar karta shu ustun ichidan topilsa (indeks -1 bo'lmasa)
      if (idx !== -1) {
        sourceColumnId = colId; // Karta tortib olingan ustun ID-sini olamiz
        draggedTask = colData.tasks[idx]; // Tortilgan task obyektini saqlaymiz
        sourceIndex = idx; // Karta turgan indeksni saqlaymiz
        break; // Karta topildi, qolgan ustunlarni bekorga aylanmaslik uchun tsiklni to'xtatamiz
      }
    }

    if (!sourceColumnId || !draggedTask) return;

    // 4.4 Karta qayerga tashlanganini aniqlash (bo'sh ustunmi yoki boshqa kartaning ustimi)
    let targetColumnId: string | null = null;
    let targetIndex: number = -1;

    if (columns[targetId]) {
      // Ustunning o'ziga tashlangan bo'lsa (eng oxiriga qo'shiladi)
      targetColumnId = targetId;
      targetIndex = columns[targetId].tasks.length;
    } else {
      // Boshqa kartaning ustiga tashlangan bo'lsa (o'sha kartaning o'rniga qo'yiladi)
      for (const [colId, colData] of Object.entries(columns)) {
        const idx = colData.tasks.findIndex((t) => t.id === targetId);
        if (idx !== -1) {
          targetColumnId = colId;
          targetIndex = idx;
          break;
        }
      }
    }

    if (!targetColumnId) return;

    // Agar karta o'z joyiga qaytarib qo'yilgan bo'lsa, hech narsa qilmaslik
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex)
      return;

    // 4.5 Ustunlar state-ini yangilash (kartani ko'chirish)
    setColumns((prev) => {
      // Eskisidan o'chirish uchun nusxa olamiz
      const newSourceTasks = [...prev[sourceColumnId!].tasks];
      newSourceTasks.splice(sourceIndex, 1); // Eski joyidan o'chirish

      if (sourceColumnId === targetColumnId) {
        // A) Bitta ustun ichida tartibni o'zgartirish
        const adjustedTargetIndex =
          sourceIndex < targetIndex ? targetIndex : targetIndex;
        newSourceTasks.splice(adjustedTargetIndex, 0, draggedTask!);

        return {
          ...prev,
          [sourceColumnId!]: {
            ...prev[sourceColumnId!],
            tasks: newSourceTasks,
          },
        };
      } else {
        // B) Boshqa ustunga o'tkazish
        const newTargetTasks = [...prev[targetColumnId!].tasks];
        newTargetTasks.splice(targetIndex, 0, draggedTask!); // Yangi ustunga qo'shish

        return {
          ...prev,
          [sourceColumnId!]: {
            ...prev[sourceColumnId!],
            tasks: newSourceTasks,
          },
          [targetColumnId!]: {
            ...prev[targetColumnId!],
            tasks: newTargetTasks,
          },
        };
      }
    });
  };

  return (
    <Flex vertical className="w-full h-full pt-3">
      {/* 4.5 Breadcrumb - full-width, containersiz, px-6 */}
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

      {/* 4.6 Barcha ustunlarni Drag-and-drop qobig'i bilan o'rash */}
      <DragDropProvider onDragEnd={handleDragEnd}>
        <Flex
          align="start"
          gap={20}
          className="w-full overflow-x-auto px-6 pt-3 pb-6 custom-scrollbar"
        >
          {/* 4.7 Ustunlar va ularning ichidagi kartalarni birma-bir render qilish */}
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
          <Flex vertical gap={12} className="min-w-[320px] w-[320px] flex-shrink-0">
            <Button
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen((prev) => !prev)}
              className="w-full !h-[52px] !bg-[#f8fafc] !shadow-xl !border !border-dashed !border-gray-200 hover:!border-gray-300 hover:!bg-white !text-slate-700 hover:!text-black !rounded-2xl cursor-pointer sora font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.99]"
            >
              Bu safar nima deymiz?
            </Button>
            {isModalOpen && (
              <KanbanCreate onClose={() => setIsModalOpen(false)} />
            )}
          </Flex>
        </Flex>
      </DragDropProvider>
    </Flex>
  );
}
