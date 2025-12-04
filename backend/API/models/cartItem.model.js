import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Cart"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    size:{
        type:String,
        required:true
    },quantity:{
        type:Number,
        required:true,
        default:1
    },
    price:{
        type:Number,//maek this as number
        required:true
    },
    discountedPrice:{
        type:Number,//Make this as number
        required:true
    },
    userId:{
         type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
});
export const CartItem = mongoose.model("CartItem", cartItemSchema)