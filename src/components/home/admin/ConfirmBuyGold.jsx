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


const status = [
    {name: 'نامشخص', value: 'pending'},
    {name: 'تایید', value: 'successful'},
    {name: 'رد', value: 'failed'},
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

export default function ConfirmBuyGold(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    useEffect(() => {
        const getData = async () => {
            const getPaymentsRes = await api.get(`payment`)
            if (getPaymentsRes) {
                setGoldBuyRequests(getPaymentsRes)
            }
        }
        getData()

    }, []);


    let [goldBuyRequests, setGoldBuyRequests] = useState([])
    let [requestsTarget, setRequestsTarget] = useState(['', ''])
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenProfile, setIsOpenProfile] = useState(false)
    let [profileData, setProfileData] = useState({})

    let [adminConfirm, setAdminConfirm] = useState("pending")
    let [isReject, setIsReject] = useState(false)
    let [failedDescription, setFailedDescription] = useState(false)
    let [failedDescriptionContent, setFailedDescriptionContent] = useState()
    let [paymentId, setPaymentId] = useState()

    function closeModalProfile() {
        setIsOpenProfile(false)
    }

    async function openModalProfile(id) {
        const getInfo = await api.get(`info/profile/${id}`)
        if (getInfo) {
            setProfileData(getInfo)
            console.log(profileData)
        }
        setIsOpenProfile(true)
    }

    function closeModal() {
        setIsOpen(false)
        setRequestsTarget('')
    }

    async function openModal(isAuthorized,id) {
        setPaymentId(id)
        setAdminConfirm(isAuthorized);
        setFailedDescriptionContent("")
        if(isAuthorized === "failed"){
            const getFailureReason = await api.get(`failureReason/search?paymentId=${id}`)
            if(getFailureReason[0]){
                setFailedDescriptionContent(getFailureReason[0].reason)
            }
        }

        setIsOpen(true)
    }

    const changeStatus = (e, id) => {

    };

    const handleChange = (event) => {
        setAdminConfirm(event.target.value);
    };

    async function handleAdminConfirm() {

        if(adminConfirm === "failed"){

            await api.put(`payment/${paymentId}`, {
                isAuthorized: adminConfirm,
                status:"pending"
            })

            await api.post(`failureReason`,{
                reason:failedDescriptionContent,
                paymentId:paymentId
            })

            setFailedDescriptionContent("")

        }else {

            await api.put(`payment/${paymentId}`, {
                isAuthorized: adminConfirm,
                status:"pending",
            })
        }

        const getPaymentsRes = await api.get(`payment`)
        if (getPaymentsRes) {
            setGoldBuyRequests(getPaymentsRes)
        }

        setAdminConfirm("pending")
        setIsOpen(false)
    }

    return (
        <div className="bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="text-gold text-lg font-medium">درخواست خرید طلا</div>
            <table className='mt-8 text-white break-normal'>
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
                    <th className={'p-4'}>قیمت</th>
                    <th className={'p-4'}>تاریخ</th>
                    <th className={'p-4'}>وضعيت پرداخت</th>
                    <th className={'p-4'}>وضعيت تاييد ادمين</th>
                    <th className={'p-4'}>تایید ادمین</th>
                    <th className={'p-4'}>پروفایل درخواست دهنده</th>
                </tr>
                </thead>
                <tbody>
                {
                    goldBuyRequests.map((requests, index) => (
                        <tr>
                            <td className={'p-3'}>{index + 1}</td>
                            <td className={'p-3'}>{requests.weight}</td>
                            <td className={'p-3'}>{requests.price}</td>
                            <td className={'p-3'}>{requests.date}</td>
                            <td className={'p-3'}>
                                {
                                    requests.status === "pending" ?
                                        (<span className={'text-center bg-neutral-500 p-2 rounded-xl'}>
                                            در حال انتظار
                                        </span>) :
                                        requests.status === "failed" ?
                                            (<span className={'text-center bg-red-500 p-2 rounded-xl'}>
                                                پرداخت نشده
                                            </span>) :
                                            requests.status === "successful" ?
                                                (<span className={'text-center bg-green-700 p-2 rounded-xl'}>
                                                    پرداخت شده
                                                </span>) : null
                                }
                            </td>
                            <td className={'p-3'}>
                                {
                                    requests.isAuthorized === "pending" ?
                                        (<span className={'text-center bg-neutral-500 p-2 rounded-xl'}>
                                            نامشخص
                                        </span>) :
                                        requests.isAuthorized === "failed" ?
                                            (<span className={'text-center bg-red-500 p-2 rounded-xl'}>
                                                رد شد
                                            </span>) :
                                            requests.isAuthorized === "successful" ?
                                                (<span className={'text-center bg-green-700 p-2 rounded-xl'}>
                                                    موفقیت آمیز
                                                </span>) : null
                                }
                            </td>
                            <td className={'p-3'}>
                                <button
                                    type="button"
                                    onClick={() => openModal(requests.isAuthorized,requests.id)}
                                    className="relative cursor-default rounded flex border-[1px] border-neutral-700 border-solid bg-transparent text-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    تعيين وضعيت
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
                                                                        <MenuItem value={"pending"}>نامشخص</MenuItem>
                                                                        <MenuItem value={"successful"}>تاييد</MenuItem>
                                                                        <MenuItem value={"failed"}>رد</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </CacheProvider>
                                                            {
                                                                adminConfirm === "failed"
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
                                                                    onClick={()=>{handleAdminConfirm()}}>
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
                            <td className={'p-3'}>
                                <button
                                    type="button"
                                    onClick={() => openModalProfile(requests.account_id)}
                                    className="rounded-md flex flex-row items-center bg-[#DFAF3D] text-black text-xs px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
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
                                                            className="text-lg  font-medium leading-6 text-gold"
                                                        >
                                                            پروفایل
                                                        </Dialog.Title>
                                                        <div className="mt-6">
                                                            <div className="flex flex-col space-y-4">
                                                                <div className='flex flex-row'>
                                                                    {/*<div className='ml-1 text-gray-500'>نام:</div>*/}
                                                                    <div
                                                                        className='text-lg font-bold'>{profileData.firstName} {profileData.lastName}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        كد ملي :
                                                                    </div>
                                                                    <div>{profileData.nationalCode}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        شماره موبايل :
                                                                    </div>
                                                                    <div>{profileData.phoneNumber}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>وزن:
                                                                    </div>
                                                                    <div>{profileData.totalWeight}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        شماره شبا:
                                                                    </div>
                                                                    <div>{profileData.accountNumber}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gold font-bold'>
                                                                        ايميل :
                                                                    </div>
                                                                    <div>{profileData.email}</div>
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
