import React from "react";
import {AiOutlineClose, AiOutlineStock} from "react-icons/ai";
import {BiErrorCircle, BiFirstAid} from "react-icons/bi";
import {TbReportAnalytics} from "react-icons/tb";
import {NavLink, useNavigate} from "react-router-dom"
import '../../../style/hamburger.css';
import {useContext, useEffect, useState} from "react";
import signup from "../../../contexts/signup";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';
import api from "../../../api/api";
import dashboard from "../../../contexts/dashboard";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const Hamburger = () => {
    const info = useContext(signup)
    const context = useContext(dashboard)

    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [openRequest, setOpenRequest] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const handleRequest = () => {
        setOpenRequest(!openRequest);
    };

    const handleReport = () => {
        setOpenReport(!openReport);
    };

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

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
        <div className={'w-[250px] h-screen bg-[#252525] rounded-l-[35px] '} style={{zIndex: "100"}}>
            <div className={'flex justify-end text-white pl-4 pt-4 md1:hidden'}>
                <AiOutlineClose className={'cursor-pointer'} onClick={() => {
                    document.getElementById('ham').className = 'slide-right absolute top-0 block'
                    // document.getElementById('ham1').className = 'md1:block'
                    document.getElementById('main-container').className = 'flex'

                }}/>
            </div>

            <div className={'flex justify-center md1:pt-8'}>
                <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'} className={'w-1/2'}/>
            </div>

            <CacheProvider value={cacheRtl}>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: '#252525', color: "#fff"}}
                    component="nav"
                    aria-labelledby="nested-list-subheader">
                    <NavLink exact to="/dashboard/home" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <AiOutlineStock size={'25'} color="#fff" className={'cursor-pointer'}/>
                            </ListItemIcon>

                            <ListItemText primary="بازار"/>
                        </ListItemButton>
                    </NavLink>


                    {
                        context.completeRegistrationStatus ?
                            <NavLink exact to="/dashboard/inventory-increase" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                        </svg>
                                    </ListItemIcon>

                                    <ListItemText primary="افزایش موجودی"/>
                                </ListItemButton>
                            </NavLink> :
                            <ListItemButton onClick={handleOpen}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                    </svg>
                                </ListItemIcon>

                                <ListItemText primary="افزایش موجودی"/>
                            </ListItemButton>
                    }


                    {
                        context.completeRegistrationStatus ?
                            <NavLink exact to="/dashboard/buy-gold" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="text-white w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                        </svg>
                                    </ListItemIcon>

                                    <ListItemText primary="خرید طلا"/>
                                </ListItemButton>
                            </NavLink> :
                            <ListItemButton onClick={handleOpen}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                                    </svg>
                                </ListItemIcon>

                                <ListItemText primary="خرید طلا"/>
                            </ListItemButton>
                    }
                    {
                        context.completeRegistrationStatus ?
                            <NavLink exact to="/dashboard/sell-gold" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="currentColor" className="text-white w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                                        </svg>
                                    </ListItemIcon>

                                    <ListItemText primary="فروش طلا"/>

                                </ListItemButton>
                            </NavLink> :
                            <ListItemButton onClick={handleOpen}>
                                <ListItemIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" className="text-white w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>
                                    </svg>
                                </ListItemIcon>

                                <ListItemText primary="فروش طلا"/>

                            </ListItemButton>
                    }

                    <ListItemButton onClick={handleRequest}>
                        <ListItemIcon>
                            <BiFirstAid size={'23'} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText primary="درخواست ها"/>
                        {openRequest ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openRequest} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink exact to="/dashboard/buy-request" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                    </ListItemIcon>

                                    <ListItemText primary="درخواست خرید"/>

                                </ListItemButton>
                            </NavLink>

                            <NavLink exact to="/dashboard/sell-request" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="درخواست فروش"/>
                                </ListItemButton>
                            </NavLink>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleReport}>
                        <ListItemIcon>
                            <TbReportAnalytics size={'25'} color="#fff"/>
                        </ListItemIcon>
                        <ListItemText primary="گزارشات"/>
                        {openReport ? <ExpandLess/> : <ExpandMore/>}
                    </ListItemButton>

                    <Collapse in={openReport} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <NavLink exact to="/dashboard/buy-report" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="گزارش خرید"/>
                                </ListItemButton>
                            </NavLink>

                            <NavLink exact to="/dashboard/sell-report" activeClassName="active-navbar">
                                <ListItemButton>
                                    <ListItemIcon>
                                    </ListItemIcon>
                                    <ListItemText primary="گزارش فروش"/>
                                </ListItemButton>
                            </NavLink>
                        </List>
                    </Collapse>

                    {/*<NavLink exact to="/dashboard/log" activeClassName="active-navbar">*/}
                    {/*    <ListItemButton>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <TbReportAnalytics size={'25'} color="#fff"/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary="گزارشات"/>*/}
                    {/*    </ListItemButton>*/}
                    {/*</NavLink>*/}

                    <NavLink exact to="/dashboard/ticket" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="text-white w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary="تیکت"/>
                        </ListItemButton>
                    </NavLink>


                    <NavLink exact to="/dashboard/user-profile" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                            </ListItemIcon>

                            <ListItemText primary="پروفایل کاربری"/>
                        </ListItemButton>
                    </NavLink>


                    <NavLink exact to="/dashboard/bank-accounts" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary="حساب های من"/>
                        </ListItemButton>
                    </NavLink>
                    <NavLink exact to="/dashboard/buy-coin" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="text-white w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>
                                </svg>
                            </ListItemIcon>

                            <ListItemText primary="دریافت فیزیکی طلا"/>
                        </ListItemButton>
                    </NavLink>
                    <NavLink onClick={() => localStorage.clear()} exact to="/" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5}
                                     stroke="currentColor" className="text-white w-6 h-6">
                                    <path d="M10 3H6a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h4M16 17l5-5-5-5M19.8 12H9"/>
                                </svg>
                            </ListItemIcon>
                            <ListItemText primary="خروج"/>
                        </ListItemButton>
                    </NavLink>
                </List>
            </CacheProvider>

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
                                navigate("/dashboard/complete-info")
                                info.setSelected("complete-info")
                            }}
                            >
                                رفتن به صفحه تكميل مشخصات
                            </button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Hamburger;
