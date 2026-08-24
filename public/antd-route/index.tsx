import { ConfigProvider } from "antd";

export const AntdRouters = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedColor: "#000",
            itemHoverColor: "#000",
            horizontalItemSelectedColor: "#000",
            itemMarginInline: 0,
            itemPaddingInline: 12,
          },
          Input: {
            controlHeight: 45,
            borderRadius: 10,
            hoverBorderColor: "#000",
            activeBorderColor: "#000",
          },
          Button: {
            controlHeight: 45,
            borderRadius: 10
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
