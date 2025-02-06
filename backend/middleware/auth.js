import jwt from "jsonwebtoken"

const authMiddleware = async (req, resizeBy, next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false, message: "Có lỗi khi khôi phục trạng thái giỏ hàng!"})
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }

}

export default authMiddleware;