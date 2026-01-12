import { useState, useEffect } from "react";
import {
  Table,
  Input,
  Select,
  Button,
  Checkbox,
  Spin,
  Tag,
  Modal,
  Form,
  DatePicker,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { handleApiError } from "../../utils/errorHandler";
import { mockEvents } from "../../data/mockEvents";

const { Option } = Select;

const EventManagement = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    search: "",
    location: "all",
    date: "all",
    type: "all",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // Mock data
      const statuses = ["ACTIVE", "UPCOMING", "COMPLETED"];
      const mockEventsList = mockEvents.map((event, i) => ({
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
      setEvents(mockEventsList);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingEvent(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedRowKeys.length !== 1) {
      message.warning("Please select one event to edit");
      return;
    }
    const event = events.find((e) => e.key === selectedRowKeys[0]);
    setEditingEvent(event);
    form.setFieldsValue(event);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select events to delete");
      return;
    }
    Modal.confirm({
      title: "Delete Events",
      content: `Are you sure you want to delete ${selectedRowKeys.length} event(s)?`,
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        setEvents(events.filter((e) => !selectedRowKeys.includes(e.key)));
        setSelectedRowKeys([]);
        message.success("Events deleted successfully");
      },
    });
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Submit:", values);
      // API call here
      message.success(editingEvent ? "Event updated!" : "Event created!");
      setIsModalOpen(false);
      fetchEvents();
    } catch (error) {
      handleApiError(error);
    }
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedRowKeys.length === events.length}
          onChange={(e) =>
            setSelectedRowKeys(e.target.checked ? events.map((o) => o.key) : [])
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
      {/* Filters & Actions */}
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
          <Option value="jakarta">Jakarta</Option>
        </Select>

        <Select
          value={filters.date}
          onChange={(value) => setFilters({ ...filters, date: value })}
          className="w-[150px]"
          size="large"
        >
          <Option value="all">Date</Option>
          <Option value="today">Today</Option>
        </Select>

        <Select
          value={filters.type}
          onChange={(value) => setFilters({ ...filters, type: value })}
          className="w-[150px]"
          size="large"
        >
          <Option value="all">Type</Option>
          <Option value="concert">Concert</Option>
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="rounded-2xl h-12 px-6 font-semibold"
        >
          ADD
        </Button>

        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={handleEdit}
          className="rounded-2xl h-12 px-6 font-semibold bg-gray-700 border-gray-600 text-white hover:!bg-gray-600"
        >
          EDIT
        </Button>

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          className="rounded-2xl h-12 px-6 font-semibold"
        >
          DELETE
        </Button>
      </div>

      {/* Table */}
      <div className="bg-gray-900/50 border border-white/20 rounded-2xl p-6 backdrop-blur-lg">
        <Table
          columns={columns}
          dataSource={events}
          pagination={{ pageSize: 10, showSizeChanger: false }}
          className="custom-table"
        />
      </div>

      {/* Modal */}
      <Modal
        title={
          <span className="text-white text-xl">
            {editingEvent ? "Edit Event" : "Add Event"}
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        className="custom-modal"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label={<span className="text-white">Event Name</span>}
            name="name"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Event Name"
              size="large"
              className="rounded-2xl"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-white">Location</span>}
            name="location"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Location"
              size="large"
              className="rounded-2xl"
            />
          </Form.Item>
          <Form.Item
            label={<span className="text-white">Date</span>}
            name="date"
            rules={[{ required: true }]}
          >
            <DatePicker className="w-full rounded-2xl" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="rounded-2xl font-semibold"
            >
              {editingEvent ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EventManagement;
