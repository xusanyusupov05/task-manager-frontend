import { Flex, Tag, Typography } from "antd";

interface NicknameConfig {
  label: string;
  className: string;
}

const getNicknameConfig = (taskCount: number): NicknameConfig => {
  if (taskCount === 0) {
    return {
      label: "Begona bola",
      className: "!bg-[#F0FDF4] !text-emerald-600 !border font-semibold !border-emerald-200",
    };
  }
  if (taskCount >= 1 && taskCount <= 10) {
    return {
      label: "Do'konga chopuvchi",
      className: "!bg-[#DCFCE7] !text-emerald-700 !border font-semibold !border-emerald-300",
    };
  }
  if (taskCount >= 11 && taskCount <= 25) {
    return {
      label: "O'zimizdan",
      className: "!bg-[#86EFAC] !text-emerald-900 !border font-semibold !border-emerald-400",
    };
  }
  if (taskCount >= 26 && taskCount <= 50) {
    return {
      label: "Ishonganimiz",
      className: "!bg-[#22C55E] !text-white font-semibold !border-transparent",
    };
  }
  if (taskCount >= 51 && taskCount <= 100) {
    return {
      label: "Ko'cha ko'rgan",
      className: "!bg-[#15803D] !text-white font-semibold !border-transparent",
    };
  }
  if (taskCount >= 101 && taskCount <= 200) {
    return {
      label: "Katta uka",
      className: "!bg-[#064E3B] !text-white font-semibold !border-transparent",
    };
  }
  return {
    label: "Katta aka",
    className:
      "!bg-yellow-500 !text-black !border !border-black font-bold shadow-sm",
  };
};

export function ProfileStatus({ taskCount = 0 }: { taskCount: number }) {
  const { label, className } = getNicknameConfig(taskCount);

  return (
    <Flex gap={10} className="pl-5">
      <Typography.Text className="sora font-semibold">Kimsiz:</Typography.Text>
      <Tag
        className={`py-0.5 rounded-[6px] sora text-xs inline-flex items-center justify-center transition-all ${className}`}
      >
        {label}
      </Tag>
    </Flex>
  );
}
