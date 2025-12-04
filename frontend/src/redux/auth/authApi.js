import axios from "axios"
import { API_BASE_URL } from "../../api_config/api";

export const registerApi = async(userData)=>{
    const response = await axios.post(`${API_BASE_URL}/auth/signUp`, userData, {withCredentials: true});
    console.log("Sending data to:", `${API_BASE_URL}/auth/signUp`, userData);

    // console.log("userData",response);
    return response.data;

}
export const loginApi = async(userData)=>{
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData, {withCredentials: true});
    return response.data;
}
export const getUserApi = async()=>{
    const response = await axios.get(`${API_BASE_URL}/auth/getUserProfile`, {withCredentials:true});
    return response.data;
}