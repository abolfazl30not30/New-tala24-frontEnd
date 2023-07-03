import axios from "axios";
import {toast} from "react-toastify";

const axiosParams = {
    baseURL: 'http://localhost:8090/api/v1/register'
}

const axiosInstance = axios.create(axiosParams);


const RegisterApi = (axios) => {
    return {
        post: (url, body, config = {
            withCredentials: true,
        }) =>
            axios.post(url, body, config)
                .then((response) => {
                    return response
                }).catch((error) => {
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
            })
    }

}

export default RegisterApi(axiosInstance);