import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Dropdown, Drawer } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuOutlined,
  BellOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const Navbar = ({ showSearch = false }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

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

  const userMenuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "My Dashboard",
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
      label: "Sign Out",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <nav className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 sticky top-0 z-[100]">
        <div className="max-w-[1400px] mx-auto bg-gray-900/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-blue-500/10 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-white tracking-wide hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group"
            >
              <span className="relative z-10">Fesmic</span>
              <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-8 xl:gap-10">
              <Link
                to="/events"
                className="text-white/70 hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300 pb-1 font-medium"
              >
                Events
              </Link>
              <Link
                to="/about"
                className="text-white/70 hover:text-white transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300 pb-1 font-medium"
              >
                About
              </Link>
            </div>

            {/* Desktop Search */}
            {showSearch && (
              <div className="hidden md:block ml-auto">
                <Input
                  placeholder="Search events..."
                  prefix={<SearchOutlined />}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onPressEnter={(e) => handleSearch(e.target.value)}
                  className="w-[200px] lg:w-[300px] transition-all duration-300 hover:border-blue-400/50 rounded-lg"
                />
              </div>
            )}

            {/* Right Side Actions */}
            <div className="hidden sm:flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Favorites Icon */}
              {user && (
                <Button
                  type="text"
                  icon={<HeartOutlined />}
                  className="text-white/70 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all duration-300"
                  size="large"
                />
              )}

              {/* Notifications Icon */}
              {user && (
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  className="text-white/70 hover:text-blue-400 hover:bg-white/5 rounded-lg transition-all duration-300"
                  size="large"
                />
              )}

              {/* Auth Button */}
              {user ? (
                <Dropdown
                  menu={{ items: userMenuItems }}
                  placement="bottomRight"
                  trigger={["click"]}
                >
                  <Button
                    type="primary"
                    className="rounded-lg font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20"
                    icon={<UserOutlined />}
                    size="large"
                  >
                    <span className="hidden lg:inline">
                      {user.email?.split("@")[0] || "User"}
                    </span>
                  </Button>
                </Dropdown>
              ) : (
                <Link to="/login">
                  <Button
                    type="primary"
                    className="rounded-lg font-medium shadow-lg shadow-blue-500/20"
                    size="large"
                  >
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              className="sm:hidden text-white hover:text-blue-400 text-xl hover:bg-white/5 rounded-lg"
              size="large"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        className="mobile-menu-drawer"
      >
        <div className="flex flex-col gap-4">
          {/* Mobile Search */}
          {showSearch && (
            <Input
              placeholder="Search events..."
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={(e) => {
                handleSearch(e.target.value);
                setMobileMenuOpen(false);
              }}
              className="mb-4"
            />
          )}

          {/* Navigation Links */}
          <Link
            to="/events"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white transition-all duration-300 py-2 text-lg font-medium"
          >
            Events
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white/70 hover:text-white transition-all duration-300 py-2 text-lg font-medium"
          >
            About
          </Link>

          <div className="border-t border-white/10 my-4" />

          {/* Auth Section */}
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
                className="w-full"
              >
                My Dashboard
              </Button>
              <Button
                danger
                icon={<LogoutOutlined />}
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button type="primary" className="w-full">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;
