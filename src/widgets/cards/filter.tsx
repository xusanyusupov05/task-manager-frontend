import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input } from "antd";
import { useState } from "react";
import { CreateCardModal } from "./create-card-modal";

export function CardFilter() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <Flex className="w-full h-[45px] px-5" justify="space-between">
            <Form>
                <Form.Item>
                    <Input placeholder="Razdevalka"
                        className="!w-[300px] py-2 rubik text-[17px]"
                    />
                </Form.Item>
            </Form>
            <Button className="sora text-[17px] hover:!border-[#D9D9D9] hover:!text-black" onClick={() => setIsModalOpen(true)}>
                <Flex align="center" gap={10}>
                    <PlusCircleOutlined />
                    Yangi g'alva
                </Flex>
            </Button>
            <CreateCardModal open={isModalOpen} setOpen={setIsModalOpen} />
        </Flex>
    )
}