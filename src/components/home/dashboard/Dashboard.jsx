import React, {useContext, useEffect, useState} from "react";
import Bazaar from "./Bazaar";
import BuyGold from './BuyGold/BuyGold'
import bazaar from '../../../images/bazaar.svg';
import {IoCalendarOutline} from "react-icons/io5";
import {RxHamburgerMenu} from "react-icons/rx";
import Hamburger from "./Hamburger";
import {Link, Route, useNavigate} from "react-router-dom";

import '../../../style/hamburger.css'
import signup from "../../../contexts/signup";
import axios from "axios";
import api from "../../../api/api";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import dashboard from "../../../contexts/dashboard"
import * as PropTypes from "prop-types";
import MainSection from "./MainSection";


function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};
const Dashboard = () => {

    const info = useContext(signup)

    const [selected, setSelected] = useState('bazaar');

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [completeRegistrationStatus, setCompleteRegistrationStatus] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

     function getProfile () {
         api.get(`info/profile/${localStorage.getItem("id")}`).then((response) => {
            if (response.firstName !== null && response.lastName !== null && response.nationalCode !== null) {
                setCompleteRegistrationStatus(true)
            }
        })
    }

    useEffect(() => {
        axios.post("http://localhost:8090/login",
            {username: localStorage.getItem("username"), password: localStorage.getItem("password")}, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Headers': ['Set-Cookie', 'Content-Type', "x-xsrf-token"],
                }
            }
        ).then((response) => {
            localStorage.setItem("Authorization", response.headers["authorization"])
        }).catch((error) => {
            navigate("/")
        })

        async function test() {
            const res = await api.get(`account/user/${localStorage.getItem("username")}`)
            localStorage.setItem("id", res.id)
            info.setInformation(res.infos)
        }
        test()
        getProfile()
    }, [])
    useEffect(()=>{

    },[])
    return (
        <>
        <dashboard.Provider value={{completeRegistrationStatus:completeRegistrationStatus, setCompleteRegistrationStatus:setCompleteRegistrationStatus}}>
            <div className={'flex'} id={'main-container'}>
                <div className={'hidden md1:block'} id={'ham1'}>
                    <Hamburger selected={selected} setSelected={setSelected}/>
                </div>

                <div className={'w-screen'}>
                    <div className={'flex items-center text-white bg-[#141414] h-[79px] mt-10 mx-7 rounded-[20px]'}>

                        <div className={'md1:flex hidden justify-start w-full'}>
                            <p className={'text-white text-[0.8rem] mr-5'}>
                                سلام، خوش آمدید!
                            </p>
                        </div>

                        <div className={'md1:hidden'}>
                            <RxHamburgerMenu size={30} className={'mr-5 cursor-pointer'} onClick={() => {
                                document.getElementById('ham').className = 'slide-left absolute top-0';
                                document.getElementById('main-container').className = 'flex fixed';
                            }}/>
                        </div>

                        <div className={'flex justify-end w-full items-center ml-[25px]'}>
                            {/* <p className={'text-white text-[0.8rem]'}>
                                خزانه: 938,000 تومان
                            </p>*/}
                            {/*<div className={'mx-3'}>
                                <FcPlus size={'25'}/>
                            </div>*/}
                            <div className={'md1:block hidden pr-5 mr-5'}>
                                <IoCalendarOutline size={'25'}/>
                            </div>
                            <p className={'md1:block hidden text-white text-[0.8rem] mr-2'}>
                                تاریخ:
                            </p>
                            <p className={'md1:block hidden text-white text-[0.8rem] mr-2 ml-2 pl-5'}
                               style={{borderLeft: '1px solid #AFAFAF'}}>
                                {
                                    new Date().toLocaleDateString('fa-IR-u-nu')
                                }
                            </p>
                            <div>
                                <Button
                                    id="navbar-dropdown-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{color: '#fff'}}
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
                                    <MenuItem sx={{color: '#000'}}>
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
                                        <Link to='/dashboard/home'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 stroke-width="1.5"
                                                 stroke="currentColor" width='16' height='16' className="ms-1">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
                                            </svg>
                                            پنل کاربری
                                        </Link>
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
                        </div>
                    </div>
                    <MainSection/>
                </div>

                <div className={'hidden'} id={'ham'} style={{zIndex: "100"}}>
                    <Hamburger/>
                </div>

            </div>
        </dashboard.Provider>
        </>
    )
}

export default Dashboard;