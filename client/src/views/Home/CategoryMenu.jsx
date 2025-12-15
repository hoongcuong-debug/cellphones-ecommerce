// src/views/Home/CategoryMenu.jsx
import { useState } from 'react';
import { Smartphone, Laptop, Tablet, Watch, Headphones, Camera, Gamepad2, ChevronRight, Tv, RefreshCcw, CircuitBoard, CreditCard } from 'lucide-react';
// IMPORT LOGOS
import samsungLogo from '../../assets/image/brand-samsung.png';
import realmeLogo from '../../assets/image/brand-realme.png';
import hplogo from '../../assets/image/brand-hp.png';
import msilogo from '../../assets/image/brand-msi.png';
import lglogo from '../../assets/image/brand-lg.png';
import garminLogo from '../../assets/image/brand-garmin.png';
import huaweiLogo from '../../assets/image/brand-huawei.png';
import corosLogo from '../../assets/image/brand-coros.png';
import goProLogo from '../../assets/image/brand-gopro.png';
import viettelLogo from '../../assets/image/brand-viettel.png';   
import mobifoneLogo from '../../assets/image/brand-mobifone.png'; 
import vinaphoneLogo from '../../assets/image/brand-vinaphone.png';
import viewsonicLogo from '../../assets/image/brand-viewsonic.png';
import casperLogo from '../../assets/image/brand-casper.png';
import toshibaLogo from '../../assets/image/brand-toshiba.png';
import EnergizerLogo from '../../assets/image/brand-energizer.png';
import AnkerLogo from '../../assets/image/brand-anker.png';
import BoseLogo from '../../assets/image/brand-bose.png';
import MarshallLogo from '../../assets/image/brand-marshall.png';
import jblLogo from '../../assets/image/brand-jbl.png';

