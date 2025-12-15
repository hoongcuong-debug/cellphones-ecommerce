
import student1 from '../../assets/image/student-1.jpg';
import student2 from '../../assets/image/student-2.jpg';
import student3 from '../../assets/image/student-3.jpg';
import student4 from '../../assets/image/student-4.jpg';

import payment1 from '../../assets/image/payment-1.jpg';
import payment2 from '../../assets/image/payment-2.jpg';
import payment3 from '../../assets/image/payment-3.jpg';
import payment4 from '../../assets/image/payment-4.jpg';

import brandApple from '../../assets/image/brand-apple.jpg';
import brandSamsung from '../../assets/image/brand-samsung.jpg';
import brandXiaomi from '../../assets/image/brand-xiaomi.jpg';
import brandAsus from '../../assets/image/brand-asus.jpg';

export default function QuickLinks() {
  return (
    <div className="my-6 space-y-6">
      

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-center mb-4 uppercase text-gray-800">
            ƯU ĐÃI SINH VIÊN
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="hover:opacity-90 transition"><img src={student1} alt="Sv1" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={student2} alt="Sv2" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={student3} alt="Sv3" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={student4} alt="Sv4" className="w-full rounded-lg"/></a>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-xl font-bold text-center mb-4 uppercase text-gray-800">
            ƯU ĐÃI THANH TOÁN
          </h2>
          <div className="grid grid-cols-2 gap-2">
            <a href="#" className="hover:opacity-90 transition"><img src={payment1} alt="Pay1" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={payment2} alt="Pay2" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={payment3} alt="Pay3" className="w-full rounded-lg"/></a>
            <a href="#" className="hover:opacity-90 transition"><img src={payment4} alt="Pay4" className="w-full rounded-lg"/></a>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-xl font-bold mb-4 uppercase text-gray-800">
          CHUYÊN TRANG THƯƠNG HIỆU
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="#" className="hover:scale-105 transition"><img src={brandApple} alt="Apple" className="w-full rounded-lg shadow-sm"/></a>
          <a href="#" className="hover:scale-105 transition"><img src={brandSamsung} alt="Samsung" className="w-full rounded-lg shadow-sm"/></a>
          <a href="#" className="hover:scale-105 transition"><img src={brandXiaomi} alt="Xiaomi" className="w-full rounded-lg shadow-sm"/></a>
          <a href="#" className="hover:scale-105 transition"><img src={brandAsus} alt="Asus" className="w-full rounded-lg shadow-sm"/></a>
        </div>
      </div>

    </div>
  );
}