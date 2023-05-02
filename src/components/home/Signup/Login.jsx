import logo from '../../../images/lastLogo.png';
import React from "react"
import '../../../style/signupOrLogin.css';
import {TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import * as yup from "yup";
import {PersianToEnglish} from "../../../helper/PersianToEnglish";
import LoginApi from "../../../api/LoginApi";
import {useNavigate} from "react-router-dom";
import signup from "../../../contexts/signup";
import api from "../../../api/api";
import axios from "axios";

const Login = () => {
    const info = useContext(signup)

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (info.passwordAllowed === false) {
            navigate("/")
        }
    }, [])

    const validation = async () => {
        const schema = yup.object().shape({
            password: yup.string().required("لطفا رمز خود را وارد کنید.")
        })
        try {
            return await schema.validate({password})
        } catch (error) {
            setErrors(error.errors)
        }
    }

    const handleInput = (value) => {
        setPassword(value.target.value)
    }

    const handleSubmit = async () => {

        const result = await validation()
        if (result !== undefined) {
            setErrors([])
            localStorage.setItem("password", password)
            const res = await LoginApi()

            if (res.status === 403) {
                setErrors(["رمز عبور اشتباه است."])
            } else if (res.status === 200) {
                // info.setDashboardAllowed(true)
                if (localStorage.getItem("role") === "ADMIN") {
                    navigate("/admin")
                } else if (localStorage.getItem("role") === "USER") {
                    navigate("/dashboard/home")
                } else if (localStorage.getItem("role") === "MANAGER") {
                    navigate("/manager/add-admin")
                }
            }
        }
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen'}>
                <div className={'container w-[300px] h-[350px] bg-[#252525]'}>
                    <div className={'flex justify-center'}>
                        <img src={logo} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                    </div>
                    <p className={'text text-center text-white mt-4 pb-4 mx-4'}>
                        مطمئن ترین راه برای نگهداری <span className={'text-mainGold'}>طلا</span> شما
                    </p>
                    <p className={'text-[9px] mx-4 text-white mt-3'}>
                        رمز عبور را وارد کنید
                    </p>

                    <div className={'flex flex-col justify-center mx-4 mt-4'}>
                        <TextField
                            error={errors.length !== 0}
                            value={password}
                            type={"password"}
                            className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                            sx={{ input: { color: '#fff !important' } }}
                            onChange={(value) => handleInput(value)}
                        />
                        {
                            errors.map((error, index) =>
                                <small key={index} className={"text-red-600 mt-5 text-[0.8rem]"}>{error}</small>
                            )
                        }
                    </div>

                    <button className={'text-white text-[12px] mx-8'} onClick={() => {
                        navigate("/forgot-password")
                    }}>
                        <small>
                            فراموشی رمز عبور
                        </small>
                    </button>

                    <div className={'mx-4 mt-5'}>
                        <button className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'} onClick={() => handleSubmit()}>
                            <span className={'text-black'}>
                                تایید
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;