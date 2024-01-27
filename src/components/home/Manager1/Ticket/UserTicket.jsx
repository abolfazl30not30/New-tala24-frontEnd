import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../../../api/api";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";

function AdminTicket(props) {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [tickets, setTickets] = useState([])
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket/admin`)
        setTickets(getTicketsResponse)
    }

    useEffect(() => {
        getTickets()
    }, []);

    return (
        <div className="w-full mx-9 mt-5 text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold overflow-scroll">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-between items-center mb-6">
                <h2 className="text-lg font-medium">
                    سوابق تیکت ها
                </h2>
            </div>

            <div className="overflow-scroll">
                <table>
                    <tr>
                        <th className={'p-4 text-center'}>شماره</th>
                        <th className={'p-4 text-center'}>عنوان</th>
                        <th className={'p-4 text-center'}>تاریخ</th>
                        <th className={'p-4 text-center'}>وضعیت</th>
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
                                            ? <span className={'bg-neutral-600 text-neutral-200 rounded-3xl p-2'}>
                                            در حال بررسی
                                        </span>
                                            : ticket.status === "answered"
                                                ? <span className={'bg-labelGreen text-neutral-200 rounded-3xl p-2'}>پاسخ داده شده</span>
                                                : <span className={'bg-blue-500 text-neutral-200 rounded-3xl p-2'}>بسته شده</span>
                                    }</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </div>
    )
}

export default AdminTicket