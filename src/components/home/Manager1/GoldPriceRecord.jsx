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
import {SeparateNumber} from "../../../helper/SeparateNumber";
import {LiveSeparate} from "../../../helper/LiveSeparate";
import {RemoveComma} from "../../../helper/RemoveComma";
import * as yup from "yup";
import {toast} from "react-toastify";
import {TbEdit} from "react-icons/tb";
import {BsTrashFill} from "react-icons/bs";

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

export default function Quote(props) {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenConfirm, setIsOpenConfirm] = useState(false)
    let [quoteBuyPrice, setQuoteBuyPrice] = useState("")
    let [quoteSellPrice, setQuoteSellPrice] = useState("")
    let [editBuyPrice, setEditBuyPrice] = useState("")
    let [editSellPrice, setEditSellPrice] = useState("")
    let [isOpenEditModal,setIsOpenEditModal] = useState(false)
    let [goldPriceHistory, setGoldPriceHistory] = useState([])
    let [targetEditPrice, setTargetEditPrice] = useState('');
    const [targetDeleteByDelete, setTargetDeleteByDelete] = useState('');
    const [isOpenDeleteAdmin, setIsOpenDeleteAdmin] = useState(false)

    const getData = async () => {
        const getGoldPriceReq = await api.get("goldPrice")
        if (getGoldPriceReq) {
            setGoldPriceHistory(getGoldPriceReq)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    function openModalDeleteAdmin(id) {
        setTargetDeleteByDelete(id);
        setIsOpenDeleteAdmin(true)
    }

    function closeModalDeleteAdmin() {
        setTargetDeleteByDelete('');
        setIsOpenDeleteAdmin(false)
    }

    const handleDeleteAdmin = async () => {
        await api.delete(`goldPrice/${targetDeleteByDelete}`)
        getData()
        closeModalDeleteAdmin()
    }

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function openModalEditPrice(id,buyPrice,sellPrice) {
        setTargetEditPrice(id)
        setEditBuyPrice(SeparateNumber(buyPrice))
        setEditSellPrice(SeparateNumber(sellPrice))
        setIsOpenEditModal(true)
    }

    function closeModalEditPrice() {
        setIsOpenEditModal(false)
    }



    function closeModalConfirm() {
        setIsOpenConfirm(false)
        setIsOpen(true)
    }

    async function openModalConfirm() {
        const valid = await validation();
        if (valid !== undefined) {
            setIsOpen(false)
            setIsOpenConfirm(true)
        }
    }

    const handleBuyPrice = (e) => {
        let value = e.target.value;
        value = LiveSeparate(value)
        setQuoteBuyPrice(value)
    }

    const handleSellPrice = (e) => {
        let value = e.target.value;
        value = LiveSeparate(value)
        setQuoteSellPrice(value)
    }

    const handleEditBuyPrice = (e) => {
        let value = e.target.value;
        value = LiveSeparate(value)
        setEditBuyPrice(value)
    }

    const handleEditSellPrice = (e) => {
        let value = e.target.value;
        value = LiveSeparate(value)
        setEditSellPrice(value)
    }

    const validation = async () => {
        const priceSchema = yup.object().shape({
            quoteBuyPrice: yup.string().required("لطفا قیمت خرید را وارد کنید"),
            quoteSellPrice: yup.string().required("لطفا قیمت فروش را وارد کنید"),
        })

        try {
            return await priceSchema.validate({
                quoteBuyPrice: quoteBuyPrice,
                quoteSellPrice: quoteSellPrice
            }, {abortEarly: false})
        } catch (error) {
            toast.info(error.errors[0], {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    const editValidation = async () => {
        const priceSchema = yup.object().shape({
            editBuyPrice: yup.string().required("لطفا قیمت خرید را وارد کنید"),
            editSellPrice: yup.string().required("لطفا قیمت فروش را وارد کنید"),
        })

        try {
            return await priceSchema.validate({
                editBuyPrice: editBuyPrice,
                editSellPrice: editSellPrice
            }, {abortEarly: false})
        } catch (error) {
            toast.info(error.errors[0], {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    async function recordNewPrice() {
        const updatedQuoteBuyPrice = RemoveComma(quoteBuyPrice)
        const updatedQuoteSellPrice = RemoveComma(quoteSellPrice)

        await api.post("goldPrice",
            {
                purchasePrice: updatedQuoteBuyPrice,
                sellPrice: updatedQuoteSellPrice
            }
        )

        const getGoldPriceReq = await api.get("goldPrice")
        if (getGoldPriceReq) {
            setGoldPriceHistory(getGoldPriceReq)
        }
        setIsOpenConfirm(false)
        setQuoteSellPrice("")
        setQuoteBuyPrice("")
    }

    async function handleEditPrice() {
        const valid = await editValidation();
        if (valid !== undefined){
            const updatedQuoteBuyPrice = RemoveComma(editBuyPrice)
            const updatedQuoteSellPrice = RemoveComma(editSellPrice)

            await api.put(`goldPrice/${targetEditPrice}`,
                {
                    purchasePrice: updatedQuoteBuyPrice,
                    sellPrice: updatedQuoteSellPrice
                }
            )

            const getGoldPriceReq = await api.get("goldPrice")
            if (getGoldPriceReq) {
                setGoldPriceHistory(getGoldPriceReq)
            }
            setIsOpenEditModal(false)
            setEditSellPrice("")
            setEditBuyPrice("")
        }
    }

    return (
        <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="text-white text-lg font-medium">قیمت</div>
                <button
                    type="button"
                    onClick={openModal}
                    className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gold"
                                        >
                                            ثبت قیمت جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <div className="flex flex-col space-y-4">
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="قیمت خرید"
                                                                value={quoteBuyPrice}
                                                                onChange={handleBuyPrice}
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
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="قیمت فروش"
                                                                value={quoteSellPrice}
                                                                onChange={handleSellPrice}
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
                                            className="text-lg font-medium leading-6 text-gold">
                                            ثبت قیمت جدید
                                        </Dialog.Title>
                                        <div className="text-white mt-6">
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
                    <th className={'p-3 text-center'}>ثبت کننده</th>
                    <th className={'p-3 text-center'}>تاریخ</th>
                    <th className={'p-3 text-center'}>قیمت فروش بر حسب گرم</th>
                    <th className={'p-3 text-center'}>قیمت فروش بر حسب مثقال</th>
                    <th className={'p-3 text-center'}>قیمت خرید بر حسب گرم</th>
                    <th className={'p-3 text-center'}>قیمت خرید بر حسب مثقال</th>
                    <th className={'p-3 text-center'}>عملیات</th>
                </tr>
                </thead>
                <tbody>
                {
                    goldPriceHistory.map((item, index) => (
                        <tr>
                            <td className={'p-3 text-center'}>{index + 1}</td>
                            <td className={'p-3 text-center'}>{item?.adminUserName}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(item?.date)}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(item?.sellPricePerGram.toString()))}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(item?.sellPricePerShekel.toString()))}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(item?.purchasePricePerGram.toString()))}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(item?.purchasePricePerShekel.toString()))}</td>
                            <td className={'p-3 text-center flex justify-center'}>
                                <div className="mt-6 flex flex-row justify-center space-x-1 ">
                                        <button className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-2xl'

                                                onClick={()=>openModalEditPrice(item.id,item.purchasePricePerShekel,item.sellPricePerShekel)}>
                                            <TbEdit className="text-gold" fontSize="1.3rem"/>
                                        </button>
                                        <button
                                            className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-xl'
                                            onClick={()=>openModalDeleteAdmin(item.id)}>
                                            <BsTrashFill className="text-red-600" fontSize="1.3rem"/>
                                        </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            <Transition appear show={isOpenDeleteAdmin} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalDeleteAdmin}>
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
                                leaveTo="opacity-0 scale-95">
                                <Dialog.Panel
                                    className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-center text-lg font-medium leading-6 text-white"
                                    >
                                        حذف قیمت
                                    </Dialog.Title>
                                    <div className="mt-6 text-center text-white">
                                        آیا از حذف قیمت مطمئن هستید؟
                                    </div>
                                    <div className="mt-4 flex flex-row justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-red-600 text-white px-4 py-2 text-sm font-medium"
                                            onClick={handleDeleteAdmin}>
                                            حذف
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                            onClick={closeModalDeleteAdmin}
                                        >
                                            بستن
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            <Transition appear show={isOpenEditModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalEditPrice} dir="rtl">
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
                                        ویرایش قیمت
                                    </Dialog.Title>
                                    <div className="mt-6">
                                        <CacheProvider value={cacheRtl}>
                                            <ThemeProvider theme={theme}>
                                                <div dir="rtl">
                                                    <div className="flex flex-col space-y-4">
                                                        <TextField
                                                            id="outlined-end-adornment"
                                                            name="price"
                                                            label="قیمت خرید"
                                                            value={editBuyPrice}
                                                            onChange={handleEditBuyPrice}
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
                                                        <TextField
                                                            id="outlined-end-adornment"
                                                            name="price"
                                                            label="قیمت فروش"
                                                            value={editSellPrice}
                                                            onChange={handleEditSellPrice}
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
                                                onClick={handleEditPrice}>
                                                ثبت
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModalEditPrice}>
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
    )
}
