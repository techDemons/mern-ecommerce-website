import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPaymentApi, updatePaymentApi } from "./paymentApi";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (orderId, { rejectWithValue }) => {
    try {
      const data = await createPaymentApi(orderId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
export const updatePayment = createAsyncThunk(
    "/update/updatPayment",
    async(data, {rejectWithValue})=>{
        try {
            return await updatePaymentApi(data);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message||error.message)
        }
    }
)
const initialState={
    payment:null,
    payments:[],
    error:null,
    loading:false
}


const paymentSlice = createSlice(
   { name:"payment",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payment = action.payload;
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
        .addCase(updatePayment.pending, (state)=>{
            state.loading=false,
            state.error=null
        })
        .addCase(updatePayment.fulfilled, (state, action)=>{
            state.loading=false,
            state.payment=action.payload
        })
        .addCase(updatePayment.rejected, (state, action)=>{
                state.loading=false,
                state.error=action.payload
        })
    }}
);

export default paymentSlice.reducer;