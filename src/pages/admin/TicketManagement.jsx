import { useState, useEffect } from "react";
import { Table, Input, Select, Button, Checkbox, Spin, Tag } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const { Option } = Select;

const TicketManagement = () => {
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
      const statuses = ["ACTIVE", "SOLD OUT", "AVAILABLE"];
      const mockTicketsList = mockEvents.map((event, i) => ({
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
      setTickets(mockTicketsList);
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
          checked={selectedRowKeys.length === tickets.length}
          onChange={(e) =>
            setSelectedRowKeys(
              e.target.checked ? tickets.map((t) => t.key) : []
            )
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
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "NAME", dataIndex: "name", key: "name" },
    { title: "LOCATION", dataIndex: "location", key: "location" },
    { title: "DATE", dataIndex: "date", key: "date" },
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
      <div className="flex flex-wrap gap-4 mb-8">
        <Input
          placeholder="Search..."
          prefix={<SearchOutlined />}
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="!bg-black/30 !border-white/20 rounded-lg h-12 flex-1 min-w-[200px]"
        />

        <Select
          value={filters.location}
          onChange={(value) => setFilters({ ...filters, location: value })}
          className="w-[150px]"
          size="large"
        >
          <Option value="all">All Location</Option>
        </Select>

        <Select
          value={filters.date}
          onChange={(value) => setFilters({ ...filters, date: value })}
          className="w-[150px]"
          size="large"
        >
          <Option value="all">Date</Option>
        </Select>

        <Select
          value={filters.type}
          onChange={(value) => setFilters({ ...filters, type: value })}
          className="w-[150px]"
          size="large"
        >
          <Option value="all">Type</Option>
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="rounded-2xl h-12 px-6 font-semibold"
        >
          ADD
        </Button>
        <Button
          type="default"
          icon={<EditOutlined />}
          className="rounded-2xl h-12 px-6 font-semibold bg-gray-700 border-gray-600 text-white hover:!bg-gray-600"
        >
          EDIT
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          className="rounded-2xl h-12 px-6 font-semibold"
        >
          DELETE
        </Button>
      </div>

      <div className="bg-gray-900/50 border border-white/20 rounded-2xl p-6 backdrop-blur-lg">
        <Table
          columns={columns}
          dataSource={tickets}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          className="custom-table"
        />
      </div>
    </div>
  );
};

export default TicketManagement;
