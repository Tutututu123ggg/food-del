import { useContext, useState, useEffect } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {

  const { getTotalCartAmount, shippingFee, discount, calculateFinalTotal, formatCurrency, token, food_list, cartItems, url } = useContext(StoreContext);
 
  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount()+2
    }
    let response = await axios.post(url + "/api/order/place", orderData, {headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    }else{
      alert("Co loi khi hien thi don hang")
    }
  }

  const navigate = useNavigate();

  useEffect(() =>{
    if(!token){
      navigate('/cart')
      alert("Xin hãy đăng nhập để đặt hàng!")
    }
    else if(getTotalCartAmount() ===0 ){
      navigate('/cart')
      alert("Xin hãy chọn sản phẩm để đặt hàng!")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Thông tin giao hàng</p>
        <div className="multi-fields">
          <input required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='Họ'/>
          <input required name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Tên'/>
        </div>
        <input required name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Địa chỉ'/>
        <input required name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Số điện thoại'/>
        <input required name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Ghi chú'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
                    <h2>Tổng giá trị giỏ hàng</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng đơn giá</p>
                            <p>{formatCurrency(getTotalCartAmount())}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Phí vận chuyển</p>
                            <p>{formatCurrency(shippingFee)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Khuyến mãi</p>
                            <p>- {formatCurrency(discount)}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Thành tiền</b>
                            <b>{formatCurrency(calculateFinalTotal())}</b>
                        </div>
                    </div>        
                    <button type="submit">XÁC NHẬN ĐẶT HÀNG</button>          
                </div>
      </div>
    </form>
  )
}

export default PlaceOrder
