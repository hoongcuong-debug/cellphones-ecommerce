// src/views/Home/ProductSection.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

// Lấy API từ .env
const API_PRODUCTS = import.meta.env.VITE_API_SHOW_PRODUCTS || 'http://localhost:3004/products/';

// Dùng Map cứng ID để đảm bảo khớp với dữ liệu Admin của bạn
const CATEGORY_ID_MAP = {
    // ID MỚI ĐƯỢC XÁC NHẬN TỪ API CỦA BẠN:
    'cate001': 16, // Điện thoại (ID 16)
    'cate002': 18, // Máy Tính Bảng (ID 18)
    'cate003': 17, // Laptop (ID 17)
    'cate004': 1,  // Tai nghe (ID 1)
    'cate005': 19, // Loa (ID 19)
};

export default function ProductSection({ title, categoryId, bg = 'bg-white' }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_PRODUCTS);
        const allData = res.data.products || []; 

        // Lấy ID cần lọc từ Map, nếu không tìm thấy thì là null
        const targetId = CATEGORY_ID_MAP[categoryId]; 
        
        let filtered = [];
        
        if (targetId) {
            // LỌC CHÍNH XÁC THEO categoryId (kiểu số)
            filtered = allData.filter(p => parseInt(p.categoryId) === targetId);
        } else {
            // Trường hợp dự phòng (Lấy 5 sản phẩm mới nhất)
            filtered = allData;
        }

        // Sắp xếp sản phẩm mới nhất lên đầu và lấy 10 sản phẩm
        filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
        setProducts(filtered.slice(0, 10)); 
        
      } catch (err) {
        console.error('Lỗi tải sản phẩm:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [categoryId]);

  if (loading) return <div className="p-8 text-center text-gray-500">Đang tải {title}...</div>;
  
  if (products.length === 0) {
      return (
        <section className={`${bg} rounded-xl shadow-sm p-4 mb-4`}>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold uppercase text-gray-800">{title}</h2>
            </div>
            <div className="text-center text-gray-400 py-10 border-2 border-dashed border-gray-100 rounded-lg">
                Chưa có sản phẩm nào thuộc danh mục này.
            </div>
        </section>
      );
  }

  return (
    <section className={`${bg} rounded-xl shadow-sm p-4 mb-4`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase text-gray-800">{title}</h2>
        <button className="text-sm text-gray-500 hover:text-[#d70018] transition">Xem tất cả &gt;</button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((p) => (
          <ProductCard key={p.idProduct || p.id} product={p} />
        ))}
      </div>
    </section>
  );
}