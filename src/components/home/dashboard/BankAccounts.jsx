import React, {Fragment, useEffect, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {Link} from "react-router-dom";
import api from "../../../api/api";

export default function BankAccounts(props) {

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const [tickets, setTickets] = useState([])
    let [isOpen, setIsOpen] = useState(false)


    useEffect(() => {
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [title, setTitle] = useState("");
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket/search?userId=${localStorage.getItem("username")}`)
        setTickets(getTicketsResponse)
    }
    useEffect(() => {
        getTickets()
    }, []);



    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleSubmitTicket = async () => {
       /* const accountResponse = await api.get(`account/user/${localStorage.getItem("username")}`)
        await api.post("ticket", {
            accountId: accountResponse.id,
            userId: localStorage.getItem("username"),
            title: title,
            status: "pending"
        })
        getTickets()*/
        closeModal()

    }

    return(
        <div className="mx-9 mt-5 text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold">
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-gold">
                    حساب های من
                </h2>
                <button  className='bg-gold text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition' onClick={openModal}>حساب جدید</button>
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
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Payment successful
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Your payment has been successfully submitted. We’ve sent
                                                you an email with all of the details of your order.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>

            <div className="table w-full shadow-sm overflow-hidden">
                <div className="table-header-group bg-[#2a2a2a] font-medium shadow-sm overflow-hidden">
                    <div className="table-row">
                        <div className="table-cell p-4 rounded-r-lg">#</div>
                        <div className="table-cell p-4">شماره کارت</div>
                        <div className="table-cell p-4">شماره حساب</div>
                        <div className="table-cell p-4">بانک</div>
                        <div className="table-cell p-4 rounded-l-lg">عملیات</div>
                    </div>
                </div>
                <div className="table-row-group p-4 text-sm font-medium">
                    {
                        tickets.map((t, i) => (
                            <div className="table-row text-white transition">
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{i + 1}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{t.title}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{
                                    t.status === "pending" ? "در حال بررسی" : t.status === "answered" ? "پاسخ داده شده" : null
                                }</div>
                                <div

                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">{t.date}</div>
                                <div
                                    className="table-cell border-b-[1px] border-[#ddd] border-solid px-2 py-3">
                                    <Link to={t.id}>
                                        <button
                                            className='bg-gold text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition'>مشاهده
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
