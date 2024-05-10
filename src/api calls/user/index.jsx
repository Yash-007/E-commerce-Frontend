import axios from "axios";


export const loginUser= async(user)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/user/new`;
        const response = await axios({
            url,
            method:'POST',
            data:user,
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getUser=async(id)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/user/${id}`
        const response = await axios({
            url,
            method:'GET',
        });
        return response.data;        
    } catch (error) {
        return error;
    }
}

export const getAllUsers= async(adminId)=>{
    const url = `${import.meta.env.VITE_SERVER}/user/all?id=${adminId}`;

    const response = await axios({
        url,
        method:'GET',
    });
    return response;
}

export const deleteUser= async(userId, adminId)=>{
    try {
        const url = `${import.meta.env.VITE_SERVER}/user/${userId}?id=${adminId}`;

        const response = await axios({
            url,
            method:'DELETE',
        });
        return response.data;
    } catch (error) {
         return error;
    }
}