import { Button, Flex, Form, Input } from "antd";

export function CardFilter() {
    return (
        <Flex className="w-full px-5" justify="space-between">
            <Form>
                <Form.Item>
                    <Input placeholder="Razdevalka"
                        className="!w-[300px] py-2 rubik text-[17px]"
                    />
                </Form.Item>
            </Form>
            <Button className="sora text-[17px]">Bitta boshog'riq</Button>
        </Flex>
    )
}