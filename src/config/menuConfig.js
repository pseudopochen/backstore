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
  { title: "Home", key: "/home", tkey: "0-0", icon: <HomeOutlined /> },

  {
    title: "Merchandise",
    key: "/merchandise",
    tkey: "0-1",
    icon: <AppstoreOutlined />,
    children: [
      { title: "Category", key: "/category", tkey: "0-1-0",icon: <UnorderedListOutlined /> },

      { title: "Product", key: "/product", tkey: "0-1-1",icon: <ToolOutlined /> },
    ],
  },

  { title: "User", key: "/user", tkey: "0-2", icon: <UserOutlined /> },

  { title: "Role", key: "/role", tkey: "0-3", icon: <IdcardOutlined /> },

  {
    title: "Charts",
    key: "/charts",
    tkey: "0-4",
    icon: <AreaChartOutlined />,
    children: [
      { title: "Bar", key: "/charts/bar", tkey: "0-4-0", icon: <BarChartOutlined /> },
      { title: "Line", key: "/charts/line", tkey: "0-4-1", icon: <LineChartOutlined /> },
      { title: "Pie", key: "/charts/pie", tkey: "0-4-2", icon: <PieChartOutlined /> },
    ],
  },
];

export default menuList;
