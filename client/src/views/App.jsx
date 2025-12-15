// src/views/App.jsx
import { Routes, Route } from "react-router-dom";

import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

import Home from "./Home/Home.jsx";
import Login from "./Auth/Login.jsx";
import Register from "./Auth/Register.jsx";
import Cart from "./Cat/Cart.jsx";                    
import Checkout from "./Checkout/Checkout.jsx";
import OrderLookup from "./OrderLookup.jsx";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import SearchResults from "./SearchResults.jsx";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#f4f4f4]">
      {/* HEADER DÍNH TRÊN */}
      <Header />

      {/* NỘI DUNG CÁC TRANG */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Giỏ hàng */}
          <Route path="/cart" element={<Cart />} />

          {/* Thanh toán */}
          <Route path="/checkout" element={<Checkout />} />

          {/* Tra cứu đơn hàng */}
          <Route path="/orders" element={<OrderLookup />} />

          {/* Chi tiết sản phẩm */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
