import { useState, useEffect } from "react";
import { Button, Input, Row, Col, Spin } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
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
      // TODO: Replace with API call
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

      <section className="relative bg-gradient-to-b from-black/70 via-gray-900 to-black/90 px-8 py-32 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(24,144,255,0.2)_0%,_transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-7xl font-extrabold text-white mb-6 tracking-tight">
            Fesmic
          </h1>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Your Ultimate Destination for Music Events & Festival Tickets
            <br />
            Discover, Book, and Experience the Best Live Music Events
          </p>
          <Button
            type="primary"
            size="large"
            className="px-16 h-auto py-4 rounded-full font-bold"
          >
            Buy Ticket Now
          </Button>
        </div>
      </section>

      {featuredEvent && (
        <section className="px-8 py-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-4">
                Featured Event
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center bg-gray-800/70 border border-white/20 rounded-3xl p-12">
              <div>
                <div className="text-blue-400/80 text-sm mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  {featuredEvent.location}, 20 Mei 2026
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">
                  {featuredEvent.title}
                </h2>
                <p className="text-white/60 text-lg">
                  {featuredEvent.description}
                </p>
              </div>
              <div>
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="px-8 py-24">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex lg:flex-row flex-col justify-between items-center gap-12">
            <div className="flex-1">
              <h3 className="text-white text-3xl font-bold mb-4">
                Don't Miss Out
              </h3>
              <p className="text-white/60 mb-6 text-lg">
                Let us send you notifications about your favorite music events
              </p>
              <div className="flex gap-4 max-w-[500px]">
                <Input
                  placeholder="Enter Your Email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onPressEnter={handleSubscribe}
                  className="!bg-black/30 !border-white/20 px-5 py-3 rounded-2xl h-14 flex-1"
                />
                <Button
                  type="primary"
                  onClick={handleSubscribe}
                  className="rounded-2xl px-10 h-14 font-bold"
                >
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white text-xl font-semibold mb-6">Follow us</p>
              <div className="flex gap-6 justify-end">
                <button
                  type="button"
                  onClick={() => window.open("https://facebook.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <FacebookOutlined />
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://instagram.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <InstagramOutlined />
                </button>
                <button
                  type="button"
                  onClick={() => window.open("https://twitter.com", "_blank")}
                  className="text-white/60 text-3xl hover:text-blue-400 transition-colors bg-transparent border-0 cursor-pointer"
                >
                  <TwitterOutlined />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">
              Upcoming Event
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-3" />
            <p className="text-white/50 text-lg">
              Don't miss out on these amazing experiences
            </p>
          </div>
          <Row gutter={[32, 32]}>
            {upcomingEvents.map((event) => (
              <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-12">
            <Button
              type="link"
              href="/events"
              className="text-white/60 hover:text-white text-lg"
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
