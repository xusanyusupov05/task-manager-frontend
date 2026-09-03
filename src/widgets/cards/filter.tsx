import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input } from "antd";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CreateCardModal } from "./create-card-modal";

export function CardFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchParams((prev) => {
      const nextParams = new URLSearchParams(prev);
      if (value.trim()) {
        nextParams.set("search", value);
      } else {
        nextParams.delete("search");
      }
      return nextParams;
    });
  };

  return (
    <Flex className="w-full h-[45px] px-5" justify="space-between" align="center">
      <Input
        placeholder="G'alvalardan qidirish..."
        prefix={<SearchOutlined className="text-gray-400 text-lg mr-1" />}
        allowClear
        value={search}
        onChange={handleSearchChange}
        className="!w-[320px] py-2 rubik text-[16px] rounded-xl"
      />
      <Button
        className="sora text-[16px] h-10 hover:!border-[#D9D9D9] hover:!text-black"
        onClick={() => setIsModalOpen(true)}
      >
        <Flex align="center" gap={8}>
          <PlusCircleOutlined />
          Yangi g'alva
        </Flex>
      </Button>
      <CreateCardModal open={isModalOpen} setOpen={setIsModalOpen} />
    </Flex>
  );
}