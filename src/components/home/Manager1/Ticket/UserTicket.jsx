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

function AdminTicket(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [tickets, setTickets] = useState([])
    const getTickets = async () => {
        const getTicketsResponse = await api.get(`ticket`)
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

            <div className="table w-full shadow-sm overflow-hidden">
                <div className="table-header-group bg-[#2a2a2a] font-medium shadow-sm overflow-hidden">
                    <div className="table-row">
                        <div className="table-cell p-4 rounded-r-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                 stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>
                            </svg>
                        </div>
                        <div className="table-cell p-4">عنوان</div>
                        <div className="table-cell p-4">وضعیت</div>
                        <div className="table-cell p-4">تاریخ</div>
                        <div className="table-cell p-4 rounded-l-lg">عملیات</div>
                    </div>
                </div>
                <div class="table-row-group p-4 text-sm font-medium">
                    {
                        tickets.map((t, i) => (
                            <div className="table-row text-white transition">
                                <div
                                    className="table-cell px-2 py-3">{i + 1}</div>
                                <div
                                    className="table-cell px-2 py-3">{t.title}</div>
                                <div
                                    className="table-cell px-2 py-3">{
                                    t.status === "pending" ? "در حال بررسی" : t.status === "answered" ? "پاسخ داده شده" : null
                                }</div>
                                <div
                                    className="table-cell px-2 py-3">{t.date}</div>
                                <div
                                    className="table-cell px-2 py-3">
                                    <Link to={t.id}>
                                        <button
                                            className='bg-[#dfaf3d] text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition'>مشاهده
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

export default AdminTicket