import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../api calls/user";

const initialState= {
   loading:true,
   user:null,
   allUsers:[],
}

export const getAllUsersAsync= createAsyncThunk("users/getAllUsers", async(adminId, {rejectWithError})=>{
    try {
        const res= await getAllUsers(adminId);
        return res.data;
    } catch (error) {
        return rejectWithError(error);
    }
})


export const userSlice= createSlice({
    name:"users",
    initialState,
    reducers:{
        userExists: (state,action)=>{
            state.user=action.payload;
            state.loading=false;
        },
        userNotExists:(state,action)=>{
            state.loading=false;
            state.user= null;
        },
        removeUser: (state,action)=>{
            const id= action.payload;
            state.allUsers= state.allUsers.filter((user)=> user._id !==id)
        }
    },
    extraReducers: (builders)=>{
        builders
        .addCase(getAllUsersAsync.fulfilled,(state,action)=>{
            state.loading=false;
            state.allUsers= action.payload.users;
        })
    }
})


export const {userExists,userNotExists,removeUser} = userSlice.actions;





