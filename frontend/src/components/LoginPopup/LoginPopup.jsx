import { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext)
    const [currState, setCurrState] = useState("Đăng nhập") //UseState cho form (có 2 dạng: đăng ký và đăng nhập)
    const [data, setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data, [name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if (currState === "Đăng nhập"){
          newUrl += "/api/user/login"
        }else{
          newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          setShowLogin(false)
        }else{
          alert(response.data.message)
        }
    }
  return (
    <div className = 'login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" /> {/* Ấn vào để tắt cửa sổ login*/}
        </div>
        <div className="login-popup-inputs">
          {currState==='Đăng nhập'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Họ và tên' required />} {/* Họ và tên chỉ dành cho đăng ký*/}
          <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Địa chỉ email' required />
          <input name='password' type="password" onChange={onChangeHandler} value={data.password} placeholder='Mật khẩu' required />
        </div>
        <button type='submit'>{currState==='Đăng ký'?"Tạo tài khoản":"Đăng nhập"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>Tôi đồng ý với điều khoản sử dụng.</p>
        </div>
        {currState==='Đăng nhập'
        ?<p>Tạo tài khoản mới? <span onClick={()=>setCurrState("Đăng ký")}>Đăng ký ngay!</span></p> /* Chuyển giữa 2 trạng thái của form */
        :<p>Đã có tài khoản? <span onClick={()=>setCurrState("Đăng nhập")}>Đăng nhập.</span></p>
        }
        
        
      </form>
    </div>
  )
}

export default LoginPopup
