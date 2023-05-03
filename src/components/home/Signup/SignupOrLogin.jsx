
import React from "react"
import '../../../style/signupOrLogin.css'
import {useContext, useState} from "react";
import * as yup from "yup"
import {TextField} from "@mui/material";
import {EnglishToPersian} from "../../../helper/EnglishToPersian"
import {PersianToEnglish} from "../../../helper/PersianToEnglish";
import { useNavigate } from "react-router-dom";
import RegisterApi from "../../../api/RegisterApi";
import signup from "../../../contexts/signup";

const SignupOrLogin = () => {

    const info = useContext(signup)

    const [errors, setErrors] = useState([])
    const [number, setNumber] = useState("")

    const navigate = useNavigate()

    const validation = async () => {
        const numberReg = /^(98|0)9\d{9}$/
        const schema = yup.object().shape({
            number: yup.string().required("این فیلد الزامی است.").matches(numberReg, "شماره موبایل نادرست است.")
        })
        try {
            return await schema.validate({number}, {abortEarly: true})
        } catch (error) {
            setErrors(error.errors)
        }
    }

    const handleInput = (value) => {
        setNumber(PersianToEnglish(value.target.value))
    }

    const handleSubmit = async () => {
        const result = await validation()
        if (result !== undefined) {
            setErrors([])

            const res = await RegisterApi.post("init", {
                phoneNumber: number
            })

            console.log(res)

            if (res?.data.status === "newUser") {
                info.setOTPAllowed(true)
                info.setNewUserPhoneNumber(number)
                navigate("/OTP-code")
            } else if (res?.data.status === "exist") {
                info.setPasswordAllowed(true)
                localStorage.setItem("username", number)
                navigate("/password")
            }
        }
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen '}>
                <div className={'container w-[300px] h-[350px] bg-[#252525]'}>
                    <div className={'flex justify-center'}>
                        <img src={"https://cloud.tala24.co/images/logo192"} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                    </div>
                    <p className={'text text-center text-white mt-4 pb-4 mx-4'}>
                        مطمئن ترین راه برای نگهداری <span className={'text-mainGold'}>طلا</span> شما
                    </p>
                    <p className={'text-white mx-4 mt-3 text-[13px]'}>
                        ورود | ثبت نام
                    </p>
                    <p className={'text-[9px] mx-4 text-[#6D6D6D] mt-3'}>
                        لطفا شماره موبایل خود را وارد کنید
                    </p>
                    <div className={'flex flex-col justify-center m-4'}>
                        <TextField
                            aria-invalid={true}
                            error={errors.length !== 0}
                            value={EnglishToPersian(number)}
                            sx={{ input: { color: '#fff !important' } }}
                            type={"text"}
                            className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                            onChange={(value) => handleInput(value)}
                        />
                        {
                            errors.map((error, index) =>
                                <small key={index} className={"text-red-600 mt-4 text-[0.6rem]"}>{error}</small>
                            )
                        }
                    </div>
                    <div className={'mx-4 mt-5'}>
                        <button onClick={() => handleSubmit()} className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}>
                            <span className={'text-black'}>
                                ورود
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignupOrLogin;