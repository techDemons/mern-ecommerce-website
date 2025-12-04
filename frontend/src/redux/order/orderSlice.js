import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrderApi, getOrderByIdApi } from "./orderApi";

export const createOrder = createAsyncThunk(
  "/order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      return await createOrderApi(orderData);
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
export const getOrderById =createAsyncThunk(
    "order/getOrder",
    async(orderId, {rejectWithValue})=>{
        try {
            return await getOrderByIdApi(orderId)
        } catch (error) {
            return rejectWithValue(error.response?.data?.message||error.message)
        }
    }
)
const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // CREATE ORDER
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.order = null; // clear previous order
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // the newly created order
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ORDER BY ID
      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // fetched order
      })

      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;  // ❌ fixed, used to set order = error
      });
  },
});

export default orderSlice.reducer;
