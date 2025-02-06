import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import './Navbar.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {
    
    const [menu, setMenu] = useState("home");
    const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
    

    const navigate = useNavigate();
    const location = useLocation();
    const logout = ()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }
    useEffect(() => {
      // Chỉ cập nhật khi đường dẫn thay đổi
      const currentPath = location.pathname.slice(1); 
      setMenu(currentPath || "home"); 
    }, [location]); 

    const goTo = (path) => {
      navigate(`/${path}`); // Điều hướng 
      setMenu(path);
    };
    
  return (
    <>
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo"></img></Link>
      <ul className="navbar-menu">
        <li onClick={()=>goTo("")} className={menu==="home"?"active":""}>Trang chủ</li>
        <li onClick={()=>goTo("menu")} className={menu==="menu"?"active":""}>Thực đơn</li>
        <li onClick={()=>goTo("about-us")} className={menu==="about-us"?"active":""}>Thông tin</li>
      </ul>
      <div className="navbar-right">
        
        <div className="navbar-search-icon"> {/* Nút tìm kiếm */}
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link> {/* Nút để click vào giỏ hàng */}
            <div className={getTotalCartAmount()===0?"":"dot"}></div>{/* chấm đỏ nếu có đồ trong giỏ */}
        </div>
        {!token? <button onClick={()=>setShowLogin(true)}>Đăng nhập</button>
              : <div className='navbar-profile'>
                  <img src={assets.profile_icon} alt=""/>
                  <ul className="nav-profile-dropdown">
                    <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Đơn hàng</p></li>
                    <hr />
                    <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Đăng xuất</p></li>
                  </ul>
                </div>}        
      </div>
    </div>
    <hr />
    </>
  )
}

export default Navbar
