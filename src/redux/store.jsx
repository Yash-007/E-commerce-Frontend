import { configureStore } from '@reduxjs/toolkit';
import { CartSlice } from './cartSlice';
import { productSlice } from './productSlice';
import { statSlice } from './statSlice';
import { userSlice } from './userSlice';

export const server = import.meta.env.VITE_SERVER;


export const store= configureStore({
    reducer: {
    [userSlice.name]: userSlice.reducer,
    [productSlice.name]: productSlice.reducer,
    [CartSlice.name]: CartSlice.reducer,
    [statSlice.name]: statSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});
