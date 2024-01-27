
import '../../../style/signupOrLogin.css';
import React from "react"
import {useContext, useEffect, useState} from "react";
import Countdown from "react-countdown";
import {Link, useNavigate, useParams} from "react-router-dom";
import OTPInput from "../../OTPInput";
import RegisterApi from "../../../api/RegisterApi";
import signup from "../../../contexts/signup";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../images/loginBackground.jpg";
import loginVector from "../../../images/loginVector.png";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {toast} from "react-toastify";

const Signup = () => {
    const info = useContext(signup)
    const params = useParams();
    const [OTPCode, setOTPCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [isSendOTP,setIsSendOTP] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (info.OTPAllowed === false) {
            navigate("/")
        }
    }, [])

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return (
                setIsSendOTP(false)
            );
        } else {
            // Render a countdown
            return <span className="text-[0.7rem] text-neutral-400">{minutes}:{seconds} مانده تا دریافت مجدد کد</span>;
        }
    };
    const sendAgainCode = async () =>{
        const res = await RegisterApi.post("init", {
            phoneNumber: params.id
        })
        setIsSendOTP(true)
    }
    const checkOTP = async (code) => {
        setLoading(true)

        const res = await RegisterApi.post("checkOTP", {
            phoneNumber: info.newUserPhoneNumber,
            otp: code
        })

        if (res === undefined) {
            toast.error(" کد تایید اشتباه است", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } else {
            info.setCreatePassAllowed(true)
            navigate("/create-password")
        }
        setLoading(false)
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen'}>
                <div className="flex justify-center bg-bgGray w-3/4 h-3/4 rounded-3xl">
                    <div className={'w-full md:w-1/2'}>
                        <div className="px-6 py-2">
                            <div className={'flex justify-center'}>
                                <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                            </div>
                            <p className={'text text-xl text-center text-white mt-5 pb-5 mx-4'}>
                                مطمئن ترین راه برای سرمایه گذاری در <span className={'text-mainGold'}>طلا</span>
                            </p>
                            <p className={'text-white mx-4 mt-6 text-[1.2rem]'}>
                                کد تایید
                            </p>
                            <p className={'text-[0.9rem] mx-4 text-mainGold mt-3'}>
                                کد تایید را وارد کنید
                            </p>
                            <p className={'text-[0.8rem] mx-4 text-neutral-400 mt-3'}>
                                حساب کاربری با شماره موبایل {EnglishToPersian(params.id)} وجود ندارد. برای ساخت حساب جدید کد تایید برای این شماره ارسال گردید.
                            </p>

                            <div className={'flex justify-center mx-4 mt-4 w-100'}>
                                <OTPInput handleCheckOTP={checkOTP} handleSetOTP={setOTPCode}/>
                            </div>

                            <div className={'text-[9px] mx-4 text-[#6D6D6D] mt-3 flex justify-center'}>
                                {
                                    isSendOTP ? (
                                        <Countdown
                                            date={Date.now() + 120000}
                                            renderer={renderer}/>
                                    ):(
                                        <button className="rounded-xl bg-mainGold text-bgGray px-3 py-2 text-[0.8rem]" onClick={sendAgainCode}>
                                            ارسال مجدد کد
                                        </button>
                                    )
                                }
                            </div>

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
                                            ادامه
                                        </LoadingButton>
                                    ) : (
                                        <button onClick={() => checkOTP(OTPCode)} className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}><span className={'text-black'}>ادامه</span>
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

export default Signup;