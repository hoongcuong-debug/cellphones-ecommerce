import Header from '../../components/Header.jsx';  // Đi lùi 2 cấp thư mục để tìm components
import Footer from '../../components/Footer.jsx';
import Home from './Home/Home.jsx';                // Home nằm ngay trong folder Home cùng cấp
import Cart from './Cart/Cart.jsx';

function App() {
  console.log('App mounted (debug)');
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Thanh Header */}
      <Header />

      {/* Phần nội dung chính (Home) */}
      <main className="flex-1">
        <Home />
      </main>

      {/* Thanh Footer */}
      <Footer />
    </div>
  );
}

export default App;