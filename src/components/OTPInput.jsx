import {useEffect, useRef, useState} from "react";
import React from "react"
import "./../style/otpInput.css"
import {EnglishToPersian} from "../helper/EnglishToPersian";
import {PersianToEnglish} from "../helper/PersianToEnglish";

const OTPInput = (props) => {
    const [lengthError, setLengthError] = useState("");
    const [inputIndex, setInputIndex] = useState(0);
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input4, setInput4] = useState("");
    const [input5, setInput5] = useState("");
    const [input6, setInput6] = useState("");

    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();
    const inputRef5 = useRef();
    const inputRef6 = useRef();

    const refMap = [
        inputRef1,
        inputRef2,
        inputRef3,
        inputRef4,
        inputRef5,
        inputRef6,
    ]
    const valueMap = [
        input1,
        input2,
        input3,
        input4,
        input5,
        input6,
    ]

    useEffect(() => {
        if (inputIndex === 6) {
            let OtpCode = ""
            valueMap.forEach((value) => {OtpCode += value})
            if (OtpCode.length !== 6) {
                setLengthError("کد تایید باید ۶ رقم باشد.")
                return;
            } else {
                setLengthError("")
                props.handleCheckOTP(OtpCode)
                props.handleSetOTP(OtpCode)
                return;
            }
        }
        refMap[inputIndex].current.focus()
    }, [inputIndex]);

    return (
        <div className={"flex-col"}>
                <div className={"flex flex-row-reverse"}>

                    <input ref={inputRef1} value={EnglishToPersian(input1)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput1(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(1) : setInputIndex(0)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                    <input ref={inputRef2} value={EnglishToPersian(input2)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput2(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(2) : setInputIndex(0)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                    <input ref={inputRef3} value={EnglishToPersian(input3)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput3(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(3) : setInputIndex(1)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                    <input ref={inputRef4} value={EnglishToPersian(input4)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput4(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(4) : setInputIndex(2)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                    <input ref={inputRef5} value={EnglishToPersian(input5)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput5(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(5) : setInputIndex(3)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                    <input ref={inputRef6} value={EnglishToPersian(input6)} onChange={(e) => {
                        if ("0123456789".includes(PersianToEnglish(e.target.value))) {
                            setInput6(PersianToEnglish(e.target.value));
                            e.target.value !== "" ? setInputIndex(6) : setInputIndex(4)
                        }
                    }} maxLength={1} className={"w-[2rem] h-[2rem] text-[1.3rem] mx-1 rounded text-center otp-input"}/>

                </div>
                <small className={"text-red-600 mx-2 text-[0.6rem]"}>{lengthError}</small>
        </div>
    )
}
export default OTPInput