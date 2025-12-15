
import news1 from '../../assets/image/news-1.jpg';
import news2 from '../../assets/image/news-2.jpg';
import news3 from '../../assets/image/news-3.jpg';
import news4 from '../../assets/image/news-4.jpg';

export default function NewsSection() {
  const news = [
    { id: 1, title: "4 máy hút bụi cầm tay mạnh mẽ nhất trong tầm giá...", image: news1 },
    { id: 2, title: "Điện thoại Samsung nào sẽ được cập nhật One UI 8.5?", image: news2 },
    { id: 3, title: "Robot hút bụi tự giặt giẻ có đáng mua?", image: news3 },
    { id: 4, title: "Cách sử dụng Quicksnap trên Instagram đơn giản", image: news4 }
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm p-4 mt-4 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 uppercase">Tin Tức Công Nghệ</h2>
        <a href="#" className="text-sm text-gray-500 hover:text-[#d70018] font-medium">Xem tất cả &gt;</a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {news.map((item) => (
          <a key={item.id} href="#" className="group flex flex-col gap-2">
            <div className="overflow-hidden rounded-lg">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-sm font-medium text-gray-800 line-clamp-3 group-hover:text-[#d70018]">
              {item.title}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
}