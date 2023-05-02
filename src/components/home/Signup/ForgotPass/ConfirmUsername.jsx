import logo from "../../../../images/lastLogo.png";
import React from "react";
import {TextField} from "@mui/material";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {PersianToEnglish} from "../../../../helper/PersianToEnglish";
import RegisterApi from "../../../../api/RegisterApi";
import OTPInput from "../../../OTPInput";
import Countdown from "react-countdown";

const ConfirmUsername = (props) => {
    const [numberErrors, setNumberErrors] = useState([])
    const [otpError, setOtpError] = useState([])
    const [otpShow, setOtpShow] = useState(false)
    const [tempNumber, setTempNumber] = useState("")

    const navigate = useNavigate()

    const validation = async () => {
        const numberReg = /^(98|0)9\d{9}$/
        const schema = yup.object().shape({
            tempNumber: yup.string().required("این فیلد الزامی است.").matches(numberReg, "شماره موبایل نادرست است.")
        })
        try {
            return await schema.validate({tempNumber}, {abortEarly: true})
        } catch (error) {
            setNumberErrors(error.errors)
        }
    }

    const handleInput = (value) => {
        props.handleSetNumber(PersianToEnglish(value.target.value))
        setTempNumber(PersianToEnglish(value.target.value))
    }

    const handleSubmit = async () => {
        const result = await validation()
        if (result !== undefined) {
            setNumberErrors([])
            const res = await RegisterApi.post("forgotPassword", {
                phoneNumber: props.number
            })

            console.log(123333)
            console.log(res)
            if (res.response?.status === 500) { // must be tested! mohsen goshad ast :)
                setNumberErrors(["شماره وارد شده ثبت نام نشده است!"])
            } else if (res?.status === "OTPSent"){
                setOtpShow(true)
            }

        }}
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            setOtpShow(false)
        } else {
            // Render a countdown
            return <span>{minutes}:{seconds} مانده تا دریافت مجدد کد</span>;
        }
    };

    const checkOTP = async (code) => {

        const res = await RegisterApi.post("forgotPassword/checkOTP", {
            phoneNumber: props.number,
            otp: code
        })
        if (true) {
            props.handleSetCheckOTP(true)
        }
    }

    return (
        <>
            <div className={'flex justify-center items-center h-screen '}>
                <div className={'container w-[300px] h-[350px] bg-[#252525]'}>
                    <div className={'flex justify-center'}>
                        <img src={logo} alt={'logo'} className={'w-[90px] mt-[30px]'}/>
                    </div>
                    <p className={'text text-center text-white mt-4 pb-4 mx-4'}>
                        مطمئن ترین راه برای نگهداری <span className={'text-mainGold'}>طلا</span> شما
                    </p>
                    <p className={'text-white mx-4 mt-3 text-[13px]'}>
                        فراموشی رمز عبور
                    </p>
                    <p className={`text-[9px] mx-4 text-[#6D6D6D] mt-3 ${otpShow ? "hidden" : ""}`}>
                        لطفا شماره موبایل خود را وارد کنید
                    </p>
                    <div className={`flex flex-col justify-center m-4  ${otpShow ? "hidden" : ""}`}>
                        <TextField
                            aria-invalid={true}
                            error={numberErrors.length !== 0}
                            value={EnglishToPersian(props.number)}
                            type={"text"}
                            className={`field bg-[#212121] w-full rounded h-[45px] p-4 text-white`}
                            onChange={(value) => handleInput(value)}
                        />
                        {
                            numberErrors.map((error, index) =>
                                <small key={index} className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                            )
                        }
                    </div>
                    <div
                        style={{display: otpShow ? "flex" : "none"}}
                        className={'justify-center mt-[35px] -mb-4'}
                    >
                        <OTPInput handleCheckOTP={checkOTP}/>
                    </div>
                    <p className={`text-[9px] mx-4 text-[#6D6D6D] mt-3 text-center ${otpShow ? "" : "hidden"}`}>

                        <Countdown
                            date={Date.now() + 120000}
                            renderer={renderer}
                        />

                    </p>
                    <div className={'mx-4 mt-5'}>
                        <button disabled={otpShow} onClick={() => handleSubmit()}
                                className={`flex justify-center items-center bg-mainGold w-full rounded h-[45px] ${otpShow ? "cursor-not-allowed" : ""}`}>
                            <span className={'text-black'}>
                                ارسال کد یکبار مصرف
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConfirmUsername;