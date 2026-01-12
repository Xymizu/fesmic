import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  HistoryOutlined,
  QrcodeOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "/user/dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/user/dashboard">Dashboard</Link>,
    },
    {
      key: "/user/order-history",
      icon: <HistoryOutlined />,
      label: <Link to="/user/order-history">Order History</Link>,
    },
    {
      key: "/user/e-ticket",
      icon: <QrcodeOutlined />,
      label: <Link to="/user/e-ticket">E-Ticket</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "/events",
      icon: <HomeOutlined />,
      label: <Link to="/events">Browse Events</Link>,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        className="!bg-black border-r border-white/10 !fixed !h-screen !left-0 !top-0 z-50"
        width={200}
      >
        <div className="p-6 text-center border-b border-white/10">
          <Link to="/" className="flex items-center gap-3 justify-center">
            <div className="w-8 h-8 bg-blue-500 rounded-xl" />
            {!collapsed && (
              <span className="text-white text-xl font-bold">Fesmic</span>
            )}
          </Link>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="!bg-transparent !border-none mt-4"
          theme="dark"
        />

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <LogoutOutlined />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s",
        }}
      >
        <Content className="bg-black min-h-screen">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
