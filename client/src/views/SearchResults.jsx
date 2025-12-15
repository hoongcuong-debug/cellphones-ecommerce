// src/views/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import ProductCard from "./Home/ProductCard.jsx";

const API_PRODUCTS =
  import.meta.env.VITE_API_SHOW_PRODUCTS || "http://localhost:3004/products/";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function SearchResults() {
  const query = useQuery();
  const q = query.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!q.trim()) return;
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_PRODUCTS);
      const rawList = res.data.products || res.data || [];
      const list = Array.isArray(rawList) ? rawList : [];

      const keyword = q.trim().toLowerCase();
      const filtered = list.filter((p) => {
        const name = (p.nameProduct || p.name || "").toLowerCase();
        return name.includes(keyword);
      });

      setProducts(filtered);
    } catch (err) {
      console.error("Lỗi tải danh sách sản phẩm:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-[#f4f6f8] min-h-screen py-4 px-3">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4">
          <h1 className="text-lg md:text-2xl font-bold mb-3">
            Kết quả tìm kiếm cho:{" "}
            <span className="text-[#d70018]">&quot;{q}&quot;</span>
          </h1>

          {loading ? (
            <p className="py-6 text-gray-600">Đang tìm sản phẩm...</p>
          ) : products.length === 0 ? (
            <p className="py-6 text-gray-600">
              Không tìm thấy sản phẩm phù hợp.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {products.map((p) => (
                <ProductCard key={p.idProduct || p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
