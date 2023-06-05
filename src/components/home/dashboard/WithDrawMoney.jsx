import React, {useEffect, useState} from 'react';
import {InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Num2persian from 'num2persian';
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {PersianToEnglish} from "../../../helper/PersianToEnglish";
import FormControl from "@mui/material/FormControl";
import api from "../../../api/api";

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const {onChange, ...other} = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    }
                );
            }}
            thousandSeparator
            valueIsNumericString
            // className={}
            prefix="ريال "
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

function WithDrawMoney() {
    const [amountEntered, setAmountEntered] = useState("")
    const [accountNumber, setAccountNumber] = useState([{
        accountNumber: "",
        cardNumber: "",
        shabaNumber: "",
        bankName: ""
    }])

    const [selectedAccountNumber, setSelectedAccountNumber] = useState(accountNumber[0])

    const getAccountNumbers = async () =>{
        const newAccountNumbers = await api.get("info/show/accountNumber")
        setAccountNumber(newAccountNumbers)
    }

    useEffect(()=>{
        getAccountNumbers();
    },[])
    const handleChangeAccountNumber = (event) => {
        setSelectedAccountNumber(event.target.value);
    };

    const handleChangeAmount = (e) => {
        const value = EnglishToPersian(e.target.value)
        setAmountEntered(value)
    }

    const convertRialToToman = (amount) => {
        const number = parseInt(PersianToEnglish(amount))
        const toman = Math.floor(number / 10)
        return Num2persian(toman)
    }

    return (
        <>
            <div className="mt-5 text-white bg-[#252525] rounded-2xl p-10 w-full md:w-3/4 flex items-center  flex-col">
                <div className="mb-6 flex justify-start w-full">
                    <h3 className={'font-bold text-white text-2xl'}>
                        تسویه ریالی
                    </h3>
                </div>
                <div className={"w-3/4 mx-auto mt-10"}>
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <div className="mb-10">
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select" style={{color:"#fff"}}>انتخاب شماره حساب</InputLabel>
                                        <Select
                                            label="انتخاب شماره حساب"
                                            id="demo-simple-select"
                                            value={selectedAccountNumber}
                                            sx={{label: {color: '#fff !important'}}}
                                            onChange={handleChangeAccountNumber}>
                                            {
                                                accountNumber?.map((accountNumber) => (
                                                    <MenuItem  value={accountNumber.accountNumber}>{accountNumber.accountNumber}</MenuItem>
                                                ))
                                            }
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className="">
                                    <TextField
                                        fullWidth
                                        label="مبلغ پرداختی"
                                        /*error={props.priceErrors.length !== 0}*/
                                        value={amountEntered}
                                        onChange={handleChangeAmount}
                                        sx={{label: {color: '#fff !important'}}}
                                        name="numberformat"
                                        id="formatted-numberformat-input"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">ریال</InputAdornment>,
                                        }}
                                    />
                                </div>

                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                </div>

                <div className='mt-5 mb-3 flex flex-row justify-center'>
                    <span className='ml-2'>معادل با</span>
                    <span>{convertRialToToman(amountEntered)}</span>
                    <span className="mr-2">تومان</span>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-3/4">
                    <button className='mx-2 my-2 bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs' onClick={() => {
                        setAmountEntered(EnglishToPersian("1000000"))
                    }}>{EnglishToPersian("1,000,000")} ریال
                    </button>
                    <button className='mx-2 my-2 bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs' onClick={() => {
                        setAmountEntered(EnglishToPersian("5000000"))
                    }}>{EnglishToPersian("5,000,000")} ریال
                    </button>
                    <button className='mx-2 my-2 bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs' onClick={() => {
                        setAmountEntered(EnglishToPersian("10000000"))
                    }}>{EnglishToPersian("10,000,000")} ریال
                    </button>
                    <button className='mx-2 my-2 bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs' onClick={() => {
                        setAmountEntered(EnglishToPersian("20000000"))
                    }}>{EnglishToPersian("20,000,000")} ریال
                    </button>
                    <button className='mx-2 my-2 bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs' onClick={() => {
                        setAmountEntered(EnglishToPersian("50000000"))
                    }}>{EnglishToPersian("50,000,000")} ریال
                    </button>
                </div>
                <div className="mt-12 flex justify-center">
                    <button className='bg-labelGreen text-black px-24 py-4 font-bold rounded-md text-sm hover:opacity-90'>
                        ارسال درخواست
                    </button>
                </div>
            </div>
        </>
    );
}

export default WithDrawMoney;