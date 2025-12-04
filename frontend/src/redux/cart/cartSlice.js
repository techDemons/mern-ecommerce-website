import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addItemToCartApi, getCartApi, removeCartItemApi, updateCartItemApi } from "./cartApi";

export const getCart = createAsyncThunk(
    "cart/getCart",
    async (_, { rejectWithValue }) => {
        try {
            const userCart = await getCartApi();
            return userCart;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to load cart");
        }
    }
);

export const addItemToCart = createAsyncThunk(
    "cart/addItem",
    async (reqData, { rejectWithValue }) => {
        try {
            const userCart = await addItemToCartApi(reqData);
            return userCart;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateCart = createAsyncThunk(
    "cart/updateItem",
    async (reqData, { rejectWithValue }) => {
        try {
            const userCart = await updateCartItemApi(reqData);
            return userCart;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    "cart/removeItem",
    async (reqData, { rejectWithValue }) => {
        try {
            const userCart = await removeCartItemApi(reqData);
            return userCart;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


const initialState = {
    cart: null,       // backend full userCart object
    cartItems: [],    // shortcut for UI
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        const setPending = (state) => {
            state.loading = true;
            state.error = null;
        };

        const setRejected = (state, action) => {
            state.loading = false;
            state.error = action.payload;
        };

        const setFulfilled = (state, action) => {
            state.loading = false;
            state.cart = action.payload || null;
            state.cartItems = action.payload?.cartItems || [];
        };

        builder
            .addCase(getCart.pending, setPending)
            .addCase(getCart.fulfilled, setFulfilled)
            .addCase(getCart.rejected, setRejected)

            .addCase(addItemToCart.pending, setPending)
            .addCase(addItemToCart.fulfilled, setFulfilled)
            .addCase(addItemToCart.rejected, setRejected)

            .addCase(updateCart.pending, setPending)
            .addCase(updateCart.fulfilled, setFulfilled)
            .addCase(updateCart.rejected, setRejected)

            .addCase(removeCartItem.pending, setPending)
            .addCase(removeCartItem.fulfilled, setFulfilled)
            .addCase(removeCartItem.rejected, setRejected);
    },
});

export default cartSlice.reducer;
