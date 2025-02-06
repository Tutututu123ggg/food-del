import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    // Kiểm tra xem có file được upload hay không
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // Lấy tên file ảnh
    let image_filename = `${req.file.filename}`;

    // Tạo food item mới
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Thêm thành công!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Có lỗi xảy ra khi thêm!" });
    }
};

// food list
const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// remove food
const removeFood = async(req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Xóa thành công"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Xóa không thành công"})
    }
}

export { addFood, listFood, removeFood};
