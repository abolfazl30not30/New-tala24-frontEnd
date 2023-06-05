import React, {useEffect} from 'react'
import {CacheProvider} from "@emotion/react";
import FormControl from "@mui/material/FormControl";
import {InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {Link} from "react-router-dom";
import {RiAddFill} from "react-icons/ri";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../../helper/SeparateNumber";
import api from "../../../../api/api";

function StepPayment(props) {
    const [address, setAddress] = useState(["کاشان-شهرک انقلاب-کوی لاله-کوی نسیم"])
    const [selectedAddress, setSelectedAddress] = useState("text")
    const [typeOfPayment, setTypeOfPayment] = useState("online")

    const getAddresses = async ()=>{
        const listAddsresses = await api.get("info/show/fullAddress");
        setAddress(listAddsresses)

    }
    useEffect(()=>{
        getAddresses()
    },[])
    const handleChangeAddress = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleTypeOfPayment = (e) =>{
        setTypeOfPayment(e.target.value)
    }

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <h2 className="text-white text-2xl font-medium mb-6">
                پرداخت
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
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedAddress}
                                        onChange={handleChangeAddress}>
                                        {
                                            address?.map((address) => (
                                                <MenuItem  value={address}>{address}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                </FormControl>
                            </CacheProvider>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Link to='/dashboard/user-profile' className="px-10 py-2 bg-gold text-[1rem] text-bgGray text-center rounded-xl flex items-center" ><RiAddFill/>افزودن آدرس جدید</Link>
                        </div>
                    </div>
                    <div className="border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <h6 className="text-[1rem] font-bold">انتخاب روش پرداخت</h6>
                        </div>
                        <div>
                            <FormControl>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="position"
                                    value={typeOfPayment}
                                    onChange={(e) => handleTypeOfPayment(e)}
                                >
                                    <FormControlLabel  value="online" control={<Radio/>} label="پرداخت اینترنتی" />
                                    {/*<FormControlLabel value="bankCard" control={<Radio/>} label="پرداخت در محل(با کارت)" />*/}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="factor-background  mx-2 w-full md:w-1/2 flex flex-col items-center space-y-3 border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                    <div className="flex justify-center">
                        <img src="https://cloud.tala24.co/images/cartLogo.svg" alt="coin"/>
                    </div>
                    <div className="w-96 flex justify-center py-4 border-dotted border-b-2 border-neutral-700 ">
                        <h6 className="text-[1rem] font-bold">سبد خرید شما</h6>
                    </div>
                    <div className="w-96 flex justify-center flex-col">
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                وزن کل:
                            </span>
                            <span><span>{EnglishToPersian(props.totalWeight.toString())}</span> گرم </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                هزینه ارسال:
                            </span>
                            <span><span>{EnglishToPersian(SeparateNumber(props.shippingCost.toString()))}</span> ریال </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                کارمزد:
                            </span>
                            <span><span>{EnglishToPersian(SeparateNumber(props.totalWage.toString()))}</span> ریال </span>
                        </div>
                        <div className="mt-5 w-full flex justify-between py-3 px-2  border-solid border-2 border-neutral-700 bg-[#2F3135]">
                            <span>
                                مبلغ قابل پرداخت:
                            </span>
                            <span><span>{EnglishToPersian(SeparateNumber(props.totalCost.toString()))}</span> ریال </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepPayment