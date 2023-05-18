import React, {useState, Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {MdArrowBackIosNew} from "react-icons/md";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import {BsTrashFill} from "react-icons/bs";
import {TbEdit} from "react-icons/tb";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function BankAccounts() {

    const [bankAccounts, setBankAccounts] = useState([
        {
            accountNumber: '183664122',
            cardNumber: '5859831034699396',
            shabaNumber: '12336660000002233355000',
            bankName: 'بانک ملت',
            id: 1
        },
        {
            accountNumber: '183664122',
            cardNumber: '5859831034699396',
            shabaNumber: '12336660000002233355000',
            bankName: 'بانک تجارت',
            id: 1
        },
        {
            accountNumber: '183664122',
            cardNumber: '5859831034699396',
            shabaNumber: '12336660000002233355000',
            bankName: 'بانک ملی',
            id: 1
        }
    ])
    const [targetBankAccounts, setTargetBankAccounts] = useState([
        {
            accountNumber: '',
            cardNumber: '',
            shabaNumber: '',
            bankName: '',
            id: ''
        }
    ])
    const [newAccount,setNewAccount] = useState({
        accountNumber: '',
        cardNumber: '',
        shabaNumber: '',
        bankName: '',
    })
    const [isOpenNewAccounts, setIsOpenNewAccounts] = useState(false)
    const [isOpenEditAccount, setIsOpenEditAccount] = useState(false)
    const [isOpenDeleteAccount, setIsOpenDeleteAccount] = useState(false)
    const [targetAccountByDelete, setTargetAccountByDelete] = React.useState('');

    function closeModalNewAccounts() {
        setIsOpenNewAccounts(false)
    }

    function openModalNewAccounts() {
        setIsOpenNewAccounts(true)
    }

    function closeModalEditAccount() {
        setIsOpenEditAccount(false)
    }

    async function openModalEditAccount(id) {
        const targetAccount = bankAccounts.find(Account => Account.id === id)
        setTargetBankAccounts(targetAccount);
        setIsOpenEditAccount(true)
    }

    function closeModalDeleteAccount() {
        setTargetAccountByDelete('');
        setIsOpenDeleteAccount(false)
    }

    async function openModalDeleteAccount(id) {
        setTargetAccountByDelete(id);
        setIsOpenDeleteAccount(true)
    }

    const addNewAccounts = () => {
        console.log(newAccount);
        setIsOpenNewAccounts(false)
    }

    const editAccount = () => {
        console.log(targetBankAccounts)
        setIsOpenEditAccount(false)
    }

    const deleteAccount = () => {
        console.log(targetAccountByDelete)
        setIsOpenDeleteAccount(false)
    }

    return (
        <>
            <div className="bg-[#252525] px-11 py-7 mx-2 md:mx-8 my-6 rounded text-white">
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row justify-between mb-10">
                        <h3 className='font-bold text-white text-xl mb-4 md:mb-0'>
                            حساب های من
                        </h3>
                        <button
                            className="bg-gold text-black px-5 py-2 rounded-md w-fit flex flex-row items-center hover:opacity-90"
                            onClick={openModalNewAccounts}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-4 h-4 ml-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                            </svg>
                            افزودن آدرس
                        </button>
                        <Transition appear show={isOpenNewAccounts} as={Fragment}>
                            <Dialog as="div" className="relative z-10" onClose={closeModalNewAccounts}>
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
                                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                                <Dialog.Title
                                                    as="h3"
                                                    className="text-center text-lg font-medium leading-6 text-white"
                                                >
                                                    افزودن حساب
                                                </Dialog.Title>
                                                <div className="mt-6" dir="rtl">
                                                    <CacheProvider value={cacheRtl}>
                                                        <div className="flex flex-col space-y-4 justify-center">
                                                            <TextField
                                                                label={"شماره حساب"}
                                                                value={newAccount.accountNumber}
                                                                type={"number"}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                                name='accountNumber'
                                                                onChange={(e) => setNewAccount(
                                                                    {
                                                                        ...newAccount,
                                                                        [e.target.name]: e.target.value
                                                                    }
                                                                )}
                                                            />
                                                            <TextField
                                                                label={"شماره کارت"}
                                                                value={newAccount.cardNumber}
                                                                type={"number"}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                                name='cardNumber'
                                                                onChange={(e) => setNewAccount(
                                                                    {
                                                                        ...newAccount,
                                                                        [e.target.name]: e.target.value
                                                                    }
                                                                )}
                                                            />
                                                            <TextField
                                                                label={"شماره شبا"}
                                                                // error={errors.length !== 0}
                                                                /* disabled={!firstNameAllowed}*/
                                                                value={newAccount.shabaNumber}
                                                                type={"text"}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                                name='shabaNumber'
                                                                onChange={(e) => setNewAccount(
                                                                    {
                                                                        ...newAccount,
                                                                        [e.target.name]: e.target.value
                                                                    }
                                                                )}
                                                            />
                                                            <TextField
                                                                label={"نام بانک"}
                                                                // error={errors.length !== 0}
                                                                /* disabled={!firstNameAllowed}*/
                                                                value={newAccount.bankName}
                                                                type={"text"}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}
                                                                name='bankName'
                                                                onChange={(e) => setNewAccount(
                                                                    {
                                                                        ...newAccount,
                                                                        [e.target.name]: e.target.value
                                                                    }
                                                                )}
                                                            />
                                                        </div>
                                                    </CacheProvider>
                                                </div>
                                                <div className="mt-4 flex flex-row justify-center">
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                        onClick={addNewAccounts}
                                                    >
                                                        ثبت
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                        onClick={closeModalNewAccounts}
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
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-4">
                        {bankAccounts.map((account, index) => (
                            <div className="rounded-2xl p-2 bg-mainGray text-white p-7">
                                <div>
                                    <div className="text-center mt-2 mb-5 text-gold ">
                                        <h3 className=" font-bold text-xl"> حساب
                                             {EnglishToPersian((index + 1).toString())}</h3>
                                    </div>
                                    <div className='flex flex-row items-center mb-2'>
                                        <MdArrowBackIosNew className={"text-gold"}/>
                                        <div className="request-item-title text-gold ml-4">شماره حساب:</div>
                                        <div>{EnglishToPersian(account.accountNumber?.toString())}</div>
                                    </div>
                                    <div className='flex flex-row items-center mb-2'>
                                        <MdArrowBackIosNew className={"text-gold"}/>
                                        <div className="request-item-title text-gold ml-4 ">شماره کارت:</div>
                                        <div>{EnglishToPersian(account.cardNumber?.toString())}</div>
                                    </div>
                                    <div className='flex flex-row items-center mb-2'>
                                        <MdArrowBackIosNew className={"text-gold"}/>
                                        <div className="request-item-title text-gold ml-4 ">شماره شبا:</div>
                                        <div>{EnglishToPersian(account.shabaNumber?.toString())}</div>
                                    </div>
                                    <div className='flex flex-row items-center mb-2'>
                                        <MdArrowBackIosNew className={"text-gold"}/>
                                        <div className="request-item-title text-gold ml-4 ">نام بانک:</div>
                                        <div>{EnglishToPersian(account.bankName?.toString())}</div>
                                    </div>
                                    <div className="mt-6 flex flex-row justify-center space-x-2 space-x-reverse">
                                        <button className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-2xl'
                                                onClick={() => openModalEditAccount(account.id)}>
                                            <TbEdit className="text-gold" fontSize="1.5rem"/>
                                        </button>
                                        <button
                                            className='bg-transparent p-3 hover:bg-bgGray hover:bg-opacity-20 rounded-xl'
                                            onClick={() => openModalDeleteAccount(account.id)}>
                                            <BsTrashFill className="text-red-600" fontSize="1.5rem"/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            // <div
                            //     className="flex flex-col justify-between border-2 border-solid border-gold p-4 rounded space-y-2 text-xs">
                            //     <div className='flex flex-row'>
                            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            //              stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                            //             <path stroke-linecap="round" stroke-linejoin="round"
                            //                   d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            //         </svg>
                            //         {account.accountNumber}
                            //     </div>
                            //     <div className='flex flex-row'>
                            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            //              stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                            //             <path stroke-linecap="round" stroke-linejoin="round"
                            //                   d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            //         </svg>
                            //         {account.cardNumber}
                            //     </div>
                            //     <div className='flex flex-row'>
                            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            //              stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                            //             <path stroke-linecap="round" stroke-linejoin="round"
                            //                   d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            //         </svg>
                            //         {account.shabaNumber}
                            //     </div>
                            //     <div className='flex flex-row'>
                            //         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            //              stroke-width="1.5" stroke="currentColor" className="w-4 h-4 ml-2">
                            //             <path stroke-linecap="round" stroke-linejoin="round"
                            //                   d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            //         </svg>
                            //         {account.bankName}
                            //     </div>
                            //     <div className="flex flex-row justify-center space-x-2 space-x-reverse">
                            //         <button className='flex flex-row bg-amber-400 text-black p-2 rounded'
                            //                 onClick={() => openModalEditAccount(account.id)}>
                            //             ویرایش حساب
                            //         </button>
                            //         <button
                            //             className='flex flex-row bg-red-600 text-white p-2 rounded'
                            //             onClick={() => openModalDeleteAccount(account.id)}>
                            //             حذف حساب
                            //         </button>
                            //     </div>
                            // </div>
                        ))}
                    </div>
                    <Transition appear show={isOpenEditAccount} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModalEditAccount}>
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
                                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-center text-lg font-medium leading-6 text-white"
                                            >
                                                ویرایش آدرس
                                            </Dialog.Title>
                                            <div className="mt-6" dir="rtl">
                                                <CacheProvider value={cacheRtl}>
                                                    <div className="flex flex-col space-y-4 justify-center">
                                                        <TextField
                                                            label={"شماره حساب"}
                                                            value={targetBankAccounts.accountNumber}
                                                            type={"number"}
                                                            sx={{
                                                                label: {color: '#fff !important'},
                                                                input: {color: '#fff !important'}
                                                            }}
                                                            name='accountNumber'
                                                            onChange={(e) => setTargetBankAccounts(
                                                                {
                                                                    ...targetBankAccounts,
                                                                    [e.target.name]: e.target.value
                                                                }
                                                            )}
                                                        />
                                                        <TextField
                                                            label={"شماره کارت"}
                                                            value={targetBankAccounts.cardNumber}
                                                            type={"number"}
                                                            sx={{
                                                                label: {color: '#fff !important'},
                                                                input: {color: '#fff !important'}
                                                            }}
                                                            name='cardNumber'
                                                            onChange={(e) => setTargetBankAccounts(
                                                                {
                                                                    ...targetBankAccounts,
                                                                    [e.target.name]: e.target.value
                                                                }
                                                            )}
                                                        />
                                                        <TextField
                                                            label={"شماره شبا"}
                                                            // error={errors.length !== 0}
                                                            /* disabled={!firstNameAllowed}*/
                                                            value={targetBankAccounts.shabaNumber}
                                                            type={"text"}
                                                            sx={{
                                                                label: {color: '#fff !important'},
                                                                input: {color: '#fff !important'}
                                                            }}
                                                            name='shabaNumber'
                                                            onChange={(e) => setTargetBankAccounts(
                                                                {
                                                                    ...targetBankAccounts,
                                                                    [e.target.name]: e.target.value
                                                                }
                                                            )}
                                                        />
                                                        <TextField
                                                            label={"نام بانک"}
                                                            // error={errors.length !== 0}
                                                            /* disabled={!firstNameAllowed}*/
                                                            value={targetBankAccounts.bankName}
                                                            type={"text"}
                                                            sx={{
                                                                label: {color: '#fff !important'},
                                                                input: {color: '#fff !important'}
                                                            }}
                                                            name='bankName'
                                                            onChange={(e) => setTargetBankAccounts(
                                                                {
                                                                    ...targetBankAccounts,
                                                                    [e.target.name]: e.target.value
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                </CacheProvider>
                                            </div>
                                            <div className="mt-4 flex flex-row justify-center">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                    onClick={editAccount}
                                                >
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                    onClick={closeModalEditAccount}
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
                    <Transition appear show={isOpenDeleteAccount} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModalDeleteAccount}>
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
                                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-center text-lg font-medium leading-6 text-white"
                                            >
                                                حذف حساب
                                            </Dialog.Title>
                                            <div className="mt-6 text-center text-white">
                                                آیا از حذف حساب مطئن هستید؟
                                            </div>
                                            <div className="mt-4 flex flex-row justify-center">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-red-600 text-white px-4 py-2 text-sm font-medium"
                                                    onClick={deleteAccount}
                                                >
                                                    حذف
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                    onClick={closeModalDeleteAccount}
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
                </div>
            </div>
        </>
    );
}
