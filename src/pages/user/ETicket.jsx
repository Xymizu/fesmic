import { useState, useEffect } from "react";
import { Input, Select, Button, Spin } from "antd";
import { SearchOutlined, QrcodeOutlined } from "@ant-design/icons";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const { Option } = Select;

const ETicket = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    date: "all",
    type: "all",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      // Mock data
      const mockTickets = mockEvents.slice(0, 4).map((event, i) => ({
        id: i + 1,
        eventName: event.title,
        date: new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        location: event.location,
      }));
      setTickets(mockTickets);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewQR = (ticketId) => {
    console.log("View QR for ticket:", ticketId);
    // Implement QR code modal
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="!bg-black/30 !border-white/20 rounded-lg h-12"
        />

        <Select
          value={filters.location}
          onChange={(value) => setFilters({ ...filters, location: value })}
          className="w-full"
          size="large"
        >
          <Option value="all">All Location</Option>
          <Option value="jakarta">Jakarta</Option>
          <Option value="bandung">Bandung</Option>
        </Select>

        <Select
          value={filters.date}
          onChange={(value) => setFilters({ ...filters, date: value })}
          className="w-full"
          size="large"
        >
          <Option value="all">Date</Option>
          <Option value="today">Today</Option>
          <Option value="this-week">This Week</Option>
        </Select>

        <Select
          value={filters.type}
          onChange={(value) => setFilters({ ...filters, type: value })}
          className="w-full"
          size="large"
        >
          <Option value="all">Type</Option>
          <Option value="concert">Concert</Option>
          <Option value="festival">Festival</Option>
        </Select>
      </div>

      {/* Tickets */}
      <div className="bg-gray-900/50 border border-white/20 rounded-2xl p-6 backdrop-blur-lg space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="flex items-center justify-between p-6 bg-gray-800/60 border border-white/10 rounded-xl hover:border-blue-400/50 transition-all duration-300"
          >
            <div>
              <h3 className="text-white text-xl font-bold mb-2">
                {ticket.eventName}
              </h3>
              <p className="text-white/60 text-sm">
                {ticket.location} - {ticket.date}
              </p>
            </div>
            <Button
              type="default"
              icon={<QrcodeOutlined />}
              onClick={() => handleViewQR(ticket.id)}
              className="rounded-lg h-11 px-6 font-semibold bg-transparent border-white/30 text-white hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white transition-all duration-300"
            >
              View QR
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ETicket;
