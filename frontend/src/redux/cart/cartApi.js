import { api } from "../../api_config/api";

export const addItemToCartApi = async (reqData) => {
    const { data } = await api.put(`/api/cart/addItemToCart`, reqData);
    console.log("API addItemCart:", data);
    return data.userCart; // ✅ return ONLY userCart
};

export const removeCartItemApi = async (reqData) => {
    const { data } = await api.delete(`/api/cartItem/remove/${reqData.cartItemId}`);
    console.log("API removeCartItem:", data);
    return data.userCart; // ✅ backend should return updated cart
};

export const updateCartItemApi = async (reqData) => {
    const { data } = await api.put(
        `/api/cartItem/update/${reqData.cartItemId}`,
        { quantity: reqData.quantity }
    );
    console.log("API update:", data);
    return data.userCart; // consistent return
};

export const getCartApi = async () => {
    const { data } = await api.get(`/api/cart/findUserCart`);
    console.log("API getCart:", data);
    return data.userCart; // return EXACT userCart
};
