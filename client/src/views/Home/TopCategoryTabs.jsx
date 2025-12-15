// src/views/Home/TopCategoryTabs.jsx
import { useState } from 'react';
import samsungLogo from '../../assets/image/brand-samsung.png';
import realmeLogo from '../../assets/image/brand-realme.png';

const TopCategoryTabs = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'Tất cả' },
    { 
      id: 'apple', 
      name: 'Apple', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' 
    },
    { 
      id: 'samsung', 
      name: 'Samsung', 
      img: samsungLogo
    },
    { 
      id: 'xiaomi', 
      name: 'Xiaomi', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Xiaomi_logo_%282021-%29.svg' 
    },
    { 
      id: 'oppo', 
      name: 'OPPO', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/OPPO_Logo.svg' 
    },
    { 
      id: 'vivo', 
      name: 'Vivo', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Vivo_mobile_logo.png' 
    },
    {
      id: 'realme',
      name: 'Realme',
      img: realmeLogo 
    },
    { 
      id: 'asus', 
      name: 'ASUS', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' 
    },
    { 
      id: 'nokia', 
      name: 'Nokia', 
      img: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Nokia_wordmark.svg' 
    }
  ];

  return (
    <div className="mb-6 mt-2"> {/* Tăng khoảng cách margin một chút */}
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveTab(category.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 whitespace-nowrap min-h-[40px]
              ${
                activeTab === category.id
                  ? 'bg-red-50 border-[#d70018] text-[#d70018] font-bold shadow-md' 
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:text-black font-medium shadow-sm'
              }
            `}
          >
            {category.img && (
              // Tăng kích thước khung chứa logo từ w-5 h-5 lên w-6 h-6
              <div className="w-6 h-6 flex items-center justify-center">
                <img 
                  src={category.img} 
                  alt={category.name} 
                  // Bỏ grayscale để hiện đúng màu thương hiệu (Samsung xanh, Realme vàng)
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
            )}
            
            {/* Tăng cỡ chữ lên text-sm */}
            <span className="text-sm">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryTabs;