import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { handleApiError } from "../utils/errorHandler";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setLoading(true);

      // TODO: Replace with actual API call
      const mockResponse = {
        data: {
          token: "mock-jwt-token-" + Date.now(),
          user: {
            id: values.email.includes("admin") ? 1 : 2,
            email: values.email,
            name: values.email.includes("admin")
              ? "Admin User"
              : "Regular User",
            role: values.email.includes("admin") ? "admin" : "user",
          },
        },
      };

      localStorage.setItem("token", mockResponse.data.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.data.user));

      message.success("Login berhasil!");

      if (mockResponse.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-8 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative py-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(24,144,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="bg-gray-800/90 border border-white/20 rounded-3xl p-12 mb-8">
          <h1 className="text-5xl font-extrabold text-white text-center mb-3">
            Fesmic
          </h1>
          <p className="text-white/50 text-center mb-6">
            Masuk untuk melanjutkan
          </p>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={<span className="text-white font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Masukkan email!" },
                { type: "email", message: "Email tidak valid!" },
              ]}
            >
              <Input
                placeholder="Masukkan email..."
                size="large"
                className="!bg-black/40 !border-white/20 h-12"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">Password</span>}
              name="password"
              rules={[{ required: true, message: "Masukkan password!" }]}
            >
              <Input.Password
                placeholder="Masukkan password..."
                size="large"
                className="h-12"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="mt-6 h-12 font-bold"
            >
              Masuk
            </Button>
          </Form>
        </div>

        <div className="bg-gray-800/70 border border-white/20 rounded-3xl p-8 text-center">
          <p className="text-white/60 mb-5">Belum punya akun?</p>
          <Link to="/register">
            <Button
              type="default"
              block
              size="large"
              className="h-12 font-bold bg-transparent border-white/30 text-white hover:!bg-white/10"
            >
              Daftar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
