import express from "express";
import multer from "multer";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";

const foodRouter = express.Router();

// Cấu hình multer
const storage = multer.diskStorage({
    destination: "uploads",  // Thư mục lưu trữ file
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Thêm food item mới với file image
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood)
foodRouter.post("/remove", removeFood)




export default foodRouter;
