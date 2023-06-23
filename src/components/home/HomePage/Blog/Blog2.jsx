import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiArrowRightCircle } from "react-icons/fi";
import blog_1 from "../../../../images/blog_1.png";
import {BsCalendar4Week} from "react-icons/bs";
import {IoShareSocialSharp} from "react-icons/io5";
import {AiFillLinkedin} from "react-icons/ai";
import {BsTwitter} from "react-icons/bs";
import {BsInstagram} from "react-icons/bs";
import {BsFacebook} from "react-icons/bs";
import {RxEnter} from "react-icons/rx";
import {Link} from "react-router-dom";



export default function Blog2(){
    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        const blogResponse = await api.get("blog")
        console.log(blogResponse)
        setBlogs(blogResponse)
    }

    useEffect(() => {
        getBlogs()
    }, []);
    return(
        <>
        <MainNavbar/>
          <div className='flex md:flex-row flex-col gap-8 mx-2 sm:mx-8  md:mx-7'>
          <div className='md:w-4/5 '>
          <div className="p-10 bg-cardDark rounded-2xl">
            <div className="text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl mb-10 font-bold">تب قیمت طلا فروکش کرد /نوسان محدود قیمت دلار</div>
            <div className="border mx-auto border-[#6F6F6F] h-0 border-solid"></div>
            <div className="flex justify-between my-4 ">
                <div className="text-neutral-300 flex my-auto">
                    <div className="sm:text-xl md:text-base lg:text-xl text-mainGold "><BsCalendar4Week/></div>

                    <div className="px-2 text-xs sm:text-sm lg:text-[0.9rem] ">۱۶ اردیبهشت ۱۴۰۲</div>
                </div>
                <div className="pb-2"><span className="text-neutral-300 text-xs sm:text-sm lg:text-[0.9rem] ">نویسنده : </span><span className="text-[#DFAF3D] text-xs sm:text-sm lg:text-[0.9rem]"> غزاله فراهانی</span></div>
            </div>
            <div className="">
                <img src={blog_1} className='w-2/3 mx-auto rounded-xl' alt="" />
            </div>
            <div className="flex flex-col">
                <div>
                    <p className="text-white opacity-80 text-right  my-6 sm:text-base md:text-base lg:text-base text-sm mx-4">در شروع معاملات نقدی امروز شنبه 16 اردیبهشت ماه 
                            بازار ارز ، نسبت به روز قبل رنج بود اما در در نیمه
                           ظهر امروز تقریبا 250 تومان کاهش را ثبت کرد در هرات نیز
                            بازیگران ارزی در ساعات اولیه معاملات 
                           امروز شاهد ورود دلار به کانال
                           جدید بودند اما ظهر امروز اسکناس آمریکایی در بازار یاد شده
                           200 تومان پایین تر از 
                           روز پنجشنبه گذشته به فروش  رسید.در تهران هم،
                           طبق اعلام سایت ها نرخ دلار نوسان 
                           محدودی را تجربه کرده است. تداوم ثبات نرخ ارز
                           در مرکز مبادله در سمت رسمی بازار؛ 
                           مرکز مبادله طلا و ارز قیمت دلار (اسکناس) را تغییر نداد.
                           قیمت دلار  در مرکز مبادله ارز
                           و طلای ایران 42 هزار و 306 تومان اعلام شده که نسبته
                           به دو روز قبل ثابت مانده است.
                    </p>
                </div>
                <div className="flex justify-between my-2 mx-1">
                    <button
                        className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded">
                        <IoShareSocialSharp fontSize="15px" className="transform"/>
                        <Link to="/login">
                            <spna className="mr-2">اشتراک گذاری</spna>
                        </Link>
                    </button>
                    <div className='flex'>
                      <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a href=""><AiFillLinkedin/></a></div>
                      <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a href=""><BsTwitter/></a></div>
                      <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2 "><a href=""><BsInstagram/></a></div>
                      <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a href=""><BsFacebook/></a></div>
                    </div>
                </div>
            </div>
          </div>
          </div>
                     <div className='md:w-1/2 lg:w-1/3'>
                     <div className=" bg-cardDark rounded-2xl flex flex-col p-5">
                        <div className="flex my-2">
                            <div className="text-[#DFAF3D] text-3xl px-2 my-auto"><MdOutlineWatchLater/></div>
                            <h3 className=" text-white sm:text-base   px-2 md:px-4 my-auto">آخرین مطالب</h3>
                            <div className="h-0 border-2 border-[#DFAF3D] border-solid opacity-10   mx-auto w-2/5 md:w-1/5 xl:w-1/3 my-auto"></div>
                            
                        </div>
                        <div className="flex xl:justify-around mx-1 my-2">
                            <div className="rounded-2xl w-2/5 sm:w-2/5 sm:mx-2 md:mx-3 md:w-4/5 lg:w-3/5">
                                <a href="#"><img className="rounded-xl" src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-2 sm:mx-4 md:mx-1">
                                <div className=" text-white  text-xs sm:text-sm md:text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="text-xs sm:text-sm md:text-xs  text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                        <div className="rounded-2xl w-2/5 sm:w-2/5 sm:mx-2 md:mx-3 md:w-4/5 lg:w-3/5">
                                <a href="#"><img className=" rounded-xl  " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-2 sm:mx-4 md:mx-1">
                                <div className=" text-white  text-xs sm:text-sm md:text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="text-xs sm:text-sm md:text-xs  text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                        <div className="rounded-2xl w-2/5 sm:w-2/5 sm:mx-2 md:mx-3 md:w-4/5 lg:w-3/5">
                                <a href="#"><img className="rounded-xl" src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-2 sm:mx-4 md:mx-1">
                                <div className=" text-white  text-xs sm:text-sm md:text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="text-xs sm:text-sm md:text-xs  text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                         <div className="flex justify-center mt-5">
                             <button
                                 className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded">
                                 <FiArrowRightCircle fontSize="15px" className="transform"/>
                                 <Link to="/login">
                                     <spna className="mr-2">مطالب بیشتر</spna>
                                 </Link>
                             </button>
                         </div>
                    </div>
                     </div>
                </div>
        </>
    )
}