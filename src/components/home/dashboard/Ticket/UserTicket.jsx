import React, {Fragment, useContext, useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import {Dialog, Transition} from '@headlessui/react'
import api from "../../../../api/api";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import signup from "../../../../contexts/signup";
import {CacheProvider, ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import {SeparateNumber} from "../../../../helper/SeparateNumber";

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

function UserTicket(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('role') !== "USER") {
            sessionStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const context = useContext(signup);
    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (sessionStorage.getItem('role') !== "USER") {
            sessionStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [title, setTitle] = useState("");
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket/user`)
        setTickets(getTicketsResponse)
    }

    useEffect(() => {
        getTickets()
    }, []);

    const [tickets, setTickets] = useState([])
    const [open, setOpen] = React.useState(false);
    const [targetId,setTargetId] = useState("")
    const [isOpenModalConfirm,setIsOpenModalConfirm] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitTicket = async () => {
        const respond = await api.post("ticket", {
            accountId: context.accountInfo.id,
            title: title,
            status: "pending"
        })
        navigate(`${respond.id}`)
        getTickets()
        handleClose()
    }

    const handleChangeStatus = async (id) =>{
        setTargetId(id)
        setIsOpenModalConfirm(true)
    }
    const closeTicket = async () =>{
        await api.put(`ticket/${targetId}`, {
            status: "closed"
        })
        getTickets()
        closeModalConfirm()
    }
    const closeModalConfirm = () =>{
        setIsOpenModalConfirm(false)
    }
    return (
        <div className="w-full mx-9 mt-5 text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold">
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    سوابق تیکت ها
                </h2>
                <button className='bg-gold text-black px-4 py-2 rounded-md w-fit flex flex-row items-center'
                        onClick={handleClickOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    ثبت تیکت جدید
                </button>

                <Transition appear show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleClose} dir="rtl">
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
                                            ثبت تیکت جدید
                                        </Dialog.Title>
                                        <div className="mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <ThemeProvider theme={theme}>
                                                    <div dir="rtl">
                                                        <div className="flex flex-col space-y-4">
                                                            <TextField
                                                                id="outlined-end-adornment"
                                                                name="price"
                                                                label="عنوان تیکت"
                                                                value={title}
                                                                onChange={(event) => setTitle(event.target.value)}
                                                                InputLabelProps={{
                                                                    style: {
                                                                        fontSize: "0.9rem"
                                                                    }
                                                                }}
                                                                sx={{
                                                                    label: {color: '#fff !important'},
                                                                    input: {color: '#fff !important'}
                                                                }}/>
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
                                                    onClick={handleSubmitTicket}>
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={handleClose}>
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

            <div className="overflow-scroll">
                <table>
                    <tr>
                        <th className={'p-4 text-center'}>شماره</th>
                        <th className={'p-4 text-center'}>عنوان</th>
                        <th className={'p-4 text-center'}>تاریخ</th>
                        <th className={'p-4 text-center'}>وضعیت</th>
                        <th className={'p-4 text-center'}>عملیات</th>
                    </tr>
                    {
                        tickets?.map((ticket, index) => (
                            <tr key={index} className="hover:bg-neutral-700 rounded-2xl">
                                <td className={'p-3 text-center'}>{ticket.ticketNumber}</td>
                                <td className={'p-3 text-center'}>
                                    {ticket.status === "closed" ? (
                                        ticket.title
                                    ):(
                                        <Link className="text-mainBlue" to={ticket.id}>{ticket.title}</Link>
                                    )}
                                </td>
                                <td className={'p-3 text-center'}>{EnglishToPersian(ticket.date)}</td>
                                <td className={'p-3 text-center'}>
                                    {
                                        ticket.status === "pending"
                                            ? <span className={'text-[0.8rem] bg-neutral-600 text-neutral-200 rounded-3xl p-2'}>
                                            در حال بررسی
                                        </span>
                                            : ticket.status === "answered"
                                                ? <span className={'text-[0.8rem] bg-labelGreen text-neutral-200 rounded-3xl p-2'}>پاسخ داده شده</span>
                                                : <span className={'text-[0.8rem] bg-blue-500 text-neutral-200 rounded-3xl p-2'}>بسته شده</span>
                                    }</td>
                                <td className={'p-3 flex justify-center'}>
                                    <button disabled={ticket.status === "closed"} onClick={()=>{handleChangeStatus(ticket.id)}} className="disabled:hover:bg-transparent  disabled:cursor-not-allowed flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold  rounded">
                                        بستن
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
            <Transition appear show={isOpenModalConfirm} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModalConfirm}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
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
                                        بستن تیکت
                                    </Dialog.Title>
                                    <div className="mt-6 text-center text-white">
                                        آیا از بستن تیکت مطمئن هستید؟
                                    </div>
                                    <div className="mt-4 flex flex-row justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-labelGreen text-white px-4 py-2 text-sm font-medium"
                                            onClick={closeTicket}>
                                            ثبت
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                            onClick={closeModalConfirm}>
                                            خروج
                                        </button>
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

export default UserTicket