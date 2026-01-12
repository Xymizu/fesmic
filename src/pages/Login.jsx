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

      // Mock authentication - replace dengan API call nanti
      // Untuk testing: admin@fesmic.com / user@fesmic.com
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

      message.success("Login successful!");

      // Redirect berdasarkan role
      if (mockResponse.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        // Redirect ke home page untuk user biasa
        // User bisa akses dashboard dari navbar
        navigate("/");
      }

      // Uncomment ini nanti untuk production dengan real API:
      // const response = await authService.login(values);
      // localStorage.setItem("token", response.data.token);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      // message.success("Login successful!");
      // if (response.data.user.role === "admin") {
      //   navigate("/admin/dashboard");
      // } else {
      //   navigate("/user/dashboard");
      // }
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative overflow-hidden py-8">
      {/* Animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(24,144,255,0.15)_0%,_transparent_70%)] animate-pulse pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,_rgba(59,130,246,0.12)_0%,_transparent_60%)] pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-2xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 shadow-2xl hover:shadow-blue-500/10 transition-all duration-500">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white text-center mb-2 sm:mb-3 [text-shadow:0_0_40px_rgba(24,144,255,0.5)] tracking-tight">
            Fesmic
          </h1>
          <p className="text-white/50 text-center mb-4 sm:mb-6 text-sm">
            Sign in to continue
          </p>

          {/* Testing Info */}
          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-blue-400 text-xs font-semibold mb-2">
              🧪 Testing Accounts:
            </p>
            <p className="text-white/70 text-xs mb-1">
              👤 User:{" "}
              <span className="text-white font-mono text-xs break-all">
                user@fesmic.com
              </span>
            </p>
            <p className="text-white/70 text-xs mb-1">
              👨‍💼 Admin:{" "}
              <span className="text-white font-mono text-xs break-all">
                admin@fesmic.com
              </span>
            </p>
            <p className="text-white/60 text-xs mt-2">
              Password: <span className="text-white/80">anything</span>
            </p>
          </div>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={
                <span className="text-white font-medium text-sm sm:text-base">
                  Email
                </span>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input
                placeholder="Insert Email.."
                size="large"
                className="!bg-black/40 !border-white/20 rounded-lg h-11 sm:h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300 text-sm sm:text-base"
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="text-white font-medium text-sm sm:text-base">
                  Password
                </span>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Insert Password.."
                size="large"
                className="rounded-lg h-11 sm:h-12 hover:!border-blue-400/50 focus:!border-blue-400 transition-all duration-300 text-sm sm:text-base"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="mt-4 sm:mt-6 h-[48px] sm:h-[52px] rounded-lg text-sm sm:text-base font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300"
            >
              Log In
            </Button>
          </Form>
        </div>

        <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center backdrop-blur-lg shadow-xl">
          <p className="text-white/60 mb-4 sm:mb-5 text-sm sm:text-base">
            Don't have an account?
          </p>
          <Link to="/register">
            <Button
              type="default"
              block
              size="large"
              className="h-[48px] sm:h-[52px] rounded-lg text-sm sm:text-base font-bold bg-transparent border-white/30 text-white hover:!bg-white/10 hover:!border-blue-400 hover:!text-blue-400 hover:scale-[1.02] transition-all duration-300"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
