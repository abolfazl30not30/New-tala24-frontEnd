import React from "react";
import logo from "../../../images/lastLogo.png";
import {AiOutlineClose, AiOutlineStock} from "react-icons/ai";
import {BiFirstAid} from "react-icons/bi";
import {TbReportAnalytics} from "react-icons/tb";
import {NavLink} from "react-router-dom"
import '../../../style/hamburger.css';
import {useContext, useState} from "react";
import signup from "../../../contexts/signup";
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import rtlPlugin from 'stylis-plugin-rtl';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import {prefixer} from 'stylis';

const Hamburger = () => {
    const info = useContext(signup)

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

    return (
        <div className={'w-[250px] h-screen bg-[#141414] rounded-l-[35px] '} style={{zIndex: "100"}}>
            <div className={'flex justify-end text-white pl-4 pt-4 md1:hidden'}>
                <AiOutlineClose className={'cursor-pointer'} onClick={() => {
                    document.getElementById('ham').className = 'slide-right absolute top-0 block'
                    // document.getElementById('ham1').className = 'md1:block'
                    document.getElementById('main-container').className = 'flex'

                }}/>
            </div>

            <div className={'flex justify-center md1:pt-8'}>
                <img src={logo} alt={'logo'} className={'w-1/2'}/>
            </div>

            <CacheProvider value={cacheRtl}>
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: '#141414', color: "#fff"}}
                    component="nav"
                    aria-labelledby="nested-list-subheader">
                    <NavLink exact to="/admin/gold-price" activeClassName="active-navbar">
                        <ListItemButton>
                            <ListItemIcon>
                                <AiOutlineStock size={'25'} color="#fff" className={'cursor-pointer'}/>
                            </ListItemIcon>

                            <ListItemText primary="قیمت طلا"/>
                        </ListItemButton>
                    </NavLink>
                    <NavLink exact to="/admin/confirm-buy" activeClassName="active-navbar">
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
                    </NavLink>

                    <NavLink exact to="/admin/confirm-sell" activeClassName="active-navbar">
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
                    </NavLink>

                    <NavLink exact to="/admin/ticket" activeClassName="active-navbar">
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
        </div>
    )
}

export default Hamburger;