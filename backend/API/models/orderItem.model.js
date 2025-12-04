import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    size:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },price:{
        type:Number,
        required:true
    },discountedPrice:{
        type:Number,
        required:true
    },userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    

});
export const orderItem = mongoose.model("OrderItem", orderItemSchema)