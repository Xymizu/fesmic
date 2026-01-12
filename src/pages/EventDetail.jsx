import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Select, Spin } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { handleApiError } from "../utils/errorHandler";
import { formatCurrency } from "../utils/formatters";
import { mockEvents } from "../data/mockEvents";

const { Option } = Select;

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEventDetail = React.useCallback(async () => {
    try {
      setLoading(true);
      // Mock data - find event by id or use first
      const foundEvent =
        mockEvents.find((e) => e.id === Number.parseInt(id, 10)) ||
        mockEvents[0];
      setEvent({
        ...foundEvent,
        time: "17:00 - 00:00",
        date: new Date(foundEvent.date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        categories: [
          { value: "vip", label: "VIP" },
          { value: "regular", label: "Regular" },
          { value: "festival", label: "Festival" },
        ],
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchEventDetail();
  }, [fetchEventDetail]);

  const handlePayment = () => {
    if (!selectedCategory) {
      return;
    }
    navigate(`/checkout/${id}`, { state: { event, selectedCategory } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 sm:gap-8 lg:gap-12 items-start">
          <div>
            <div className="group mb-6 sm:mb-8">
              <img
                src={event.image}
                alt={event.title}
                className="w-full rounded-xl sm:rounded-2xl object-cover shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>

            {/* Event Description */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-lg shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                About This Event
              </h2>
              <div className="space-y-4 sm:space-y-5 text-white/80 leading-relaxed">
                <p className="text-sm sm:text-base">{event.description}</p>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Event Highlights
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Live performance with full band and stunning visual
                        effects
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Special guest performers and surprise collaborations
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        State-of-the-art sound system and lighting setup
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Exclusive merchandise available at the venue</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Important Information
                  </h3>
                  <ul className="space-y-2 text-sm sm:text-base">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>Doors open 2 hours before showtime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Age restriction: All ages welcome (under 12 must be
                        accompanied by adults)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>No outside food and beverages allowed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>
                        Parking available on-site (additional charges apply)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 backdrop-blur-lg shadow-2xl lg:sticky lg:top-24">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              {event.title}
            </h1>

            <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 p-4 sm:p-6 bg-black/30 rounded-xl sm:rounded-2xl border border-white/10">
              <p className="text-blue-400/90 text-sm sm:text-base font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full" />
                {event.date}
              </p>
              <p className="text-white/70 text-sm sm:text-base">{event.time}</p>
              <p className="text-white/70 text-sm sm:text-base">
                {event.location}
              </p>
            </div>

            <div className="mb-6 sm:mb-8">
              <label
                htmlFor="category-select"
                className="block text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg"
              >
                Select Category
              </label>
              <Select
                id="category-select"
                placeholder="Category - 1"
                value={selectedCategory}
                onChange={setSelectedCategory}
                className="w-full"
                size="large"
                suffixIcon={<span>▼</span>}
              >
                {event.categories.map((cat) => (
                  <Option key={cat.value} value={cat.value}>
                    {cat.label}
                  </Option>
                ))}
              </Select>
            </div>

            <div className="flex justify-between items-center py-4 sm:py-6 mb-6 sm:mb-8 border-t border-b border-white/20 bg-black/20 rounded-lg px-4 sm:px-6">
              <span className="text-white/70 text-base sm:text-lg">Price</span>
              <span className="text-blue-400 text-xl sm:text-2xl font-bold">
                {formatCurrency(event.price)}
              </span>
            </div>

            <Button
              type="primary"
              size="large"
              block
              className="rounded-lg h-[48px] sm:h-[54px] text-sm sm:text-base font-bold mb-6 sm:mb-10 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
              onClick={handlePayment}
              disabled={!selectedCategory}
            >
              Payment
            </Button>

            <div className="text-center">
              <p className="text-white/60 text-sm mb-6">
                For more information, follow us on
              </p>
              <div className="flex gap-6 justify-center">
                <button
                  type="button"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
                >
                  <FacebookOutlined />
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
                >
                  <InstagramOutlined />
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://twitter.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group bg-transparent border-0 cursor-pointer"
                >
                  <TwitterOutlined />
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetail;
