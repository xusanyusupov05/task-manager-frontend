import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  InfoCircleFilled,
} from "@ant-design/icons";
import { Button, Flex, Modal, Typography } from "antd";

export type ConfirmDialogType = "success" | "error" | "warning" | "info";

interface Props {
  type?: ConfirmDialogType;
  title: string;
  description?: string;
  open: boolean;
  closable?: boolean;
  loading?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const typeConfig: Record<
  ConfirmDialogType,
  {
    icon: React.ReactNode;
    badgeClass: string;
    confirmBtnClass: string;
    defaultConfirmText: string;
  }
> = {
  success: {
    icon: <CheckCircleFilled className="text-emerald-700 text-2xl" />,
    badgeClass: "bg-emerald-50 border-emerald-100",
    confirmBtnClass:
      "!bg-emerald-700 hover:!bg-emerald-800 !text-white !border-0 shadow-md shadow-emerald-700/20",
    defaultConfirmText: "Ha, tushunarli",
  },
  error: {
    icon: <CloseCircleFilled className="text-rose-700 text-2xl" />,
    badgeClass: "bg-rose-50 border-rose-100",
    confirmBtnClass:
      "!bg-rose-700 hover:!bg-rose-800 !text-white !border-0 shadow-md shadow-rose-700/20",
    defaultConfirmText: "Ha, o'chirish",
  },
  warning: {
    icon: <ExclamationCircleFilled className="text-amber-700 text-2xl" />,
    badgeClass: "bg-amber-50 border-amber-100",
    confirmBtnClass:
      "!bg-amber-700 hover:!bg-amber-800 !text-white !border-0 shadow-md shadow-amber-700/20",
    defaultConfirmText: "Ha, roziman",
  },
  info: {
    icon: <InfoCircleFilled className="text-blue-700 text-2xl" />,
    badgeClass: "bg-blue-50 border-blue-100",
    confirmBtnClass:
      "!bg-blue-700 hover:!bg-blue-800 !text-white !border-0 shadow-md shadow-blue-700/20",
    defaultConfirmText: "Ha, bajaraman",
  },
};

export function ConfirmDialog({
  type = "info",
  title,
  description,
  open,
  closable = false,
  loading = false,
  cancelText = "Yo'q, adashtim",
  confirmText,
  onCancel,
  onConfirm,
}: Props) {
  const currentConfig = typeConfig[type];

  return (
    <Modal
      open={open}
      onCancel={loading ? undefined : onCancel}
      closable={closable && !loading}
      footer={null}
      width={480}
      style={{ top: 32 }}
      transitionName="modal-slide-down"
      styles={{
        container: {
          padding: "24px",
          borderRadius: "12px",
          boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Flex vertical gap={16} className="pt-1">
        <Flex align="start" gap={14}>
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${currentConfig.badgeClass}`}
          >
            {currentConfig.icon}
          </div>

          <Flex vertical gap={4} className="pt-0.5">
            <Typography.Text className="sora font-bold text-lg text-slate-800 leading-snug">
              {title}
            </Typography.Text>
            {description && (
              <Typography.Text className="rubik text-sm text-slate-500 leading-relaxed">
                {description}
              </Typography.Text>
            )}
          </Flex>
        </Flex>

        <Flex justify="flex-end" gap={10} className="mt-3">
          <Button
            disabled={loading}
            onClick={onCancel}
            className="sora h-10 px-4 rounded-[8px] border-gray-200 text-slate-600 hover:!text-slate-600 hover:!border-gray-200 font-medium disabled:opacity-50"
          >
            {cancelText}
          </Button>
          <Button
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
            className={`sora h-10 px-5 rounded-[8px] font-medium transition-all duration-200 active:scale-95 ${currentConfig.confirmBtnClass}`}
          >
            {confirmText || currentConfig.defaultConfirmText}
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}