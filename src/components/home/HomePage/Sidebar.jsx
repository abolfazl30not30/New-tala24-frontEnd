import React from "react";
import {AiOutlineClose, AiOutlineStock} from "react-icons/ai";
import {BiFirstAid} from "react-icons/bi";
import {TbReportAnalytics} from "react-icons/tb";
import '../../../style/hamburger.css';
import {Link} from "react-router-dom";



const Sidebar = (props) => {
    return (
        <>
            <div className={"bg-mainGray bg-opacity-60 absolute top-0 right-0 z-20 w-[100%] h-[100vh]"} onClick={()=>{props.toggleNavbar()}}>
            </div>
            <div className={props.isOpenNav ? "slide-left absolute top-0 right-0 z-50 w-[60%] h-screen bg-[#252525] rounded-l-[35px]" : "slide-right absolute top-0 right-0 z-50 w-[60%] h-screen bg-[#252525] rounded-l-[35px]"}>
                <div className={'flex justify-end text-white pl-4 pt-4 md1:hidden'}>
                    <AiOutlineClose className={'cursor-pointer'} onClick={()=>{props.toggleNavbar()}}/>
                </div>

                <div className={'flex justify-center md1:pt-8'}>
                    <img src={"https://cloud.tala24.co/images/logo192.png"} alt={'logo'} className={'w-1/2'}/>
                </div>

                <div className={'text-white'}>
                    <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700" style={{backgroundColor:"transparent"}}>
                        <li>
                            <Link to="/" activeClassName="active"
                                     className="block ml-7 py-2 pl-3 pr-4 text-white hover:text-gold rounded   md:bg-transparent md:p-0 dark:text-white">خانه</Link>
                        </li>
                        <li>
                            <Link to="/services" activeClassName="active"
                                     className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0">خدمات</Link>
                        </li>
                        <li>
                            <Link to="/rules" activeClassName="active"
                                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0">قوانین و مقررات </Link>
                        </li>
                        <li>
                            <Link to="/education" activeClassName="active"
                                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0">آموزش</Link>
                        </li>
                        <li>
                            <Link to="/blog" activeClassName="active"
                                  className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0">بلاگ</Link>
                        </li>
                        <li>
                            <Link to="/about-us" activeClassName="active"
                                     className="block py-2 pl-3 pr-4 text-white  rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0 ">درباره ما</Link>
                        </li>
                        <li>
                            <Link to="/contact-us" activeClassName="active"
                                     className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0">تماس با ما</Link>
                        </li>
                        <li>
                            <Link to="/login" activeClassName="active"
                                     className="block py-2 pl-3 pr-4 text-white rounded hover:text-gold md:hover:bg-transparent md:hover:text-gold md:border-0 md:hover:text-blue-700 md:p-0"> ورود به سامانه</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar;