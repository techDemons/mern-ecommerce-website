import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItem:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"OrderItem"
    }],
    orderDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    deliveryDate:{
        type:Date,
    },
    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address"
    },paymentDetail:{
        paymentMethods:{
            type:String,
        },
        transactionId:{
            type:String
        },
        paymentId:{
            type:String
        },
        paymentStatus:{
            type:String,
            default:"PENDING"
        }
    },
    totalPrice:{
        type:Number,
        required:true
    },
    totalDiscountedPrice:{
        type:Number,
        required:true
    },
    totalItem:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Number,
        required:true,
        default:Date.now()
    }

});
export const Order = mongoose.model("Order", orderSchema);