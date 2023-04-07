import {useContext, useEffect, useState} from "react";
import React from "react";
import {useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import signup from "../../../contexts/signup";
import api from "../../../api/api";
import * as yup from "yup";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {PersianToEnglish} from "../../../helper/PersianToEnglish";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {CacheProvider} from '@emotion/react';
import {prefixer} from 'stylis';

const CompleteRegistration = () => {

    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [postalCode, setPostalCode] = useState("")
    const [address, setAddress] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [nationalCode, setNationalCode] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [accountNumber, setAccountNumber] = useState("")
    const [firstNameErrors, setFirstNameErrors] = useState([]);
    const [lastNameErrors, setLastNameErrors] = useState([]);
    const [nationalCodeErrors, setNationalCodeErrors] = useState([]);
    const [accountNumberErrors, setAccountNumberErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [postalCodeErrors, setPostalCodeErrors] = useState([]);

    const [firstNameAllowed, setFirstNameAllowed] = useState(true);
    const [lastNameAllowed, setLastNameAllowed] = useState(true);
    const [nationalCodeAllowed, setNationalCodeAllowed] = useState(true);
    const [accountNumberAllowed, setAccountNumberAllowed] = useState(true);
    const [emailAllowed, setEmailAllowed] = useState(true);
    const [postalCodeAllowed, setPostalCodeAllowed] = useState(true);
    const [addressAllowed, setAddressAllowed] = useState(true);
    const [fatherNameAllowed, setFatherNameAllowed] = useState(true);

    const info = useContext(signup)

    const navigate = useNavigate()

    const validation = async () => {
        const firstNameSchema = yup.object().shape({
            firstName: yup.string().required("این فیلد الزامی است."),
        })
        const lastNameSchema = yup.object().shape({
            lastName: yup.string().required("این فیلد الزامی است.")
        })
        const nationalCodeSchema = yup.object().shape({
            nationalCode: yup.string().required("این فیلد الزامی است.").min(10, "کد ملی باید ۱۰ رقم باشد.").matches(/^[0-9]*$/, "لطفا عدد وارد کنید.")
        })
        const emailSchema = yup.object().shape({
            email: yup.string().email("ایمیل صحیح نمی باشد")
        })
        const postalCodeSchema = yup.object().shape({
            postalCode: yup.string().matches(/^[0-9]*$/, "لطفا عدد وارد کنید.")
        })
        let field1 = false
        let field2 = false
        let field3 = false
        let field4 = false
        let field5 = false
        try {
            await firstNameSchema.validate({firstName}, {abortEarly: false})
            field1 = true
        } catch (error) {
            setFirstNameErrors(error.errors)
        }
        try {
            await lastNameSchema.validate({lastName}, {abortEarly: false})
            field2 = true
        } catch (error) {
            setLastNameErrors(error.errors)
        }
        try {
            await nationalCodeSchema.validate({nationalCode}, {abortEarly: false})
            field3 = true
        } catch (error) {
            setNationalCodeErrors(error.errors)
        }
        try {
            await emailSchema.validate({email}, {abortEarly: false})
            field4 = true
        } catch (error) {
            setEmailErrors(error.errors)
        }
        try {
            await postalCodeSchema.validate({postalCode}, {abortEarly: false})
            field5 = true
        } catch (error) {
            setPostalCodeErrors(error.errors)
        }
        console.log(field1, field2, field3, field4, field5)
        return field1 && field2 && field3 && field4 && field5
    }


    useEffect(() => {
        if (info.accountCompleteRegistrationAllowed === false) {
            navigate("/")
        }

        console.log(442)
        console.log(info.information)

        info.information.map((info) => {
            switch (info.infoType) {
                case "firstName":
                    console.log(2)
                    setFirstName(info.value)
                    setFirstNameAllowed(false)
                    break;
                case "lastName":
                    console.log(3)
                    setLastName(info.value)
                    setLastNameAllowed(false)
                    break;
                case "nationalCode":
                    console.log(4)
                    setNationalCode(info.value)
                    setNationalCodeAllowed(false)
                    break;
                case "email":
                    console.log(5)
                    setEmail(info.value)
                    setEmailAllowed(false)
                    break;
                case "postalCode":
                    console.log(6)
                    setPostalCode(info.value)
                    setPostalCodeAllowed(false)
                    break;
                case "fatherName":
                    console.log(8)
                    setFatherName(info.value)
                    setFatherNameAllowed(false)
                    break;
            }
        })

    }, [info.information])

    const postInfos = async () => {
        firstNameAllowed ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: firstName,
            infoType: "firstName"
        }) : await console.log()

        lastNameAllowed ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: lastName,
            infoType: "lastName"
        }) : await console.log()

        nationalCodeAllowed ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: nationalCode,
            infoType: "nationalCode"
        }) : await console.log()

        emailAllowed && email !== "" ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: email,
            infoType: "email"
        }) : await console.log()

        postalCodeAllowed && postalCode !== "" ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: postalCode,
            infoType: "postalCode"
        }) : await console.log()

        fatherNameAllowed && fatherName !== "" ? await api.post("info", {
            accountId: localStorage.getItem("id"),
            value: fatherName,
            infoType: "fatherName"
        }) : await console.log()
    }

    const handleInputs = async () => {
        // if (valid)
        setFirstNameErrors([])
        setLastNameErrors([])
        setNationalCodeErrors([])
        setEmailErrors([])
        setPostalCodeErrors([])
        const valid = await validation()

        if (valid) {
            await postInfos()
        }

        await new Promise(r => setTimeout(r, 3000));

        const res = await api.get(`account/user/${localStorage.getItem("username")}`)

        localStorage.setItem("id", res.id)
        await info.setInformation(res.infos)

    }

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <div className={'flex justify-center'}>
                <div className={'container w-100 pb-4 bg-[#1b1b1b]'}>
                    <h3 className={' mx-10  mt-5 font-bold text-gold text-2xl'}>
                        تکمیل مشخصات
                    </h3>
                    <CacheProvider value={cacheRtl}>
                        <div className={"mx-10"}>
                            <div className={'flex w-100 mt-10'}>
                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"نام*"}
                                        // error={errors.length !== 0}
                                        disabled={!firstNameAllowed}
                                        value={firstName}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    {
                                        firstNameErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>

                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"نام خانوادگی*"}
                                        // error={errors.length !== 0}
                                        disabled={!lastNameAllowed}
                                        value={lastName}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    {
                                        lastNameErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'flex w-100'}>
                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"کد ملی*"}
                                        // error={errors.length !== 0}
                                        disabled={!nationalCodeAllowed}
                                        value={EnglishToPersian(nationalCode)}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setNationalCode(PersianToEnglish(e.target.value))}
                                    />
                                    {
                                        nationalCodeErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>
                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"نام پدر"}
                                        value={fatherName}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setFatherName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className={'flex w-100'}>
                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"ایمیل"}
                                        // error={errors.length !== 0}
                                        value={email}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        emailErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>

                                <div className={'flex flex-col justify-center mx-4 my-4 w-1/2'}>
                                    <TextField
                                        label={"کدپستی"}
                                        // error={errors.length !== 0}
                                        value={EnglishToPersian(postalCode)}
                                        type={"text"}
                                        sx={{input: {color: '#fff !important'}}}
                                        className={'field bg-[#212121] w-full rounded h-[45px] p-4 text-white'}
                                        onChange={(e) => setPostalCode(PersianToEnglish(e.target.value))}
                                    />
                                    {
                                        postalCodeErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>
                            </div>

                            <div className={'mx-4 mt-10 flex justify-center items-center'}>
                                <button
                                    onClick={() => {
                                        handleInputs()
                                    }}
                                    className={'flex justify-center items-center bg-mainGold w-1/2 rounded h-[45px]'}
                                >
                            <span className={'text-black'}>
                                ثبت
                            </span>
                                </button>
                            </div>
                        </div>
                    </CacheProvider>
                </div>
            </div>
        </>
    )
}

export default CompleteRegistration;