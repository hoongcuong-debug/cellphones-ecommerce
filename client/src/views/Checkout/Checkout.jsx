// src/views/Checkout/Checkout.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const IMG_BASE_URL =
  import.meta.env.VITE_HOST_NAME_UPLOADS || "http://localhost:3004/uploads/";

export default function Checkout() {
  const navigate = useNavigate();

  // Lấy giỏ hàng từ localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      return [];
    }
  });

  // Nếu giỏ trống thì quay về /cart
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  // Form thông tin khách hàng
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Tính tổng của các sản phẩm được tích chọn
  const checkedItems = useMemo(
    () => cartItems.filter((item) => item.checked),
    [cartItems]
  );

  const totalPrice = useMemo(() => {
    return checkedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [checkedItems]);

  const formatMoney = (amount) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.fullName || !form.phone || !form.address) {
      alert("Vui lòng nhập Họ tên, Số điện thoại và Địa chỉ!");
      return;
    }

    if (checkedItems.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm trong giỏ hàng!");
      return;
    }

    // Tạo mã đơn hàng đơn giản
    const orderCode = "DH" + Date.now();

    // Lấy user đang đăng nhập (nếu có)
    let userId = null;
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const u = JSON.parse(storedUser);
        userId = u.idUser || u.id || null;
      }
    } catch {}

    // Dữ liệu đơn hàng
    const orderData = {
      orderCode,
      userId,
      customer: form,
      items: checkedItems,
      total: totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Lưu vào danh sách orders trong localStorage
    const existingOrders = (() => {
      try {
        const stored = localStorage.getItem("orders");
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    })();

    existingOrders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    // Lưu lastOrder và xoá giỏ
    localStorage.setItem("lastOrder", JSON.stringify(orderData));
    localStorage.removeItem("cart");

    alert(`Đặt hàng thành công! Mã đơn của bạn là: ${orderCode}`);
    navigate("/orders"); // đi tới trang tra cứu luôn
  };

  return (
    <div className="min-h-screen bg-[#f4f6f8] py-8 px-4">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Form thông tin */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Thông tin thanh toán
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                placeholder="VD: Nguyễn Văn A"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                  placeholder="VD: 0989xxxxxx"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Địa chỉ nhận hàng
                </label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                  placeholder="VD: 123 Lê Lợi, Q.1, TP.HCM"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Ghi chú cho đơn hàng
              </label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-red-500"
                rows={3}
                placeholder="VD: Giao giờ hành chính, gọi trước khi giao..."
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-[#d70018] text-white font-bold py-3 rounded-xl text-lg hover:bg-[#c40016] transition"
            >
              XÁC NHẬN ĐẶT HÀNG
            </button>
          </form>
        </div>

        {/* Cột phải: Tóm tắt đơn hàng */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Đơn hàng của bạn
          </h2>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {checkedItems.map((item) => {
              let imgUrl = item.thumbnail;
              if (imgUrl && !imgUrl.startsWith("http")) {
                imgUrl = IMG_BASE_URL + imgUrl;
              }

              return (
                <div
                  key={item.id}
                  className="flex gap-3 items-center border-b border-gray-100 pb-3 last:border-b-0"
                >
                  <div className="w-14 h-14 flex-shrink-0">
                    <img
                      src={imgUrl}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) =>
                        (e.currentTarget.src =
                          "https://via.placeholder.com/150")
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      SL: {item.quantity}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-[#d70018]">
                    {formatMoney(item.price * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Tạm tính</span>
              <span>{formatMoney(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Phí vận chuyển</span>
              <span>Miễn phí</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 mt-2">
              <span>Tổng cộng</span>
              <span className="text-[#d70018]">
                {formatMoney(totalPrice)}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/cart")}
            className="mt-4 w-full text-sm text-gray-600 hover:text-[#d70018] underline"
          >
            ← Quay lại giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
