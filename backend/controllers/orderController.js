import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//dat lenh nguoi dung cho frontend
const placeOrder = async (req, res) => {


    const frontend_url = "http://localhost:5174"

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})


        const line_items = req.body.items.map((item) => ({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Phí giao hàng"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        if(!session.url) console.log("loi do day na!")

        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const verifyOrder = async (req, res) => {
    const {orderorderId, success} = req.body;
    try{
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            req.json({success:true, message:"Đã thanh toán."})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Chưa thanh toán!"})
        }
    }catch (error){
        console.log(error)
        res.json({success:false, message:"Error"})
    }
}

//backend cho danh sach order 
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success: true, data: orders})
    }catch(error){
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// liệt kê đơn hàng cho bảng quản trị
const listOrders = async(req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// api để cập nhật trạng thái đơn hàng
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status});
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export{placeOrder, verifyOrder, userOrders, listOrders, updateStatus}