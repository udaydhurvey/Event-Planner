import axios from "axios";

const api = axios.create({
    baseURL:imort.meta.env.VITE_API_URL,
    withCredentials: true,
});

export default api;