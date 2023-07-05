import React, {Fragment, useEffect, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import api from "../../../api/api";
import FormControl from "@mui/material/FormControl";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";


const status = [
    {name: 'نامشخص', value: 'pend'},
    {name: 'تایید', value: 'accept'},
    {name: 'رد', value: 'reject'},
]

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

export default function ConfirmSellGold(props) {
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
    const getTotalInfoPendRequests = async () =>{
        const respond = await api.get(`request/admin/sellGold/pendRequest`)
        setTotalInfo(respond)
    }

    useEffect(() => {
        const getData = async () => {
            const getPaymentsRes = await api.get(`request/admin/sellGold`)
            if (getPaymentsRes) {
                setGoldBuyRequests(getPaymentsRes)
            }
        }
        getData()
        getTotalInfoPendRequests();
    }, []);


    let [goldBuyRequests, setGoldBuyRequests] = useState([])
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenProfile, setIsOpenProfile] = useState(false)
    let [profileData, setProfileData] = useState({})
    let [adminConfirm, setAdminConfirm] = useState("accept")
    let [failedDescriptionContent, setFailedDescriptionContent] = useState()
    let [requestId, setRequestId] = useState()
    let [totalInfo,setTotalInfo] = useState({});

    function closeModalProfile() {
        setIsOpenProfile(false)
    }

    async function openModalProfile(id) {
        const getInfo = await api.get(`info/admin/show/profile/${id}`)
        if (getInfo) {
            setProfileData(getInfo)
        }
        setIsOpenProfile(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    async function openModal(id) {
        setRequestId(id)
        setFailedDescriptionContent("")
        setIsOpen(true)
    }

    const handleChange = (event) => {
        setAdminConfirm(event.target.value);
    };

    async function handleAdminConfirm() {

        await api.put(`request/${requestId}`, {
            status:adminConfirm
        })

        if(adminConfirm === "reject"){
            await api.post(`failureReason`,{
                reason:failedDescriptionContent,
                requestId:requestId
            })
            setFailedDescriptionContent("")
        }

        const getPaymentsRes = await api.get(`request/admin/buyGold`)
        if (getPaymentsRes) {
            setGoldBuyRequests(getPaymentsRes)
        }

        setAdminConfirm("pend")
        setIsOpen(false)
    }

    return (
        <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="flex justify-between">
                <div className="text-white text-2xl font-medium">درخواست فروش طلا</div>
                <div>
                    <span className="text-gold mx-2"> کل مبلغ درخواست های در حال بررسی:</span>
                    <span className="text-white">{EnglishToPersian(totalInfo.price)} ریال </span>
                </div>
                <div>
                    <span className="text-gold mx-2"> کل وزن درخواست های در حال بررسی:</span>
                    <span className="text-white">{EnglishToPersian(totalInfo.weight)} گرم </span>
                </div>
            </div>

            <table className='mt-8 text-white break-normal'>
                <thead>
                <tr>
                    <th className={'p-4 text-gold text-center'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                        </svg>
                    </th>
                    <th className={'p-4 text-gold text-center'}>وزن</th>
                    <th className={'p-4 text-gold text-center'}>قیمت</th>
                    <th className={'p-4 text-gold text-center'}>تاریخ و ساعت</th>
                    <th className={'p-4 text-gold text-center'}>وضعيت تاييد ادمين</th>
                    <th className={'p-4 text-gold text-center'}>تایید ادمین</th>
                    <th className={'p-4 text-gold text-center'}>پروفایل درخواست دهنده</th>
                </tr>
                </thead>
                <tbody>
                {
                    goldBuyRequests.map((requests, index) => (
                        <tr>
                            <td className={'p-3 text-center'}>{index + 1}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(requests.weight.toString())}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(SeparateNumber(requests.price.toString()))}</td>
                            <td className={'p-3 text-center'}>{EnglishToPersian(requests.createAt)}</td>
                            <td className={'p-3 flex justify-center'}>
                                {
                                    requests.status === "pend" ?
                                        (<span className={'text-center bg-neutral-500 w-2/3 p-2 rounded-xl'}>
                                            نامشخص
                                        </span>) :
                                        requests.status === "reject" ?
                                            (<span className={'text-center bg-red-500 w-2/3 p-2 rounded-xl'}>
                                                رد شده
                                            </span>) :
                                            requests.status === "accept" ?
                                                (<span className={'text-center bg-green-700 w-2/3 p-2 rounded-xl'}>
                                                    قبول شده
                                                </span>) : null
                                }
                            </td>
                            <td className={'p-3 '}>
                                {
                                    requests.status !== "pend" ? (
                                        <button
                                            type="button"
                                            onClick={() => openModal(requests.id)}
                                            className="w-full cursor-default rounded disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-500  bg-labelGreen text-black hover:opacity-80 py-2 px-5 sm:text-sm" disabled>
                                            تعيين وضعيت
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => openModal(requests.id)}
                                            className="w-full cursor-default rounded disabled:bg-neutral-700 disabled:cursor-not-allowed disabled:text-neutral-500  bg-labelGreen text-black hover:opacity-80 py-2 px-5 sm:text-sm">
                                            تعيين وضعيت
                                        </button>
                                    )
                                }
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
                                                            className="text-lg font-medium leading-6 text-gold"
                                                        >
                                                            تعيين وضعیت خرید طلا
                                                        </Dialog.Title>
                                                        <div className="flex flex-col mt-6">
                                                            <CacheProvider value={cacheRtl}>
                                                                <FormControl fullWidth>
                                                                    <InputLabel
                                                                        id="demo-simple-select-label">وضعيت</InputLabel>
                                                                    <Select
                                                                        labelId="demo-simple-select-label"
                                                                        id="demo-simple-select"
                                                                        value={adminConfirm}
                                                                        label="وضعيت"
                                                                        onChange={handleChange}>
                                                                        <MenuItem value={"accept"}>تاييد</MenuItem>
                                                                        <MenuItem value={"reject"}>رد</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </CacheProvider>
                                                            {
                                                                adminConfirm === "reject"
                                                                && (
                                                                    <CacheProvider value={cacheRtl}>
                                                                        <ThemeProvider theme={theme}>
                                                                            <div className="mt-5">
                                                                                <TextField
                                                                                    fullWidth
                                                                                    name="description"
                                                                                    label="توضیحات رد درخواست"
                                                                                    value={failedDescriptionContent}
                                                                                    onChange={(e) => (setFailedDescriptionContent(e.target.value))}
                                                                                />
                                                                            </div>
                                                                        </ThemeProvider>
                                                                    </CacheProvider>
                                                                )
                                                            }
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="flex flex-row justify-evenly">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={()=>{handleAdminConfirm(requests.id)}}>
                                                                    ثبت
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModal}>
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
                            <td className={'p-3 flex justify-center'}>
                                <button
                                    type="button"
                                    onClick={() => openModalProfile(requests.id)}
                                    className="rounded-md flex flex-row items-center bg-mainGold text-black text-xs px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-1">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                    پروفایل
                                </button>
                                <Transition appear show={isOpenProfile} as={Fragment}>
                                    <Dialog as="div" className="relative z-10" onClose={closeModalProfile}
                                            dir="rtl">
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
                                                    leaveTo="opacity-0 scale-95"
                                                >
                                                    <Dialog.Panel
                                                        className="text-white w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg  font-medium leading-6 text-gold">
                                                            پروفایل
                                                        </Dialog.Title>
                                                        <div className="mt-6">
                                                            <div className="flex flex-col space-y-4">
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        نام و نام خانوادگی:
                                                                    </div>
                                                                    <div>{profileData.fullName}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        شماره موبايل :
                                                                    </div>
                                                                    <div>{EnglishToPersian(profileData.phoneNumber)}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        موجودی ریالی :
                                                                    </div>
                                                                    <div>{EnglishToPersian(profileData.inventory)} ریال </div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>موجودی طلایی:
                                                                    </div>
                                                                    <div>{EnglishToPersian(profileData.weight)} گرم </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="flex flex-row justify-evenly">
                                                                <button
                                                                    type="button"
                                                                    className="text-mainGray inline-flex w-full justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                    onClick={closeModalProfile}
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
    );
}
