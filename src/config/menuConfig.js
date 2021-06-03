import {
    HomeOutlined,
    UserOutlined,
    AreaChartOutlined,
    BarChartOutlined,
    PieChartOutlined,
    LineChartOutlined,
    ToolOutlined,
    UnorderedListOutlined,
    IdcardOutlined,
    AppstoreOutlined,
  } from "@ant-design/icons";

const menuList = [
  { title: "Home", key: "/home", icon: <HomeOutlined /> },

  {
    title: "Merchandise",
    key: "/merchandise",
    icon: <AppstoreOutlined/>,
    children: [
      { title: "Category", key: "/category", icon: <UnorderedListOutlined/> },

      { title: "Product", key: "/product", icon: <ToolOutlined/> },
    ],
  },

  { title: "User", key: "/user", icon: <UserOutlined /> },

  { title: "Role", key: "/role", icon: <IdcardOutlined/> },

  {
    title: "Charts",
    key: "/charts",
    icon: <AreaChartOutlined/>,
    children: [
      { title: "bar", key: "/charts/bar", icon: <BarChartOutlined/> },
      { title: "line", key: "/charts/line", icon: <LineChartOutlined/> },
      { title: "pie", key: "/charts/pie", icon: <PieChartOutlined/> },
    ],
  },
];

export default menuList;
