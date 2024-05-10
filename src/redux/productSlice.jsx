import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAdminProducts, getFilteredProducts, getLatestProducts } from '../api calls/products';

const initialState = {
    latestProducts: [],
    adminProducts: [],
    filteredProducts:[],
    totalPage:null,
    loading: false,
    error: null,
}

export const getLatestProductsAsync = createAsyncThunk("product/getLatestProducts",async(a,{rejectWithValue})=>{
    try {
        const response  = await getLatestProducts();
        return response.data;
    } catch (error) {
        return rejectWithValue(error);   
    }
})

export const getAdminProductsAsync = createAsyncThunk("product/getAdminProducts", async(id,{rejectWithValue})=>{
    try {
        const response = await getAdminProducts(id);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const getFilteredProductsAsync= createAsyncThunk("product/getFilteredProducts", async({search,category, price, page, sort}, {rejectWithValue})=>{
    try {
        const response = await getFilteredProducts(search,category, price, page, sort);
        return response.data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const productSlice=  createSlice({
    name: 'products',
    initialState,
    reducers:{
        removeProduct:(state,action)=>{
            const id= action.payload;
            state.adminProducts= state.adminProducts.filter((prod)=> prod._id !==id)
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getLatestProductsAsync.pending, (state,action)=>{
            state.loading= true;
        })
        .addCase(getLatestProductsAsync.fulfilled, (state,action)=>{
            state.loading=false;
            state.latestProducts= action.payload.products;
        })
        .addCase(getLatestProductsAsync.rejected, (state,action)=>{
            state.loading=false;
            state.error = action.payload.response;
        })
        .addCase(getFilteredProductsAsync.pending, (state,action)=>{
            state.loading= true;
        })
        .addCase(getFilteredProductsAsync.fulfilled, (state,action)=>{
            state.loading=false;
            state.filteredProducts= action.payload.products;
            state.totalPage = action.payload.totalPage;
        })
        .addCase(getFilteredProductsAsync.rejected, (state,action)=>{
            state.loading=false;
            state.error = action.payload.response;
        })
        .addCase(getAdminProductsAsync.pending, (state,action)=>{
            state.loading= true;
        })
        .addCase(getAdminProductsAsync.fulfilled, (state,action)=>{
            state.loading=false;
            state.adminProducts= action.payload.products;
        })
        .addCase(getAdminProductsAsync.rejected, (state,action)=>{
            state.loading=false;
            state.error = action.payload.response;
        })
    }
})



export const {removeProduct} = productSlice.actions;

