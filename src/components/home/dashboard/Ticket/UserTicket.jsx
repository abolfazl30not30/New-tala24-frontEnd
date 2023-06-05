import React, {useEffect, useState,useContext} from "react"
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
import signup from "../../../../contexts/signup";

function UserTicket(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const context = useContext(signup);
    const [constructorHasRun, setConstructorHasRun] = useState(false);
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

    const [tickets, setTickets] = useState([])
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmitTicket = async () => {
        await api.post("ticket", {
            accountId: context.accountInfo.id,
            title: title,
            status: "pending"
        })
        getTickets()
        handleClose()

    }


    return (
        <div className="w-full mx-9 mt-5 text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold">
            <div className="flex flex-row justify-between items-center mb-6">
                <h2 className="text-xl font-bold">
                    سوابق تیکت ها
                </h2>
                <button  className='bg-gold text-black px-4 py-2 rounded-md w-fit flex flex-row items-center' onClick={handleClickOpen}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    ثبت تیکت جدید</button>
                <Dialog open={open} onClose={handleClose} PaperProps={{
                        style: {
                            backgroundColor: '#303030',
                            color:"#fff"
                        },}}>
                    <DialogTitle>عنوان تیکت</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span className="text-white">لطفا عنوان تیکت خود را وارد کنید</span>
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="name"
                            label=""
                            type="text"
                            fullWidth
                            value={title}
                            variant="standard"
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <div className="flex justify-center w-full">
                            <button onClick={handleSubmitTicket} className="text-black bg-gold p-2 rounded mx-2">
                                ثبت تیکت
                            </button>
                            {/*<Button onClick={handleClose}>ثبت تیکت</Button>*/}
                            <button onClick={handleClose} className="bg-dark p-2 rounded mx-2">بستن</button>
                        </div>

                    </DialogActions>
                </Dialog>
            </div>

            <div className="table w-full shadow-sm overflow-hidden">
                <div className="table-header-group bg-[#2a2a2a] font-medium shadow-sm overflow-hidden">
                    <div className="table-row text-gold ">
                        <div className="table-cell p-4 rounded-r-lg">#</div>
                        <div className="table-cell p-4">عنوان</div>
                        <div className="table-cell p-4">وضعیت</div>
                        <div className="table-cell p-4">تاریخ</div>
                        <div className="table-cell p-4 rounded-l-lg">عملیات</div>
                    </div>
                </div>
                <div className="table-row-group p-4 text-sm font-medium">
                    {
                        tickets.map((t, i) => (
                            <div className="py-10 table-row text-white transition">
                                <div
                                    className="table-cell border-b-[1px] border-neutral-400 border-dotted px-2 py-3">{i  + 1}</div>
                                <div
                                    className="table-cell border-b-[1px] border-neutral-400 border-dotted px-2 py-3">{t.title}</div>
                                <div
                                    className="table-cell border-b-[1px] border-neutral-400 border-dotted px-2 py-3">{
                                    t.status === "pending" ? "در حال بررسی" : t.status === "answered" ? "پاسخ داده شده" : null
                                }</div>
                                <div

                                    className="table-cell border-b-[1px] border-neutral-400 border-dotted px-2 py-3">{EnglishToPersian(t.date)}</div>
                                <div
                                    className="table-cell border-b-[1px] border-neutral-400 border-dotted px-2 py-3">
                                    <Link to={t.id}>
                                        <button
                                            className='bg-[#21BA55] text-black px-2 py-1 font-normal rounded hover:cursor-pointer transition'>مشاهده
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

export default UserTicket