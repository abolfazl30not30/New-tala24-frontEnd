import React, {useState} from "react"
import {useContext, useEffect} from "react";
import signup from "../../../../contexts/signup";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {toast} from "react-toastify";
import ResgisterApi from "../../../../api/RegisterApi";
import LoginApi from "../../../../api/LoginApi";
import {TextField} from "@mui/material";
import PasswordStrengthIndicator from "../../PasswordStrengthIndicator";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../../images/loginBackground.jpg";
import loginVector from "../../../../images/loginVector.png";

const ResetPassword = (props) =>{

    const [errors, setErrors] = useState([])
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

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
        const result = await validation()
        if (result !== undefined) {
            const res = await ResgisterApi.post("updatePassword", {
                 phoneNumber: props.username,
                 password: password
            })

            if(res){
                navigate("/login")
            }else {
                toast.error("خطا در سیستم", {
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
export default ResetPassword;