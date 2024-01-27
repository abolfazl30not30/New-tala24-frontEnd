import axios from "axios";

const LoginApi = () => {

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }


    return (
        axios.post("http://localhost:8090/login",
            {username: sessionStorage.getItem("username"), password: sessionStorage.getItem("password")}, {
                withCredentials: true,
            }
        ).then((response) => {
            sessionStorage.setItem("Authorization", response.headers["authorization"])
            let json = parseJwt(sessionStorage.getItem("Authorization"))
            sessionStorage.setItem("role", json.role)
            return response
        }).catch((error) => {
            return error.response;
        })
    )
}

export default LoginApi;