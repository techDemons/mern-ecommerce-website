import { razorpayInstance } from "../config/razorpayConfig.js";
import { findOrderByid } from "../services/orderService.js";
import { razorpayPaymentLink } from "../services/razorpayService.js";

export const razorpayPaymentController = async (req, res) => {
  try {
    const orderId = req.params.id;
    console.log("orderId: ", orderId);
    const order = await razorpayPaymentLink(orderId);
    console.log(order);
    if (!order || !orderId) {
      return res.status(401).json({
        success: false,
        message: "order or orderId is not found",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Payment link created",
      order,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message || "Failure in razor controller",
    });
  }
};

export const updatePaymentInfoController = async (req, res) => {
  try {
    const paymentId = req.query.razorpay_payment_id;

    console.log("paymentId:", paymentId);
    
    if (!paymentId ) {
      return res.status(400).json({
        success: false,
        message: "Missing paymentId ",
      });
    }
    
    // Fetch actual payment details from Razorpay
    const payment = await razorpayInstance.payments.fetch(paymentId);
    const orderId = payment.notes.orderId;
    console.log("orderId:", orderId);
    if (!orderId ) {
      return res.status(400).json({
        success: false,
        message: "Missing orderId ",
      });
    }
    const order = await findOrderByid(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (payment.status === "captured") {
      order.paymentDetail.paymentId = paymentId;
      order.paymentDetail.paymentStatus = "COMPLETED";
      await order.save();
    }

     return res.redirect(`http://localhost:5173/paymentSuccess/${orderId}`);
    // return res.json({
    //   success: true,
    //   message: "Payment successful, order placed",
    //   payment,
    // });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update payment",
    });
  }
};
