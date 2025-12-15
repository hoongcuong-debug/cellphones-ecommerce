// src/views/Home/ProductCard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
// Lấy đường dẫn ảnh từ .env (VITE_HOST_NAME_UPLOADS)
const UPLOADS_BASE_URL =
  import.meta.env.VITE_HOST_NAME_UPLOADS || "http://localhost:3004/uploads/";

function formatPrice(value) {
  const num = Number(value) || 0;
  return num.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });
}

const handleAddToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const uniqueId = product.idProduct || product.id;
  const existingItem = cart.find((item) => item.id === uniqueId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: uniqueId,
      name: product.nameProduct || product.name,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
      checked: true,
      promotions: ["Ưu đãi đặc biệt khi thêm giỏ hàng"],
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Đã thêm ${product.nameProduct || product.name} vào giỏ hàng!`);
  window.dispatchEvent(new Event("storage")); // Kích hoạt Header cập nhật giỏ hàng
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  if (!product) return null;

  const name = product.nameProduct || product.name || "Sản phẩm";
  const price = product.price;
  const originalPrice = product.originalPrice;
  const discount = product.discountPercent || product.discount || 0;
  const thumbnail = product.thumbnail;

  // XỬ LÝ ĐƯỜNG DẪN ẢNH: Ghép link Server vào Filename
  let imageUrl = thumbnail;
  if (imageUrl && !imageUrl.startsWith("http")) {
    imageUrl = UPLOADS_BASE_URL + imageUrl;
  }

  return (
    <div
      onClick={() => navigate(`/product/${product.idProduct || product.id}`)}
      className="flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden h-full relative border border-gray-100 group cursor-pointer"
    >
      {discount > 0 && (
        <div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
          Giảm {discount}%
        </div>
      )}

      <div className="h-40 flex items-center justify-center bg-gray-50 p-2">
        <img
          src={imageUrl}
          alt={name}
          className="max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="flex-1 flex flex-col px-3 pt-2 pb-3">
        <h3
          className="text-[11px] md:text-sm font-semibold text-slate-900 leading-snug line-clamp-2 min-h-[34px] mb-2"
          title={name}
        >
          {name}
        </h3>

        <div className="mt-auto flex items-baseline gap-1 flex-wrap">
          <span className="text-red-600 font-bold text-sm md:text-base">
            {formatPrice(price)}
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-[9px] md:text-[10px]">
              {formatPrice(originalPrice)}
            </span>
          )}
        </div>

        <div className="mt-1 bg-violet-50 text-violet-700 text-[10px] px-2 py-1 rounded-md line-clamp-1 border border-violet-100">
          Trả góp 0% lãi suất
        </div>

        <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="flex items-center gap-0.5 text-yellow-400 text-[11px]">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span className="text-gray-300">★</span>
            <span className="text-[9px] text-slate-500 ml-1">
              ({product.quantity || 10})
            </span>
          </div>

          {/* NÚT THÊM GIỎ: chặn click lan lên card nếu cần */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // không navigate khi bấm giỏ
              handleAddToCart(product);
            }}
            className="flex items-center justify-center w-8 h-8 text-sm text-white bg-[#d70018] rounded-lg hover:bg-red-700 transition shadow-sm"
            title="Thêm vào giỏ"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
