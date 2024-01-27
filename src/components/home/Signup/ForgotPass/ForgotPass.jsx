import React, {useState} from "react"
import Username from "./Username";
import OTPCode from "./OTPCode";
import ResetPassword from "./ResetPassword";

const ForgotPass = () =>{
    const [step,setStep] = useState("username")
    const [username,setUsername] = useState("")
    const [code,setCode] = useState("")

    const changeStep = (step) =>{
        setStep(step)
    }

    return(
        <>
            {
                step === "username" ? (<Username changeStep={changeStep} username={username} setUsername={setUsername}/>) : (
                    step === "OTPCode" ? (<OTPCode changeStep={changeStep} username={username} code={code} setCode={setCode} />) :
                        (<ResetPassword username={username}/>))
            }
        </>
    )
}
export default ForgotPass;