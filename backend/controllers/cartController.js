import userModel from "../models/userModel.js";

// Thêm item vào user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
    }else{ 
        cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Thêm thành công 1 sản phẩm vào giỏ hàng " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Xóa item khỏi user cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, {cartData});
    res.json({ success: true, message: "Xóa thành công 1 sản phẩm từ giỏ hàng" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Lấy dữ liệu cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Error khi load trạng thái giỏ hàng' });
  }
};

export { addToCart, removeFromCart, getCart};
