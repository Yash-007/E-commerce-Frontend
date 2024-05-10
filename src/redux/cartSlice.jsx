import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading:false,
    cartItems:[],
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address: "",
        city: "",
        state: "",
        country:"",
        pinCode:"",
    }
}

export const CartSlice= createSlice({
    name:'cart',
    initialState,
    reducers: {
    addToCart: (state,action)=>{
      const index = state.cartItems.findIndex(
        (c)=> c.productId === action.payload.productId
      )
      if(index!==-1){
        state.cartItems[index]= action.payload;
      }
      else{
        state.cartItems.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    addLocalCart:(state,action)=>{
     state.cartItems = action.payload;
    },

    removeCartItem:(state,action)=>{
        state.cartItems = state.cartItems.filter(
            (c)=> c.productId !== action.payload
            )
          localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
   
    calculatePrice: (state,action)=>{
      state.subtotal = state.cartItems.reduce(
        (total,item)=> total+(item.price* item.quantity),
      0);

      state.shippingCharges = (state.subtotal > 1000) ? 200 : 0;
      state.tax= Math.round(state.subtotal * .18);
      state.total = state.subtotal + state.tax + state.shippingCharges - state.discount;
    },

    discountApplied: (state,action)=>{
        state.discount= action.payload;
    },

    saveShippingInfo: (state,action)=>{
      state.shippingInfo= action.payload;
    },

    resetCart: ()=>{
      localStorage.removeItem("cart");
      return initialState;
    },
    }
});

export const {addToCart,addLocalCart, removeCartItem, calculatePrice, discountApplied, saveShippingInfo, resetCart} = CartSlice.actions;

