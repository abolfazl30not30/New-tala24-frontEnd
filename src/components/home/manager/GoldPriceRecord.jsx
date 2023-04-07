import React from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider, ThemeProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis'
import {TextField} from "@mui/material";
import './../../../style/admin.css'

// Create RTL MUI
const theme = createTheme({
    direction: 'rtl',
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export default function GoldPriceRecord() {

    let [isOpen, setIsOpen] = useState(false)
    let [isOpenConfirm, setIsOpenConfirm] = useState(false)
    let [goldPriceHistory,setGoldPriceHistory] = useState([
        {
            date : '12/12/12',
            adminName : 'اصغر',
            price : '100000000'
        },
        {
            date : '12/12/12',
            adminName : 'اصغر',
            price : '100000000'
        },
        {
            date : '12/12/12',
            adminName : 'اصغر',
            price : '100000000'
        },
        {
            date : '12/12/12',
            adminName : 'اصغر',
            price : '100000000'
        },
        {
            date : '12/12/12',
            adminName : 'اصغر',
            price : '100000000'
        },
    ])
    let [newGoldPrice,setNewGoldPrice] = useState()
    function closeModal() {
        setIsOpen(false)
        setNewGoldPrice(0)
    }
    function openModal() {
        setIsOpen(true)
    }
    function closeModalConfirm() {
        setIsOpenConfirm(false)
        setIsOpen(true)
    }
    function openModalConfirm() {
        setIsOpen(false)
        setNewGoldPrice(0)
        setIsOpenConfirm(true)
    }
    const getPrice = e => setNewGoldPrice(e.target.value)
    function recordNewPrice() {
        setIsOpenConfirm(false)
        console.log(newGoldPrice)
    }
    return (
        <div className="bg-[#141414] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="text-white text-lg font-medium">قیمت طلا</div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md flex flex-row items-center bg-[#DFAF3D] text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>

                    ثبت قیمت جدید
                </button>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal} dir="rtl">
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
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            ثبت قیمت جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <div className="flex flex-col space-y-4">
                                                            <TextField
                                                                name="price"
                                                                label="قیمت"
                                                                value={newGoldPrice}
                                                                onChange={getPrice}
                                                            />
                                                        </div>
                                                    </div>
                                                </ThemeProvider>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={openModalConfirm}
                                                >
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
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
                <Transition appear show={isOpenConfirm} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal} dir="rtl">
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
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            ثبت قیمت جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            آیا از ثبت قیمت جدید مطمئن هستید؟
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={recordNewPrice}
                                                >
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModalConfirm}
                                                >
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
            <table className='mt-8 text-white'>
                <thead>
                    <tr>
                        <th className={'p-4'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                            </svg>
                        </th>
                        <th className={'p-4'}>تاریخ</th>
                        <th className={'p-4'}>ثبت کننده</th>
                        <th className={'p-4'}>قیمت</th>
                    </tr>
                </thead>
                <tbody>
                {
                    goldPriceHistory.map((item,index) => (
                        <tr>
                            <td className={'p-3'}>{index+1}</td>
                            <td className={'p-3'}>{item.date}</td>
                            <td className={'p-3'}>{item.adminName}</td>
                            <td className={'p-3'}>{item.price}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
