import axios from "axios";

export const API_BASE_URL = "https://mern-ecommerce-website-6-0f55.onrender.com";


export const api = axios.create({
    baseURL:API_BASE_URL,
    withCredentials: true,
    headers:{
        "Content-Type":"application/json"
    }
});
