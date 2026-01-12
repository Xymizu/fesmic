import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, Checkbox, message } from "antd";
import { authService } from "../services/authService";
import { handleApiError } from "../utils/errorHandler";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await authService.register(values);
      message.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-8 py-12 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(24,144,255,0.15)_0%,_transparent_70%)] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(59,130,246,0.12)_0%,_transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-2xl border border-white/20 rounded-3xl p-12 mb-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          <h1 className="text-5xl font-extrabold text-white text-center mb-3 [text-shadow:0_0_40px_rgba(24,144,255,0.5)] tracking-tight">
            Fesmic
          </h1>
          <p className="text-white/50 text-center mb-10 text-sm">
            Create your account
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
                placeholder="Insert Fullname.."
                size="large"
                className="!bg-black/40 !border-white/20 rounded-2xl h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">NIK</span>}
              name="nik"
              rules={[{ required: true, message: "Please input your NIK!" }]}
            >
              <Input
                placeholder="Insert NIK.."
                size="large"
                className="!bg-black/40 !border-white/20 rounded-2xl h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Insert Email.."
                size="large"
                className="!bg-black/40 !border-white/20 rounded-2xl h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300"
              />
            </Form.Item>

            <Form.Item label="Address" required>
              <Form.Item
                name="province"
                rules={[{ required: true, message: "Please select province!" }]}
                className="mb-2"
              >
                <Select placeholder="Select Province" size="large">
                  <Option value="jakarta">DKI Jakarta</Option>
                  <Option value="west-java">Jawa Barat</Option>
                  <Option value="east-java">Jawa Timur</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                rules={[{ required: true, message: "Please select city!" }]}
                className="mb-2"
              >
                <Select placeholder="Select Residence" size="large">
                  <Option value="jakarta-pusat">Jakarta Pusat</Option>
                  <Option value="jakarta-selatan">Jakarta Selatan</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="postalCode"
                rules={[
                  { required: true, message: "Please select postal code!" },
                ]}
              >
                <Select placeholder="Select Post Code" size="large">
                  <Option value="10110">10110</Option>
                  <Option value="12345">12345</Option>
                </Select>
              </Form.Item>
            </Form.Item>

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error("You must agree to terms and conditions")
                        ),
                },
              ]}
            >
              <Checkbox className="text-white/70">
                By clicking this, you are agree with term and conditions.
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="mt-4 h-[50px] rounded-lg text-base font-semibold"
            >
              Sign In
            </Button>
          </Form>
        </div>

        <div className="bg-gray-800/60 border border-white/10 rounded-3xl p-8 text-center">
          <p className="text-white/70 mb-4">Already have account?</p>
          <Link to="/login">
            <Button
              type="default"
              block
              size="large"
              className="h-[50px] rounded-lg text-base font-semibold bg-transparent border-white/30 text-white hover:!bg-white/10 hover:!border-blue-500 hover:!text-blue-500"
            >
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
