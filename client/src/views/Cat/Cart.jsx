
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Gift, Shield } from 'lucide-react';

const IMG_BASE_URL = import.meta.env.VITE_HOST_NAME_UPLOADS || 'http://localhost:3004/uploads/';

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      if (item.checked) return total + item.price * item.quantity;
      return total;
    }, 0);
  }, [cartItems]);

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleCheck = (id) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleCheckAll = (check) => {
    setCartItems(prev => prev.map(item => ({ ...item, checked: check })));
  };
  
  // Render Giỏ hàng (Giống code cũ nhưng đã có IMG_BASE_URL)
  if (cartItems.length === 0) {
      return (
          <div className="bg-[#f4f6f8] min-h-screen pt-16 text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h1>
              <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-3 rounded-xl">Tiếp tục mua sắm</button>
          </div>
      );
  }

  return (
    <div className="bg-[#f4f6f8] min-h-screen pt-4 pb-16 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-700 hover:text-red-600 font-medium"><ArrowLeft size={20} /> Quay lại</button>
          <h1 className="text-2xl font-bold text-gray-800">Giỏ hàng của bạn</h1>
          <div className="w-20"></div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" checked={cartItems.every(item => item.checked)} onChange={(e) => toggleCheckAll(e.target.checked)} className="w-4 h-4 text-red-600 border-gray-300 rounded"/>
              <span>Bỏ chọn tất cả</span>
            </div>
            <button onClick={() => setCartItems([])} className="text-red-500 text-sm hover:text-red-600">Xóa tất cả</button>
          </div>
          
          {cartItems.map(item => {
             // Xử lý ảnh trong giỏ hàng
             let imgUrl = item.thumbnail;
             if(imgUrl && !imgUrl.startsWith('http')) imgUrl = IMG_BASE_URL + imgUrl;

             return (
                <div key={item.id} className="border-b border-gray-100 py-4 last:border-b-0">
                  <div className="flex gap-4 items-start">
                    <input type="checkbox" checked={item.checked} onChange={() => toggleCheck(item.id)} className="w-5 h-5 mt-1 text-red-600 border-gray-300 rounded"/>
                    <div className="w-20 h-20 flex-shrink-0">
                      <img src={imgUrl} alt={item.name} className="w-full h-full object-contain" onError={(e) => e.target.src="https://via.placeholder.com/150"}/>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div><h3 className="text-base font-semibold">{item.name}</h3><p className="text-lg font-bold text-[#d70018]">{formatMoney(item.price)}</p></div>
                        <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                      </div>
                      <div className="mt-3 flex justify-between items-end">
                        <div className="flex items-center border border-gray-300 rounded-lg h-9">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-3 border-r">-</button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-3 border-l">+</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
             );
          })}
          
          <div className="pt-6 flex justify-between items-center">
            <div className="text-lg font-medium">Tạm tính:</div>
            <div className="text-2xl font-bold text-[#d70018]">{formatMoney(totalPrice)}</div>
          </div>
          <button className="w-full mt-4 bg-[#d70018] text-white font-bold py-4 rounded-xl text-lg hover:bg-[#c40016]" onClick={() => navigate('/checkout')}>MUA NGAY</button>
        </div>
      </div>
    </div>
  );
}