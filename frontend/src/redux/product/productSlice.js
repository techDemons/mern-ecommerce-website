import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductAPi, fetchProductByIdApi } from "./productApi";


export const findProducts=createAsyncThunk(
    "product/findProducts",
    async(reqData, {rejectWithValue})=>{
        try{
            return await fetchProductAPi(reqData);
        }catch (error) {
            return rejectWithValue(error.response?.data?.message||error.message);

        }
    }
)
export const findProductById= createAsyncThunk("product/findProductById",
    async(productId, {rejectWithValue})=>{
        try {
            return await fetchProductByIdApi(productId);
        } catch (error) {
            return rejectWithValue(error.response?.data?.message||error.message);
        }
    }
)
const initialState = {
    products:[],
    product:null,
    loading:false,
    error:null

}

const productSlice=createSlice(
    {
        name:"product",
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder
            .addCase(findProducts.pending, (state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(findProducts.fulfilled, (state, action)=>{
                state.loading=false,
                state.products = action.payload;
            })
            .addCase(findProducts.rejected, (state, action)=>{
                state.loading=false,
                state.error=action.payload
            })

            .addCase(findProductById.pending, (state)=>{
                state.loading=true,
                state.error=null
            })
            .addCase(findProductById.fulfilled, (state, action)=>{
                state.loading=false,
                state.product = action.payload
            })
            .addCase(findProductById.rejected, (state, action)=>{
                state.loading=false,
                state.error=action.payload
            })
        }
    }
);
export default productSlice.reducer;