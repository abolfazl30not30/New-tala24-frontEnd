import React from 'react';
import logo from "../../../images/lastLogo.png"
import {useState, useEffect} from "react";
import {RxEnter} from "react-icons/rx"
import "../../../style/home.css"
import {Link, NavLink, useNavigate} from "react-router-dom"

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
                            <img src={logo} className="h-6 mr-3 sm:h-9"
                                 alt="Tala24"/>
                        </a>
                        <div className="hidden mr-8 w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent"
                                style={{backgroundColor: "transparent"}}>
                                <li>
                                    <NavLink to="/" activeClassName="active"
                                             className="block ml-7 py-2 pl-3 pr-4 text-white hover:text-gold font-light">خانه</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/services" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">خدمات</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/about-us" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">درباره
                                        ما</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/contact-us" activeClassName="active"
                                             className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">تماس
                                        با ما</NavLink>
                                </li>
                                <li>
                                    {
                                        localStorage.getItem("username") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization") ?
                                            <NavLink onClick={async () => {
                                                await LoginApi()
                                                if (localStorage.getItem("role") === "ADMIN") {
                                                    navigate("/admin")
                                                } else if (localStorage.getItem("role") === "USER") {
                                                    navigate("/dashboard/home")
                                                } else if (localStorage.getItem("role") === "MANAGER") {
                                                    navigate("/manager/add-admin")
                                                } else {
                                                    localStorage.clear()
                                                    navigate("/")
                                                }
                                            }} activeClassName="active"
                                                     className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light ">ورود به پنل
                                            </NavLink> :
                                            <NavLink to="/login" activeClassName="active"
                                                     className="block py-2 pl-3 pr-4 text-white rounded  md:border-0 md:p-0 hover:text-gold font-light "> ورود
                                                به سامانه</NavLink>
                                    }

                                </li>
                            </ul>
                        </div>
                    </div>
                    {
                        localStorage.getItem("username") && localStorage.getItem("password") && localStorage.getItem("role") && localStorage.getItem("Authorization")

                            ? <div className="flex flex-1 flex-wrap items-center justify-end mx-auto">
                                <Button
                                    id="navbar-dropdown-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{color: '#000'}}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={1.5}
                                         stroke="currentColor" width='24' height='24'>
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                                    </svg>
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem>
                                        <Link to='/'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5}
                                                 stroke="currentColor" width='16' height='16' className="ms-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                                            </svg>
                                            صفحه اصلی
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <div onClick={async () => {
                                            await LoginApi()
                                            if (localStorage.getItem("role") === "ADMIN") {
                                                navigate("/admin")
                                            } else if (localStorage.getItem("role") === "USER") {
                                                navigate("/dashboard/home")
                                            } else if (localStorage.getItem("role") === "MANAGER") {
                                                navigate("/manager/add-admin")
                                            } else {
                                                localStorage.clear()
                                                navigate("/")
                                            }
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5}
                                                 stroke="currentColor" width='16' height='16' className="ms-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            </svg>
                                            پنل کاربری
                                        </div>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to='/' onClick={() => {
                                            localStorage.clear()
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5}
                                                 stroke="currentColor" width='16' height='16' className="ms-1">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                                            </svg>
                                            خروج از حساب
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