import { Button, Dropdown, Flex, Typography, Modal, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteWorspaceMutation } from "@/entities/workspaces";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { ROUTE_PATH } from "@/shared/consts/routes-path";
import { toast } from "sonner";

const { Text } = Typography;

interface CreateCardProps {
  id: string;
  title: string;
  description?: string;
  color?: string;
}

export function CreateCard({
  id,
  title,
  description,
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

  const items = [
    {
      key: "1",
      label: (
        <Typography.Text className="text-[15px] font-medium !text-red-500 rubik">
          Chopish
        </Typography.Text>
      ),
      icon: <DeleteOutlined className="text-red-500 !text-[16px]" />,
      onClick: () => setConfirmOpen(true),
    },
    {
      key: "2",
      label: (
        <Typography.Text className="text-[15px] font-medium !text-slate-800 rubik">
          G'alva ta'miri
        </Typography.Text>
      ),
      icon: <EditOutlined className="text-yellow-500 !text-[16px]" />,
    },
    ...(description
      ? [
          {
            key: "3",
            label: (
              <Typography.Text className="text-[15px] font-medium !text-slate-800 rubik">
                Gapning indallosi
              </Typography.Text>
            ),
            icon: <InfoCircleOutlined className="text-blue-500 !text-[16px]" />,
            onClick: () => setModal(true),
          },
        ]
      : []),
  ];

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
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button
              type="text"
              className="!w-8 !h-8 !p-0 flex-shrink-0 flex items-center justify-center !border !border-gray-300 rounded-lg hover:!bg-gray-100 !text-gray-500 hover:!text-black"
              icon={<EllipsisOutlined className="text-base" />}
              onClick={(e) => e.stopPropagation()}
            />
          </Dropdown>
        ) : null}
      </div>

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
        <Tooltip title={description}>
          <Typography.Text className="rubik">{description}</Typography.Text>
        </Tooltip>
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
    </Flex>
  );
}
