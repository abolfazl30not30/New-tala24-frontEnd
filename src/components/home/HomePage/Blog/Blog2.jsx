import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiArrowRightCircle } from "react-icons/fi";
import {AiFillHeart} from "react-icons/ai";
import blog_1 from "../../../../images/blog_1.png";
import goldImage2 from "../../../../images/goldImage2.png"


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
          <div className='flex md:flex-row flex-col gap-32 mx-16'>
             <div className="bg-cardDark box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full   md:my-0 my-2">
                        <img src={blog_1} className='mx-4 my-4 ' alt="" />
                            
                            <div>
                                <p className=" text-[#CECECE] sm:text-base text-sm mx-4 my-4" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs ">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-between my-4  mx-2 ">
                                <button className='flex box-border border border-solid border-[#6F6F6F] rounded-xl justify-evenly lg:px-2 px-2 md:py-2 py-1'>
                                    <div className='md:px-1 my-auto text-[#6F6F6F] text-2xl'>< FiArrowRightCircle/></div>
                                    <p className='text-[#DFAF3D] lg:text-sm xl:text-base md:text-sm text-sm md:mx-0 xl:mx-1 lg:mx-[0.2rem] my-auto '>مطالعه مطلب </p>
                                </button>
                                <button className="flex bg-[#373737] rounded-xl  lg:px-2  px-2">
                                    <p className=" md:text-base text-sm  text-[rgb(206,206,206)] my-auto">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90 my-auto md:text-2xl text-xl"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                     <div>
                     <div className=" bg-cardDark rounded-2xl flex flex-col w-full mx-auto md:w-auto">
                        <div className="flex my-2">
                            <div className="text-[#DFAF3D] text-3xl px-2 my-auto"><MdOutlineWatchLater/></div>
                            <h3 className=" text-white sm:text-base text-[0.7rem] px-2 md:px-4 my-auto">آخرین مطالب</h3>
                            <div className="h-0 border-2 border-[#DFAF3D] border-solid opacity-10 px-2  mx-auto w-2/5 md:w-1/5 xl:w-1/3 my-auto"></div>
                            
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-[0.7rem]">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-[0.47rem] text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-[0.7rem]">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-[0.47rem] text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-[0.7rem]">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-[0.47rem] text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button className='flex box-border border border-solid border-[#6F6F6F] rounded-xl mx-auto sm:p-2 p-1 sm:my-2'>
                            <div className='  text-[#6F6F6F]  text-2xl mx-2'>< FiArrowRightCircle/></div>
                            <div className='text-[#DFAF3D] xl:text-base sm:text-sm text-xs my-auto'>مطالب بیشتر</div>
                        </button>
                    </div>
                     </div>
                </div>
        </>
    )
}