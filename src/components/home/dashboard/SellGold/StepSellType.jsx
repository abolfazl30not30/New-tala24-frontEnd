import React from 'react'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';


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


function StepSellType(props) {
    return (
        <>
            <h2 className="text-gold text-xl font-medium mb-6">
                فروش طلا
            </h2>
            <div className="px-4 flex md:flex-row flex-col items-center justify-start">
                <FormControl className="md:w-1/3">
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={props.value}
                        onChange={props.handleChange}
                    >
                        <FormControlLabel value="price" control={<Radio/>} label="بر اساس مبلغ"/>
                        <FormControlLabel value="weight" control={<Radio/>} label="بر اساس وزن طلا"/>
                    </RadioGroup>
                </FormControl>
                <div className="mt-4 md:mt-0" style={{width: "50%"}}>
                    {
                        props.value === 'price'
                            ? (
                                <div>
                                    <TextField
                                        fullWidth
                                        label="مبلغ پرداختی"
                                        error={props.priceErrors.length !== 0}
                                        value={props.valuePrice.numberformat}
                                        onChange={props.handleChangePrice}
                                        sx={{input: {color: '#fff !important'}}}
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
            </div>

        </>

    )
}

export default StepSellType