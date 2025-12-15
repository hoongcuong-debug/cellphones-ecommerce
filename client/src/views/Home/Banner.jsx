// src/views/Home/Banner.jsx
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import slide1 from '../../assets/image/slide-1.jpg';
import slide2 from '../../assets/image/slide-2.jpg';
import slide3 from '../../assets/image/slide-3.jpg';

const slides = [
  { id: 1, image: slide1 },
  { id: 2, image: slide2 },
  { id: 3, image: slide3 },
];

export default function Banner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  const prev = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const next = () =>
    setIndex((prev) => (prev + 1) % slides.length);

  return (
    <div className="relative w-full h-[300px] md:h-[350px] lg:h-[380px] rounded-xl overflow-hidden shadow-sm group">
      
      <div 
        className="w-full h-full flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full">
            <img 
              src={slide.image} 
              alt={`Banner ${slide.id}`} 
              className="w-full h-full object-cover" // object-cover giúp ảnh lấp đầy khung mà không bị méo
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}