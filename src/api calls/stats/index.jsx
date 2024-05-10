import axios from "axios";

export const getDashboard = async(userId)=>{
    const url= `${import.meta.env.VITE_SERVER}/dashboard/stats?id=${userId}`;
    const response = await axios({
        url,
        method:"GET",
    })
    return response;
}

export const getBarChart = async(userId)=>{
    const url= `${import.meta.env.VITE_SERVER}/dashboard/bar?id=${userId}`;
    const response = await axios({
        url,
        method:"GET",
    })
    return response;
}

export const getPieChart = async(userId)=>{
    const url= `${import.meta.env.VITE_SERVER}/dashboard/pie?id=${userId}`;
    const response = await axios({
        url,
        method:"GET",
    })
    return response;
}

export const getLineChart = async(userId)=>{
    const url= `${import.meta.env.VITE_SERVER}/dashboard/line?id=${userId}`;
    const response = await axios({
        url,
        method:"GET",
    })
    return response;
}