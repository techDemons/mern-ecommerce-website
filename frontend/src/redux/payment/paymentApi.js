import { api } from "../../api_config/api"

export const createPaymentApi = async (orderId) => {
  try {
    const res = await api.post(`/api/payment/pay/${orderId}`);

    const  paymentLink_url  = res?.data?.order?.paymentLink_url;
console.log(res.data)
    if (paymentLink_url) {
      window.location.href = paymentLink_url;
    }

    return res.data;  // <-- return only the data
  } catch (error) {
    console.log(error.message || "API error in createPaymentApi");
    throw error;
  }
};
export const updatePaymentApi=async(data)=>{
    try {
        console.log(data)
        const res = await api.get(`api/payment/pay?payment_id=${data.paymentId}&&order_id=${orderId}`);
        console.log(res);
        return res
    } catch (error) {
        console.log(error.message||"Api calling failed while creating payment")

    }
}