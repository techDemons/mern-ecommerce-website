import { configureStore } from "@reduxjs/toolkit";



import authReducer from "./slices/slice.js"
import productReducer from "./product/productSlice.js"
import cartReducer from "./cart/cartSlice.js"
import orderReducer from "./order/orderSlice.js"
import paymentReducer from "./payment/paymentSlice.js"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    order: orderReducer,
    payment:paymentReducer
  },
  devTools:true
});
