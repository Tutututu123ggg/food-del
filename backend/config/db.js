//logic kết nối CSDL

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lam20a3k23:K1zkfXrucqoMPHGc@lamtong.jipvl.mongodb.net/food-del').then(()=>console.log("DB connectedconnected"));
}