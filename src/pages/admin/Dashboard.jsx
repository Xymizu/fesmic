import { useState, useEffect } from "react";
import { Row, Col, Table, Spin, Tag } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats] = useState({
    eventTotal: { value: 67, trend: "up", percentage: 20 },
    ticketSold: { value: 33, trend: "down", percentage: 20 },
    pending: { value: 33, trend: "down", percentage: 20 },
    pending2: { value: 33, trend: "down", percentage: 20 },
  });
  const [chartData, setChartData] = useState([]);
  const [topTickets, setTopTickets] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Mock chart data
      const mockChartData = [
        { month: "Mar", value: 30 },
        { month: "Mar", value: 25 },
        { month: "Mar", value: 45 },
        { month: "Mar", value: 90 },
        { month: "Mar", value: 50 },
        { month: "Mar", value: 60 },
      ];

      // Mock top tickets
      const mockTopTickets = mockEvents.slice(0, 6).map((event, i) => ({
        key: i + 1,
        name: event.title,
        sales: 1000 - i * 100,
      }));

      // Mock invoices
      const mockInvoices = mockEvents.slice(0, 7).map((event, i) => ({
        key: i + 1,
        no: `PQ-${950 + i}`,
        dateCreated: new Date(event.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        event: event.title,
        type: i % 2 === 0 ? "VIP" : "Regular",
        amount: `Rp${(event.price / 1000).toFixed(0)}.000`,
        status: i % 3 === 0 ? "Paid" : "Pending",
      }));

      setChartData(mockChartData);
      setTopTickets(mockTopTickets);
      setRecentInvoices(mockInvoices);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const invoiceColumns = [
    { title: "NO", dataIndex: "no", key: "no" },
    { title: "DATE CREATED", dataIndex: "dateCreated", key: "dateCreated" },
    { title: "EVENT", dataIndex: "event", key: "event" },
    { title: "TYPE", dataIndex: "type", key: "type" },
    { title: "AMOUNT", dataIndex: "amount", key: "amount" },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color="green" className="rounded-full px-3">
          {status}
        </Tag>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Stats Cards */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} sm={12} lg={6}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm mb-2">Event Total</p>
                <h2 className="text-white text-4xl font-bold">
                  {stats.eventTotal.value}
                </h2>
              </div>
              <Tag
                color="green"
                icon={<ArrowUpOutlined />}
                className="rounded-full"
              >
                {stats.eventTotal.percentage}%
              </Tag>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm mb-2">Ticket Sold</p>
                <h2 className="text-white text-4xl font-bold">
                  {stats.ticketSold.value}
                </h2>
              </div>
              <Tag
                color="red"
                icon={<ArrowDownOutlined />}
                className="rounded-full"
              >
                {stats.ticketSold.percentage}%
              </Tag>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm mb-2">Pending</p>
                <h2 className="text-white text-4xl font-bold">
                  {stats.pending.value}
                </h2>
              </div>
              <Tag
                color="red"
                icon={<ArrowDownOutlined />}
                className="rounded-full"
              >
                {stats.pending.percentage}%
              </Tag>
            </div>
          </div>
        </Col>

        <Col xs={24} sm={12} lg={6}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/60 text-sm mb-2">Pending</p>
                <h2 className="text-white text-4xl font-bold">
                  {stats.pending2.value}
                </h2>
              </div>
              <Tag
                color="red"
                icon={<ArrowDownOutlined />}
                className="rounded-full"
              >
                {stats.pending2.percentage}%
              </Tag>
            </div>
          </div>
        </Col>
      </Row>

      {/* Chart & Top Tickets */}
      <Row gutter={[24, 24]} className="mb-8">
        <Col xs={24} lg={14}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6 h-full">
            <h3 className="text-white text-xl font-bold mb-6">Monthly lorem</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis stroke="#888" />
                <Bar dataKey="value" fill="#3B82F6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>

        <Col xs={24} lg={10}>
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6 h-full">
            <h3 className="text-white text-xl font-bold mb-6">
              Top Ticket Sales
            </h3>
            <div className="space-y-3">
              {topTickets.map((ticket) => (
                <div
                  key={ticket.key}
                  className="flex items-center justify-between p-3 bg-black/30 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-white">{ticket.name}</span>
                  </div>
                  <span className="text-white font-semibold">
                    {ticket.sales}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      {/* Recent Invoices */}
      <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-white/20 rounded-2xl p-6">
        <h3 className="text-white text-xl font-bold mb-6">Recent Invoices</h3>
        <Table
          columns={invoiceColumns}
          dataSource={recentInvoices}
          pagination={false}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
