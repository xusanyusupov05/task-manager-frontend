import { Button, Col, Flex, Form, Input, message, Modal, Row, Typography } from "antd";
import { useState } from "react";
import { usePostWorkspaceMutation } from "@/entities/workspaces";

interface CreateCardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const itemsList = [
  { key: 1, item: "#1a1b41" }, // Deep Indigo
  { key: 2, item: "#064e3b" }, // Dark Emerald
  { key: 3, item: "#4a0404" }, // Midnight Crimson
  { key: 4, item: "#18181b" }, // Charcoal Black
  { key: 5, item: "#0f766e" }, // Deep Teal
  { key: 6, item: "#1e3a8a" }, // Royal Navy
  { key: 7, item: "#4c1d95" }, // Rich Plum
  { key: 8, item: "#78350f" }, // Burnt Umber
];
export function CreateCardModal({ open, setOpen }: CreateCardModalProps) {
  const [postWorkspace, { isLoading }] = usePostWorkspaceMutation();
  const [selectedColor,setSelectedColor] = useState<string | null>(null)
  const [form] = Form.useForm();
  
  
  async function handleCreateWorkspace(values: {
    title: string;
    description: string;
  }) {
    if(values.description.trim() && values.title.trim() === '') return;
    try {
      await postWorkspace({title:values.title,description:values.description,bgColor:selectedColor}).unwrap();
      message.success("G'alva yaratildi!");
      setOpen(false);
      form.resetFields();
      setSelectedColor(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
      title={<Typography.Text className="sora text-xl">O'zimizga ish orttiramiz!</Typography.Text>}
    >
      <Flex vertical gap={20}>
        <Row gutter={[16, 16]}>
          {itemsList.map((item) => {
            const isSelected = selectedColor === item.item;
            return (
              <Col key={item.key} span={6}>
                <div
                  onClick={() => setSelectedColor(item.item)}
                  className={`w-full h-[65px] rounded-lg cursor-pointer transition-all shadow-sm border border-gray-100 flex items-center justify-center ${
                    isSelected ? "scale-105 ring-2 ring-offset-2 ring-gray-900" : "hover:scale-105"
                  }`}
                  style={{ background: item.item }}
                >
                  {isSelected && (
                    <span className="w-3 h-3 bg-white rounded-full shadow-sm" />
                  )}
                </div>
              </Col>
            );
          })}
        </Row>
        <Form form={form} onFinish={handleCreateWorkspace} layout="vertical">
          <Form.Item
            name="title"
            label={<Typography.Text className="rubik text-[15px]">G'alvaga bitta nom bering :</Typography.Text>}
          >
            <Input className="w-full h-10 py-0 text-[17px] rubik!" />
          </Form.Item>
          <Form.Item
            name="description"
            label={<Typography.Text className="rubik text-[15px]">Ichingizdagi gaplar bo'lsa :</Typography.Text>}
          >
            <Input className="w-full h-10 py-0 text-[17px] rubik!" />
          </Form.Item>
          <Form.Item className="mb-0">
            <Button
              htmlType="submit"
              className="w-full rubik text-[17px] hover:!border-[#D9D9D9] hover:!text-black"
              loading={isLoading}
            >
              Tavakkal boshladik
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  );
}
