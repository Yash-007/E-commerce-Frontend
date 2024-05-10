import axios from "axios";

export const newCoupon = async(userId,data)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/payment/new?id=${userId}`;
        const response = await axios({
            url,
            method:"POST",
            data
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getAllCoupons = async(userId)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/payment/all?id=${userId}`;
        const response = await axios({
            url,
            method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteCoupon = async(id,userId)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/payment/${id}?id=${userId}`;
        const response = await axios({
            url,
            method:"DELETE",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}