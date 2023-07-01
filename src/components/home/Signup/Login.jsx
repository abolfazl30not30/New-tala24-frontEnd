
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
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../images/GettyImages-1130532216.jpg";

const Login = () => {
    const info = useContext(signup)

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
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
        setLoading(false)
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen'}>
                <div className="flex justify-center bg-bgGray w-3/4 h-3/4 rounded-xl">
                    <div className={'w-full md:w-1/2'}>
                        <div className="px-6 py-2">
                            <div className={'flex justify-center'}>
                                <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                            </div>
                            <p className={'text text-xl text-center text-white mt-5 pb-5 mx-4'}>
                                مطمئن ترین راه برای سرمایه گذاری در <span className={'text-mainGold'}>طلا</span>
                            </p>
                            <p className={'text-white mx-4 mt-6 text-[1.2rem]'}>
                                ورود
                            </p>
                            <p className={'text-[0.9rem] mx-4 text-mainGold mt-3'}>
                               لطفا پسورد خود را وارد کنید
                            </p>
                            <div className={'flex flex-col justify-center mx-4 my-6'}>
                                <TextField
                                    error={errors.length !== 0}
                                    value={password}
                                    type={"password"}
                                    className={'field bg-[#212121] w-full rounded p-4 text-white'}
                                    sx={{ input: { color: '#fff !important' } }}
                                    onChange={(value) => handleInput(value)}
                                />
                                {
                                    errors.map((error, index) =>
                                        <small key={index} className={"text-red-600 mt-4 text-[0.6rem]"}>{error}</small>
                                    )
                                }
                            </div>

                            <button className={'text-white text-[0.9rem] mx-8 hover:text-mainGold'} onClick={() => {
                                navigate("/forgot-password")}}>
                                فراموشی رمز عبور
                            </button>

                            <div className={'mx-4 mt-7'}>
                                {
                                    loading === true ? (
                                        <LoadingButton
                                            className='flex justify-center items-center bg-mainGold w-full rounded h-[45px]'
                                            loading
                                            sx={{bgcolor:"#e8bd59"}}
                                            loadingPosition="start"
                                            startIcon={<SaveIcon/>}
                                            variant="outlined">
                                            ورود
                                        </LoadingButton>
                                    ) : (
                                        <button onClick={() => handleSubmit()} className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}><span className={'text-black'}>ورود</span>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 rounded-l-xl opacity-60 hidden md:block" style={{backgroundImage: `url(${SignInImage})`,backgroundSize:"cover"}}></div>
                </div>
            </div>
            {/*<div className={'flex justify-center items-center h-screen'}>*/}
            {/*    <div className={'container w-[300px] h-[350px] bg-[#252525]'}>*/}
            {/*        <div className={'flex justify-center'}>*/}
            {/*            <img src={"https://cloud.tala24.co/images/logo192.png" } alt={'logo'} className={'w-[90px] mt-[30px]'}/>*/}
            {/*        </div>*/}
            {/*        <p className={'text text-center text-white mt-4 pb-4 mx-4'}>*/}
            {/*            مطمئن ترین راه برای نگهداری <span className={'text-mainGold'}>طلا</span> شما*/}
            {/*        </p>*/}
            {/*        <p className={'text-[9px] mx-4 text-white mt-3'}>*/}
            {/*            رمز عبور را وارد کنید*/}
            {/*        </p>*/}

            {/*        <div className={'flex flex-col justify-center mx-4 mt-4'}>*/}
            {/*            <TextField*/}
            {/*                error={errors.length !== 0}*/}
            {/*                value={password}*/}
            {/*                type={"password"}*/}
            {/*                className={'field bg-[#212121] w-full rounded p-4 text-white'}*/}
            {/*                sx={{ input: { color: '#fff !important' } }}*/}
            {/*                onChange={(value) => handleInput(value)}*/}
            {/*            />*/}
            {/*            {*/}
            {/*                errors.map((error, index) =>*/}
            {/*                    <small key={index} className={"text-red-600 mt-5 text-[0.8rem]"}>{error}</small>*/}
            {/*                )*/}
            {/*            }*/}
            {/*        </div>*/}

            {/*        <button className={'text-white text-[12px] mx-8'} onClick={() => {*/}
            {/*            navigate("/forgot-password")}}>*/}
            {/*            <small>*/}
            {/*                فراموشی رمز عبور*/}
            {/*            </small>*/}
            {/*        </button>*/}

            {/*        <div className={'mx-4 mt-5'}>*/}
            {/*            <button className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'} onClick={() => handleSubmit()}>*/}
            {/*                <span className={'text-black'}>*/}
            {/*                    تایید*/}
            {/*                </span>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default Login;