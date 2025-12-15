// src/views/ProductDetail/ProductDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import ProductCard from "../Home/ProductCard.jsx";

const API_PRODUCTS =
  import.meta.env.VITE_API_SHOW_PRODUCTS || "http://localhost:3004/products/";
const UPLOADS_BASE_URL =
  import.meta.env.VITE_HOST_NAME_UPLOADS || "http://localhost:3004/uploads/";

export default function ProductDetail() {
  const { id } = useParams(); // /product/:id
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [suggestList, setSuggestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // state cho đánh giá
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      setLoadError("");

      const res = await axios.get(API_PRODUCTS);

      const rawList = res.data.products || res.data || [];
      const list = Array.isArray(rawList) ? rawList : [];

      const found = list.find(
        (p) => String(p.idProduct || p.id) === String(id)
      );

      if (!found) {
        setLoadError("Không tìm thấy sản phẩm.");
        setProduct(null);
        setSuggestList([]);
        setReviews([]);
      } else {
        setProduct(found);

        // Gợi ý: lấy 4 sản phẩm khác
        const others = list.filter(
          (p) => String(p.idProduct || p.id) !== String(id)
        );
        setSuggestList(others.slice(0, 4));

        // load đánh giá đã lưu trong localStorage
        const pid = found.idProduct || found.id;
        const stored = localStorage.getItem(`reviews_${pid}`);
        if (stored) {
          try {
            setReviews(JSON.parse(stored));
          } catch {
            setReviews([]);
          }
        } else {
          setReviews([]);
        }
      }
    } catch (err) {
      console.error("Lỗi load chi tiết sản phẩm:", err);
      setLoadError("Không tải được dữ liệu từ server.");
      setProduct(null);
      setSuggestList([]);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const pid = product.idProduct || product.id;

    const exist = cart.find((item) => item.id === pid);

    if (exist) {
      exist.quantity += 1;
    } else {
      cart.push({
        id: pid,
        name: product.nameProduct || product.name,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
        checked: true,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    alert("✅ Đã thêm vào giỏ hàng");
  };

  const handleBuyNow = () => {
    addToCart();
    navigate("/checkout");
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!product) return;
    if (rating === 0) {
      alert("Bạn hãy chọn số sao trước khi gửi đánh giá.");
      return;
    }
    if (!reviewComment.trim()) {
      alert("Bạn hãy nhập nội dung đánh giá.");
      return;
    }

    const pid = product.idProduct || product.id;

    const newReview = {
      id: Date.now(),
      name: reviewName.trim() || "Khách",
      rating,
      comment: reviewComment.trim(),
      createdAt: new Date().toISOString(),
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(`reviews_${pid}`, JSON.stringify(updated));

    // reset form
    setRating(0);
    setHoverRating(0);
    setReviewName("");
    setReviewComment("");
  };

  const renderStars = (value) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= value ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  const renderLoading = () => (
    <>
      <div className="text-center py-10 text-lg">
        Đang tải thông tin sản phẩm...
      </div>
      <Footer />
    </>
  );

  const renderError = () => (
    <>
      <div className="text-center py-10">
        <p className="text-red-600 mb-4 font-semibold">{loadError}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-black"
        >
          Quay lại
        </button>
      </div>
      <Footer />
    </>
  );

  if (loading) return renderLoading();
  if (loadError) return renderError();
  if (!product) return renderError();

  const imageUrl = product.thumbnail?.startsWith("http")
    ? product.thumbnail
    : `${UPLOADS_BASE_URL}${product.thumbnail}`;

  return (
    <>

      <div className="bg-[#f4f6f8] min-h-screen py-6 px-4">
        {/* KHỐI CHI TIẾT CHÍNH */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow-md">
          <div className="grid md:grid-cols-2 gap-6">
            {/* ẢNH */}
            <img
              src={imageUrl}
              alt={product.nameProduct || product.name}
              className="w-full h-[350px] object-contain border rounded-xl"
            />

            {/* THÔNG TIN */}
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {product.nameProduct || product.name}
              </h1>

              <p className="text-[#d70018] text-2xl font-bold mb-1">
                {Number(product.price || 0).toLocaleString("vi-VN")}₫
              </p>

              {product.originalPrice && (
                <p className="line-through text-gray-400 mb-3">
                  {Number(product.originalPrice).toLocaleString("vi-VN")}₫
                </p>
              )}

              <p className="text-gray-600 mb-4">
                {product.description ||
                  "Sản phẩm chính hãng – Bảo hành 12 tháng – Đổi trả trong 7 ngày."}
              </p>

              {/* ƯU ĐÃI THANH TOÁN */}
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-3 mb-5">
                <h3 className="font-semibold text-sm mb-2">
                  🎁 Ưu đãi thanh toán
                </h3>
                <ul className="text-xs space-y-1 text-gray-700">
                  <li>• Giảm đến 5.000.000₫ khi thanh toán qua ví/kỳ hạn đối tác.</li>
                  <li>• Hoàn tiền thêm khi mở thẻ tín dụng ngân hàng liên kết.</li>
                  <li>• Trả góp 0% qua nhiều công ty tài chính.</li>
                  <li>• Ưu đãi Smember, tích điểm đổi quà.</li>
                </ul>
              </div>

              {/* NÚT */}
              <div className="flex gap-4">
                <button
                  onClick={addToCart}
                  className="px-5 py-3 bg-gray-800 text-white rounded-lg hover:bg-black"
                >
                  Thêm vào giỏ
                </button>

                <button
                  onClick={handleBuyNow}
                  className="px-5 py-3 bg-[#d70018] text-white rounded-lg hover:bg-red-700 font-bold"
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ĐÁNH GIÁ & NHẬN XÉT */}
        <div className="max-w-5xl mx-auto mt-6 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Đánh giá & nhận xét</h2>

          {/* FORM ĐÁNH GIÁ */}
          <form onSubmit={handleSubmitReview} className="mb-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm">Chọn số sao:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="text-xl"
                  >
                    <span
                      className={
                        star <= (hoverRating || rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tên của bạn (không bắt buộc)"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="flex-1 border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <textarea
              placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
            />

            <button
              type="submit"
              className="px-5 py-2 bg-[#d70018] text-white rounded-lg text-sm hover:bg-red-700"
            >
              Gửi đánh giá
            </button>
          </form>

          {/* DANH SÁCH ĐÁNH GIÁ CŨ */}
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-500">
              Chưa có đánh giá nào. Hãy là người đầu tiên chia sẻ cảm nhận của bạn!
            </p>
          ) : (
            <div className="space-y-3">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="border-t pt-3 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold">
                      {r.name}
                    </span>
                    <div className="flex items-center text-xs">
                      {renderStars(r.rating)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CÓ THỂ BẠN SẼ THÍCH - 4 SẢN PHẨM */}
        {suggestList.length > 0 && (
          <div className="max-w-5xl mx-auto mt-8">
            <h2 className="text-xl font-bold mb-3">Có thể bạn sẽ thích</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestList.map((p) => (
                <ProductCard
                  key={p.idProduct || p.id}
                  product={p}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
