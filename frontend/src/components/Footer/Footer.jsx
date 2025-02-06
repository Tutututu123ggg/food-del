import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Ghé thăm chúng tôi tại nhiều nền tảng khác!</p>
                <div className="footer-social-icons">
                    <img onClick={() => (window.location.href = "https://www.facebook.com/profile.php?id=100022039236307")} src={assets.facebook_icon} alt="" />
                    <img onClick={() => (window.location.href = "https://x.com/Lionhea26271682")} src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Thông tin sinh viên</h2>
                <ul>
                    <li>Đỗ Đức Tú</li>
                    <li>MSSV: 20225106</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>Liên hệ</h2>
                <ul>
                    <li>+84 942769836</li>
                    <li>ductu3003@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">Bản quyền thuộc về bất kì ai được gửi project này :D</p>
    </div>
  )
}

export default Footer
