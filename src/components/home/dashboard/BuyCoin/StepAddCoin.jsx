import React, {useState} from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import * as yup from "yup";
import coins from "../../../../images/icons.svg"
import {RiAddFill} from "react-icons/ri";

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


function StepAddCoin() {

    return (
        <>
            <div className="container">
                <div className="my-2 px-4">
                    <h2 className="text-white text-l font-bold" >تعیین تعداد سکه</h2>
                </div>
                <div className="coins flex justify-center ">
                    <div className="coin bg-mainGray rounded-2xl h-[5rem] w-1/2 flex border-5 border-sky-100">
                        <div className="icons flex justify-center items-center">
                            <img src={coins} className="w-3/4" alt="coins"/>
                        </div>
                        <div className="main">
                            <div className="text-section">
                                <h4 className="text-gold">سکه طلای 1 گرمی</h4>
                            </div>
                            <div className="button">
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-7">
                    <button className="bg-gold rounded text-black py-2 px-16 hover:opacity-70 flex items-center">
                        <RiAddFill/>
                         افـزودن سـکـه جدید
                    </button>
                </div>
            </div>
        </>

    )
}

export default StepAddCoin