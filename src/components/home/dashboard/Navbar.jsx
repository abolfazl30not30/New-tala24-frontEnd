import React, {useContext, useState} from "react";
import {BsList} from 'react-icons/bs';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {BsPersonCircle} from "react-icons/bs";
import signup from "../../../contexts/signup";
import {BsCashCoin} from "react-icons/bs";
import {GiTwoCoins,} from "react-icons/gi"
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";


function Navbar() {
    const context = useContext(signup);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const toggleSidebar = () => {
        let sidebar = document.querySelector("#sidebar");
        sidebar.classList.toggle("close");
    }
    return (
        <div className="navbar-dashboard">
            <div className='d-flex flex-row align-items-center'>
                <button className='text-white ms-3 text-2xl' onClick={toggleSidebar}>
                    <BsList/>
                </button>
            </div>
            <div className="flex">
                <div className="text-white mx-2">
                    <div className='flex flex-col justify-center items-center'>
                        <div className="flex justify-center items-center">
                            <BsCashCoin className="text-labelGreen mt-2"/>
                            <span className="mr-2 text-labelGreen text-[0.7rem]">موجودی کیف پول</span>
                        </div>
                        <div className="text-[0.8rem]">
                            <span>{EnglishToPersian(SeparateNumber(context.accountInfo.wallet.inventory))}</span>
                            <span className="mr-2">ریال</span>
                        </div>
                    </div>
                </div>
                <div className="text-white mx-2">
                    <div className='flex flex-col justify-center items-center'>
                        <div className="flex justify-center items-center">
                            <GiTwoCoins className="text-gold mt-2"/>
                            <span className="mr-2 text-gold text-[0.7rem]">موجودی طلایی</span>
                        </div>
                        <div className="text-[0.8rem]">
                            <span>{EnglishToPersian(context.accountInfo.wallet.weight.toString())}</span>
                            <span className="mr-2">گرم</span>
                        </div>
                    </div>
                </div>
                <div className="mx-3">
                    <Button
                        id="navbar-dropdown-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        sx={{color: '#fff'}}
                    >
                        <BsPersonCircle className="text-3xl text-white"/>
                    </Button>
                </div>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}>

                <MenuItem>
                    <Link to='/' className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" width='16' height='16' className="ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>
                        </svg>
                        صفحه اصلی
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to='/dashboard/home' className="flex flex-row items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" width='16' height='16' className="ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        حساب کاربری
                    </Link>
                </MenuItem>
                <MenuItem>
                    <Link to='/' className="flex flex-row items-center" onClick={() => {
                        localStorage.clear()
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" width='16' height='16' className="ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
                        </svg>
                        خروج از حساب
                    </Link>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Navbar;