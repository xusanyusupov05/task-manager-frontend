import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { KanbanColumn } from "@/widgets/kanban-board/kanban-column";
import { TaskCard } from "@/widgets/kanban-board/task-card";
import { Flex } from "antd";
import { useState } from "react";

// 1. Bitta vazifa (task) ma'lumotlarining tipi
interface Task {
  id: string; // Vazifaning unikal ID-si
  title: string; // Vazifa matni / sarlavhasi
  labels: string[]; // Teglar (frontend, backend, design...)
  members: string[]; // Vazifaga biriktirilgan a'zolar ro'yxati
}

// 2. Barcha ustunlar holatining tipi (har bir ustun nomi va undagi tasklar ro'yxati)
interface ColumnsState {
  [key: string]: {
    title: string; // Ustun nomi (Todo, In Progress, Done)
    tasks: Task[]; // Ustundagi vazifalar massivi
  };
}

// 3. Dastlabki statik ma'lumotlar (boshlang'ich ustunlar va kartalar)
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
    title: "Yuzimiz yorug'",
    tasks: [
      {
        id: "task-5",
        title: "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
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
        title: "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
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
        title: "Dastlabki loyiha strukturasini yaratish va kutubxonalarni o'rnatish",
        labels: ["frontend"],
        members: ["Sotiboldiyev Otabek"],
      },
    ],
  },
};

// 4. Asosiy KanbanBoard doskasi komponenti
export function KanbanBoard() {
  // 4.1 Ustunlar va undagi kartalar holatini saqlovchi state
  const [columns, setColumns] = useState<ColumnsState>(INITIAL_DATA);

  // 4.2 Drag-and-drop yakunlanganda (karta qo'yib yuborilganda) ishlaydigan asosiy funksiya
  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;
    const source = operation?.source; // Tortilgan karta
    const target = operation?.target; // Karta tashlangan joy (ustun yoki boshqa karta)

    // Agar tortilgan yoki tashlangan joy mavjud bo'lmasa, funksiyani to'xtatish
    if (!source || !target) return;

    const sourceCardId = String(source.id);
    const targetId = String(target.id);

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
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex) return;

    // 4.5 Ustunlar state-ini yangilash (kartani ko'chirish)
    setColumns((prev) => {
      // Eskisidan o'chirish uchun nusxa olamiz
      const newSourceTasks = [...prev[sourceColumnId!].tasks];
      newSourceTasks.splice(sourceIndex, 1); // Eski joyidan o'chirish

      if (sourceColumnId === targetColumnId) {
        // A) Bitta ustun ichida tartibni o'zgartirish
        const adjustedTargetIndex = sourceIndex < targetIndex ? targetIndex : targetIndex;
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
    // 4.6 Barcha ustunlarni Drag-and-drop qobig'i bilan o'rash
    <DragDropProvider onDragEnd={handleDragEnd}>
      <Flex align="start" gap={20} className="w-full h-full overflow-x-auto p-4">
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
      </Flex>
    </DragDropProvider>
  );
}
