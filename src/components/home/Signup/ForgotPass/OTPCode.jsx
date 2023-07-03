import React, {useState} from "react"
import {useContext, useEffect} from "react";
import signup from "../../../../contexts/signup";
import {useNavigate, useParams} from "react-router-dom";
import RegisterApi from "../../../../api/RegisterApi";
import {toast} from "react-toastify";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import OTPInput from "../../../OTPInput";
import Countdown from "react-countdown";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../../images/loginBackground.jpg";
import loginVector from "../../../../images/loginVector.png";

const OTPCode = (props) =>{

    const [loading, setLoading] = useState(false);

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            // Render a completed state
            return (
                <button className="rounded-xl bg-mainGold text-bgGray px-3 py-2 text-[0.8rem]">
                    ارسال مجدد کد
                </button>
            );
        } else {
            // Render a countdown
            return <span className="text-[0.7rem] text-neutral-400">{minutes}:{seconds} مانده تا دریافت مجدد کد</span>;
        }
    };

    const checkOTP = async (code) => {
        setLoading(true)
        const res = await RegisterApi.post("forgotPassword/checkOTP", {
            phoneNumber: props.username,
            otp: code
        })

        if (res.data.status === "OTPDenied") {
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
            props.changeStep("password")
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
                                 کد تایید به حساب کاربری با شماره موبایل {EnglishToPersian(props.username)} ارسال گردید .
                            </p>

                            <div className={'flex justify-center mx-4 mt-4 w-100'}>
                                <OTPInput handleCheckOTP={checkOTP} handleSetOTP={props.setCode}/>
                            </div>

                            <p className={'text-[9px] mx-4 text-[#6D6D6D] mt-3 text-center'}>
                                <Countdown
                                    date={Date.now() + 120000}
                                    renderer={renderer}/>
                            </p>

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
                                        <button onClick={() => checkOTP(props.code)} className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}><span className={'text-black'}>ادامه</span>
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
export default OTPCode;