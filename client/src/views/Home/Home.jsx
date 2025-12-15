// src/views/Home/Home.jsx
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CategoryMenu from './CategoryMenu.jsx';
import Banner from './Banner.jsx';
import FlashSale from './FlashSale.jsx';
import ProductSection from './ProductSection.jsx';
import TopCategoryTabs from './TopCategoryTabs.jsx';
import QuickLinks from './QuickLinks.jsx';
import NewsSection from './NewsSection.jsx';
import ReviewSection from './ReviewSection.jsx';

// Import ảnh banner bên trái
import adSamsung from '../../assets/image/left-banner-1.png';
import longBanner1 from '../../assets/image/long-banner-1.jpg';
import longBanner2 from '../../assets/image/long-banner-2.jpg';
import longBanner3 from '../../assets/image/long-banner-3.png';
import longBanner4 from '../../assets/image/long-banner-4.png';
import longBanner5 from '../../assets/image/long-banner-5.png';
import longBanner6 from '../../assets/image/long-banner-6.png';
import bgGalaxy from '../../assets/image/background-galaxy.jpg';

function Home() {
  return (
    <div 
      className="min-h-screen w-full font-sans overflow-x-hidden flex justify-center" 
      style={{
        backgroundImage: `url(${bgGalaxy})`,
        backgroundSize: 'cover',             
        backgroundPosition: 'center top',    
        backgroundAttachment: 'fixed',       
        backgroundColor: '#111', 
        paddingBottom: '20px'
      }}
    >
      
      {/* --- KHỐI BAO NGOÀI (THE BOX) --- */}
      <div className="
          relative z-10 
          bg-[#f4f6f8]              
          w-[98%] max-w-[1400px]    
          rounded-xl                
          shadow-[0_0_50px_rgba(0,0,0,0.8)] 
          overflow-hidden           
          flex flex-col
      ">
        
        
        {/* BODY TRANG WEB */}
        <div className="flex-1 w-full max-w-[1350px] mx-auto pt-4 px-3 lg:px-4 pb-8">
          
          {/* === PHẦN 1: MENU + BANNER + SẢN PHẨM (CHIA 2 CỘT) === */}
          <div className="flex gap-4">
              
              {/* CỘT TRÁI: Menu + Banner Dọc */}
              {/* Banner dọc sẽ kết thúc tại đây, không chạy xuống phần tin tức */}
              <div className="hidden lg:flex flex-col gap-4 w-[230px] flex-shrink-0">
                  <CategoryMenu />
                  
                  {/* Các Banner Dọc */}
                  <div className="flex flex-col space-y-4 w-full sticky top-20">
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={adSamsung} alt="QC" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner1} alt="B1" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner2} alt="B2" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner3} alt="B3" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all curs or-pointer">
                          <img src={longBanner4} alt="B3" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner5} alt="B3" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner6} alt="B3" className="w-full h-auto object-cover block"/>
                      </div>
                      <div className="w-full rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer">
                          <img src={longBanner6} alt="B3" className="w-full h-auto object-cover block"/>
                      </div>
                      {/* Thêm bớt banner ở đây tùy độ dài sản phẩm bên phải */}
                  </div>

              </div>

              {/* CỘT PHẢI: Banner Slide + Sản Phẩm */}
              <div className="flex-1 min-w-0">
                  <Banner />
                  <div className="mt-4"><TopCategoryTabs /></div>
                  <FlashSale />
                  
                  {/* DANH SÁCH SẢN PHẨM (Theo đúng ID Category) */}
                  {/* 16: Điện thoại */}
                  <ProductSection title="Điện thoại nổi bật" categoryId={16} />
                  
                  {/* 18: Tablet */}
                  <ProductSection title="Tablet nổi bật" categoryId={18} />
                  
                  {/* 17: Laptop */}
                  <ProductSection title="Laptop nổi bật" categoryId={17} />
                  
                  <ProductSection title="Âm thanh - Tai nghe" categoryId={1} />
                  
                  <ProductSection title="Loa - Âm thanh" categoryId={19} />
              </div>
          </div>

          <div className="mt-8">
              
              <QuickLinks />
              <ReviewSection />
              <NewsSection />
          
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;