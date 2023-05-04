import React,{useState} from 'react';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {CacheProvider} from "@emotion/react";
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

    function convertToPersianCurrency(amount) {
        const currency = {
            'units': ['تومان','هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کوینتیلیون'],
            'singles': ['صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'],
            'teens': ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'],
            'tens': ['بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'],
            'hundred': 'صد',
            'thousand': 'هزار'
        };

        let str = '';
        let level = 0;
        /*amount += '0'*/
        while (amount > 0) {
            let cur = amount % 1000;
            amount = parseInt(amount / 1000);

            let tmp = '';
            if (cur > 99) {
                tmp += currency.singles[Math.floor(cur / 100)] + currency.hundred + ' ';
                cur = cur % 100;
            }

            if (cur > 9 && cur < 20) {
                tmp += currency.teens[cur - 10] + ' ';
            } else if (cur >= 20) {
                tmp += currency.tens[Math.floor(cur / 10) - 2] + ' ';
                cur = cur % 10;
            }

            if (cur >= 1 && cur <= 9) {
                tmp += currency.singles[cur] + ' ';
            }

            if (level > 0 && tmp !== '') {
                tmp += currency.units[level] + ' ';
            }

            str = tmp + str;
            level++;
        }

        return str.trim() + ' تومان';
    }
    const handleChangeAmount = (e) => {
        setAmountEntered(e.target.value)
    }

    return (
        <>
            <div className="flex flex-col">
                <h3 className={'mx-9 my-6 font-bold text-gold text-xl'}>
                    افزایش موجودی
                </h3>
                <div className="flex justify-center">
                    <div className="mt-5 text-white bg-[#252525] rounded-[8px] p-4 max-w-[700px] w-full text-center">
                        <div>
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
                                                /*onChange={(e) => (setAmount(e.target.value))}*/
                                                sx={{label: {color: '#fff !important'}}}
                                                name="numberformat"
                                                id="formatted-numberformat-input"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="start">ریال</InputAdornment>,
                                                }}
                                            />
                                            {/*{
                        props.priceErrors.map((error, index) =>
                            <small key={index}
                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                        )
                    }*/}
                                        </div>
                                    </div>
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                        <div className='mt-2 flex flex-row justify-center'>
                            <span className='ml-2'>معادل با</span>
                            <span>{convertToPersianCurrency(amountEntered)}</span>
                        </div>
                        <div className="mt-6 flex flex-row justify-between">
                            <button className='bg-[#2a2a2a] p-2 rounded-lg text-xs'>100هزارتومان</button>
                            <button className='bg-[#2a2a2a] p-2 rounded-lg text-xs'>100هزارتومان</button>
                            <button className='bg-[#2a2a2a] p-2 rounded-lg text-xs'>100هزارتومان</button>
                            <button className='bg-[#2a2a2a] p-2 rounded-lg text-xs'>100هزارتومان</button>
                        </div>
                        <button className='mt-6 bg-[#DFAF3D] text-black px-4 py-2 rounded-md text-sm'>پرداخت آنلاین</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InventoryIncrease;