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
    <div className="min-h-screen flex justify-center items-center px-8 py-12 bg-gradient-to-br from-black via-gray-950 to-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(24,144,255,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="w-full max-w-[500px] relative z-10">
        <div className="bg-gray-800/90 border border-white/20 rounded-3xl p-12 mb-8">
          <h1 className="text-5xl font-extrabold text-white text-center mb-3">
            Fesmic
          </h1>
          <p className="text-white/50 text-center mb-10">Buat akun baru</p>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label={
                <span className="text-white font-medium">Nama Lengkap</span>
              }
              name="fullname"
              rules={[{ required: true, message: "Masukkan nama lengkap!" }]}
            >
              <Input
                placeholder="Nama lengkap..."
                size="large"
                className="!bg-black/40 !border-white/20 h-12"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">NIK</span>}
              name="nik"
              rules={[{ required: true, message: "Masukkan NIK!" }]}
            >
              <Input
                placeholder="Nomor NIK..."
                size="large"
                className="!bg-black/40 !border-white/20 h-12"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">Email</span>}
              name="email"
              rules={[
                { required: true, message: "Masukkan email!" },
                { type: "email", message: "Email tidak valid!" },
              ]}
            >
              <Input
                placeholder="Email..."
                size="large"
                className="!bg-black/40 !border-white/20 h-12"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white font-medium">Alamat</span>}
              required
            >
              <Form.Item
                name="province"
                rules={[{ required: true, message: "Pilih provinsi!" }]}
                className="mb-2"
              >
                <Select placeholder="Pilih Provinsi" size="large">
                  <Option value="jakarta">DKI Jakarta</Option>
                  <Option value="west-java">Jawa Barat</Option>
                  <Option value="east-java">Jawa Timur</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="city"
                rules={[{ required: true, message: "Pilih kota!" }]}
                className="mb-2"
              >
                <Select placeholder="Pilih Kota" size="large">
                  <Option value="jakarta-pusat">Jakarta Pusat</Option>
                  <Option value="jakarta-selatan">Jakarta Selatan</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="postalCode"
                rules={[{ required: true, message: "Pilih kode pos!" }]}
              >
                <Select placeholder="Pilih Kode Pos" size="large">
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
                          new Error("Harus setuju dengan syarat dan ketentuan")
                        ),
                },
              ]}
            >
              <Checkbox className="text-white/70">
                Saya setuju dengan syarat dan ketentuan yang berlaku
              </Checkbox>
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="mt-4 h-12 font-bold"
            >
              Daftar
            </Button>
          </Form>
        </div>

        <div className="bg-gray-800/60 border border-white/10 rounded-3xl p-8 text-center">
          <p className="text-white/70 mb-4">Sudah punya akun?</p>
          <Link to="/login">
            <Button
              type="default"
              block
              size="large"
              className="h-12 font-bold bg-transparent border-white/30 text-white hover:!bg-white/10"
            >
              Masuk
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
