import React, {useState, Fragment} from 'react'
import {Listbox, Transition, Dialog} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'

// Create RTL MUI
const status = [
    {name: 'نامشخص', value: 'unknown'},
    {name: 'تایید', value: 'confirm'},
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

export default function ConfirmBuyGold() {
    let [goldBuyRequests, setGoldBuyRequests] = useState([
        {
            weight: '100',
            price: '1000000',
            date: '11/12/56',
            status: 'unknown',
            adminConfirm: 'unknown',
            id: 25,
            requester: {
                weight: '500',
                availableGoldPrices: '1000',
                phoneNumber: '0912996363',
                name: 'علی',
                shabaNumber: '123657822175'
            }
        },
        {
            weight: '100',
            price: '2000000',
            date: '11/12/56',
            status: 'unknown',
            adminConfirm: 'unknown',
            id: 80,
            requester: {
                weight: '500',
                availableGoldPrices: '1000',
                phoneNumber: '0912996363',
                name: 'اکبر',
                shabaNumber: '123657822175'
            }
        },
        {
            weight: '100',
            price: '3000000',
            date: '11/12/56',
            status: 'unknown',
            adminConfirm: 'unknown',
            id: 300,
            requester: {
                weight: '500',
                availableGoldPrices: '1000',
                phoneNumber: '0912996363',
                name: 'بیژن',
                shabaNumber: '123657822175'
            }
        },
        {
            weight: '100',
            price: '4000000',
            date: '11/12/56',
            status: 'unknown',
            adminConfirm: 'unknown',
            id: 6996,
            requester: {
                weight: '500',
                availableGoldPrices: '1000',
                phoneNumber: '0912996363',
                name: 'محمد',
                shabaNumber: '123657822175'
            }
        }
    ])
    let [requestsTarget, setRequestsTarget] = useState(['', ''])
    let [isOpen, setIsOpen] = useState(false)
    let [isOpenProfile, setIsOpenProfile] = useState(false)
    let [profileData, setProfileData] = useState({
        weight: '',
        availableGoldPrices: '',
        phoneNumber: '',
        name: '',
        shabaNumber: ''
    })
    let [isReject, setIsReject] = useState(false)
    let [rejectDescription,setRejectDescription] = useState()

    function closeModalProfile() {
        setIsOpenProfile(false)
    }

    async function openModalProfile(req) {
        setProfileData(req)
        setIsOpenProfile(true)
    }

    function closeModal() {
        setIsOpen(false)
        setRequestsTarget('')
    }

    const changeStatus = (e, id) => {
        setIsOpen(true)
        let valueTarget = e.value
        setRequestsTarget([valueTarget, id])
        if (e.value === 'reject') {setIsReject(true)}
    };

    function adminConfirm() {
        setIsOpen(false)
        let updateConfirm = goldBuyRequests.map((requests) => {
            if (requests.id === requestsTarget[1]) {
                return {...requests, adminConfirm: requestsTarget[0]}
            }
            return requests
        })
        setGoldBuyRequests(updateConfirm);
        if (requestsTarget[0] === 'reject') { console.log(rejectDescription) }
    }

    return (
        <div className="bg-[#141414] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
            <div className="text-white text-lg font-medium">درخواست خرید طلا</div>
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
                    <th className={'p-4'}>وضعیت</th>
                    <th className={'p-4'}>تایید ادمین</th>
                    <th className={'p-4'}>پروفایل</th>
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
                            <td className={'p-3'}>{requests.status}</td>
                            <td className={'p-3 flex'}>
                                <Listbox value={requests.adminConfirm} onChange={(e) => changeStatus(e, requests.id)}>
                                    <div className="relative mt-1 w-28">
                                        <Listbox.Button
                                            className="relative w-full cursor-default rounded flex border-[1px] border-neutral-700 border-solid bg-transparent text-white py-2 px-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">
                                                {
                                                    status.map((status, index) => {
                                                        if (status.value === requests.adminConfirm) {
                                                            return status.name
                                                        }
                                                    })
                                                }
                                            </span>
                                            <span
                                                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pr-2">
                                              <ChevronUpDownIcon
                                                  className="h-5 w-5"
                                                  aria-hidden="true"
                                              />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options
                                                className="absolute z-50 mt-1  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {status.map((status, statusIdx) => (
                                                    <Listbox.Option
                                                        key={statusIdx}
                                                        className={({active}) => `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'}`}
                                                        value={status}
                                                    >
                                                        {({selected}) => (
                                                            <>
                                                              <span
                                                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                                              >
                                                                {status.name}
                                                              </span>
                                                                {selected ? (
                                                                    <span
                                                                        className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                      <CheckIcon className="h-5 w-5"
                                                                                 aria-hidden="true"/>
                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </td>
                            <td className={'p-3'}>
                                <button
                                    type="button"
                                    onClick={() => openModalProfile(requests.requester)}
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
                                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                                                        <Dialog.Title
                                                            as="h3"
                                                            className="text-lg font-medium leading-6 text-gray-900"
                                                        >
                                                            پروفایل
                                                        </Dialog.Title>
                                                        <div className="mt-6">
                                                            <div className="flex flex-col space-y-4">
                                                                <div className='flex flex-row'>
                                                                    {/*<div className='ml-1 text-gray-500'>نام:</div>*/}
                                                                    <div
                                                                        className='text-lg font-bold'>{profileData.name}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gray-600 font-bold'>وزن:
                                                                    </div>
                                                                    <div>{profileData.weight}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gray-600 font-bold'>طلای
                                                                        موجود:
                                                                    </div>
                                                                    <div>{profileData.availableGoldPrices}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gray-600 font-bold'>شماره
                                                                        موبایل:
                                                                    </div>
                                                                    <div>{profileData.phoneNumber}</div>
                                                                </div>
                                                                <div className='flex flex-row items-center'>
                                                                    <div className='ml-1 text-gray-600 font-bold'>شماره
                                                                        شبا:
                                                                    </div>
                                                                    <div>{profileData.shabaNumber}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-4">
                                                            <div className="flex flex-row justify-evenly">
                                                                <button
                                                                    type="button"
                                                                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                                        تغیر وضعیت خرید طلا
                                    </Dialog.Title>
                                    <div className="flex flex-col mt-6">
                                        <span className='mb-4'>آیا از تغیر وضعیت خرید طلا مطمئن هستید؟</span>

                                        {
                                            isReject === true
                                                ? (
                                                    <>
                                                        <CacheProvider value={cacheRtl}>
                                                            <ThemeProvider theme={theme}>
                                                                <div dir="rtl">
                                                                    <TextField
                                                                        className='w-full border-2 border-rose-500 border-solid'
                                                                        name="description"
                                                                        label="توضیحات رد درخواست"
                                                                        value={rejectDescription}
                                                                        onChange={(e) => (setRejectDescription(e.target.value))}
                                                                    />
                                                                </div>
                                                            </ThemeProvider>
                                                        </CacheProvider>
                                                    </>
                                                )
                                                : (null)
                                        }
                                    </div>
                                    <div className="mt-4">
                                        <div className="flex flex-row justify-evenly">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-lime-400 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-lime-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={adminConfirm}
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
        </div>
    );
}
