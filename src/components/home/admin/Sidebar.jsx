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
                    <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'}/>
                </div>

                <div className="sidebar-list mt-4">
                    <NavLink to="/admin/gold-price" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <AiOutlineStock size={'25'} color="#fff" className={'cursor-pointer'}/>
                            <div className="sidebar-list-item-title">
                                ثبت قیمت طلا
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/confirm-buy" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                درخواست خرید طلا
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/confirm-sell" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                درخواست فروش طلا
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/blogs" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                بلاگ
                            </div>
                        </div>
                    </NavLink>

                    <NavLink to="/admin/quote" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                مظنه
                            </div>
                        </div>
                    </NavLink>
                    <NavLink to="/admin/ticket" className='w-100' activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                تیکت
                            </div>
                        </div>
                    </NavLink>
                    <NavLink onClick={() => localStorage.clear()} to="/" className={"w-100"} activeClassName="active">
                        <div className="d-flex flex-row align-items-center sidebar-list-item">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 strokeWidth={1.5}
                                 stroke="currentColor" className="text-white w-6 h-6">
                                <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
                            </svg>
                            <div className="sidebar-list-item-title">
                                خروج
                            </div>
                        </div>
                    </NavLink>
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