import { Flex, Tag, Typography } from "antd";

interface StatusItem {
  label: string;
  className: string;
  range: string;
}

const statusList: StatusItem[] = [
  {
    label: "Begona bola",
    className: "!bg-[#F0FDF4] !text-emerald-600 !border font-semibold !border-emerald-200",
    range: "0 ta vazifa",
  },
  {
    label: "Do'konga chopuvchi",
    className: "!bg-[#DCFCE7] !text-emerald-700 !border font-semibold !border-emerald-300",
    range: "1 - 10 ta vazifa",
  },
  {
    label: "O'zimizdan",
    className: "!bg-[#86EFAC] !text-emerald-900 !border font-semibold !border-emerald-400",
    range: "11 - 25 ta vazifa",
  },
  {
    label: "Ishonganimiz",
    className: "!bg-[#22C55E] !text-white font-semibold !border-transparent",
    range: "26 - 50 ta vazifa",
  },
  {
    label: "Ko'cha ko'rgan",
    className: "!bg-[#15803D] !text-white font-semibold !border-transparent",
    range: "51 - 100 ta vazifa",
  },
  {
    label: "Katta uka",
    className: "!bg-[#064E3B] !text-white font-semibold !border-transparent",
    range: "101 - 200 ta vazifa",
  },
  {
    label: "Katta aka",
    className: "!bg-yellow-500 !text-black !border !border-black font-bold shadow-sm",
    range: "201+ ta vazifa",
  },
];

export function AboutStatus() {
  return (
    <Flex vertical gap={10} className="w-full py-2">
      {statusList.map((item, index) => (
        <Flex
          key={index}
          align="center"
          justify="space-between"
          className="p-2.5 rounded-lg border border-gray-100 bg-gray-50/60 hover:bg-gray-100/60 transition-all"
        >
          <Tag
            className={`py-0.5 px-3 rounded-[6px] sora text-xs inline-flex items-center justify-center transition-all ${item.className}`}
          >
            {item.label}
          </Tag>
          <Typography.Text className="sora text-sm text-gray-500 font-medium">
            {item.range}
          </Typography.Text>
        </Flex>
      ))}
    </Flex>
  );
}

