// src/views/Auth/Register.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Lock, User, Eye, EyeOff } from "lucide-react";
import axios from "axios";

// API đăng ký: ưu tiên lấy từ .env
const API_REGISTER =
  import.meta.env.VITE_API_ADD_USER || "http://localhost:3004/users/add/";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.phone || !formData.password) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axios.post(API_REGISTER, formData);

      if (res.data) {
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      }
    } catch (error) {
      console.log("Register ERROR:", error);

      if (error.response) {
        alert(error.response.data?.message || "Đăng ký thất bại");
      } else {
        alert("Không kết nối được Server");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[800px] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Banner Trái */}
        <div className="hidden md:flex w-1/2 bg-[#d70018] flex-col items-center justify-center text-white p-8 relative">
          <div className="z-10 text-center">
            <h2 className="text-3xl font-bold mb-2">Đăng ký</h2>
            <p className="text-sm opacity-90 mb-6">
              Trở thành thành viên Smember ngay
            </p>
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Shipper_CPS3_1.png"
              alt="Shipper"
              className="w-48 mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Form Đăng ký */}
        <div className="w-full md:w-1/2 p-8 md:p-12 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-gray-500 hover:text-[#d70018] flex items-center gap-1 text-sm font-medium transition"
          >
            <ArrowLeft size={18} /> Trang chủ
          </button>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Tạo tài khoản
            </h2>
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Họ tên */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ và tên
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="fullName"
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d70018]"
                  />
                </div>
              </div>

              {/* SĐT */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d70018]"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    placeholder="Mật khẩu"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d70018] focus:ring-1 focus:ring-[#d70018]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#d70018] text-white font-bold py-3 rounded-lg hover:bg-[#c40016] transition shadow-md mt-2"
              >
                ĐĂNG KÝ
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login"
                className="text-[#d70018] font-bold hover:underline"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
