import React, {useContext, useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import * as yup from "yup";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {RiHandCoinFill} from "react-icons/ri";
import signup from "../../../../contexts/signup";
import {SeparateNumber} from "../../../../helper/SeparateNumber";


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

function StepBuyGold(props) {
    const context = useContext(signup);

    return (
        <>
            <h2 className="text-white text-2xl font-medium mb-6">
                خرید طلا
            </h2>
            <div className="inventory-box bg-mainGray rounded-xl p-3 flex justify-center mx-4 md:mx-10 mt-3 mb-4">
                <div className="flex flex-col rounded-xl justify-center p-2 border-dashed border-2 border-neutral-700 ">
                    <div className="flex justify-center mb-3"><RiHandCoinFill className="text-gold" fontSize="2rem"/></div>
                    <h5 className="mb-3 text-[1rem] text-gold">موجودی کیف پول</h5>
                    <div className="text-[0.8rem] flex justify-center"><span className="ml-2">{EnglishToPersian(SeparateNumber(context.accountInfo.wallet.inventory))}</span>ریال </div>
                </div>
            </div>
            <div className="px-1 flex flex-col items-center md:border-dashed md:border-2 md:border-neutral-700 md:py-5 md:px-3 mx-4 md:mx-10 rounded-xl">
                <div className="mb-5">
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="position"
                            value={props.type}
                            onChange={(e) => props.handleSetType(e)}
                        >
                            <FormControlLabel  value="price" control={<Radio/>} label="بر اساس مبلغ" />
                            <FormControlLabel value="weight" control={<Radio/>} label="بر اساس وزن طلا"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="mt-3 md:mt-0 buyGoldInput w-full md:w-1/2">
                    {
                        props.type === 'price'
                            ? (
                                <div>
                                    <TextField
                                        fullWidth
                                        label="مبلغ پرداختی"
                                        error={props.priceErrors.length !== 0}
                                        value={props.valuePrice}
                                        onChange={props.handleChangePrice}
                                        sx={{input: {color: '#fff !important'}}}
                                        type="number"
                                        name="numberformat"
                                        id="formatted-numberformat-input"
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">ریال</InputAdornment>,
                                        }}
                                    />
                                    {
                                        props.priceErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>
                            )
                            : (
                                <div>
                                    <TextField
                                        fullWidth
                                        label="وزن طلا"
                                        error={props.weightErrors.length !== 0}
                                        id="outlined-start-adornment"
                                        value={props.valueWeight}
                                        sx={{input: {color: '#fff !important'}}}
                                        onChange={props.handleChangeWeight}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">گرم</InputAdornment>,
                                        }}
                                        inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                                    />
                                    {
                                        props.weightErrors.map((error, index) =>
                                            <small key={index}
                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                        )
                                    }
                                </div>
                            )
                    }
                </div>
                <div className="w-full md:w-1/2 mt-5">
                    {
                        props.type === 'price' ? (
                            <div className="flex justify-center items-center flex-col md:flex-row p-4 text-bgGray rounded w-full background-label">
                                <h5 className="font-bold ml-4">وزن طلا:</h5>
                                <span className="font-bold" >{EnglishToPersian(props.valueWeight)}<span className="font-bold mr-2">گرم</span></span>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center  flex-col md:flex-row p-4 text-bgGray rounded w-full background-label">
                                <h5 className="font-bold ml-4">مبلغ پرداختی:</h5>
                                <span className="font-bold">{EnglishToPersian(SeparateNumber(props.valuePrice))} <span className="font-bold mr-2">ریال</span></span>
                            </div>
                        )
                    }
                </div>
            </div>

        </>

    )
}

export default StepBuyGold