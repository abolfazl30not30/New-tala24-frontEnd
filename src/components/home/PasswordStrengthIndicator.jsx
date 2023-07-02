import {useEffect, useState} from "react";
import React from "react";
import zxcvbn from "zxcvbn"

const PasswordStrengthIndicator = (props) => {
    const [strength, setStrength] = useState(0)
    const strengthColor = () => {
        switch (strength) {
            case 0:
                return null
            case 25:
                return "#EA1111"
            case 50:
                return "#FFAD00"
            case 75:
                return "#9bc158"
            case 100:
                return "#00b500"
        }
    }
    const strengthPassword = () => {
        switch (strength) {
            case 0:
                return null
            case 25:
                return "خیلی ضعیف"
            case 50:
                return "ضعیف"
            case 75:
                return "متوسط"
            case 100:
                return "قوی"
        }
    }
    useEffect(() => {
        return () => {
            setStrength(zxcvbn(props.password).score * 100 / 4)
        };
    }, [props.password]);

    return (
        <>
            <div className={"w-full mt-2 bg-transparent rounded-full justify-between flex"} style={{height: "0.2rem"}}>
                <div className={"rounded-full mt-1"} style={{height: "0.2rem", width: `${strength}%`,backgroundColor: strengthColor()}}/>
                <p className={"text-[0.6rem] mb-3 mx-2"} style={{color: strengthColor()}}>{strengthPassword()}</p>
            </div>
        </>
    )
}
export default PasswordStrengthIndicator;