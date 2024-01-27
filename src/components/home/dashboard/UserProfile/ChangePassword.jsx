import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import React from "react";
import {useState} from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import {useContext} from "react";
import signup from "../../../../contexts/signup";
import Countdown from "react-countdown";
import api from "../../../../api/api";
import * as yup from "yup";
import {toast} from "react-toastify";
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

const ChangePassword = () =>{
    const context = useContext(signup);

    const [OTPCode, setOTPCode] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatNewPassword, setRepeatNewPassword] = useState()
    const [isSendOTP,setIsSendOTP] = useState(false)
    const [isSendAgainOTP,setIsSendAgainOTP] = useState(false)

    const validation = async () => {
        const schema = yup.object().shape({
            password: yup.string().required("لطفا رمز خود را وارد کنید.").min(8,"رمزعبور باید حداقل  دارای 8 کارکتر باشد")
                .matches(/^(?=.*[a-z])/,"رمزعبور باید شامل کوچک انگلیسی باشد")
                .matches(/^(?=.*[A-Z])/,"رمزعبور باید شامل بزرگ انگلیسی باشد")
                .matches(/^(?=.*[0-9])/,"رمزعبور باید شامل عدد باشد")
                .matches(/^(?=.*[!@#\$%\^&\*])/,"رمزعبور باید شامل کارکتر خاص باشد"),

            passwordRepeat: yup.string().required("لطفا تکرار رمز خود را وارد کنید.").oneOf([yup.ref('password'), null], "رمز وارد شده با تکرار آن یکسان نمی باشد."),
            OTPCode:yup.string().required("لطفا كد تاييد را وارد كنيد")
        })
        try {
            return await schema.validate({password:newPassword, passwordRepeat:repeatNewPassword, OTPCode:OTPCode}, {abortEarly: false})

        } catch (error) {
            toast.info(error.errors[0], {
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

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            setIsSendOTP(false)
        } else {
            return <span className="text-[0.8rem] text-neutral-300">{minutes}:{seconds} مانده تا دریافت مجدد کد</span>;
        }
    };

    const handleChangePassword = async () => {
        const valid = await validation();
        if (valid !== undefined){
            const res = await api.post("register/updatePassword/update/panel",{
                password:newPassword,
                otp:OTPCode
            })
            if(res.status === "PasswordNotUpdated"){
                toast.info("کد تایید اشتباه است", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }else {
                toast.success("تغییر رمز عبور با موفقیت انجام شد", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setNewPassword("");
                setRepeatNewPassword("");
                setOTPCode("")
                setIsSendOTP(false)
            }

        }
    }

    const sendOTPCode = async () =>{
        const res = await api.post("register/updatePassword/sendOTP/panel")
        setIsSendOTP(true)
    }

    const sendOTPCodeAgain = async () => {
        const res = await api.post("register/updatePassword/sendOTP/panel")
        setIsSendOTP(false)
        setIsSendAgainOTP(false)
    }
    return(
        <div className="flex flex-col">
            <CacheProvider value={cacheRtl}>
                <div className="flex flex-col space-y-6 justify-center">
                    <div className="flex justify-around">
                        <div className="w-1/2">
                            <TextField
                                disabled={!isSendOTP}
                                fullWidth
                                inputProps={{
                                    autocomplete: 'new-password',
                                    form: {
                                        autocomplete: 'off',
                                    },
                                }}
                                label={"كد تاييد"}
                                value={OTPCode}
                                type={"number"}
                                sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                onChange={(e) => setOTPCode(e.target.value)}/>
                        </div>
                        <div className="w-1/2 mx-3 flex items-center">
                            {
                                !isSendOTP ? (
                                    <button className="px-4 py-3 bg-labelGreen rounded text-mainGray font-bold text-[0.8rem]" onClick={sendOTPCode}>
                                        دريافت كد تاييد
                                    </button>
                                ) : (
                                    <Countdown
                                        date={Date.now() + 120000}
                                        renderer={renderer}/>
                                )
                            }
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <TextField
                            label={"رمز عبور جدید"}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                            // error={errors.length !== 0}
                            /* disabled={!firstNameAllowed}*/
                            value={newPassword}
                            type={"password"}
                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                            onChange={(e) => setNewPassword(e.target.value)}/>
                        <TextField
                            label={"تکرار رمز عبور جدید"}
                            inputProps={{
                                autocomplete: 'new-password',
                                form: {
                                    autocomplete: 'off',
                                },
                            }}
                            // error={errors.length !== 0}
                            /* disabled={!firstNameAllowed}*/
                            value={repeatNewPassword}
                            type={"password"}
                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            className='disabled:cursor-not-allowed disabled:bg-neutral-400 mt-10 font-bold bg-labelGreen text-black px-24 py-4 rounded-md text-sm hover:opacity-90'
                            onClick={handleChangePassword}>ثبت تغییرات
                        </button>
                    </div>
                </div>
            </CacheProvider>
        </div>
    )
}

export default ChangePassword

