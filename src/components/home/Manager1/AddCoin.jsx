import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {createTheme} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider, ThemeProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis'
import {InputAdornment, TextField} from "@mui/material";
import './../../../style/admin.css'
import api from "../../../api/api";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import Switch from '@mui/material/Switch';
import {SeparateNumber} from "../../../helper/SeparateNumber";

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

export default function AddCoin(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()
    let [isOpenChangeWage, setIsOpenChangeWage] = useState(false)
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenConfirm, setIsOpenConfirm] = useState(false)
    let [weight, setWeight] = useState(null)
    let [wage, setWage] = useState(null)
    let [coins, setCoins] = useState([])
    let [targetCoinId, setTargetCoinId] = useState(null)
    let [targetCoinWage, setTargetCoinWage] = useState(null)

    useEffect(() => {
        const getData = async () => {
            const getCoins = await api.get("coin")
            setCoins(getCoins)
            console.log(getCoins)
        }

        getData()
    }, []);

    function closeModal() {
        setIsOpen(false)
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
        setIsOpenConfirm(true)
    }

    async function recordNewPrice() {
        await api.post("coin", {
            weight : weight,
            wage : wage
        })
        const getCoins = await api.get("coin")
        setCoins(getCoins)
        setIsOpenConfirm(false)
    }

    const handleChangeActive = async (event) => {
        const id = event.target.id;
        const active = !event.target.checked;
        await api.put(`coin/${id}`, {active: !active}).then(function (response) {
            console.log(response)
        });
        const getCoins = await api.get("coin")
        setCoins(getCoins)
    };

    function closeModalChangeWage() {
        setIsOpenChangeWage(false)
        setTargetCoinId(null)
        setTargetCoinWage(null)
    }

    function openModalChangeWage(id,wage) {
        setTargetCoinId(id)
        setTargetCoinWage(wage)
        setIsOpenChangeWage(true)
    }

    async function handleChangeWage() {
        await api.put(`coin/${targetCoinId}`, {wage: targetCoinWage})
        const getCoins = await api.get("coin")
        setCoins(getCoins)
        setIsOpenChangeWage(false)
        /* console.log(targetCoinId,targetCoinWage)*/
    }

    return (
        <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="text-white text-lg font-medium">سکه ها</div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="w-6 h-6 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    ثبت سکه جدید
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gold"
                                        >
                                            ثبت سکه جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <div className="flex flex-col space-y-4">
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="وزن"
                                                                value={weight}
                                                                onChange={(e) => setWeight(e.target.value)}
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end"><span
                                                                        style={{color: "#fff"}}>گرم</span></InputAdornment>,
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {
                                                                        fontSize: "0.9rem"
                                                                    }
                                                                }}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                            />
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="کارمزد"
                                                                value={wage}
                                                                onChange={(e) => setWage(e.target.value)}
                                                                InputProps={{
                                                                    endAdornment: <InputAdornment position="end"><span
                                                                        style={{color: "#fff"}}>ریال</span></InputAdornment>,
                                                                }}
                                                                InputLabelProps={{
                                                                    style: {
                                                                        fontSize: "0.9rem"
                                                                    }
                                                                }}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
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
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gold"
                                        >
                                            ثبت قیمت جدید
                                        </Dialog.Title>
                                        <div className="text-white mt-6">
                                            آیا از ثبت سکه جدید مطمئن هستید؟
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
                    <th className={'p-4'}>وزن</th>
                    <th className={'p-4'}>کارمزد</th>
                    <th className={'p-4'}>وضعیت</th>
                    <th className="p-4">عملیات</th>
                </tr>
                </thead>
                <tbody>
                {
                    coins?.map((item, index) => (
                        <tr>
                            <td className={'p-3'}>{index + 1}</td>
                            <td className={'p-3'}>{EnglishToPersian(SeparateNumber(item?.weight.toString()))}</td>
                            <td className={'p-3'}>{EnglishToPersian(SeparateNumber(item?.wage.toString()))}</td>
                            <td className={'p-3'}>
                                <Switch
                                    checked={item?.active}
                                    id={item?.id}
                                    onChange={handleChangeActive}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </td>
                            <td className="p-3">
                                <button
                                    type="button"
                                    onClick={() => openModalChangeWage(item.id,item.wage)}
                                    className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sx focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    ویرایش کارمزد
                                </button>
                                <Transition appear show={isOpenChangeWage} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModalChangeWage} dir="rtl">
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
                                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg font-medium leading-6 text-gold"
                                                        >
                                                            ویرایش کارمزد سکه
                                                        </Dialog.Title>
                                                        <div className="mt-6">
                                                            <CacheProvider value={cacheRtl}>
                                                                <ThemeProvider theme={theme}>
                                                                    <div dir="rtl">
                                                                        <div className="flex flex-col space-y-4">
                                                                            <TextField
                                                                                id="outlined-end-adornment"
                                                                                name="price"
                                                                                label="کارمزد"
                                                                                value={targetCoinWage}
                                                                                onChange={(e) => setTargetCoinWage(e.target.value)}
                                                                                InputProps={{
                                                                                    endAdornment: <InputAdornment position="end"><span
                                                                                        style={{color: "#fff"}}>ریال</span></InputAdornment>,
                                                                                }}
                                                                                InputLabelProps={{
                                                                                    style: {
                                                                                        fontSize: "0.9rem"
                                                                                    }
                                                                                }}
                                                                                sx={{
                                                                                    label: {color: '#fff !important'},
                                                                                    input: {color: '#fff !important'}
                                                                                }}
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
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={handleChangeWage}
                                                                >
                                                                    ثبت
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModalChangeWage}
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
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}
