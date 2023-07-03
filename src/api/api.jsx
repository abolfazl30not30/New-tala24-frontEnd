import axios from "axios";
import LoginApi from "./LoginApi";
import { toast } from 'react-toastify';

const axiosParams = {
    baseURL: 'http://localhost:8090/api/v1/'
}

const axiosInstance = axios.create(axiosParams);

const api = {
        get: async (url, config = {}) => {
            try {
                const response = await axiosInstance.get(url, {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': localStorage.getItem("Authorization"),
                    }
                });
                return response.data

            } catch (error) {
                if (error.response && error.response.status === 403) {
                    await LoginApi()
                    const response = await axiosInstance.get(url, {
                        ...config,
                        headers: {
                            ...config.headers,
                            'Authorization': localStorage.getItem("Authorization"),
                        }
                    });
                    return response.data
                    }
                else {
                    if(error.response.status === 500){
                        toast.info(error.response.data.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }else {
                        toast.error(" خطا در اتصال", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }
            }
        },

        delete: async (url, config = {}) => {
            try {
                const response = await axiosInstance.delete(url, {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': localStorage.getItem("Authorization"),
                    }
                });
                return response.data
            } catch (error) {
                if (error.response && error.response.status === 403) {
                    await LoginApi()
                    const response = await axiosInstance.delete(url, {
                        ...config,
                        headers: {
                            ...config.headers,
                            'Authorization': localStorage.getItem("Authorization"),
                        }
                    });
                    return response.data
                } else{
                    if(error.response.status === 500){
                        toast.info(error.response.data.message, {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }else {
                        toast.error(" خطا در اتصال", {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "colored",
                        });
                    }
                }
            }
        },

    post: async (url, body, config = {}) => {
        try {
            const response = await axiosInstance.post(url, body, {
                ...config,
                headers: {
                    ...config.headers,
                    'Authorization': localStorage.getItem("Authorization"),
                }
            });
            return response.data
        } catch (error) {

            if (error.response && error.response.status === 403) {
                await LoginApi()
                const response = await axiosInstance.post(url, body, {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': localStorage.getItem("Authorization"),
                    }
                });
                return response.data
            } else {
                if(error.response.status === 500){
                    toast.info(error.response.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }else {
                    toast.error(" خطا در اتصال", {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
                }
            }
        }
    },

    put: async (url, body, config = {}) => {
        try {
            const response = await axiosInstance.put(url, body, {
                ...config,
                headers: {
                    ...config.headers,
                    'Authorization': localStorage.getItem("Authorization"),
                }
            });
            return response.data
        } catch (error) {
            if (error.response && error.response.status === 403) {
                await LoginApi()
                const response = await axiosInstance.put(url, body, {
                    ...config,
                    headers: {
                        ...config.headers,
                        'Authorization': localStorage.getItem("Authorization"),
                    }
                });
                return response.data
            }else {
                toast.info(" خطا در اتصال", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    }
}

export default api;