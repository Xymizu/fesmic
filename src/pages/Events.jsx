import { useState, useEffect } from "react";
import { Row, Col, Input, Select, Slider, Spin, Button } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";
import { handleApiError } from "../utils/errorHandler";
import { mockEvents } from "../data/mockEvents";

const { Option } = Select;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    date: "all",
    type: "all",
    priceRange: [0, 5000000],
  });
  const [tempFilters, setTempFilters] = useState({
    search: "",
    location: "all",
    date: "all",
    type: "all",
    priceRange: [0, 5000000],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // TODO: Replace with API call
      setEvents(mockEvents);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setFilters(tempFilters);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">All Events</h1>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-3" />
          <p className="text-white/50 text-lg">Find your perfect event</p>
        </div>

        <div className="mb-16">
          <div className="mb-4 lg:hidden">
            <Button
              type="primary"
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              block
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div
            className={`p-4 bg-gray-900/70 rounded-2xl border border-white/20 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="mb-3">
              <Input
                placeholder="Search events..."
                prefix={<SearchOutlined />}
                value={tempFilters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="!bg-black/30 !border-white/20"
              />
            </div>

            <div className="grid lg:grid-cols-4 gap-3 mb-3">
              <Select
                value={tempFilters.location}
                onChange={(value) => handleFilterChange("location", value)}
                className="w-full"
                size="small"
              >
                <Option value="all">All Location</Option>
                <Option value="jakarta">Jakarta</Option>
                <Option value="bandung">Bandung</Option>
                <Option value="surabaya">Surabaya</Option>
              </Select>

              <Select
                value={tempFilters.date}
                onChange={(value) => handleFilterChange("date", value)}
                className="w-full"
                size="small"
              >
                <Option value="all">Date</Option>
                <Option value="today">Today</Option>
                <Option value="this-week">This Week</Option>
                <Option value="this-month">This Month</Option>
              </Select>

              <Select
                value={tempFilters.type}
                onChange={(value) => handleFilterChange("type", value)}
                className="w-full"
                size="small"
              >
                <Option value="all">Type</Option>
                <Option value="concert">Concert</Option>
                <Option value="festival">Festival</Option>
                <Option value="sport">Sport</Option>
              </Select>

              <div className="flex items-center gap-3">
                <span className="text-white/70 text-sm whitespace-nowrap">
                  Price Range
                </span>
                <div className="flex-1">
                  <div className="flex justify-between text-white/50 text-xs mb-1">
                    <span>Rp 0</span>
                    <span>Rp 5M</span>
                  </div>
                  <Slider
                    range
                    min={0}
                    max={5000000}
                    step={100000}
                    value={tempFilters.priceRange}
                    onChange={(value) =>
                      handleFilterChange("priceRange", value)
                    }
                  />
                </div>
              </div>
            </div>

            <Button type="primary" onClick={applyFilters} block>
              Apply Filters
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Row gutter={[24, 24]}>
            {events.map((event) => (
              <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Events;
