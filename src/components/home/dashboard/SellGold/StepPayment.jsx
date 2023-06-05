import React from 'react'
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {FormLabel, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../../helper/SeparateNumber";
import {CacheProvider} from "@emotion/react";
import {Link} from "react-router-dom";
import {RiAddFill} from "react-icons/ri";
import {useEffect, useState} from "react";
import api from "../../../../api/api";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function StepPayment(props) {


    const [accountNumber, setAccountNumber] = useState([{
        accountNumber: "",
        cardNumber: "",
        shabaNumber: "",
        bankName: ""
    }])


    const getAccountNumbers = async () =>{
        const newAccountNumbers = await api.get("info/show/accountNumber")
        setAccountNumber(newAccountNumbers)
    }

    useEffect(()=>{
        getAccountNumbers();
    },[])

    const handleChangeAccountNumber = (event) => {
        props.setSelectedAccountNumber(event.target.value);
    };


    return (
        <>
            <h2 className="text-white text-2xl font-medium mb-6">
                ثبت درخواست
            </h2>
            <div className="flex justify-between md:flex-row flex-col">
                <div className="mx-2 md:w-1/2 space-y-3">
                    <div className=" border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <h6 className="text-[1rem] font-bold">انتخاب آدرس</h6>
                        </div>
                        <div className="mt-5">
                            <CacheProvider value={cacheRtl}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select" style={{color:"#fff"}}>انتخاب شماره حساب</InputLabel>
                                    <Select
                                        label="انتخاب شماره حساب"
                                        id="demo-simple-select"
                                        value={props.selectedAccountNumber}
                                        sx={{label: {color: '#fff !important'}}}
                                        onChange={handleChangeAccountNumber}>
                                        {
                                            accountNumber?.map((accountNumber) => (
                                                <MenuItem  value={accountNumber.accountNumber}>{accountNumber.accountNumber}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </CacheProvider>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Link to='/dashboard/bank-accounts' className="px-10 py-2 bg-gold text-[1rem] text-bgGray text-center rounded-xl flex items-center" ><RiAddFill/>افزودن حساب جدید</Link>
                        </div>
                    </div>
                </div>
                <div className="factor-background  mx-2 w-full md:w-1/2 flex flex-col items-center space-y-3 border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                    <div className="flex justify-center">
                        <img src="https://cloud.tala24.co/images/cartLogo.svg" alt="coin"/>
                    </div>
                    <div className="w-96 flex justify-center py-4 border-dotted border-b-2 border-neutral-700 ">
                        <h6 className="text-[1rem] font-bold">سبد فروش شما</h6>
                    </div>
                    <div className="w-96 flex justify-center flex-col">
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                وزن طلا:
                            </span>
                            <span><span>{EnglishToPersian(props.valueWeight)}</span> گرم </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                مبلغ:
                            </span>
                            <span><span>{EnglishToPersian(SeparateNumber(props.valuePrice))}</span> ریال </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                کارمزد:
                            </span>
                            <span><span>{EnglishToPersian("50,000")}</span> ریال </span>
                        </div>
                        <div className="mt-5 w-full flex justify-between py-3 px-2  border-solid border-2 border-neutral-700 bg-[#2F3135]">
                           <span>
                                مبلغ قابل پرداخت:
                            </span>
                            <span><span>{EnglishToPersian(SeparateNumber(props.finalPrice))}</span> ریال </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepPayment