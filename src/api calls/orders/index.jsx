import axios from "axios";

export const getAllOrders=async(userId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/all?id=${userId}`
        const response = await axios({
         url,
         method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getMyOrders=async(userId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/my?id=${userId}`
        const response = await axios({
         url,
         method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getSingleOrder=async(orderId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/${orderId}`
        const response = await axios({
         url,
         method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const processOrder=async(orderId,userId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/${orderId}?id=${userId}`
        const response = await axios({
         url,
         method:"PUT",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteOrder=async(orderId,userId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/${orderId}?id=${userId}`
        const response = await axios({
         url,
         method:"DELETE",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}


export const createPaymentIntent=async(total)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/payment/create`
        const response = await axios({
         url,
         method:"POST",
         data:{amount:total},
         headers:{'Content-Type': 'application/json'}
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const newOrder= async(data)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/order/new`
        const response = await axios({
         url,
         method:"POST",
         data,
         headers:{'Content-Type': 'application/json'}
        })
        return response.data;
    } catch (error) {
        return error;
    }
}