import { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, message } from "antd";
import Navbar from "../components/common/Navbar";
import { orderService } from "../services/orderService";
import { handleApiError } from "../utils/errorHandler";
import { formatCurrency } from "../utils/formatters";
import { PAYMENT_METHODS } from "../constants";

const { Option } = Select;

const Checkout = () => {
  const { eventId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { event, selectedCategory } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const adminFee = 2500;
  const total = event ? event.price + adminFee : 0;

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const orderData = {
        eventId,
        category: selectedCategory,
        ...values,
      };
      await orderService.createOrder(orderData);
      message.success("Order created successfully!");
      navigate("/");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="text-center py-16">
          <p className="text-white">Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black">
      <Navbar />

      <div className="max-w-[650px] mx-auto px-8 py-20">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 shadow-2xl">
          <h1 className="text-4xl font-extrabold text-white text-center mb-3 [text-shadow:0_0_40px_rgba(24,144,255,0.5)] tracking-tight">
            Fesmic
          </h1>
          <p className="text-white/50 text-center mb-10 text-sm">
            Complete your order
          </p>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="text-white font-medium">Fullname</span>}
              name="fullname"
              rules={[
                { required: true, message: "Please input your fullname!" },
              ]}
            >
              <Input
                placeholder="example lorem"
                size="large"
                className="!bg-black/40 !border-white/20 rounded-xl h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">NIK</span>}
              name="nik"
              rules={[{ required: true, message: "Please input your NIK!" }]}
            >
              <Input
                placeholder="9284792374924"
                size="large"
                className="!bg-black/40 !border-white/20 rounded-xl h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">Category</span>}
              name="category"
              initialValue={selectedCategory}
            >
              <Input
                disabled
                size="large"
                className="!bg-black/40 !border-white/20 rounded-lg h-12"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white font-medium">Payment Method</span>
              }
              name="paymentMethod"
              rules={[
                { required: true, message: "Please select payment method!" },
              ]}
            >
              <Select placeholder="QRIS" size="large" className="h-12">
                {PAYMENT_METHODS.map((method) => (
                  <Option key={method.value} value={method.value}>
                    {method.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className="bg-gradient-to-br from-black/40 to-gray-900/40 rounded-2xl p-8 my-8 space-y-4 border border-white/10">
              <div className="flex justify-between text-white/70 text-base">
                <span>
                  Ticket {event.title} - {selectedCategory}
                </span>
                <span className="font-medium">
                  {formatCurrency(event.price)}
                </span>
              </div>
              <div className="flex justify-between text-white/70 text-base">
                <span>PPN</span>
                <span className="font-medium">{formatCurrency(adminFee)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/20">
                <span>Total</span>
                <span className="text-blue-400">{formatCurrency(total)}</span>
              </div>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="mt-8 h-[54px] rounded-lg text-base font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
            >
              Confirm Order
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
