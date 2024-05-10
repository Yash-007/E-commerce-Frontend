import axios from "axios";

export const getLatestProducts = async()=>{
    const url= `${import.meta.env.VITE_SERVER}/product/latest`;
    const response = await axios({
        url,
       method: "GET",
    })
    return response;
}

export const getAdminProducts = async(id)=>{
    const url= `${import.meta.env.VITE_SERVER}/product/admin-products?id=${id}`;
    const response = await axios({
        url,
        method:"GET",
    })
    return response;
}

export const getProductCategories = async(id)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/product/categories`;
        const response = await axios({
            url,
            method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getFilteredProducts = async(search,category, price, page, sort)=>{
        var url= `${import.meta.env.VITE_SERVER}/product/all?search=${search}&category=${category}&price=${price}&page=${page}`;
        if(sort)
        url+= `&sort=${sort}`;

        const response = await axios({
            url,
            method:"GET",
        })
        return response;
}

export const createProduct = async({id,formData})=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/product/new?id=${id}`;
        const response = await axios({
            url,
            method:"POST",
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const updateProduct = async({productId,userId,formData})=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/product/${productId}?id=${userId}`;
        const response = await axios({
            url,
            method:"PUT",
            data:formData,
            headers:{
                'Content-Type':'multipart/form-data',
            }
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const deleteProduct = async(productId,userId)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/product/${productId}?id=${userId}`;
        const response = await axios({
            url,
            method:"DELETE",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getSingleProduct = async(id)=>{
    try {
        const url= `${import.meta.env.VITE_SERVER}/product/${id}`;
        const response = await axios({
            url,
            method:"GET",
        })
        return response.data;
    } catch (error) {
        return error;
    }
}