import { Button, Flex, Form, Input} from "antd";

interface KanbanCreateProps {
  onClose: () => void;
}

export function KanbanCreate({ onClose }: KanbanCreateProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 p-4 shadow-xl">
      <Form layout="vertical">
        <Form.Item className="mb-4" >
          <Input
            placeholder="Yozavering."
            className="sora text-sm !rounded-xl !border-gray-200 focus:!border-blue-500 h-10"
          />
        </Form.Item>
        <Flex vertical gap={8} className="w-full">
          <Button
            type="primary"
            onClick={onClose}
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
