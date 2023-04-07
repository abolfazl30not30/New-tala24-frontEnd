import logo from '../../../images/lastLogo.png';
import React from "react"
import '../../../style/signupOrLogin.css';
import {TextField} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import * as yup from "yup";
import PasswordStrengthIndicator from "../PasswordStrengthIndicator";
import signup from "../../../contexts/signup";
import {useNavigate} from "react-router-dom";
import api from "../../../api/api";
import ResgisterApi from "../../../api/RegisterApi";
import LoginApi from "../../../api/LoginApi";

const CreatePassword= () => {
    const info = useContext(signup)

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (info.createPassAllowed === false) {
            navigate("/")
        }
    }, [])

    const validation = async () => {
        const schema = yup.object().shape({
            password: yup.string().min(8, "رمز عبور باید حداقل ۸ کارکتر باشد.").required("لطفا رمز خود را وارد کنید."),
            passwordRepeat: yup.string().required("لطفا تکرار رمز خود را وارد کنید.").oneOf([yup.ref('password'), null], "رمز وارد شده با تکرار آن یکسان نمی باشد.")
        })
        try {
            return await schema.validate({password, passwordRepeat}, {abortEarly: false})
        } catch (error) {
            setErrors(error.errors)
        }
    }

    const handleInputPassword = (value) => {
        setPassword(value.target.value)
    }

    const handleInputPasswordRepeat = (value) => {
        setPasswordRepeat(value.target.value)
    }

    const handleSubmit = async () => {
        const result = await validation()
        // if (password !== passwordRepeat) {
        //     let tempErrors = [...errors]
        //     tempErrors.push("رمز وارد شده با تکرار آن یکسان نمی باشد.")
        //     setErrors(tempErrors)
        // }
        if (result !== undefined) {
            setErrors([])

            info.setNewUserPassword(password)

            const res = await ResgisterApi.post("createCustomer", {
                phoneNumber: info.newUserPhoneNumber,
                password: password
            })

            if (res?.status === 201) {
                info.setSuccessAllowed(true)
                localStorage.setItem("password", password)
                localStorage.setItem("username", info.newUserPhoneNumber)
            } else {
                console.log("error")
            }

            await LoginApi();

            const res1 = await api.get(`account/user/${info.newUserPhoneNumber}`)
            localStorage.setItem("id", res1.id)

            await api.post("info", { // bug not fixed
                accountId: res1.id,
                value: localStorage.getItem("username"),
                infoType: "phoneNumber"
            })

            info.setAccountCompleteRegistrationAllowed(true)

            // console.log(res1)
            // api.post("info", {
            //     accountId:
            // })

            navigate("/welcome")
        }
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen bg-[#000] '}>
                <div className={'container w-[300px] pb-4 bg-[#1D1C1C]'}>
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
                            onChange={(value) => handleInputPassword(value)}
                        />
                        <PasswordStrengthIndicator password={password}/>
                    </div>


                    <p className={'text-[9px] mx-4 text-white mt-4'}>
                        تکرار رمز عبور
                    </p>

                    <div className={'flex flex-col justify-center mx-4 mt-4'}>
                        <TextField
                            error={errors.length !== 0}
                            value={passwordRepeat}
                            type={"password"}
                            className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                            onChange={(value) => handleInputPasswordRepeat(value)}
                        />
                        {
                            errors.map((error, index) =>
                                <small key={index} className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                            )
                        }
                    </div>

                    <div className={'mx-4 mt-5'}>
                        <button className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'} onClick={() => {
                            setErrors([])
                            handleSubmit()
                        }}>
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

export default CreatePassword;