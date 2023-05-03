
import '../../../style/signupOrLogin.css';
import React from "react"
import {useContext, useEffect, useState} from "react";
import Countdown from "react-countdown";
import {Link, useNavigate} from "react-router-dom";
import OTPInput from "../../OTPInput";
import RegisterApi from "../../../api/RegisterApi";
import signup from "../../../contexts/signup";

const Signup = () => {
    const info = useContext(signup)

    const [mobileNumber, setMobileNumber] = useState('۰۹۱۲۳۴۵۶۷۸۹');
    const [OTPError, setOTPError] = useState(false)
    const [OTPCode, setOTPCode] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if (info.OTPAllowed === false) {
            navigate("/")
        }
    }, [])

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return (
                <button >
                    ارسال مجدد کد
                </button>
            );
        } else {
            // Render a countdown
            return <span>{minutes}:{seconds} مانده تا دریافت مجدد کد</span>;
        }
    };

    const checkOTP = async (code) => {
        setOTPError(false)

        const res = await RegisterApi.post("checkOTP", {
            phoneNumber: info.newUserPhoneNumber,
            otp: code
        })

        console.log(res)
        if (res.status !== 406) {
            info.setCreatePassAllowed(true)
            navigate("/create-password")
        } else {
            setOTPError(true)
        }
    }
    return (
        <>
            <div className={'flex justify-center items-center h-screen'}>
                <div className={'container w-[300px] h-[390px] bg-[#252525]'}>
                    <div className={'flex justify-center'}>
                        <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                    </div>

                    <p className={'text text-center text-white mt-4 pb-4 mx-4'}>
                        مطمئن ترین راه برای نگهداری <span className={'text-mainGold'}>طلا</span> شما
                    </p>

                    <p className={'text-[9px] mx-4 text-white mt-3'}>
                        کد تایید را وارد کنید
                    </p>

                    <p className={'text-[9px] mx-4 text-[#6D6D6D] mt-3'}>
                        حساب کاربری با شماره موبایل {mobileNumber} وجود ندارد. برای ساخت حساب جدید کد تایید برای این شماره ارسال گردید.
                    </p>

                    <div className={'flex justify-center mx-4 mt-4 w-100'}>
                        <OTPInput handleCheckOTP={checkOTP} handleSetOTP={setOTPCode}/>
                    </div>

                    <small className={"text-red-600 mt-1 text-[0.6rem] mx-4 -mt-2"}
                           style={{display: OTPError === true ? "block" : "none"}}
                    >
                        کد اشتباه است!
                    </small>

                    <p className={'text-[9px] mx-4 text-[#6D6D6D] mt-3 text-center'}>

                        <Countdown
                            date={Date.now() + 120000}
                            renderer={renderer}
                        />

                    </p>
                    
                    <div className={'mx-4 mt-5'}>
                        <button onClick={() => checkOTP(OTPCode)} className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}>
                            <span className={'text-black'}>
                                ادامه
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;