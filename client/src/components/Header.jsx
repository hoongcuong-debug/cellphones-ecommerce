// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  MapPin,
  ShoppingCart,
  User,
  Menu,
  Phone,
  Truck,
  LayoutGrid,
} from "lucide-react";
import CategoryMenu from "../views/Home/CategoryMenu.jsx";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [keyword, setKeyword] = useState(""); // <-- từ khoá tìm kiếm

  const navigate = useNavigate();

  // Lấy thông tin user từ LocalStorage khi khởi tạo
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Listener để cập nhật Header khi giỏ hàng thay đổi (từ ProductCard)
    const handleStorage = () => {
      const u = localStorage.getItem("user");
      if (u) setUser(JSON.parse(u));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  // ✅ Xử lý submit search
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = keyword.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <header className="bg-[#d70018] text-white sticky top-0 z-50 shadow-md relative">
        <div className="container mx-auto px-3 py-2">
          <div className="flex items-center justify-between gap-2 lg:gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <button className="lg:hidden p-1">
                <Menu className="w-6 h-6" />
              </button>
              <Link
                to="/"
                className="flex-shrink-0 flex flex-col items-start mr-1"
              >
                <span className="text-xl md:text-2xl font-bold leading-none tracking-tighter">
                  cellphoneS
                </span>
                <span className="text-[10px] opacity-90 hidden sm:block">
                  Điện thoại - Laptop - Tablet - Phụ kiện
                </span>
              </Link>
            </div>

            {/* NÚT DANH MỤC */}
            <div className="hidden lg:block relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition select-none ${
                  showMenu
                    ? "bg-white/20"
                    : "bg-[#be1e2d] hover:bg-white/10"
                }`}
              >
                <LayoutGrid size={20} />
                <span className="text-xs font-bold">Danh mục</span>
              </button>

              {/* MENU DROPDOWN */}
              {showMenu && (
                <div className="absolute top-[115%] left-0 w-[230px] z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100">
                    <CategoryMenu />
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl hidden md:block relative z-50">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Bạn cần tìm gì?"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full pl-4 pr-10 py-2 rounded-lg bg-white text-black text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#d70018]"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* ICONS RIGHT */}
            <div className="flex items-center gap-1 lg:gap-2 text-[10px] lg:text-xs font-medium">
              <a
                href="tel:18002097"
                className="hidden xl:flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <Phone className="w-5 h-5 mb-0.5" />
                <div className="text-center leading-tight">
                  <span>1800.2097</span>
                </div>
              </a>
              <a
                href="#"
                className="hidden lg:flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <MapPin className="w-5 h-5 mb-0.5" />
                <div className="text-center leading-tight">
                  <span>Cửa hàng gần bạn</span>
                </div>
              </a>

              {/* Tra cứu đơn hàng */}
              <Link
                to="/orders"
                className="hidden lg:flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <Truck className="w-5 h-5 mb-0.5" />
                <span className="text-center leading-tight">
                  <span>Tra cứu</span>
                  <br />
                  <span>đơn hàng</span>
                </span>
              </Link>

              {/* GIỎ HÀNG */}
              <Link
                to="/cart"
                className="flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition relative"
              >
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 mb-0.5" />
                  {/* Bạn có thể nối số lượng giỏ hàng vào đây sau */}
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-[#d70018] text-[9px] font-bold px-1 rounded-full border border-[#d70018]">
                    0
                  </span>
                </div>
                <span>Giỏ hàng</span>
              </Link>

              {/* SMEMBER / TÊN USER */}
              {user ? (
                <div className="relative group cursor-pointer flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition">
                  <div className="bg-white/20 p-0.5 rounded-full mb-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="max-w-[60px] truncate text-center">
                    {user.fullName || user.phone}
                  </span>

                  {/* Dropdown Đăng xuất */}
                  <div className="absolute top-full right-0 mt-2 w-32 bg-white rounded-lg shadow-xl hidden group-hover:block text-gray-800 z-50 overflow-hidden">
                    <div
                      className="px-4 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex flex-col items-center hover:bg-white/10 p-1.5 rounded-lg transition"
                >
                  <div className="bg-white/20 p-0.5 rounded-full mb-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Smember</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* OVERLAY */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setShowMenu(false)}
        ></div>
      )}
    </>
  );
};

export default Header;
