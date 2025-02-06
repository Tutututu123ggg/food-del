import { createContext, useState, useEffect } from "react";
import axios from 'axios';


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({}); // Giỏ hàng
    const [promoCode, setPromoCode] = useState(""); // Mã giảm giá
    const [discount, setDiscount] = useState(0); // Giảm giá
    const [shippingFee, setShippingFee] = useState(15000); // Phí vận chuyển
    const [thongDiepGiamGia, setThongDiepGiamGia] = useState("Chưa áp dụng mã giảm giá.");
    const [isPromoApplied, setIsPromoApplied] = useState(false); // Trạng thái kiểm tra mã giảm giá đã áp dụng hay chưa
    const url = "https://food-del-backend-ld6b.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])

    //load danh sach food tu db
    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    //load cart tu db
    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    }
    // Thêm sản phẩm vào giỏ
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    };

    // Cập nhật số lượng sản phẩm trong giỏ
    const updateCartQuantity = (itemId, quantity) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: quantity > 0 ? quantity : 0,
        }));
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemId] > 1) {
                updatedCart[itemId] -= 1;
            } else {
                delete updatedCart[itemId]; // Xóa sản phẩm khi số lượng = 0
            }
            return updatedCart;
        });
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    };

    // Tính tổng giá trị giỏ hàng
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo && typeof itemInfo.price === 'number') {
                    totalAmount += itemInfo.price * cartItems[item];  // Tổng giá của sản phẩm
                } else {
                    console.warn(`Sản phẩm với ID ${item} không hợp lệ hoặc thiếu thông tin giá`);
                }
            }
        }
        return totalAmount;
    };
    
    
    // Format tiền tệ
    const formatCurrency = (number) => {
        return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(number);
    };

    // Xử lý mã giảm giá
    const handlePromoCode = () => {
        const totalAmount = getTotalCartAmount();
        if (totalAmount > 0) {
            if (promoCode === "freeship") {
                setDiscount(shippingFee);
                setThongDiepGiamGia("Áp dụng mã miễn phí vận chuyển thành công!");
                setIsPromoApplied(true);
            } else if (promoCode === "giamgia") {
                setDiscount(totalAmount * 0.1);  // Giảm giá 10%
                setThongDiepGiamGia("Áp dụng mã giảm giá 10% thành công!");
                setIsPromoApplied(true);
            } else {
                setDiscount(0);
                setThongDiepGiamGia("Mã giảm giá không hợp lệ!");
                setIsPromoApplied(false);
            }
        } else {
            setDiscount(0);
        }
    };
    
     // Tính discount và finalTotal
    const calculateFinalTotal = () => {
        const totalAmount = getTotalCartAmount();
        const discountedTotal = totalAmount - discount;
        const finalTotal = discountedTotal + shippingFee;
        return finalTotal;
    };

    // Cập nhật phí vận chuyển khi giỏ hàng thay đổi
    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            setShippingFee(0);
        } else {
            setShippingFee(15000);
        }
        if (isPromoApplied) {
            handlePromoCode();
        }
    }, [cartItems, getTotalCartAmount(), isPromoApplied]);

    //keep the token khi người dùng bấm reload page
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();     
    }, [])

    useEffect(() => {
        console.log("Danh sách món ăn:", food_list);
    }, [food_list]);
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        formatCurrency,
        updateCartQuantity,
        promoCode,
        setPromoCode,
        discount,
        shippingFee,
        thongDiepGiamGia,
        isPromoApplied,
        handlePromoCode,
        calculateFinalTotal,
        url,
        token,
        setToken
    };

    return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
