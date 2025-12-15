// src/views/Home/ReviewSection.jsx
import { useState } from 'react';
import { Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const reviews = [
  {
    id: 1,
    videoId: "um1LBitMFWQ", 
    title: "OPPO Find X9 vs Find X8: Top lý do đáng nâng cấp ngay!",
    productName: "OPPO Find X9 12GB 256GB",
    price: "22.990.000đ",
    productImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:128:128/q:90/plain/https://cellphones.com.vn/media/catalog/product/x/9/x9.jpg"
  },
  {
    id: 2,
     
    title: "Top lý do đáng sở hữu MacBook Pro M5",
    productName: "MacBook Pro 14 M5 16GB 512GB",
    price: "41.990.000đ",
    productImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:128:128/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_13.png"
  },
  {
    id: 3,
    videoId: "czylbc82AuE",
    title: "Apple Watch Ultra 3 và top lý do đáng sở hữu ngay!!",
    productName: "Apple Watch Ultra 3 49mm (5G)",
    price: "23.490.000đ",
    productImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:128:128/q:90/plain/https://cellphones.com.vn/media/catalog/product/a/p/apple_lte_3_37.png"
  },
  {
    id: 4,
    videoId: "zRYauQkAv6E",
    title: "iPad Pro M5 - Top các lý do nên nâng cấp ngay!!",
    productName: "iPad Pro 11 M5 Wifi 256GB",
    price: "29.990.000đ",
    productImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:128:128/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-pro-m5.jpg"
  },
  {
    id: 5,
    videoId: "EHBQtixhATM",
    title: "Test hiệu năng Poco F8 Pro: Chiến game căng đét!!",
    productName: "Poco F8 Pro 5G 12GB 256GB",
    price: "11.990.000đ",
    productImg: "https://cdn2.cellphones.com.vn/insecure/rs:fill:128:128/q:90/plain/https://cellphones.com.vn/media/catalog/product/p/o/poco-f6-pro-black_1.jpg"
  }
];

const VideoItem = ({ data }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://i.ytimg.com/vi/${data.videoId}/hqdefault.jpg`;

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col h-full">

            <div 
                className="relative w-full aspect-[9/16] bg-black cursor-pointer group"
                onClick={() => setIsPlaying(true)} // Sự kiện BẤM ĐỂ CHẠY
            >
                {!isPlaying ? (
                    <>
                        <img 
                            src={thumbnailUrl} 
                            alt={data.title} 
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="bg-red-600/90 text-white p-3 rounded-full shadow-lg transform group-hover:scale-110 transition-transform backdrop-blur-sm">
                                <Play size={28} fill="currentColor" className="ml-1" />
                             </div>
                        </div>
                        <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/60 to-transparent">
                            <p className="text-white text-xs font-bold line-clamp-2 drop-shadow-md">{data.title}</p>
                        </div>
                        <div className="absolute bottom-2 right-2">
                             <div className="bg-black/60 text-white text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                                <Play size={8} fill="currentColor"/> Shorts
                             </div>
                        </div>
                    </>
                ) : (
                    <iframe 
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={data.title}
                        frameBorder="0"
                        loading="lazy" // Tải chậm để không lag
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            {/* --- THÔNG TIN SẢN PHẨM --- */}
            <Link to="#" className="flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors mt-auto border-t border-gray-100">
                <div className="w-10 h-10 flex-shrink-0 border border-gray-200 rounded overflow-hidden bg-white p-0.5">
                    <img src={data.productImg} alt={data.productName} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col min-w-0">
                    <h3 className="text-[11px] font-bold text-gray-800 line-clamp-1 hover:text-[#d70018]">{data.productName}</h3>
                    <p className="text-[#d70018] text-[11px] font-bold">{data.price}</p>
                </div>
            </Link>
        </div>
    );
};

export default function ReviewSection() {
  return (
    <section className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase text-gray-800 flex items-center gap-2">
            REVIEW SẢN PHẨM <span className="text-red-500 text-xs animate-pulse">● REC</span>
        </h2>
        <a href="https://www.youtube.com/@CellphoneSOfficial" target="_blank" rel="noreferrer" className="text-sm text-gray-500 hover:text-[#d70018] flex items-center gap-1 font-medium transition">
          Xem kênh Youtube <ChevronRight size={16} />
        </a>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {reviews.map((item) => (
            <VideoItem key={item.id} data={item} />
        ))}
      </div>
    </section>
  );
}