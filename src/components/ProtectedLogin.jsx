import {Component} from "react";
import {Navigate, useNavigate} from "react-router-dom"
import LoginApi from "../api/LoginApi";
import React from "react";
class ProtectedLogin extends Component {
    state = {
        isAuth: null
    }

    async componentWillMount() {
        const loginResponse = await LoginApi()
        if (loginResponse.status === 200) {
            this.setState({isAuth: true})
            return this.state.isAuth
        } else if (loginResponse.status === 403) {
            localStorage.clear()
            this.setState({isAuth: false})
            return this.state.isAuth
        }
    }

    render() {
        return (
            <>
                {
                    this.state.isAuth === true ?
                        (localStorage.getItem("role") === "ADMIN" ?
                            <Navigate to={"/admin/gold-price"} replace={true}/> :
                            localStorage.getItem("role") === "USER" ?
                                <Navigate to={"/dashboard/home"} replace={true}/> :
                                localStorage.getItem("role") === "MANAGER" ?
                                    <Navigate to={"/manager/add-admin"} replace={true}/> :
                                    <Navigate to={'/login'} replace={true}/>)
                        : this.state.isAuth === false ?
                            this.props.children
                            :
                            null
                }
            </>
        );
    }
}

export default ProtectedLogin
