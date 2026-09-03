import { Button, Flex, Form, Input, Modal, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { useState } from "react";
import { usePostWorkspaceMutation } from "@/entities/workspaces";
import { toast } from "sonner";

interface CreateCardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const itemsList = [
  { key: 1, item: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)" }, // Royal Sapphire
  { key: 2, item: "linear-gradient(135deg, #065f46 0%, #10b981 100%)" }, // Rich Emerald
  { key: 3, item: "linear-gradient(135deg, #881337 0%, #e11d48 100%)" }, // Velvet Crimson
  { key: 4, item: "linear-gradient(135deg, #27272a 0%, #52525b 100%)" }, // Slate Graphite
  { key: 5, item: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)" }, // Marine Teal
  { key: 6, item: "linear-gradient(135deg, #581c87 0%, #9333ea 100%)" }, // Royal Purple
  { key: 7, item: "linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)" }, // Terracotta Amber
  { key: 8, item: "linear-gradient(135deg, #334155 0%, #64748b 100%)" }, // Steel Slate
];

export function CreateCardModal({ open, setOpen }: CreateCardModalProps) {
  const [postWorkspace, { isLoading }] = usePostWorkspaceMutation();
  const [selectedColor, setSelectedColor] = useState<string | null>(itemsList[0].item);
  const [form] = Form.useForm();

  async function handleCreateWorkspace(values: {
    title: string;
    description?: string;
  }) {
    if (!values.title?.trim()) return;
    try {
      await postWorkspace({
        title: values.title,
        description: values.description || "",
        bgColor: selectedColor,
      }).unwrap();
      toast.success("G'alva yaratildi!");
      setOpen(false);
      form.resetFields();
      setSelectedColor(itemsList[0].item);
    } catch (error) {
      console.log(error);
      toast.error("G'alva yaratishda xatolik yuz berdi!");
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      styles={{
        mask: {
          backdropFilter: "blur(8px)",
        },
      }}
      title={
        <div className="flex flex-col mb-1">
          <Typography.Text className="sora text-[22px] font-bold text-slate-900 leading-tight">
            O'zimizga ish orttiramiz! 
          </Typography.Text>
          <Typography.Text className="rubik text-sm text-gray-500 font-normal mt-1">
            Rejalarni tartiblab, jamoani safarbar qilamiz
          </Typography.Text>
        </div>
      }
    >
      <Flex vertical gap={18} className="mt-4">
        {/* Color Palette */}
        <div className="flex items-center justify-between gap-1.5 py-1">
          {itemsList.map((item) => {
            const isSelected = selectedColor === item.item;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => setSelectedColor(item.item)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center border-0 outline-none flex-shrink-0 ${
                  isSelected
                    ? "ring-2 ring-offset-2 ring-slate-900 scale-105 shadow-sm"
                    : "hover:scale-105 opacity-90 hover:opacity-100"
                }`}
                style={{ background: item.item }}
              >
                {isSelected && (
                  <CheckOutlined className="text-white text-xs sm:text-sm drop-shadow-xs" />
                )}
              </button>
            );
          })}
        </div>

        <Form
          form={form}
          onFinish={handleCreateWorkspace}
          layout="vertical"
          className="flex flex-col gap-1"
        >
          <Form.Item
            name="title"
            label={
              <Typography.Text className="rubik text-[15px]">
                G'alvaga bitta nom bering :
              </Typography.Text>
            }
            rules={[{ required: true, message: "G'alvaga nom berish kerak!" }]}
            className="!mb-4"
          >
            <Input className="w-full !h-12 !rounded-xl !border-slate-200 hover:!border-slate-400 focus:!border-slate-900 text-[15px] rubik px-3.5 shadow-xs" />
          </Form.Item>

          <Form.Item
            name="description"
            label={
              <Typography.Text className="rubik text-[15px]">
                Ichingizdagi gaplar bo'lsa :
              </Typography.Text>
            }
            className="!mb-6"
          >
            <Input.TextArea
              rows={3}
              className="w-full !rounded-xl !border-slate-200 hover:!border-slate-400 focus:!border-slate-900 text-[15px] rubik p-3 shadow-xs resize-none"
            />
          </Form.Item>

          <Form.Item className="!mb-0">
            <Button
              htmlType="submit"
              loading={isLoading}
              className="w-full !h-12 !bg-slate-950 hover:!bg-black !text-white !font-medium !text-[16px] !rounded-full rubik shadow-md hover:shadow-lg transition-all flex items-center justify-center !border-0 cursor-pointer"
            >
              Tavakkal boshladik 
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
}
