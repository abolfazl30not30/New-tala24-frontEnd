import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {AiOutlineStock} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {TbReportAnalytics} from "react-icons/tb";
import {useContext, useState} from "react";
import dashboard from "../../../contexts/dashboard";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {BiErrorCircle} from "react-icons/bi";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function Sidebar() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const navigate = useNavigate()
    const context = useContext(dashboard)

    const closeSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#303030',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: "1rem",
        p: 4,
    };

    return (
        <>
            <div className='sidebar-dashboard' id='sidebar'>
                <div id='close_sidebar_mobile' onClick={closeSidebar}>
                    بستن
                </div>

                <div className="logo">
                    <img src={"https://cloud.tala24.co/images/logo192.png"} className="w-[40%] sm:w-[30%]  md:w-1/2" alt={'logo'}/>
                </div>

                <div className="sidebar-list mt-4">
                    <NavLink to="/dashboard/home" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <AiOutlineStock size={'25'} color="#fff" className={'cursor-pointer'}/>
                            <div className="sidebar-list-item-title">
                                بازار
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to="/dashboard/inventory-increase" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                افزایش موجودی
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to="/dashboard/with-draw-money" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                تسویه ریالی
                            </div>
                        </div>
                    </NavLink>
                    {
                        context.completeRegistrationStatus ? (
                            <NavLink to="/dashboard/buy-gold" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                                <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                    </svg>
                                    <div className="sidebar-list-item-title">
                                        خرید طلا
                                    </div>
                                </div>
                            </NavLink>
                        ):(
                            <div className='w-100' onClick={handleOpen} onClick={window.innerWidth <= 768 && (closeSidebar)}>
                                <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                    </svg>
                                    <div className="sidebar-list-item-title">
                                        خرید طلا
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        context.completeRegistrationStatus ? (
                            <NavLink to="/dashboard/sell-gold" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                                <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                                    </svg>
                                    <div className="sidebar-list-item-title">
                                        فروش طلا
                                    </div>
                                </div>
                            </NavLink>
                        ):(
                            <div onClick={handleOpen} className='w-100' onClick={window.innerWidth <= 768 && (closeSidebar)}>
                                <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                                    </svg>
                                    <div className="sidebar-list-item-title">
                                        فروش طلا
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    <NavLink exact to="/dashboard/buy-report" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <TbReportAnalytics size={'25'} color="#fff"/>
                            <div className="sidebar-list-item-title">
                                گزارش طلایی
                            </div>
                        </div>
                    </NavLink>

                    <NavLink exact to="/dashboard/sell-report" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <TbReportAnalytics size={'25'} color="#fff"/>
                            <div className="sidebar-list-item-title">
                                گزارش ریالی
                            </div>
                        </div>
                    </NavLink>

                    <NavLink exact to="/dashboard/buy-coin" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <TbReportAnalytics size={'25'} color="#fff"/>
                            <div className="sidebar-list-item-title">
                                دریافت فیزیکی طلا
                            </div>
                        </div>
                    </NavLink>

                    <NavLink exact to="/dashboard/bank-accounts" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                حساب های من
                            </div>
                        </div>
                    </NavLink>

                    <NavLink exact to="/dashboard/user-profile" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                پروفایل کاربری
                            </div>
                        </div>
                    </NavLink>

                    <NavLink exact to="/dashboard/ticket" className='w-100' activeClassName="active" onClick={window.innerWidth <= 768 && (closeSidebar)}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                پشتیبانی
                            </div>
                        </div>
                    </NavLink>

                    <Link onClick={() => localStorage.clear()} to="/" className={"w-100"}>
                        <div className="d-flex flex-row align-items-center sidebar-list-item text-[0.9rem]">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                خروج
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <BiErrorCircle fontSize={'9rem'} color="#c0392b"/>
                        <Typography id="transition-modal-title" variant="h6" component="h2" color={"#fff"}>
                            براي انجام فرايند خريد و فروش بايد مشخصات خود را تكميل كنيد
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            <button className={"bg-gold py-2 px-5 rounded-2xl"} onClick={() => {
                                navigate("/dashboard/user-profile")
                            }}
                            >
                                رفتن به صفحه تكميل مشخصات
                            </button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default Sidebar;