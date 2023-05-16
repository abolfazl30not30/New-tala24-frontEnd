import React,{useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Num2persian from 'num2persian';

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

function InventoryIncrease() {
    const [amountEntered,setAmountEntered] =useState()

    const handleChangeAmount = (e) => {
        setAmountEntered(e.target.value)
    }

    return (
        <>


                    <div className="mt-5 text-white bg-[#252525] rounded-2xl p-10 w-3/4 flex items-center  flex-col">
                        <div className="mb-6 flex justify-start w-full">
                            <h3 className={'font-bold text-white text-2xl'}>
                                افزایش موجودی
                            </h3>
                        </div>
                        <div className={"w-3/4 mx-auto mt-10"}>
                            <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                    <div dir="rtl">
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
                            <span>{Num2persian(parseInt(amountEntered))} </span>
                            <span className="mr-2">تومان</span>
                        </div>
                        <div className="mt-6 flex justify-between w-3/4">
                                <button className='bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs'>100,000 تومان</button>
                                <button className='bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs'>500,000 تومان</button>
                                <button className='bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs'>1,000,000 تومان</button>
                                <button className='bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs'>2,000,000 تومان</button>
                                <button className='bg-[#2a2a2a] text-gold p-4 rounded-lg text-xs'>5,000,000 تومان</button>
                        </div>
                        <div className="mt-12 flex justify-center">
                            <button className='bg-gold text-black px-24 py-4 rounded-md text-sm hover:opacity-90'>پرداخت آنلاین</button>
                        </div>
                    </div>
        </>
    );
}

export default InventoryIncrease;