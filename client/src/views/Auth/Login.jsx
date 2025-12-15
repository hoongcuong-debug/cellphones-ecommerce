// src/views/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, Lock, Eye, EyeOff } from "lucide-react";
import axios from "axios";

// API Login (có thể đổi sang env nếu muốn)
const API_LOGIN = "http://localhost:3004/users/login";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ phone: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.phone || !formData.password) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axios.post(API_LOGIN, formData);

      if (res.data.Login) {
        alert("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(res.data.User));
        navigate("/");
        window.location.reload();
      } else {
        alert(res.data.Message || "Sai số điện thoại hoặc mật khẩu");
      }
    } catch (error) {
      console.log("Login ERROR:", error);

      if (error.response) {
        alert(error.response.data?.message || "Đăng nhập thất bại");
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
            <h2 className="text-3xl font-bold mb-2">Smember</h2>
            <p className="text-sm opacity-90 mb-6">
              Tích điểm đổi quà, ngàn ưu đãi
            </p>
            <img
              src="https://cdn2.cellphones.com.vn/insecure/rs:fill:0:0/q:90/plain/https://cellphones.com.vn/media/wysiwyg/Shipper_CPS3_1.png"
              alt="Shipper"
              className="w-48 mx-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Form Đăng nhập */}
        <div className="w-full md:w-1/2 p-8 md:p-12 relative">
          <button
            onClick={() => navigate("/")}
            className="absolute top-4 left-4 text-gray-500 hover:text-[#d70018] flex items-center gap-1 text-sm font-medium transition"
          >
            <ArrowLeft size={18} /> Về trang chủ
          </button>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              Đăng nhập
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
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
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d70018]"
                    placeholder="Nhập số điện thoại"
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
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#d70018]"
                    placeholder="Nhập mật khẩu"
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
                className="w-full bg-[#d70018] text-white font-bold py-3 rounded-lg hover:bg-[#c40016] transition shadow-md"
              >
                ĐĂNG NHẬP
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Bạn chưa có tài khoản?{" "}
              <Link
                to="/register"
                className="text-[#d70018] font-bold hover:underline"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
