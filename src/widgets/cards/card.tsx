import { Button, Dropdown, Flex, Typography, Modal, Tooltip, type MenuProps } from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useDeleteWorspaceMutation } from "@/entities/workspaces";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { toast } from "sonner";

const { Text } = Typography;

interface CreateCardProps {
  id: string;
  title: string;
  description?: string;
  createdAt?: string | number | Date;
  color?: string;
}

export function CreateCard({
  id,
  title,
  description,
  createdAt,
  color = "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
}: CreateCardProps) {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const admin = "admin";
  const [deleteWorkspace, { isLoading }] = useDeleteWorspaceMutation();

  const handleCardClick = () => {
    navigate(`${ROUTE_PATH.KANBAN_BOARD}?workspaceId=${id}`);
  };

  async function handleDelteMutation(targetId: string) {
    try {
      await deleteWorkspace(targetId).unwrap();
      toast.success("G'alva chopildi!", {
        description: "Bir bosh og'rig'iqdan muvaffaqiyatli qutildik",
      });
      setConfirmOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("G'alvani chopishda xatolik yuz berdi!");
    }
  }

  const items: NonNullable<MenuProps["items"]> = [
    {
      key: "1",
      label: (
        <Typography.Text className="text-[15px] font-medium !text-red-500 rubik">
          Chopish
        </Typography.Text>
      ),
      icon: <DeleteOutlined className="text-red-500 !text-[16px]" />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        setConfirmOpen(true);
      },
    },
    {
      key: "2",
      label: (
        <Typography.Text className="text-[15px] font-medium !text-slate-800 rubik">
          G'alva ta'miri
        </Typography.Text>
      ),
      icon: <EditOutlined className="text-yellow-500 !text-[16px]" />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
      },
    },
  ];

  if (description) {
    items.push({
      key: "3",
      label: (
        <Typography.Text className="text-[15px] font-medium !text-slate-800 rubik">
          Gapning indallosi
        </Typography.Text>
      ),
      icon: <InfoCircleOutlined className="text-blue-500 !text-[16px]" />,
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        setModal(true);
      },
    });
  }

  return (
    <Flex
      vertical
      onClick={handleCardClick}
      className="w-full !h-[240px] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 mb-6 group cursor-pointer relative justify-between"
    >
      <div className="w-full h-[140px] relative overflow-hidden bg-gray-50 flex-shrink-0">
        <div
          className="w-full h-full group-hover:scale-105 transition-transform duration-300"
          style={{ background: color }}
        />
      </div>

      <div className="p-4 flex items-start justify-between gap-2 flex-1 relative">
        <Tooltip title={title} placement="topLeft">
          <Text
            className="font-bold text-[16px] sora text-gray-800 leading-snug line-clamp-2 flex-1"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </Text>
        </Tooltip>

        {admin === "admin" ? (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown
              menu={{
                items,
                onClick: ({ domEvent }) => {
                  domEvent?.stopPropagation?.();
                },
              }}
              trigger={["click"]}
            >
              <Button
                type="text"
                className="!w-8 !h-8 !p-0 flex-shrink-0 flex items-center justify-center !border !border-gray-300 rounded-lg hover:!bg-gray-100 !text-gray-500 hover:!text-black"
                icon={<EllipsisOutlined className="text-base" />}
                onClick={(e) => e.stopPropagation()}
              />
            </Dropdown>
          </div>
        ) : null}
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <Modal
          title={
            <span className="sora font-bold text-[18px]">
              Gapning indallosi akalar
            </span>
          }
          open={modal}
          onCancel={() => setModal(false)}
          styles={{ mask: { backdropFilter: "blur(15px)" } }}
          className="w-[350px]"
          footer={null}
        >
          <div className="flex flex-col gap-3 pt-3">
            {createdAt && (
              <div className="flex items-center justify-between bg-slate-50 border border-slate-100 px-3.5 py-2.5 rounded-xl text-xs">
                <span className="text-slate-500 rubik flex items-center gap-1.5 font-medium text-[16px]">
                  <CalendarOutlined className="text-blue-500 text-[18px]" />
                  G'alvaning yaratilishi:
                </span>
                <span className="text-slate-800 font-semibold rubik bg-white px-2 py-0.5 rounded-md border border-slate-200/60 shadow-xs">
                  {dayjs(createdAt).format("DD.MM.YYYY")}
                </span>
              </div>
            )}
            {description && (
              <div className="bg-gray-50/70 p-3.5 rounded-xl border border-gray-100">
                <Typography.Text className="rubik text-gray-700 text-sm leading-relaxed block">
                  {description}
                </Typography.Text>
              </div>
            )}
          </div>
        </Modal>

        <ConfirmDialog
          open={confirmOpen}
          type="error"
          title="Rostdan ham bu g'alvani chopmoqchimisiz?"
          description="Bu g'alvani chopib tashlasangiz, unga tegishli barcha topshiriqlar ham butunlay yo'qoladi."
          cancelText="Tursin, tegmayman"
          confirmText="Ha, chopilsin"
          onCancel={() => setConfirmOpen(false)}
          loading={isLoading}
          onConfirm={() => handleDelteMutation(id)}
        />
      </div>
    </Flex>
  );
}
