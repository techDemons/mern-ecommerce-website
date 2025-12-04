import { User } from "../models/user.model.js";
import {createOrder, findOrderByid} from "../services/orderService.js"



const createOrderController = async (req, res) => {
  try {
    const userId = req.user._id;
    const shippingAddress = req.body.shipAddress || req.body.shippingAddress;

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Shipping address is required",
      });
    }

    const userDoc = await User.findById(userId);
    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const order = await createOrder(userDoc, shippingAddress);
    console.log("order: ",order);

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.log("Order Creation Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create order",
    });
  }
};


const findOrderId = async(req,res)=>{
    // const user = await req.user;
    const orderId = req.params.orderId;
    try {
        
        const createdOrder = await findOrderByid(orderId);
        if(!createdOrder){
          return res.status(404).json({
            success:false,
            message:"Order id is not found"
          })
        }
        return res.status(201).json({
            success:true,
            message:"Order created",
            createdOrder
        })
    } catch (error) {
        return res.status(401).json({
                success:false,
                message:"Failure in finding the order"
            })
    }
}
export {createOrderController, findOrderId}