import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";

// User Layout & Pages
import UserLayout from "./components/layout/UserLayout";
import UserDashboard from "./pages/user/Dashboard";
import OrderHistory from "./pages/user/OrderHistory";
import ETicket from "./pages/user/ETicket";

// Admin Layout & Pages
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import EventManagement from "./pages/admin/EventManagement";
import TicketManagement from "./pages/admin/TicketManagement";
import OrderManagement from "./pages/admin/OrderManagement";

import "./App.css";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#1890ff",
          colorBgContainer: "rgba(40, 40, 40, 0.8)",
          colorBorder: "rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout/:eventId" element={<Checkout />} />

          {/* User Dashboard Routes */}
          <Route path="/user" element={<UserLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="order-history" element={<OrderHistory />} />
            <Route path="e-ticket" element={<ETicket />} />
          </Route>

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="event-management" element={<EventManagement />} />
            <Route path="ticket-management" element={<TicketManagement />} />
            <Route path="order-management" element={<OrderManagement />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