const CategoryMenu = () => {
  // Dùng hoveredItem để quản lý trạng thái hover
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { 
      id: 1,
      icon: <Smartphone size={22} />, 
      label: 'Điện thoại, Tablet',
      subMenu: {
        brands: [
          { name: 'Apple', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'Samsung', img: samsungLogo },
          { name: 'Xiaomi', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
          { name: 'OPPO', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/OPPO_Logo.svg' },
          { name: 'Vivo', img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png' },
          { name: 'Realme', img: realmeLogo },
          { name: 'ASUS', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
          { name: 'Nokia', img: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg' },
        ],
        column2: {
          title: 'Điện thoại HOT 🔥',
          items: ['iPhone 15 Pro Max', 'Galaxy S24 Ultra', 'Xiaomi 14', 'OPPO Reno11 F', 'iPhone 13', 'Redmi Note 13']
        },
        column3: {
          title: 'Máy tính bảng',
          items: ['iPad Pro M4', 'iPad Air 6', 'Samsung Galaxy Tab S9', 'Xiaomi Pad 6', 'Lenovo Tab M10', 'iPad Gen 10']
        },
        bottomTags: ['Dưới 2 triệu', 'Từ 2 - 4 triệu', 'Từ 4 - 7 triệu', 'Từ 7 - 13 triệu', 'Trên 20 triệu']
      }
    },
    { 
      id: 2,
      icon: <Laptop size={22} />, 
      label: 'Laptop, Smart Home',
      subMenu: {
        brands: [
          { name: 'MacBook', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'ASUS', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
          { name: 'Dell', img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
          { name: 'HP', img: hplogo },
          { name: 'Lenovo', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg' },
          { name: 'MSI', img: msilogo },
          { name: 'Acer', img: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg' },
          { name: 'LG', img: lglogo },
        ],
        column2: {
          title: 'Laptop Bán Chạy',
          items: ['MacBook Air M3', 'ASUS TUF Gaming', 'Dell XPS 13', 'Lenovo Legion 5', 'Acer Nitro 5', 'HP Pavilion']
        },
        column3: {
          title: 'Nhà thông minh',
          items: ['Máy hút bụi', 'Máy lọc không khí', 'Camera an ninh', 'Khóa điện tử', 'Đèn thông minh']
        },
        bottomTags: ['Laptop Gaming', 'Laptop Văn phòng', 'Laptop Đồ họa', 'Smarthome Xiaomi', 'Robot hút bụi']
      }
    },
    { 
      id: 3, 
      icon: <Watch size={22} />, 
      label: 'Đồng hồ, Camera',
      subMenu: {
        brands: [
          { name: 'Apple Watch', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'Samsung', img: samsungLogo },
          { name: 'Garmin', img: garminLogo },
          { name: 'Xiaomi', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
          { name: 'Huawei', img: huaweiLogo },
          { name: 'Coros', img: corosLogo },
          { name: 'Sony', img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
          { name: 'GoPro', img: goProLogo },
        ],
        column2: {
          title: 'Đồng hồ thông minh',
          items: ['Apple Watch Series 9', 'Samsung Galaxy Watch 6', 'Garmin Forerunner', 'Huawei Watch GT4']
        },
        column3: {
          title: 'Camera & Flycam',
          items: ['Camera hành trình', 'Flycam DJI', 'Gimbal chống rung', 'Máy ảnh Sony', 'Insta360']
        },
        bottomTags: ['Đồng hồ chạy bộ', 'Vòng đeo tay', 'Camera an ninh', 'Phụ kiện máy ảnh']
      }
    },
    { 
      id: 4, 
      icon: <Headphones size={22} />, 
      label: 'Âm thanh, Phụ kiện',
      subMenu: {
        brands: [
          { name: 'JBL', img: jblLogo },
          { name: 'Sony', img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
          { name: 'Marshall', img: MarshallLogo },
          { name: 'Bose', img: BoseLogo },
          { name: 'Anker', img: AnkerLogo },
          { name: 'Energizer', img: EnergizerLogo },
        ],
        column2: {
          title: 'Thiết bị âm thanh',
          items: ['Tai nghe Bluetooth', 'Loa Bluetooth', 'Tai nghe Gaming', 'Loa Soundbar', 'Micro thu âm']
        },
        column3: {
          title: 'Phụ kiện Mobile',
          items: ['Sạc dự phòng', 'Cáp sạc', 'Củ sạc', 'Ốp lưng - Bao da', 'Dán màn hình']
        },
        bottomTags: ['Tai nghe chống ồn', 'Loa Karaoke', 'Pin dự phòng Magsafe', 'Cáp sạc iPhone']
      }
    },
    { 
      id: 5, 
      icon: <Gamepad2 size={22} />, 
      label: 'PC, Màn hình',
      subMenu: {
        brands: [
          { name: 'ASUS', img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
          { name: 'MSI', img: msilogo },
          { name: 'Gigabyte', img: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Gigabyte_Technology_logo_20080107.svg' },
          { name: 'LG', img: lglogo },
          { name: 'Samsung', img: samsungLogo },
          { name: 'ViewSonic', img: viewsonicLogo },
        ],
        column2: {
          title: 'Linh kiện máy tính',
          items: ['CPU', 'VGA - Card màn hình', 'Mainboard', 'RAM', 'SSD/HDD', 'Nguồn máy tính']
        },
        column3: {
          title: 'Màn hình máy tính',
          items: ['Màn hình Gaming', 'Màn hình Đồ họa', 'Màn hình Văn phòng', 'PC Đồng bộ', 'Build PC']
        },
        bottomTags: ['PC Gaming', 'Màn hình 144Hz', 'Ghế Công thái học', 'Bàn phím cơ', 'Chuột Gaming']
      }
    },
    { 
      id: 6, 
      icon: <Tv size={22} />, 
      label: 'Tivi, Tủ lạnh',
      subMenu: {
        brands: [
          { name: 'Samsung', img: samsungLogo },
          { name: 'Sony', img: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg' },
          { name: 'LG', img: lglogo },
          { name: 'Xiaomi', img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' },
          { name: 'Casper', img: casperLogo },
          { name: 'Toshiba', img: toshibaLogo },
        ],
        column2: {
          title: 'Tivi',
          items: ['Tivi Samsung', 'Tivi Sony', 'Tivi LG', 'Tivi Xiaomi', 'Google Tivi', 'Khung treo Tivi']
        },
        column3: {
          title: 'Điện máy - Gia dụng',
          items: ['Tủ lạnh', 'Máy giặt', 'Máy sấy quần áo', 'Điều hòa', 'Máy nước nóng']
        },
        bottomTags: ['Smart Tivi 4K', 'Tivi QLED', 'Tủ lạnh Side by Side', 'Máy giặt cửa ngang']
      }
    },
    { 
      id: 7, 
      icon: <RefreshCcw size={22} />, 
      label: 'Thu cũ đổi mới',
      subMenu: {
        brands: [
          { name: 'Apple', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
          { name: 'Samsung', img: samsungLogo },
        ],
        column2: {
          title: 'Chương trình Thu cũ',
          items: ['Thu cũ iPhone', 'Thu cũ Samsung', 'Thu cũ Mac/iPad', 'Thu cũ Laptop', 'Thu cũ Đồng hồ']
        },
        column3: {
          title: 'Quy trình thu cũ',
          items: ['Định giá máy cũ', 'Trợ giá lên đời', 'Chính sách 5 KHÔNG', 'Danh sách cửa hàng']
        },
        bottomTags: ['Lên đời iPhone 15', 'Lên đời S24 Ultra', 'Trợ giá đến 4 triệu']
      }
    },
    { 
      id: 8, 
      icon: <CircuitBoard size={22} />, 
      label: 'Hàng cũ giá rẻ',
      subMenu: {
        column2: {
          title: 'Điện thoại cũ',
          items: ['iPhone cũ', 'Samsung cũ', 'Xiaomi cũ', 'OPPO cũ', 'Điện thoại xước cấn']
        },
        column3: {
          title: 'Sản phẩm cũ khác',
          items: ['iPad cũ', 'MacBook cũ', 'Laptop cũ', 'Đồng hồ cũ', 'Tai nghe cũ']
        },
        bottomTags: ['iPhone 12 Pro Max cũ', 'iPhone 11 cũ', 'iPad Gen 9 cũ', 'Apple Watch cũ']
      }
    },
    { 
      id: 9, 
      icon: <CreditCard size={22} />, 
      label: 'Sim thẻ, Voucher',
      subMenu: {
        brands: [
          { name: 'Viettel', img: viettelLogo },
          { name: 'Mobifone', img: mobifoneLogo },
          { name: 'Vinaphone', img: vinaphoneLogo },
        ],
        column2: {
          title: 'Sim số đẹp',
          items: ['Sim 4G Viettel', 'Sim 4G Mobifone', 'Sim 4G Vinaphone', 'Sim Wintel', 'Sim Du lịch']
        },
        column3: {
          title: 'Phần mềm & Voucher',
          items: ['Microsoft Office 365', 'Windows bản quyền', 'Diệt virus', 'Voucher GotIt', 'Thẻ nạp game']
        },
        bottomTags: ['Sim Data không giới hạn', 'Office 365 giá rẻ', 'Key Windows 11']
      }
    },
  ];

  return (
    // THAY ĐỔI: Sửa onMouseLeave của div cha để ngăn menu bị mất khi đi chuột sang phải
    <div className="relative" onMouseLeave={() => setHoveredItem(null)}> 
      
      {/* MENU CHÍNH */}
      <div className="bg-white rounded-xl shadow-md h-fit overflow-hidden border border-gray-100 py-2 relative z-20">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <div 
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 text-gray-700 text-[14px] font-bold transition-colors cursor-pointer justify-between"
                onMouseEnter={() => setHoveredItem(item)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* MEGA SUB-MENU */}
      {hoveredItem && hoveredItem.subMenu && (
        <div 
          className="absolute top-0 left-[100%] ml-2 w-[950px] bg-white shadow-xl rounded-xl border border-gray-200 z-30 p-6 min-h-full"
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={() => setHoveredItem(null)} // Giữ nguyên onMouseLeave tại đây để đóng khi rời sub-menu
        >
          <div className="grid grid-cols-3 gap-8 h-full">
            
            {/* CỘT 1 */}
            <div className="flex flex-col">
              {hoveredItem.subMenu.brands && hoveredItem.subMenu.brands.length > 0 && (
                <>
                  <h3 className="font-bold text-gray-800 mb-3">Thương hiệu</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {hoveredItem.subMenu.brands.map((brand, idx) => (
                      <a key={idx} href="#" className="border border-gray-200 rounded-lg p-2 flex items-center justify-center hover:border-red-500 hover:shadow-sm transition bg-white h-[40px]">
                        {brand.img ? (
                          <img src={brand.img} alt={brand.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <span className="text-xs font-medium">{brand.name}</span>
                        )}
                      </a>
                    ))}
                  </div>
                </>
              )}
              
              {/* Tìm kiếm nhiều */}
              {hoveredItem.subMenu.bottomTags && (
                <div className="mt-auto">
                  <h3 className="font-bold text-gray-800 mb-3">Tìm kiếm nhiều</h3>
                  <div className="flex flex-wrap gap-2">
                    {hoveredItem.subMenu.bottomTags.map((tag, idx) => (
                      <a 
                        key={idx} 
                        href="#" 
                        // ĐÃ SỬA: Thêm text-gray-700 để chữ rõ ràng
                        className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded text-xs hover:bg-red-100 hover:text-red-600 transition"
                      >
                        {tag}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CỘT 2 */}
            <div>
              {hoveredItem.subMenu.column2 && (
                <>
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-1">
                    {hoveredItem.subMenu.column2.title} <span className="text-red-500 text-xs">🔥</span>
                  </h3>
                  <div className="flex flex-col gap-2">
                    {hoveredItem.subMenu.column2.items.map((it, idx) => (
                      <a key={idx} href="#" className="text-sm text-gray-600 hover:text-red-600 hover:underline">
                        {it}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CỘT 3 */}
            <div>
              {hoveredItem.subMenu.column3 && (
                <>
                  <h3 className="font-bold text-gray-800 mb-3">{hoveredItem.subMenu.column3.title}</h3>
                  <div className="flex flex-col gap-2">
                    {hoveredItem.subMenu.column3.items.map((it, idx) => (
                      <a key={idx} href="#" className="text-sm text-gray-600 hover:text-red-600 hover:underline">
                        {it}
                      </a>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CategoryMenu;