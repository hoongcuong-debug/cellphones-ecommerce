const categories = [
  { icon: Smartphone, name: 'Điện thoại' },
  { icon: Laptop, name: 'Laptop' },
  { icon: Tablet, name: 'Tablet' },
  { icon: Watch, name: 'Đồng hồ' },
  { icon: Headphones, name: 'Âm thanh' },
  { icon: Cable, name: 'Phụ kiện' },
  // Bạn có thể thêm các mục khác vào đây cho giống ảnh
]

export default function HorizontalCategoryMenu() {
  return (
    <section className="bg-white rounded-lg shadow-md p-4 mb-6">
      
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((cat, index) => (
          <button 
            key={index} 
            className="flex flex-col items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 transition text-center"
          >
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <cat.icon size={24} className="text-gray-700" />
            </div>
            <span className="text-xs font-medium text-gray-800">{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  )
}