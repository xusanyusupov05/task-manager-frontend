import { Button, Flex, Form, Input } from "antd";
import { usePostWorkspaceColumnMutation } from "@/entities/workspaces-columns/api";
import { toast } from "sonner";

interface KanbanCreateProps {
  onClose: () => void;
  workspaceId?: string;
}

export function KanbanCreate({ onClose, workspaceId }: KanbanCreateProps) {
  const [form] = Form.useForm();
  const [create, { isLoading }] = usePostWorkspaceColumnMutation();

  async function handleCreate(values: { title: string }) {
    if (!values.title?.trim()) return;

    try {
      await create({
        workspaceId: workspaceId || "",
        title: values.title.trim(),
        order: 0,
      }).unwrap();
      toast.success("Ustun muvaffaqiyatli qo'shildi!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Ustun qo'shishda xatolik yuz berdi!");
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 shadow-xl">
      <Form form={form} layout="vertical" onFinish={handleCreate}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Ustun nomini kiriting!" }]}
          className="mb-4"
        >
          <Input
            placeholder="Yozavering."
            className="sora text-sm !rounded-xl !border-gray-200 focus:!border-blue-500 h-10"
            autoFocus
          />
        </Form.Item>
        <Flex vertical gap={8} className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="sora text-sm font-semibold rounded-xl bg-gray-500 hover:!bg-gray-700 shadow-sm w-full h-11 !border-0 text-white"
          >
            Shu ma'qul keldi
          </Button>
          <Button
            type="text"
            onClick={onClose}
            className="sora text-sm rounded-xl text-gray-500 hover:!text-gray-700 hover:!bg-gray-100 font-medium w-full h-9"
          >
            Kerak emas
          </Button>
        </Flex>
      </Form>
    </div>
  );
}
