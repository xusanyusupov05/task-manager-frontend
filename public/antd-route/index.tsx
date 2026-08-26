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
            borderRadius: 10,
          },
          Tabs: {
            fontSize: 18,
            fontFamily: "sora",
            inkBarColor: "#000",
            itemSelectedColor: "#000",
            itemHoverColor: "#000",
          },
          Select: {
            controlHeight: 40,
            borderRadius: 10,
            hoverBorderColor: "#d9d9d9",
            activeBorderColor: "#d9d9d9",
            activeOutlineColor: "transparent",
            controlOutline: "transparent",
            fontFamily: "sora",
            optionSelectedBg: "transparent",
            optionSelectedColor: "#000",
            optionActiveBg: "rgba(0, 0, 0, 0.04)",
            fontSize: 14
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
