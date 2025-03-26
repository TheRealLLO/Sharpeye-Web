import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // fontSize: 16,
    // colorPrimary: '#c41a97',
    colorPrimary: '#00c057',
  },
  components: {
    Tabs: {
      itemActiveColor: "#00c057",
      itemColor: "white",
      itemSelectedColor	: "#00c057",
      itemHoverColor: "#00c057",
      inkBarColor: "#00c057",
    },
    Button: {
      defaultActiveColor: "#00c057",
      defaultActiveBorderColor: "#00c057",
      defaultHoverColor: "#00c057",
      defaultHoverBorderColor: "#00c057",

    }
  }
};

export default theme;