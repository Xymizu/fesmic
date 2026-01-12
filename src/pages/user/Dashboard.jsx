import { useState, useEffect } from "react";
import { Row, Col, Button, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [lastOrders, setLastOrders] = useState([]);
  const [recommendedEvents, setRecommendedEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Mock data - replace with API calls
      const mockOrders = mockEvents.slice(0, 3).map((event) => ({
        id: event.id,
        eventName: event.title,
        date: new Date(event.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        location: event.location,
        image: event.image,
      }));

      const mockRecommended = mockEvents.slice(0, 6).map((event) => ({
        id: event.id,
        eventName: event.title,
        date: new Date(event.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        location: event.location,
        image: event.image,
      }));

      setLastOrders(mockOrders);
      setRecommendedEvents(mockRecommended);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Quick Action - Browse Events */}
      <div className="mb-8">
        <Button
          type="primary"
          size="large"
          icon={<ShoppingOutlined />}
          className="rounded-lg h-12 px-6 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
          onClick={() => navigate("/events")}
        >
          Browse All Events
        </Button>
      </div>

      {/* Last Orders */}
      <div className="mb-8 sm:mb-12 lg:mb-16">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-7 lg:mb-8">
          Last Orders
        </h2>
        <Row gutter={[16, 16]}>
          {lastOrders.map((order) => (
            <Col key={order.id} xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
                <img
                  src={order.image}
                  alt={order.eventName}
                  className="w-full h-[160px] sm:h-[180px] lg:h-[200px] object-cover"
                />
                <div className="p-4 sm:p-5 lg:p-6">
                  <p className="text-white/60 text-xs sm:text-sm mb-2">
                    {order.date} | {order.location}
                  </p>
                  <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
                    {order.eventName}
                  </h3>
                  <Button
                    type="default"
                    block
                    className="rounded-lg sm:rounded-xl h-9 sm:h-10 lg:h-11 font-semibold text-sm sm:text-base bg-transparent border-white/30 text-white hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white transition-all duration-300"
                    onClick={() => navigate(`/user/order-history`)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recommended Events */}
      <div>
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-6 sm:mb-7 lg:mb-8">
          Recomended Event
        </h2>
        <Row gutter={[16, 16]}>
          {recommendedEvents.map((event) => (
            <Col key={event.id} xs={24} sm={12} lg={8}>
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-xl sm:rounded-2xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/20">
                <img
                  src={event.image}
                  alt={event.eventName}
                  className="w-full h-[160px] sm:h-[180px] lg:h-[200px] object-cover"
                />
                <div className="p-4 sm:p-5 lg:p-6">
                  <p className="text-white/60 text-xs sm:text-sm mb-2">
                    {event.date} | {event.location}
                  </p>
                  <h3 className="text-white text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4">
                    {event.eventName}
                  </h3>
                  <Button
                    type="default"
                    block
                    className="rounded-lg sm:rounded-xl h-9 sm:h-10 lg:h-11 font-semibold text-sm sm:text-base bg-transparent border-white/30 text-white hover:!bg-blue-500 hover:!border-blue-500 hover:!text-white transition-all duration-300"
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    Lihat Detail
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default UserDashboard;
