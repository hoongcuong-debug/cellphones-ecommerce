// src/views/OrderLookup.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatMoney = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);

export default function OrderLookup() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("phone"); // 'phone' | 'code'

  useEffect(() => {
    try {
      const stored = localStorage.getItem("orders");
      setOrders(stored ? JSON.parse(stored) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    if (!keyword.trim()) return orders;
    const kw = keyword.trim().toLowerCase();

    if (searchType === "phone") {
      return orders.filter((o) =>
        (o.customer?.phone || "").toLowerCase().includes(kw)
      );
    }

    if (searchType === "code") {
      return orders.filter((o) =>
        (o.orderCode || "").toLowerCase().includes(kw)
      );
    }

    return orders;
  }, [orders, keyword, searchType]);

  return (
    <div className="min-h-screen bg-[#f4f6f8] pt-6 pb-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Tra cứu đơn hàng
          </h1>
          <button
            onClick={() => navigate("/")}
            className="text-sm text-red-600 hover:underline"
          >
            ← Về trang chủ
          </button>
        </div>

        {/* Form tra cứu */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="phone">Theo số điện thoại</option>
            <option value="code">Theo mã đơn hàng</option>
          </select>
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500"
            placeholder={
              searchType === "phone"
                ? "Nhập số điện thoại đã đặt hàng..."
                : "Nhập mã đơn hàng (VD: DH...)"
            }
          />
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            Không tìm thấy đơn hàng nào. Hãy kiểm tra lại thông tin hoặc thử
            đặt một đơn hàng mới.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders
              .slice()
              .reverse()
              .map((order) => (
                <div
                  key={order.orderCode}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-sm text-gray-500">
                        Mã đơn:{" "}
                        <span className="font-semibold">
                          {order.orderCode}
                        </span>
                      </p>
                      <p className="text-xs text-gray-400">
                        Ngày tạo:{" "}
                        {new Date(order.createdAt).toLocaleString("vi-VN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {order.customer?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">
                        SĐT: {order.customer?.phone}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-2 mt-2 space-y-1">
                    {order.items?.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-xs text-gray-700"
                      >
                        <span>
                          {item.name} x {item.quantity}
                        </span>
                        <span>
                          {formatMoney(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-3 border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-500">
                      Trạng thái:{" "}
                      <span className="font-semibold text-yellow-600">
                        {order.status || "Đang xử lý"}
                      </span>
                    </span>
                    <span className="text-base font-bold text-[#d70018]">
                      {formatMoney(order.total)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
