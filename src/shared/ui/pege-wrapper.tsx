import { Flex, Typography } from "antd";

interface PageWrapperProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ title, children, className }: PageWrapperProps) {
  return (
    <Flex vertical align="start" className={className}>
      <Typography.Text className="sora text-3xl px-5 pb-7">
        {title}
      </Typography.Text>
      {children}
    </Flex>
  );
}
