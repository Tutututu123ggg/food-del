import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const {
        cartItems,
        food_list,
        removeFromCart,
        getTotalCartAmount,
        formatCurrency,
        promoCode,
        setPromoCode,
        discount,
        shippingFee,
        thongDiepGiamGia,
        isPromoApplied,
        handlePromoCode,
        url
    } = useContext(StoreContext);

    const navigate = useNavigate();

    const totalAmount = getTotalCartAmount();
    const discountedTotal = totalAmount - discount;
    const finalTotal = discountedTotal + shippingFee;

    return (
        <>
            <div className='cart'>
                <h1>Giỏ hàng của bạn</h1>
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Sản phẩm</p>
                        <p>Tên sản phẩm</p>
                        <p>Giá</p>
                        <p>Số lượng</p>
                        <p>Tổng cộng</p>
                        <p></p>
                    </div>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div className="cart-items-title cart-items-item" key={item._id}>
                                <img src={url + "/images/" + item.image} alt="" className="item-img"/>
                                <p>{item.name}</p>
                                <p className='price'>{formatCurrency(item.price)}</p>
                                <p>{cartItems[item._id]}</p>
                                <p className='price'>{formatCurrency(item.price * cartItems[item._id])}</p>
                                <p onClick={() => removeFromCart(item._id)} className='cross-symbol'>×</p>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Tổng giá trị giỏ hàng</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Tổng đơn giá</p>
                            <p>{formatCurrency(totalAmount)}</p>
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
                            <b>{formatCurrency(finalTotal)}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/order')}>XÁC NHẬN ĐẶT HÀNG</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>Nhập mã giảm giá (nếu có)</p>
                        <div className="cart-promocode-input">
                            <input 
                                type="text" 
                                maxLength="36" 
                                placeholder="Nhập mã" 
                                value={promoCode} 
                                onChange={(e) => setPromoCode(e.target.value)} 
                            />
                            <button onClick={handlePromoCode}>Xác nhận</button>
                        </div>
                        <p className='thong-diep'>{thongDiepGiamGia}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
