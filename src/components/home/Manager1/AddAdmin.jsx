import React, {useState, Fragment, useEffect} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {prefixer} from 'stylis'
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {TextField} from "@mui/material";
import api from "../../../api/api";
import {RxHamburgerMenu} from "react-icons/rx";
import {IoCalendarOutline} from "react-icons/io5";
import {Outlet} from "react-router-dom";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import * as yup from "yup";
import {toast} from "react-toastify";

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

export default function AddAdmin(props) {
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

    const [accounts, setAccounts] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [isOpenDeleteAdmin, setIsOpenDeleteAdmin] = useState(false)
    const [targetDeleteByDelete, setTargetDeleteByDelete] = useState('');

    const [addAdmin, setAddAdmin] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        password: '',
    });
    let [isOpen, setIsOpen] = useState(false)

    const validation = async () => {
        const numberReg = /^(98|0)9\d{9}$/
        const adminSchema = yup.object().shape({
            firstName: yup.string().required("لطفا نام ادمین را وارد کنید."),
            lastName: yup.string().required("نام خانوادگی ادمین را وارد کنید."),
            phoneNumber: yup.string().required("لطفا شماره همراه ادمین را وارد کنید").matches(numberReg,"شماره همراه نادرست است"),
            password: yup.string().required("لطفا پسورد مورد نظر را وارد کنید").min(8,"پسورد نباید کمتر از ۸ کارکتر باشد"),
        })

        try {
            return await adminSchema.validate(addAdmin, {abortEarly: false})
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

    const getAdmins = async ()=> {
        const adminsList = await api.get("user/show/admin")
        setAdmins(adminsList)
    }

    useEffect(() => {
        getAdmins()
    }, []);


    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function closeModalDeleteAdmin() {
        setTargetDeleteByDelete('');
        setIsOpenDeleteAdmin(false)
    }

    function openModalDeleteAdmin(e) {
        setTargetDeleteByDelete(e.target.id);
        setIsOpenDeleteAdmin(true)
    }

    const onChangeInput = (e) => {
        setAddAdmin({
            ...addAdmin,
            [e.target.name]: e.target.value
        })
    }

    const resetAdminState = () =>{
        const reset = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            password: '',
        }
        setAddAdmin(reset)
    }

    const  handleAddAdmin = async () => {
        const valid = await validation();
        if (valid !== undefined){
            await api.post("user/admin", addAdmin)
            resetAdminState()
            getAdmins()
            setIsOpen(false);
        }
    }

    const handleDeleteAdmin = async () => {
        await api.delete(`user/${targetDeleteByDelete}`)
        getAdmins()
        closeModalDeleteAdmin()
    }

    return (
        <>
            <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
                <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                    <div className="text-white text-lg font-medium">ادمین ها</div>
                    <button
                        type="button"
                        onClick={openModal}
                        className="rounded-md flex flex-row items-center bg-[#DFAF3D] text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        ادمین جدید
                    </button>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg text-center font-medium leading-6 text-gold">
                                                اضافه کردن ادمین
                                            </Dialog.Title>
                                            <div className="mt-6">
                                                <CacheProvider value={cacheRtl}>
                                                    <ThemeProvider theme={theme}>
                                                        <div dir="rtl">
                                                            <div className="flex flex-col space-y-4">
                                                                <TextField
                                                                    inputProps={{
                                                                        autocomplete: 'new-password',
                                                                        form: {
                                                                            autocomplete: 'off',
                                                                        },
                                                                    }}
                                                                    name="firstName"
                                                                    label="نام"
                                                                    value={addAdmin.firstName}
                                                                    onChange={onChangeInput}
                                                                    sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                                                />
                                                                <TextField
                                                                    inputProps={{
                                                                        autocomplete: 'new-password',
                                                                        form: {
                                                                            autocomplete: 'off',
                                                                        },
                                                                    }}
                                                                    name="lastName"
                                                                    label="نام خانوادگی"
                                                                    value={addAdmin.lastName}
                                                                    onChange={onChangeInput}
                                                                    sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                                                />
                                                                <TextField
                                                                    inputProps={{
                                                                        autocomplete: 'new-password',
                                                                        form: {
                                                                            autocomplete: 'off',
                                                                        },
                                                                    }}
                                                                    name="phoneNumber"
                                                                    label="شماره موبایل"
                                                                    value={addAdmin.phoneNumber}
                                                                    onChange={onChangeInput}
                                                                    sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                                                />
                                                                <TextField
                                                                    inputProps={{
                                                                        autocomplete: 'new-password',
                                                                        form: {
                                                                            autocomplete: 'off',
                                                                        },
                                                                    }}
                                                                    type="password"
                                                                    name="password"
                                                                    label="رمز عبور"
                                                                    value={addAdmin.password}
                                                                    onChange={onChangeInput}
                                                                    sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
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
                                                        onClick={handleAddAdmin}>
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
                </div>
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
                        <th className={'p-4'}>نام</th>
                        <th className={'p-4'}>نام خانوادگی</th>
                        <th className={'p-4'}>شماره موبایل</th>
                        <th className={'p-4'}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        admins.map((admin, i) => (
                            <tr>
                                <td className={'p-4'}>{i + 1}</td>
                                <td className={'p-4'}>{admin.firstName}</td>
                                <td className={'p-4'}>{admin.lastName}</td>
                                <td className={'p-4'}>{EnglishToPersian(admin.phoneNumber)}</td>
                                <td className={'p-4'}>
                                    <button
                                        className='px-2 py-1 text-sm rounded border-[1px] border-gray-300 border-solid hover:border-red-600 hover:bg-red-600 transition'
                                        id={admin.id}
                                        onClick={openModalDeleteAdmin}>
                                        حذف
                                    </button>
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
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            حذف ادمين
                                        </Dialog.Title>
                                        <div className="mt-6 text-center text-white">
                                            آیا از حذف ادمين مطمئن هستید؟
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
            </div>
        </>
    );
}