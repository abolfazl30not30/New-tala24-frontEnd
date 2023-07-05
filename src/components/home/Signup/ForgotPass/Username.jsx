import React, {useState} from "react"
import {Suspense, useContext} from "react";
import signup from "../../../../contexts/signup";
import {useNavigate} from "react-router-dom";
import * as yup from "yup";
import {PersianToEnglish} from "../../../../helper/PersianToEnglish";
import RegisterApi from "../../../../api/RegisterApi";
import MyComponent from "react-fullpage-custom-loader";
import BallPulseSync from "../../../Loading/BallPulseSync";
import {TextField} from "@mui/material";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import SignInImage from "../../../../images/loginBackground.jpg";
import loginVector from "../../../../images/loginVector.png";
import {toast} from "react-toastify";

const Username = (props) =>{

    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const validation = async () => {
        const numberReg = /^(98|0)9\d{9}$/
        const schema = yup.object().shape({
            number: yup.string().required("این فیلد الزامی است.").matches(numberReg, "شماره موبایل نادرست است.")
        })
        try {
            return await schema.validate({number:props.username}, {abortEarly: true})
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

    const handleInput = (value) => {
        props.setUsername(PersianToEnglish(value.target.value))
    }

    const handleSubmit = async () => {
        const result = await validation()
        setLoading(true)
        if (result !== undefined) {
            const res = await RegisterApi.post("forgotPassword", {
                phoneNumber: props.username
            })

            if (res.data.exist) {
                props.changeStep("OTPCode")
            }
            else{
                toast.error("شماره موبایل وارد شده قبلا ثبت نام نشده است !!!", {
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
        setLoading(false)
    }

    const option = {
        sentences: ['لطفا منتظر بمانید...'],
        fadeIn: true,
        wrapperBackgroundColor: "#303030",
        textStyles: {color: "#DFAF3D"}
    }

    return (
        <>
            <Suspense fallback={<MyComponent {...option} customLoader={<BallPulseSync/>}/>}>
                <div className={'flex justify-center items-center h-screen'}>
                    <div className="flex justify-center bg-bgGray w-3/4 h-3/4 rounded-3xl">
                        <div className={'w-full md:w-1/2'}>
                            <div className="px-6 py-2">
                                <div className={'flex justify-center'}>
                                    <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'}
                                         className={'w-[90px] mt-[30px]'}/>
                                </div>
                                <p className={'text text-xl text-center text-white mt-5 pb-5 mx-4'}>
                                    مطمئن ترین راه برای سرمایه گذاری در <span className={'text-mainGold'}>طلا</span>
                                </p>
                                <p className={'text-white mx-4 mt-7 text-[1rem]'}>
                                    فراموشی رمز عبور
                                </p>
                                <p className={'text-[0.9rem] mx-4 text-mainGold mt-4'}>
                                    لطفا شماره موبایل خود را وارد کنید
                                </p>
                                <div className={'flex flex-col justify-center mx-4 my-7'}>
                                    <TextField
                                        aria-invalid={true}
                                        value={EnglishToPersian(props.username)}
                                        sx={{input: {color: '#fff !important',textAlign:"center"}}}
                                        type={"text"}
                                        className={'field bg-[#212121] w-full rounded p-4 text-white'}
                                        onChange={(value) => handleInput(value)}/>
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
                                                ادامه
                                            </LoadingButton>
                                        ) : (
                                            <button onClick={() => handleSubmit()}
                                                    className={'flex justify-center items-center bg-mainGold w-full rounded h-[45px]'}>
                                                <span className={'text-black'}>ادامه</span>
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
            </Suspense>
        </>
    )
}
export default Username;