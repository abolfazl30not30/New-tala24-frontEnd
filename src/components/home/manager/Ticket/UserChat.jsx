import React, {useState} from "react"
import {Link} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {deepOrange, deepPurple} from '@mui/material/colors';
import "./../../../../style/ticket.css"


function ManagerChat() {

    const [ticket, updateTicket] = useState(
        {
            title: 'پول بده',
            chat: [
                {
                    roll: 'user',
                    sender: 'میلاد',
                    time: '1401/09/07',
                    message: 'سلام'
                },
                {
                    roll: 'admin',
                    sender: 'پشتیبانی',
                    time: '1401/09/07',
                    message: 'سلام پشتیبانی در خدمتم'
                }
            ]
        }
    )
    const [typedMessage, updateTypedMessage] = useState()


    const handleSendMessage = () => {
        /* const newMessage = {
             sender: 'user',
             message: typedMessage
         }
         console.log(ticket)*/
    }


    return (
        <div className="mt-5 text-white rounded-[8px] font-bold">
            <div className="chat-box">
                <div className="chat-box-body">
                    <div className="flex justify-center">
                        <div className="chat-messenger">

                            <div
                                className="flex flex-row items-center pb-3 mb-3 border-b-[1px] border-gray-600 border-solid text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                                </svg>
                                <span>{ticket.title}</span>
                            </div>
                            <div className="chat-messenger-body">
                                {
                                    ticket.chat.map((mes) => (
                                        mes.roll == 'admin'
                                            ? (
                                                <>
                                                    <div className="flex justify-center">
                                                        <div className="text-gray-200 text-xs font-normal">
                                                            {mes.time}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-end mb-2">
                                                        <div className="flex flex-col">
                                                            <div className='chat-messenger-item-info'>
                                                                <Stack direction="row" spacing={1}>
                                                                    <Avatar className='ml-2'>پ</Avatar>
                                                                </Stack>
                                                                <span
                                                                    className='text-xs text-gray-100 font-normal'>{mes.sender}</span>
                                                            </div>
                                                            <div className="bg-stone-700 color-gray-300 py-2 px-2 rounded-lg text-xs font-normal">
                                                                {mes.message}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                            )
                                            : (
                                                <>
                                                    <div className="flex justify-center">
                                                        <div className="text-gray-200 text-xs font-normal">
                                                            {mes.time}
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-start mb-2">
                                                        <div className="flex flex-col">
                                                            <div className='chat-messenger-item-info'>
                                                                <Stack direction="row" spacing={1}>
                                                                    <Avatar
                                                                        className='ml-2'>{mes.sender.slice(0, 1)}</Avatar>
                                                                </Stack>
                                                                <span
                                                                    className='text-xs text-gray-100 font-normal'>{mes.sender}</span>
                                                            </div>
                                                            <div className="bg-lime-300 text-black py-2 px-2 rounded-lg text-xs font-normal">
                                                                {mes.message}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </>
                                            )
                                    ))
                                }
                            </div>
                            <div className="flex flex-row pt-3 mt-3 border-t-[1px] border-gray-600 border-solid">
                                <input
                                    type='text'
                                    placeholder='یک پیام تایپ کنید...'
                                    className='basis-10/12 ml-2 outline-0 rounded bg-[#1e1e1e] p-2 border-[1px] border-gray-600 border-solid text-[12px] font-normal'
                                    onChange={(e) => updateTypedMessage(e.target.value)}
                                />
                                <button
                                    className='basis-2/12 rounded bg-[#dfaf3d] text-black p-2 text-base font-normal flex justify-center'
                                    onClick={handleSendMessage}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerChat