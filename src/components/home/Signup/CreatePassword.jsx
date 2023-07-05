
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
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../images/loginBackground.jpg";
import loginVector from "../../../images/loginVector.png";
import {toast} from "react-toastify";

const CreatePassword= () => {

    const info = useContext(signup)

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (info.createPassAllowed === false) {
            navigate("/")
        }
    }, [])

    const validation = async () => {
        const schema = yup.object().shape({
            password: yup.string().required("لطفا رمز خود را وارد کنید.").min(8,"رمزعبور باید حداقل  دارای 8 کارکتر باشد")
                .matches(/^(?=.*[a-z])/,"رمزعبور باید شامل کوچک انگلیسی باشد")
                .matches(/^(?=.*[A-Z])/,"رمزعبور باید شامل بزرگ انگلیسی باشد")
                .matches(/^(?=.*[0-9])/,"رمزعبور باید شامل عدد باشد")
                .matches(/^(?=.*[!@#\$%\^&\*])/,"رمزعبور باید شامل کارکتر خاص باشد"),

            passwordRepeat: yup.string().required("لطفا تکرار رمز خود را وارد کنید.").oneOf([yup.ref('password'), null], "رمز وارد شده با تکرار آن یکسان نمی باشد.")
        })
        try {
            return await schema.validate({password, passwordRepeat}, {abortEarly: false})
        } catch (error) {
            toast.error(error.errors[0], {
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

    const handleInputPassword = (value) => {
        setPassword(value.target.value)
    }

    const handleInputPasswordRepeat = (value) => {
        setPasswordRepeat(value.target.value)
    }

    const handleSubmit = async () => {
        setErrors([])
        const result = await validation()
        if (result !== undefined) {
            setErrors([])
            info.setNewUserPassword(password)

            const res = await ResgisterApi.post("createCustomer", {
                phoneNumber: info.newUserPhoneNumber,
                password: password
            })

            console.log(res)
            if (res?.status === 201) {
                info.setSuccessAllowed(true)
                sessionStorage.setItem("password", password)
                sessionStorage.setItem("username", info.newUserPhoneNumber)
            } else {
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

            const loginResponse = await LoginApi()
            info.setAccountCompleteRegistrationAllowed(true)

            if (loginResponse.status === 200) {
                // info.setDashboardAllowed(true)
                if (sessionStorage.getItem("role") === "ADMIN") {
                    navigate("/admin")
                } else if (sessionStorage.getItem("role") === "USER") {
                    navigate("/dashboard/home")
                } else if (sessionStorage.getItem("role") === "MANAGER") {
                    navigate("/manager/add-admin")
                }
            } else if (loginResponse.status === 403) {
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

    return (
        <>
            <div className={'flex justify-center items-center h-screen'}>
                <div className="flex justify-center bg-bgGray w-3/4 h-3/4 rounded-3xl">
                    <div className={'w-full md:w-1/2'}>
                        <div className="px-6 py-2">
                            <div className={'flex justify-center'}>
                                <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'}
                                     className={'w-[90px] mt-[30px]'}/>
                            </div>
                            <div className={'text text-xl text-center text-white mt-5 pb-5 mx-4'}>
                                مطمئن ترین راه برای سرمایه گذاری در <span className={'text-mainGold'}>طلا</span>
                            </div>
                            <div className={'text-[1rem] mx-4 text-white mt-4'}>
                                لطفا رمز عبور خود را وارد کنید
                            </div>
                            <div className={'text-[0.8rem] mx-8 text-neutral-400 mt-3'}>
                                <ul className="list-disc">
                                    <li>
                                        رمزعبور باید حداقل  دارای 8 کارکتر باشد
                                    </li>
                                    <li>
                                        رمزعبور شامل حروف بزرگ و کوچک انگلیسی  باشد
                                    </li>
                                    <li>
                                        رمزعبور شامل کاراکتر های خاص باشد
                                    </li>
                                </ul>
                            </div>
                            <div className={'text-[0.9rem] mx-4 text-white mt-4'}>
                                 رمز عبور
                            </div>

                            <div className={'flex flex-col justify-center mx-4 mt-4'}>
                                <TextField
                                    error={errors.length !== 0}
                                    value={password}
                                    type={"password"}
                                    sx={{textAlign:"center"}}
                                    className={'field bg-[#212121] w-full rounded p-4 text-white'}
                                    onChange={(value) => handleInputPassword(value)}
                                />
                                <PasswordStrengthIndicator password={password}/>
                            </div>

                            <div className={'text-[0.9rem] mx-4 text-white mt-4'}>
                                تکرار رمز عبور
                            </div>

                            <div className={'flex flex-col justify-center mx-4 mt-4'}>
                                <TextField
                                    error={errors.length !== 0}
                                    value={passwordRepeat}
                                    type={"password"}
                                    sx={{textAlign:"center"}}
                                    className={'field bg-[#212121] w-full rounded p-4 text-white'}
                                    onChange={(value) => handleInputPasswordRepeat(value)}
                                />
                            </div>

                            <div className={'mx-4 mt-7'}>
                                {
                                    loading === true ? (
                                        <LoadingButton
                                            className='flex justify-center items-center bg-mainGold w-full rounded h-[45px]'
                                            loading
                                            sx={{bgcolor: "#e8bd59"}}
                                            loadingPosition="start"
                                            startIcon={<SaveIcon/>}
                                            variant="outlined">
                                            تایید
                                        </LoadingButton>
                                    ) : (
                                        <button onClick={() => handleSubmit()}
                                                className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}>
                                            <span className={'text-black'}>تایید</span>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-end w-1/2 rounded-l-3xl  hidden md:flex"
                         style={{backgroundImage: `url(${SignInImage})`, backgroundSize: "cover"}}>
                        <div>
                            <img className="w-full" src={loginVector}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePassword;