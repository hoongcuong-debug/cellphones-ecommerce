// src/views/Home/FlashSale.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { Flame } from 'lucide-react';

// Lấy API từ .env
const API_PRODUCTS = import.meta.env.VITE_API_SHOW_PRODUCTS || 'http://localhost:3004/products/';

export default function FlashSale() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchFlashSale = async () => {
      try {
        const res = await axios.get(API_PRODUCTS);
        const all = res.data.products || [];
        // Lọc sản phẩm có giảm giá > 0
        const flash = all.filter(p => p.discountPercent > 0).slice(0, 5);
        setProducts(flash);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFlashSale();
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="my-6">
      <div className="bg-gradient-to-r from-[#d70018] to-[#ff4d4d] rounded-t-xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2">
          <Flame className="text-yellow-300 fill-yellow-300 animate-bounce" />
          <h2 className="text-white text-xl font-bold italic drop-shadow-md">FLASH SALE</h2>
        </div>
        <div className="text-white text-sm font-medium flex items-center gap-2">
          <span>Kết thúc trong:</span>
          <span className="bg-black/80 text-white px-2 py-1 rounded font-mono">23</span>:
          <span className="bg-black/80 text-white px-2 py-1 rounded font-mono">59</span>:
          <span className="bg-black/80 text-white px-2 py-1 rounded font-mono">59</span>
        </div>
      </div>

      <div className="bg-white rounded-b-xl shadow-sm p-4 border border-t-0">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {products.map((p) => (
            <ProductCard key={p.idProduct} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}