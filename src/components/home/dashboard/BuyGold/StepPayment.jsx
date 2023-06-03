import React from 'react'
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {FormLabel, TextField} from "@mui/material";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../../helper/SeparateNumber";

function StepPayment(props) {

    return (
        <>
            <h2 className="text-white text-2xl font-medium mb-6">
                ثبت درخواست
            </h2>
            <div className="flex justify-center">
                <div className="factor-background  mx-2 w-full md:w-2/3 flex flex-col  justify-between space-y-3 border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                    <div className="flex justify-center">
                        <img src="https://cloud.tala24.co/images/cartLogo.svg" alt="coin"/>
                    </div>
                    <div className="flex justify-center py-4 border-dotted border-b-2 border-neutral-700 ">
                        <h4 className="text-[1rem] font-bold">سبد خرید شما</h4>
                    </div>
                    <div className="flex justify-center flex-col flex-wrap">
                        <div className="w-full flex justify-between flex-wrap py-3 border-dotted border-b-2 border-neutral-700">
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