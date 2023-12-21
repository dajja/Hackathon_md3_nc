import axios from "axios";

const baseURL = "http://localhost:8000";

const privateAxios = axios.create({
    baseURL,
});

privateAxios.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem("token");
    return {
        ...config,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
        },
    };
});

export default privateAxios;