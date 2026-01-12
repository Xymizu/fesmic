import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Dropdown, Drawer } from "antd";
import PropTypes from "prop-types";
import {
  SearchOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = ({ showSearch = false }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (value) => {
    if (value.trim()) {
      navigate(`/events?search=${value}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // dropdown menu items with role-based navigation
  const userMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () =>
        navigate(
          user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard"
        ),
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Keluar",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <nav className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-[100]">
        <div className="max-w-[1400px] mx-auto bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            <Link
              to="/"
              className="text-2xl font-bold text-white hover:text-blue-400 transition-colors"
            >
              Fesmic
            </Link>

            <div className="hidden lg:flex gap-8">
              <Link
                to="/events"
                className="text-white/70 hover:text-white transition-colors"
              >
                Events
              </Link>
              <Link
                to="/about"
                className="text-white/70 hover:text-white transition-colors"
              >
                About
              </Link>
            </div>

            {showSearch && (
              <Input
                placeholder="Cari event..."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onPressEnter={(e) => handleSearch(e.target.value)}
                className="hidden md:block w-64 lg:w-80 ml-auto"
              />
            )}

            <div className="hidden sm:flex items-center gap-3 ml-auto">
              {user ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button type="primary" icon={<UserOutlined />}>
                    <span className="hidden lg:inline">
                      {user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button type="primary">Masuk</Button>
                </Link>
              )}
            </div>

            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden text-white"
            />
          </div>
        </div>
      </nav>

      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
      >
        <div className="flex flex-col gap-4">
          {showSearch && (
            <Input
              placeholder="Cari event..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={(e) => {
                handleSearch(e.target.value);
                setMobileMenuOpen(false);
              }}
            />
          )}

          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg py-2"
          >
            Events
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-lg py-2"
          >
            About
          </Link>

          <div className="border-t my-4" />

          {user ? (
            <div className="flex flex-col gap-3">
              <Button
                type="primary"
                icon={<DashboardOutlined />}
                onClick={() => {
                  navigate(
                    user?.role === "admin"
                      ? "/admin/dashboard"
                      : "/user/dashboard"
                  );
                  setMobileMenuOpen(false);
                }}
                block
              >
                Dashboard
              </Button>
              <Button
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                block
              >
                Keluar
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button type="primary" block>
                Masuk
              </Button>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
};

Navbar.propTypes = {
  showSearch: PropTypes.bool,
};

export default Navbar;
