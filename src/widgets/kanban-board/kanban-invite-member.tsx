import { Flex, Input, Form, Button } from "antd";
import { toast } from "sonner";

interface InviteMemberFormValues {
  username: string;
}

export function KanbanInviteMember() {
  const [form] = Form.useForm<InviteMemberFormValues>();

  function handleInviteMember(values: InviteMemberFormValues) {
    if (!values.username?.trim()) {
      toast.error("Ism yoki email kiriting oka!");
      return;
    }
  }

  return (
    <Form form={form} onFinish={handleInviteMember} className="w-full">
      <Flex align="start" gap={8}>
        <Form.Item
          name="username"
          className="!mb-0 flex-1"
          rules={[
            { required: true, message: "Quriq bosavermang Ism yozing!" },
          ]}
        >
          <Input placeholder="Laqabinggiz yoki email" />
        </Form.Item>
        <Form.Item className="!mb-0">
          <Button type="primary" htmlType="submit">
            Taklif qilish
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}

