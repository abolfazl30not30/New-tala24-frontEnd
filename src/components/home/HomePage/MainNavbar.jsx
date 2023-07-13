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
import ProfileMenu from "./ProfileMenu";

const MainNavbar = () => {

    const navigate = useNavigate()
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
                navigate("/admin/gold-price")
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
            <nav className="border-gray-200 px-5 sm:px-12 py-2.5 rounded dark:bg-gray-900"
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
                                            <Link onClick={()=>{handleNavigate()}} activeClassName="active"
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
                    <ProfileMenu/>
                </div>
            </nav>
            {isOpenNav && (
                <Sidebar isOpenNav={isOpenNav} toggleNavbar={() => toggleNavbar()}/>
            )}
        </div>
    )
}

export default MainNavbar;