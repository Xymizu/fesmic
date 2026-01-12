import { useState, useEffect } from "react";
import { Button, Input, Row, Col, Spin } from "antd";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import EventCard from "../components/common/EventCard";
import { handleApiError } from "../utils/errorHandler";
import {
  mockEvents,
  featuredEvent as mockFeaturedEvent,
} from "../data/mockEvents";

const Home = () => {
  const [featuredEvent, setFeaturedEvent] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Mock data - nanti ganti dengan API call
      setFeaturedEvent(mockFeaturedEvent);
      setUpcomingEvents(mockEvents);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = () => {
    if (email) {
      console.log("Subscribe:", email);
      setEmail("");
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
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-black/70 via-gray-900 to-black/90 px-4 sm:px-6 lg:px-8 py-20 sm:py-32 lg:py-40 text-center overflow-hidden">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[120%] h-[200%] bg-[radial-gradient(circle,_rgba(24,144,255,0.2)_0%,_transparent_70%)] pointer-events-none animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(59,130,246,0.15)_0%,_transparent_50%)] pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 [text-shadow:0_0_60px_rgba(24,144,255,0.6)] tracking-tight">
            Fesmic
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/60 mb-6 sm:mb-10 leading-relaxed max-w-2xl mx-auto px-4">
            Lorem ipsum dolor sit amet lorem des dolor lor
            <br className="hidden sm:block" />
            lorem ipsum dolor lorem lore
          </p>
          <Button
            type="primary"
            size="large"
            className="px-8 sm:px-12 lg:px-16 h-auto py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50"
          >
            Buy Ticket Now
          </Button>
        </div>
      </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 tracking-tight">
                Featured Event
              </h2>
              <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-6 sm:gap-8 lg:gap-12 items-center bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 backdrop-blur-lg shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
              <div>
                <div className="text-blue-400/80 text-sm mb-3 sm:mb-4 font-medium flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                  {featuredEvent.location}, 20 Mei 2026
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  {featuredEvent.title}
                </h2>
                <p className="text-white/60 text-base sm:text-lg leading-relaxed">
                  {featuredEvent.description}
                </p>
              </div>
              <div>
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full rounded-xl sm:rounded-2xl object-cover shadow-2xl hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="relative bg-gradient-to-br from-blue-900/50 via-purple-900/40 to-blue-900/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 border border-white/20 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-pulse pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12">
              <div className="flex-1 w-full">
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  Don't Miss Out
                </h3>
                <p className="text-white/60 mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed">
                  Let us send you notifications about your favorite music events
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-[500px]">
                  <Input
                    placeholder="Enter Your Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onPressEnter={handleSubscribe}
                    className="!bg-black/30 !border-white/20 px-4 sm:px-5 py-3 rounded-2xl h-12 sm:h-14 text-base flex-1"
                  />
                  <Button
                    type="primary"
                    onClick={handleSubscribe}
                    className="rounded-2xl px-8 sm:px-10 h-12 sm:h-14 font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
              <div className="text-center lg:text-right w-full lg:w-auto">
                <p className="text-white text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Follow us
                </p>
                <div className="flex gap-4 sm:gap-6 justify-center lg:justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://facebook.com", "_blank")
                    }
                    className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-transparent border-0 cursor-pointer"
                  >
                    <i className="icon-facebook" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://instagram.com", "_blank")
                    }
                    className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-transparent border-0 cursor-pointer"
                  >
                    <i className="icon-instagram" />
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open("https://twitter.com", "_blank")}
                    className="text-white/60 text-3xl hover:text-blue-400 transition-all duration-300 hover:scale-110 hover:-translate-y-1 bg-transparent border-0 cursor-pointer"
                  >
                    <i className="icon-twitter" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Upcoming Event
            </h2>
            <div className="w-20 sm:w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-2 sm:mb-3" />
            <p className="text-white/50 text-base sm:text-lg">
              Don't miss out on these amazing experiences
            </p>
          </div>
          <Row
            gutter={[16, 16]}
            className="sm:gutter-[24, 24] lg:gutter-[32, 32]"
          >
            {upcomingEvents.map((event) => (
              <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-8 sm:mt-12">
            <Button
              type="link"
              href="/events"
              className="text-white/60 hover:text-white text-base sm:text-lg font-medium hover:scale-105 transition-all duration-300"
            >
              Show All Events →
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
