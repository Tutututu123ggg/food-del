import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate('/menu'); // Điều hướng đến trang "Thực đơn"
  };

  return (
    <header className="header">
      <div className="header-contents">
        <h2>Đặt hàng ngay tại đây!</h2>
        <p>
          Chào mừng đến với ĐÓI, nơi bạn sẽ khám phá những món ăn Việt tươi mới,
          đậm đà và đầy hương vị. Chúng tôi tự hào mang đến những món ăn không chỉ
          ngon mà còn chứa đựng sự tinh túy và đam mê của văn hóa ẩm thực Việt Nam.
        </p>
        <button onClick={goToMenu}>Xem Menu</button>
      </div>
    </header>
  );
};

export default Header
