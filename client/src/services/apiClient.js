import axios from "axios";
import { getToken } from "../auth";

const apiClient = axios.create({
    baseURL: "https://trade-up-pbd0.onrender.com",
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        if (error.response.status === 401) {
            // REDIRECT TO LOGIN
        }
        return Promise.reject(error);
    }
);

export default apiClient;
