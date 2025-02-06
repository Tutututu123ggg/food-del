import React, { useContext, useState, useEffect } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id, name, price, description, image}) => {

    const {cartItems, addToCart, removeFromCart, updateCartQuantity, formatCurrency, url} = useContext(StoreContext)

    const [quantity, setQuantity] = useState(cartItems[id] || 0);

    useEffect(() => {
        setQuantity(cartItems[id] || 0);
    }, [cartItems, id]);

    const handleInputChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(""); // Cho phép input trống
      return;
    }

    const numberValue = parseInt(value);
    if (numberValue >= 0) {
      setQuantity(numberValue);
      updateCartQuantity(id, numberValue);
    }
  };

  return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt="ko dcdc" />
            {!cartItems[id] //Nếu chưa có ItemCount thì chưa hiện số đếm, hiện dấu (+) nhma màu xanh khi đã có, (-) thì đỏ
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                :<div className="food-item-counter">
                    <img className = 'add-and-minus' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                    <input
                        type="text"
                        className="quantity-input"
                        value={quantity}
                        onChange={handleInputChange}
                    />
                    <img className = 'add-and-minus' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>
            }
        </div>
        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">{description}</p>
            <p className="food-item-price">{formatCurrency(price)}</p>
        </div>
    </div>
  )
}

export default FoodItem
