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
    priceRange: [0, 25000000],
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [filters]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock data
      setEvents(mockEvents);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navbar showSearch />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
            All Events
          </h1>
          <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-2 sm:mb-3" />
          <p className="text-white/50 text-base sm:text-lg">
            Find your perfect event
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          {/* Filter Toggle Button - Mobile Only */}
          <div className="mb-4 lg:hidden">
            <Button
              type="primary"
              size="middle"
              icon={<FilterOutlined />}
              onClick={() => setShowFilters(!showFilters)}
              className="w-full rounded-lg h-10 font-semibold shadow-lg"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filter Panel */}
          <div
            className={`p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-gray-900/70 to-gray-800/70 rounded-xl sm:rounded-2xl border border-white/20 backdrop-blur-lg shadow-xl ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            {/* Search Bar - Full Width */}
            <div className="mb-3">
              <Input
                placeholder="Search events..."
                prefix={<SearchOutlined />}
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                size="middle"
                className="!bg-black/30 !border-white/20 rounded-lg hover:!border-blue-400/50 transition-all duration-300"
              />
            </div>

            {/* Filter Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              <Select
                value={filters.location}
                onChange={(value) => handleFilterChange("location", value)}
                className="w-full"
                size="middle"
                suffixIcon={<span>▼</span>}
              >
                <Option value="all">All Location</Option>
                <Option value="jakarta">Jakarta</Option>
                <Option value="bandung">Bandung</Option>
                <Option value="surabaya">Surabaya</Option>
              </Select>

              <Select
                value={filters.date}
                onChange={(value) => handleFilterChange("date", value)}
                className="w-full"
                size="middle"
                suffixIcon={<span>▼</span>}
              >
                <Option value="all">Date</Option>
                <Option value="today">Today</Option>
                <Option value="this-week">This Week</Option>
                <Option value="this-month">This Month</Option>
              </Select>

              <Select
                value={filters.type}
                onChange={(value) => handleFilterChange("type", value)}
                className="w-full"
                size="middle"
                suffixIcon={<span>▼</span>}
              >
                <Option value="all">Type</Option>
                <Option value="concert">Concert</Option>
                <Option value="festival">Festival</Option>
                <Option value="sport">Sport</Option>
              </Select>

              {/* Price Range */}
              <div className="flex flex-col gap-2">
                <span className="text-white/70 text-sm font-medium">
                  Price Range
                </span>
                <div className="flex justify-between text-white/50 text-xs mb-1">
                  <span>Rp 0</span>
                  <span>Rp 25M</span>
                </div>
                <Slider
                  range
                  min={0}
                  max={25000000}
                  step={100000}
                  value={filters.priceRange}
                  onChange={(value) => handleFilterChange("priceRange", value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center py-12 sm:py-16">
            <Spin size="large" />
          </div>
        ) : (
          <Row
            gutter={[16, 16]}
            className="sm:gutter-[20, 20] lg:gutter-[24, 24]"
          >
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
