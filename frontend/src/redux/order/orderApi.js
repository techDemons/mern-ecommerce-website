import { api, API_BASE_URL } from "../../api_config/api"


export const createAddressApi = async(addressData) => {
    console.log("createAddressAPi: ",addressData)
  const { data } = await api.post(`/api/address/createAddress`, addressData);
  return data;
};
export const createOrderApi = async (orderData) => {
  try {
    const { data } = await api.post(`/api/order/createOrder`, {
      shipAddress: orderData.address,
    });

    console.log("Order Response:", data);

    if (data.id) {
      orderData.navigate({
        search: `step=3&order_id=${data.id}`
      });
    }

    return data;

  } catch (error) {
    console.log("Order API Error:", error.message);
    throw error;
  }
};


export const getOrderByIdApi = async(orderId)=>{
    const {data} = await api.get(`/api/order/findOrder/${orderId}`);
    console.log('Order by id: ', data);
    return data;
}