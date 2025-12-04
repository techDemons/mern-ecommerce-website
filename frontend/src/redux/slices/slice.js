import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserApi, loginApi, registerApi } from "../auth/authApi";

export const registerUser = createAsyncThunk("auth/registerUser",
    async(userData,{rejectWithValue})=>{
        try {
            const user = await registerApi(userData);
            if(user.jwt) localStorage.setItem("jwt",user.jwt);
            return user;

        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const loginUser = createAsyncThunk("auth/loginUser",
    async(userData, {rejectWithValue})=>{
        try{
            const user = await loginApi(userData);
            if(user.jwt) localStorage.setItem("jwt", user.jwt);
            return user;

        }catch(err){
             return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);
export const fetchUser = createAsyncThunk("auth/fetchUser",
    async(_, {rejectWithValue})=>{
        try {
            const user = await getUserApi();
            return user;
        } catch (error) {
            localStorage.removeItem("jwt");
            return rejectWithValue(error.response?.data?.message||error.message);
            
        }
    }
)

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null,
        jwt:localStorage.getItem("jwt") || null,
        loading:false,
        error:null
    },
    reducers:{
        logout:(state)=>{
           state.user=null,
            state.jwt=null,
            localStorage.removeItem("jwt")

        }
    },
    extraReducers:(builder)=>{
        builder//REGISTER
        .addCase(registerUser.pending, (state)=>{
            state.loading=true,
            state.error=null
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.jwt = action.payload.jwt;
            state.user = action.payload.user || null;
            })

        .addCase(registerUser.rejected, (state, action)=>{
            state.loading=false,
            state.error = action.payload
        })//LOGIN
        .addCase(loginUser.pending, (state, action)=>{
            state.loading=true,
            state.error=null
        
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            state.loading = false,
            state.user = action.payload.user||null,
            state.jwt = action.payload.jwt
        })
        .addCase(loginUser.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload
        })//FETCH-USER
        .addCase(fetchUser.pending, (state, action)=>{
            state.loading = true,
            state.error = null
        })
        .addCase(fetchUser.fulfilled, (state, action)=>{
            state.loading=false,
            state.user=action.payload
        })
        .addCase(fetchUser.rejected, (state, action)=>{
            state.loading=false,
            state.user = null,
            state.error = action.payload;
        })
    }

})


export const { logout} = authSlice.actions;
export default authSlice.reducer;
