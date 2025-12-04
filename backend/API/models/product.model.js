import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        // required:true
    },
    discountedPercent:{
        type:Number
    },
    brand:{
        type:String
    },
    quantity:{
        type:Number,
        required:true
    },
    color:{
        type:String
    },
    imageUrl:{
        type:String,

    },size:[{
        name:{type:String},
        quantity:{type:Number}
    }],
    ratings:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Rating"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    numRating:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
export const product = mongoose.model("Product", productSchema);