import React, {Fragment, useEffect, useState} from 'react'
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import {InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Combobox, Dialog, Transition} from '@headlessui/react'
import {CacheProvider, ThemeProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import api from "../../../../api/api";

function StepReceiveType(props) {
    const getAddress = async () => {
        const accountData = await api.get(`account/user/${localStorage.getItem("username")}`)
        const addressesResponse = await api.get(`info/address/${accountData.id}`)

        setAddress(addressesResponse)
    }
    useEffect(() => {
        getAddress()
    }, []);

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const[isOpenAddress,setIsOpenAddress] = useState(false)

    const [address, setAddress] = useState(["test"])
    const [newAddress, setNewAddress] = useState("")

    const [selectedAddress, setSelectedAddress] = useState("")
    const [query, setQuery] = useState('')
    const [isInputNewAddress, setIsInputNewAddress] = useState(false)

    const handleShowNewAddress = () => {
        setIsOpenAddress(true);
    }

    const handleChangeAddress = (event) => {
        setSelectedAddress(event.target.value);
    };

    const closeAddress = () => {
       setIsOpenAddress(false)
    };
    const handleAddNewAddress = async (event) => {
        await api.post(`info`, {
            accountId: localStorage.getItem("id"),
            value: newAddress,
            infoType: "address"
        })

        await getAddress()

        setNewAddress("")
        setIsOpenAddress(false)
    };

    return (<>

            <h2 className="text-gold text-xl font-medium mb-6">
                نوع دریافت
            </h2>
            <div className="px-4 flex md:flex-row flex-col justify-between items-center">
                <FormControl className='md:w-1/4'>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={props.value}
                        onChange={(event) => {
                            props.handleChange(event.target.value)
                        }}
                    >
                        <FormControlLabel value="cash" control={<Radio/>} label="نگه داری در صندوق"/>
                        <FormControlLabel value="delivery" control={<Radio/>} label="تحویل درب منزل"/>
                    </RadioGroup>
                </FormControl>

                <div className="md:w-2/4">
                    {props.value === 'delivery' &&
                        (<div className="flex flex-col space-y-4">
                            <div>
                                <CacheProvider value={cacheRtl}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label" style={{fontSize:"0.8rem"}}> انتخاب آدرس</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selectedAddress}
                                            label="وضعيت"
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
                             <button className='flex flex-row justify-center border-2 border-[#dfaf3d] border-solid rounded p-4 text-xs' onClick={handleShowNewAddress}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    افزودن آدرس جدید
                             </button>

                            <Transition appear show={isOpenAddress} as={Fragment}>
                                <Dialog as="div" className="relative z-10" onClose={closeAddress} dir="rtl">
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
                                                    className="w-full max-w-md transform rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                                    <Dialog.Title
                                                        as="h3"
                                                        className="text-lg  font-medium leading-6 text-white">
                                                        افزودن آدرس جدید
                                                    </Dialog.Title>
                                                    <div className="flex flex-col mt-6">
                                                        <CacheProvider value={cacheRtl}>
                                                            <TextField id="outlined-basic" className="w-100 " label=" آدرس مدنظر خود را وارد کنید..."
                                                                       variant="outlined"
                                                                       value={newAddress}
                                                                       onChange={(e) => setNewAddress(e.target.value)}
                                                                       fullWidth
                                                                       multiline
                                                                       minRows={3}
                                                                       InputLabelProps={{style: {fontFamily: "dana", fontSize: "0.9rem"}}}
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
                                                                onClick={()=>{handleAddNewAddress()}}>
                                                                ثبت
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                onClick={closeAddress}>
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
                        </div>)}
                </div>
            </div>

        </>)
}

export default StepReceiveType