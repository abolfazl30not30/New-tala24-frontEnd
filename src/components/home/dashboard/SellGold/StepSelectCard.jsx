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
            <h2 className="text-gold text-xl font-medium mb-6">
                انتخاب شماره شبا
            </h2>

            <div className="px-4 flex md:flex-row flex-col justify-between">
                <div className="flex flex-col space-y-4 md:w-1/2 md:ml-4">
                    <div>
                        <CacheProvider value={cacheRtl}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" style={{fontSize: "0.8rem"}}> انتخاب
                                    شماره شبا</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedShaba}
                                    label="انتخاب شماره شبا"
                                    onChange={handleChangeShaba}>
                                    {
                                        shabaNumber?.map((shaba) => (
                                            <MenuItem value={shaba}>{shaba}</MenuItem>
                                        ))
                                    }

                                </Select>
                            </FormControl>
                        </CacheProvider>
                    </div>
                    <button
                        className='flex flex-row justify-center border-2 border-[#dfaf3d] border-solid rounded p-4 text-xs'
                        onClick={handleShowShaba}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                             strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        افزودن شماره شبا
                    </button>

                    <Transition appear show={isOpenShaba} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeShaba} dir="rtl">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25"/>
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div
                                    className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95">
                                        <Dialog.Panel
                                            className="w-full max-w-md  transform rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-white">
                                                افزودن شماره شبا جدید
                                            </Dialog.Title>
                                            <div className="flex flex-col mt-6">
                                                <CacheProvider value={cacheRtl}>
                                                    <TextField id="outlined-basic" className="w-100 "
                                                               label={"شماره شبا مدنظر خود را وارد کنید..."}
                                                               variant="outlined"
                                                               fullWidth
                                                               multiline
                                                               value={newAccountNumber}
                                                               onChange={(e) => setNewAccountNumber(e.target.value)}
                                                               minRows={3}
                                                               InputLabelProps={{
                                                                   style: {
                                                                       color: "#000 !important",
                                                                       fontSize: "0.9rem"
                                                                   }
                                                               }}
                                                               InputProps={{
                                                                   style: {fontFamily: "dana"}
                                                               }}/>

                                                </CacheProvider>
                                            </div>
                                            <div className="mt-4">
                                                <div className="flex flex-row justify-evenly">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={() => {
                                                            handleAddNewShaba()
                                                        }}>
                                                        ثبت
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                        onClick={closeShaba}>
                                                        بستن
                                                    </button>
                                                </div>

                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
                <div
                    className="flex flex-col space-y-3 border border-gold rounded-md border-solid border-2 p-3 md:w-1/2 text-sm mt-4 md:mt-0">
                    <div className='mb-2 text-md text-white'>اطلاعات تکمیلی:</div>
                    <div className="flex flex-row justify-between">
                        <div>قیمت طلا</div>
                        <div>{props.valuePrice.numberformat} ریال</div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>کارمزد تراکنش</div>
                        <div>-50000 ریال</div>
                    </div>
                    <div className="border border-gold border-solid my-2"></div>
                    <div className="flex flex-row justify-between">
                        <div>قابل پرداخت</div>
                        <div>{(parseInt(props.valuePrice.numberformat) - 50000)} ریال</div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default StepSelectCard