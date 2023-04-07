import {useContext, useEffect, useState} from "react";
import React from "react"
import logo from '../../../images/lastLogo.png';
import bazaar from '../../../images/bazaar.svg';
import {AiOutlineStock} from "react-icons/ai";
import {BiFirstAid} from "react-icons/bi";
import {TbReportAnalytics} from "react-icons/tb";
import {IoCalendarOutline} from "react-icons/io5";
import {FcPlus} from "react-icons/fc";
import {RxHamburgerMenu} from "react-icons/rx";
import Hamburger from "./Hamburger";
import { Outlet } from "react-router-dom";
import signup from "../../../contexts/signup";
import {useNavigate} from "react-router-dom";
import LoginApi from "../../../api/LoginApi";
import axios from "axios";
import api from "../../../api/api";


const Dashboard = () => {
    const info = useContext(signup)

    const [selected, setSelected] = useState('bazaar');

    const navigate = useNavigate()

    /*useEffect( () => {
        axios.post("https://a24.co/login",
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

        async function test(){
            const res = await api.get(`account/user/${localStorage.getItem("username")}`)
            localStorage.setItem("id", res.id)
            info.setInformation(res.infos)
            console.log(res)
        }

        test()




    }, [])*/

    return (
        <>
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

                        <div className={'flex justify-end w-full items-center'}>
                            {/*<p className={'text-white text-[0.8rem]'}>
                                خزانه: 938,000 تومان
                            </p>*/}
                            {/*<div className={'mx-3'}>
                                <FcPlus size={'25'}/>
                            </div>*/}
                            <div className={'md1:block hidden pr-5'} style={{borderRight: '1px solid #AFAFAF'}}>
                                <IoCalendarOutline size={'25'}/>
                            </div>
                            <p className={'md1:block hidden text-white text-[0.8rem] mr-2'}>
                                تاریخ:
                            </p>
                            <p className={'md1:block hidden text-white text-[0.8rem] mr-2 ml-4'}>
                                {
                                    new Date().toLocaleDateString('fa-IR-u-nu')
                                }
                            </p>
                        </div>
                    </div>
                    <Outlet />
                </div>

                <div className={'hidden'} id={'ham'}>
                    <Hamburger selected={selected} setSelected={setSelected}/>
                </div>

            </div>

        </>
    )
}

export default Dashboard;