import React, {Fragment, useEffect, useState} from 'react'
import FormControl from "@mui/material/FormControl";
import {InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Dialog, Transition} from '@headlessui/react'
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import api from "../../../../api/api";

function StepSelectCard(props) {

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const [shabaNumber, setShabaNumber] = useState([])
    const getShaba = async () => {
        const accountData = await api.get(`account/user/${localStorage.getItem("username")}`)
        const addressesResponse = await api.get(`info/accountNumber/${accountData.id}`)
        setShabaNumber(addressesResponse)
    }
    useEffect(() => {
        getShaba()
    }, []);

    const [selectedShaba, setSelectedShaba] = useState("")
    const [newAccountNumber, setNewAccountNumber] = useState("")
    const [isOpenShaba, setIsOpenShaba] = useState(false);

    const handleShowShaba = () => {
        setIsOpenShaba(true);
    }

    const handleChangeShaba = (event) => {
        setSelectedShaba(event.target.value);
    };

    const closeShaba = () => {
        setIsOpenShaba(false)
    };

    const handleAddNewShaba = async (event) => {
        await api.post(`info`, {
            accountId: localStorage.getItem("id"),
            value: newAccountNumber,
            infoType: "accountNumber"
        })
        await getShaba()

        setNewAccountNumber("")

        setIsOpenShaba(false)
    };

    return (
        <>
            <h2 className="text-white text-2xl font-medium mb-6">
                ثبت درخواست
            </h2>
            <div className="flex justify-center">
                <div className="factor-background  mx-2 w-full md:w-2/3 flex flex-col items-center space-y-3 border border-[#7C7C80] rounded-md border-solid p-3 text-sm mt-4 md:mt-0 mb-4">
                    <div className="flex justify-center">
                        <img src="https://cloud.tala24.co/images/cartLogo.svg" alt="coin"/>
                    </div>
                    <div className="w-96 flex justify-center py-4 border-dotted border-b-2 border-neutral-700 ">
                        <h4 className="text-[1rem] font-bold">فاکتور فروش شما</h4>
                    </div>
                    <div className="w-96 flex justify-center flex-col">
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                وزن طلا:
                            </span>
                            <span><span>1.5</span> گرم </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                مبلغ:
                            </span>
                            <span><span>14000000</span> ریال </span>
                        </div>
                        <div className="w-full flex justify-between py-3 border-dotted border-b-2 border-neutral-700">
                            <span>
                                کارمزد:
                            </span>
                            <span><span>50000</span> ریال </span>
                        </div>
                        <div className="mt-5 w-full flex justify-between py-3 px-2  border-solid border-2 border-neutral-700 bg-[#2F3135]">
                            <span>
                                مبلغ قابل پرداخت:
                            </span>
                            <span><span>1400000</span> ریال </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepSelectCard