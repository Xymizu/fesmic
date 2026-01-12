import { useState, useEffect } from "react";
import { Table, Input, Select, Checkbox, Spin, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const { Option } = Select;

const OrderHistory = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    date: "all",
    type: "all",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Mock data
      const statuses = ["ACTIVE", "COMPLETED", "CANCELLED"];
      const mockOrders = mockEvents.map((event, i) => ({
        key: i + 1,
        id: `${(449 + i).toString()}K-FJ`,
        name: event.title.toUpperCase(),
        location: event.location.toUpperCase(),
        date: new Date(event.date)
          .toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
          .toUpperCase(),
        status: statuses[i % 3],
      }));
      setOrders(mockOrders);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === orders.length}
          onChange={(e) =>
            setSelectedRowKeys(e.target.checked ? orders.map((o) => o.key) : [])
          }
        />
      ),
      key: "checkbox",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.key)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys([...selectedRowKeys, record.key]);
            } else {
              setSelectedRowKeys(
                selectedRowKeys.filter((k) => k !== record.key)
              );
            }
          }}
        />
      ),
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LOCATION",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={status === "ACTIVE" ? "green" : "red"}
          className="rounded-full px-3 py-1"
        >
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

      {/* Table */}
      <div className="bg-gray-900/50 border border-white/20 rounded-2xl p-6 backdrop-blur-lg">
        <Table
          columns={columns}
          dataSource={orders}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
            className: "!text-white",
          }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default OrderHistory;
