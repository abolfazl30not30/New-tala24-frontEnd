import React from 'react';
import {useState, useEffect} from "react";
import {RxEnter} from "react-icons/rx"
import "../../../style/home.css"
import {Link, useNavigate} from "react-router-dom"

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";

import Sidebar from "./Sidebar";
import Menu from "@mui/material/Menu";
import {MenuItem} from "@mui/material";
import LoginApi from "../../../api/LoginApi";
import {BsPersonCircle} from "react-icons/bs";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";

const MainNavbar = () => {

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [isOpenNav, setIsOpenNav] = useState(false);

    useEffect(() => {
    }, []);

    function toggleNavbar() {
        if (isOpenNav) {
            setIsOpenNav(false);
        } else {
            setIsOpenNav(true);
        }
    }
    const handleNavigate = async () =>{
            await LoginApi()
            if (sessionStorage.getItem("role") === "ADMIN") {
                navigate("/admin")
            } else if (sessionStorage.getItem("role") === "USER") {
                navigate("/dashboard/home")
            } else if (sessionStorage.getItem("role") === "MANAGER") {
                navigate("/manager/add-admin")
            } else {
                sessionStorage.clear()
                navigate("/")
            }
    }
    return (
        <div className="mb-7">
            <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900"
                 style={{backgroundColor: "transparent"}}>
                <div className="container  flex flex-1 flex-wrap justify-between">
                    <div className="flex flex-wrap items-center justify-start mx-auto">
                        <button onClick={() => {
                            toggleNavbar()
                        }} data-collapse-toggle="navbar-default" type="button"
                                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <a href="#" className="flex items-center">
                            <img src={"https://cloud.tala24.co/images/logo192.png"} className="h-6 mr-2 sm:h-11"
                                 alt="Tala24"/>
                        </a>
                        <div className="hidden mr-8 w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent"
                                style={{backgroundColor: "transparent"}}>
                                <li>
                                    <Link to="/" activeClassName="active"
                                             className="block ml-7 py-2 pl-3 pr-4 text-white hover:text-gold font-light">خانه</Link>
                                </li>
                                <li>
                                    <Link to="/services" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">خدمات</Link>
                                </li>
                                <li>
                                    <Link to="/rules" activeClassName="active"
                                          className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">قوانین و مقرارت</Link>
                                </li>
                                <li>
                                    <Link to="/education" activeClassName="active"
                                          className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">آموزش</Link>
                                </li>
                                <li>
                                    <Link to="/blog" activeClassName="active"
                                          className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">بلاگ</Link>
                                </li>
                                <li>
                                    <Link to="/about-us" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">درباره
                                        ما</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">تماس
                                        با ما</Link>
                                </li>
                                <li>
                                    {
                                        sessionStorage.getItem("username") && sessionStorage.getItem("password") && sessionStorage.getItem("role") && sessionStorage.getItem("Authorization") ?
                                            <Link onClick={async () => handleNavigate} activeClassName="active"
                                                     className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">ورود به پنل
                                            </Link> :
                                            <Link to="/login" activeClassName="active"
                                                     className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light "> ورود
                                                به سامانه</Link>
                                    }

                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        sessionStorage.getItem("username") && sessionStorage.getItem("password") && sessionStorage.getItem("role") && sessionStorage.getItem("Authorization")
                            ? <div className="flex flex-1 flex-wrap items-center justify-end mx-auto">
                                <Button
                                    id="navbar-dropdown-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    className="bg-transparent shadow-none"
                                    sx={{color: '#000'}}
                                >
                                    <img className="w-10"
                                         src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                         alt="profile"/>
                                </Button>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            bgcolor:"#252525",
                                            borderRadius:"1.5rem",
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem>
                                        <Link  onClick={()=>{handleNavigate();
                                            handleClose();}}>
                                            <div className="flex items-center">
                                                <img className="w-10"
                                                     src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                     alt="profile"/> <span className="mr-2">پنل کاربر</span>
                                            </div>
                                        </Link>
                                    </MenuItem>
                                    <Divider className="bg-neutral-600" />
                                    <MenuItem>
                                        <Link to="/dashboard/user-profile" className="flex items-center" onClick={handleClose}>
                                            <ListItemIcon>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                                </svg>
                                            </ListItemIcon>
                                            اطلاعات کاربری
                                        </Link>
                                    </MenuItem>
                                    <MenuItem >
                                        <Link to="/dashboard/inventory-increase" className="flex items-center" onClick={handleClose}>
                                            <ListItemIcon>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth={1.5} stroke="currentColor" className="ml-2 w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
                                                </svg>
                                            </ListItemIcon>
                                            افزایش موجودی
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to="/" className="flex items-center" onClick={() => {sessionStorage.clear();handleClose()}}>
                                            <ListItemIcon>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                                                     stroke="currentColor" width='16' height='16' className="ml-2 w-5 h-5 text-white">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                                </svg>
                                            </ListItemIcon>
                                            خروج
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                            :
                            <div className="flex flex-1 flex-wrap items-center justify-end mx-auto">
                                <button
                                    className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded">
                                    <RxEnter fontSize="15px" className="transform rotate-180"/>
                                    <Link to="/login">
                                        <spna className="mr-2">ورود | ثبت نام</spna>
                                    </Link>
                                </button>
                            </div>
                    }
                </div>
            </nav>
            {isOpenNav && (
                <Sidebar isOpenNav={isOpenNav} toggleNavbar={() => toggleNavbar()}/>
            )}
        </div>
    )
}

export default MainNavbar;