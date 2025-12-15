
import { Facebook, Youtube, Instagram, MapPin, Phone, Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">cellphoneS</h3>
            <p className="text-sm mb-4">
              Hệ thống bán lẻ điện thoại di động, smartphone, máy tính bảng, tablet, laptop uy tín hàng đầu Việt Nam
            </p>
            <div className="flex gap-4">
              <Facebook className="hover:text-white cursor-pointer transition" size={20} />
              <Youtube className="hover:text-white cursor-pointer transition" size={20} />
              <Instagram className="hover:text-white cursor-pointer transition" size={20} />
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Thông tin</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">Giới thiệu về công ty</li>
              <li className="hover:text-white cursor-pointer transition">Chính sách bảo mật</li>
              <li className="hover:text-white cursor-pointer transition">Quy chế hoạt động</li>
              <li className="hover:text-white cursor-pointer transition">Kiểm tra hóa đơn</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Chính sách</h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer transition">Chính sách bảo hành</li>
              <li className="hover:text-white cursor-pointer transition">Chính sách đổi trả</li>
              <li className="hover:text-white cursor-pointer transition">Chính sách giao hàng</li>
              <li className="hover:text-white cursor-pointer transition">Chính sách thanh toán</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>1800.2097 (miễn phí)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contact@DOAN.com.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          <p>&copy; 2025 ĐỒ ÁN CHUYÊN ĐỀ REACT NODEJS</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer