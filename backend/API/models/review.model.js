import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now(),
    }
});

export const review = mongoose.model("Review", reviewSchema);