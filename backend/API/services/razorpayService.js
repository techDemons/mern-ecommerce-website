import Razorpay from "razorpay";
import { findOrderByid } from "./orderService.js"
import { razorpayInstance } from "../config/razorpayConfig.js";

export const razorpayPaymentLink = async (orderId) => {
  console.log(orderId);
  try {
    const order = await findOrderByid(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    const phone = String(order.user.mobile).replace(/\D/g, "").slice(-10);

    const paymentLinkReq = {
      amount: order.totalPrice * 100,
      currency: "INR",
      customer: {
        name: order.user.firstName + " " + order.user.lastName,
        contact: phone,
        email: order.user.email
      },
      notify: {
        sms: true,
        email: true
      },
      reminder_enable: true,

      // Razorpay callback
      callback_method: "get",
      callback_url: `http://localhost:6969/api/payment/update`,

      // 🔥 VERY IMPORTANT
      notes: {
        orderId: orderId
      }
    };

    const paymentLink = await razorpayInstance.paymentLink.create(paymentLinkReq);

    console.log("paymentLink: ", paymentLink);

    return {
      paymentLink_id: paymentLink.id,
      paymentLink_url: paymentLink.short_url
    };

  } catch (error) {
    throw new Error(error.message || "failed in payment link");
  }
};


