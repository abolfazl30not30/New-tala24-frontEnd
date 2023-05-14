import React from 'react'
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {FormLabel, TextField} from "@mui/material";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";

function StepPayment(props) {
    // const [value, setValue] = React.useState('cash');
    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };
    return (
        <>
            <h2 className="text-gold text-xl font-medium mb-6">
                پرداخت
            </h2>
            <div className="mx-2 flex flex-col space-y-3 border border-gold rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                <div className='mb-2 text-md text-white'>اطلاعات تکمیلی:</div>
                <div className="flex flex-row justify-between">
                    <div>قیمت طلا</div>
                    <div>{props.valuePrice.numberformat} ریال</div>
                </div>
                {
                    props.shipmentType === "cash" ? null :
                        <div className="flex flex-row justify-between">
                            <div>هزینه ارسال</div>
                            <div>500000 ریال</div>
                        </div>
                }
                <div className="flex flex-row justify-between">
                    <div>کارمزد تراکنش</div>
                    <div>50000 ریال</div>
                </div>

                <div className="border border-gold border-solid my-2"></div>
                <div className="flex flex-row justify-between">
                    <div>قابل پرداخت</div>
                    <div>{(parseInt(props.valuePrice.numberformat) + 50000 + (props.shipmentType === "delivery" ? 500000 : 0))} ریال</div>
                </div>
            </div>
        </>
    )
}

export default StepPayment