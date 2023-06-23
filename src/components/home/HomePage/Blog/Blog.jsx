import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiArrowRightCircle } from "react-icons/fi";
import {AiFillHeart} from "react-icons/ai";
import blog_1 from "../../../../images/blog_1.png";
import goldImage2 from "../../../../images/goldImage2.png"

export default function Blog() {
    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        const blogResponse = await api.get("blog")
        console.log(blogResponse)
        setBlogs(blogResponse)
    }

    useEffect(() => {
        getBlogs()
    }, []);

    return (
        <>
            <MainNavbar/>
            <div className="">
                <div className="flex mx-4 md:flex-row gap-1 flex-col">
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-1">
                        <div className="bg-cardDark box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full   md:my-0 my-2">
                        <img src={blog_1} className='mx-4 my-4' alt="" />
                            <div>
                                <p className=" text-[#CECECE] sm:text-base text-sm mx-4 my-4" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs ">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-between my-4  mx-2 ">
                                <button className='flex box-border bg-mainGold hover:opacity-80 rounded-xl justify-evenly lg:px-2 px-2 md:py-2 py-1'>
                                    <div className='md:px-1 my-auto text-[#6F6F6F] text-2xl'>< FiArrowRightCircle/></div>
                                    <p className='text-black lg:text-sm xl:text-base md:text-sm text-sm md:mx-0 xl:mx-1 lg:mx-[0.2rem] my-auto '>مطالعه مطلب </p>
                                </button>
                                <button className="flex bg-[#373737] rounded-xl  lg:px-2  px-2">
                                    <p className=" md:text-base text-sm  text-[rgb(206,206,206)] my-auto">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90 my-auto md:text-2xl text-xl"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                        <div className="bg-cardDark box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full   md:my-0 my-2">
                        <img src={blog_1} className='mx-4 my-4' alt="" />
                            
                            <div>
                                <p className=" text-[#CECECE] sm:text-base text-sm mx-4 my-4" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs ">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-between my-4  mx-2 ">
                            <button className='flex box-border bg-mainGold hover:opacity-80 rounded-xl justify-evenly lg:px-2 px-2 md:py-2 py-1'>
                                    <div className='md:px-1 my-auto text-[#6F6F6F] text-2xl'>< FiArrowRightCircle/></div>
                                    <p className='text-black lg:text-sm xl:text-base md:text-sm text-sm md:mx-0 xl:mx-1 lg:mx-[0.2rem] my-auto '>مطالعه مطلب </p>
                                </button>
                                <button className="flex bg-[#373737] rounded-xl  lg:px-2  px-2">
                                    <p className=" md:text-base text-sm  text-[rgb(206,206,206)] my-auto">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90 my-auto md:text-2xl text-xl"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                        <div className="bg-cardDark box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full   md:my-0 my-2">
                        <img src={blog_1} className='mx-4 my-4' alt="" />
                            
                            <div>
                                <p className=" text-[#CECECE] sm:text-base text-sm mx-4 my-4" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs ">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-between my-4  mx-2 ">
                            <button className='flex box-border bg-mainGold hover:opacity-80 rounded-xl justify-evenly lg:px-2 px-2 md:py-2 py-1'>
                                    <div className='md:px-1 my-auto text-[#6F6F6F] text-2xl'>< FiArrowRightCircle/></div>
                                    <p className='text-black lg:text-sm xl:text-base md:text-sm text-sm md:mx-0 xl:mx-1 lg:mx-[0.2rem] my-auto '>مطالعه مطلب </p>
                                </button>
                                <button className="flex bg-[#373737] rounded-xl  lg:px-2  px-2">
                                    <p className=" md:text-base text-sm  text-[rgb(206,206,206)] my-auto">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90 my-auto md:text-2xl text-xl"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                        <div className="bg-cardDark box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full   md:my-0 my-2">
                        <img src={blog_1} className='mx-4 my-4' alt="" />
                            
                            <div>
                                <p className=" text-[#CECECE] sm:text-base text-sm mx-4 my-4" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs ">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-between my-4  mx-2 ">
                            <button className='flex box-border bg-mainGold hover:opacity-80 rounded-xl justify-evenly lg:px-2 px-2 md:py-2 py-1'>
                                    <div className='md:px-1 my-auto text-[#6F6F6F] text-2xl'>< FiArrowRightCircle/></div>
                                    <p className='text-black lg:text-sm xl:text-base md:text-sm text-sm md:mx-0 xl:mx-1 lg:mx-[0.2rem] my-auto '>مطالعه مطلب </p>
                                </button>
                                <button className="flex bg-[#373737] rounded-xl  lg:px-2  px-2">
                                    <p className=" md:text-base text-sm  text-[rgb(206,206,206)] my-auto">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90 my-auto md:text-2xl text-xl"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                    <div className=" bg-cardDark rounded-2xl flex flex-col w-full mx-auto md:w-auto">
                        <div className="flex my-2">
                            <div className="text-[#DFAF3D] text-3xl px-2 my-auto"><MdOutlineWatchLater/></div>
                            <h3 className=" text-white sm:text-base text-sm px-2 md:px-4 my-auto">آخرین مطالب</h3>
                            <div className="h-0 border-2 border-[#DFAF3D] border-solid opacity-10 px-2  mx-auto w-2/5 md:w-1/5 xl:w-1/3 my-auto"></div>
                            
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-xs text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-xs text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex xl:justify-around mx-1  my-2">
                            <div className="rounded-2xl">
                                <a href="#"><img className=" rounded-2xl " src={blog_1} alt=""/></a>
                            </div>
                            <div className="flex flex-col mx-[0.08rem]">
                                <div className=" text-white lg:text-sm md:text-xs sm:text-sm text-xs">
                                    <a href="#">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                    </a>
                                </div>
                                <div>
                                    <a href="#">
                                    <p className="xl:text-xs lg:text-[0.59rem] md:text-[0.5rem] sm:text-sm  text-xs text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-full text-2xl">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <button className='flex box-border bg-mainGold hover:opacity-80 rounded-xl mx-auto p-2 my-2'>
                            <div className='  text-[#6F6F6F]  text-2xl mx-2'>< FiArrowRightCircle/></div>
                            <div className='text-black xl:text-base md:text-sm my-auto'>مطالب بیشتر</div>
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            {/*<div className="px-4 flex flex-col">*/}
            {/*    <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">بلاگ</h2></div>*/}
            {/*    <div className="bg-[#303030] flex justify-center  flex-col xl:flex-row ">*/}
            {/*        <div className="md:grid md:grid-cols-2 my-4 self-center ">*/}
            {/*            {*/}
            {/*                blogs?.map((blog, index) => (*/}
            {/*                    <div*/}
            {/*                        className="bg-[#232224] w-3/4 md:w-4/5 xl:w-11/12  mx-auto  my-4 box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col justify-evenly ">*/}
            {/*                        <div>*/}
            {/*                            <p className=" w-auto h-5  my-4  mr-4 text-[#CECECE] not-italic font-medium  text-xl lg:text-2xl   font-roboto">{blog.title}</p>*/}
            {/*                        </div>*/}
            {/*                        <div>*/}
            {/*                            <p className="text-[#CECECE]  h-16 mx-4 my-16 not-italic font-normal text-base lg:text-xl mr-[1.07rem] font-roboto">{blog.description}</p>*/}
            {/*                        </div>*/}
            {/*                        /!*<div className="flex justify-evenly my-4">*/}
            {/*                            <button*/}
            {/*                                className='flex box-border w-3/6  h-12  mt-4 border border-solid border-[#6F6F6F] rounded-xl justify-evenly'>*/}
            {/*                                <div className='pr-2 my-auto text-[#6F6F6F] text-3xl lg:text-4xl'>*/}
            {/*                                    < FiArrowRightCircle/></div>*/}
            {/*                                <p className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base lg:text-lg  xl:text-xl  my-auto text-center px-2'>مطالعه*/}
            {/*                                    مطلب </p>*/}
            {/*                            </button>*/}
            {/*                        </div>*!/*/}
            {/*                    </div>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </div>*/}
            {/*        <div className="bg-[#141414] rounded-2xl flex-col w-3/4 md:w-3/5 lg:w-3/6 xl:w-5/6 2xl:w-4/6   mx-auto xl:mx-0 md:flex h-auto md:justify-evenly my-8 self-center xl:h-[119rem]">*/}
            {/*            <div className="flex justify-evenly h-12 mt-4 xl:mr-4">*/}
            {/*                <div className="text-[#DFAF3D]  mr-2 text-4xl"><MdOutlineWatchLater/></div>*/}
            {/*                <h3 className="  text-white font-Roboto not-italic font-medium text-xl px-2  w-60">آخرین مطالب</h3>*/}
            {/*                <div className="w-3/5 h-0 border-[0.2rem] border-[#DFAF3D]  border-solid opacity-10 ml-4 mt-4"></div>*/}
            {/*            </div>*/}
            {/*            {*/}
            {/*                blogs?.map((blog,index) => (*/}
            {/*                    <div className="flex justify-around mt-4 mx-2">*/}
            {/*                        <div className="flex flex-col justify-center">*/}
            {/*                            <div className="  font-Roboto not-italic font-normal text-base  text-white">*/}
            {/*                                <p>{blog.title}</p>*/}
            {/*                            </div>*/}
            {/*                            <div>*/}
            {/*                                <p className=" font-Roboto not-italic font-medium text-base  text-[#B12323]">{blog.writer}  <span className=" text-[#DFAF3D] rounded-[3.12rem] text-3xl ">.</span></p>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*            <button className='flex box-border mt-16 border border-solid border-[#6F6F6F] rounded-xl justify-evenly mx-auto h-12 w-2/5 mb-6'>*/}
            {/*                <div className='  text-[#6F6F6F]  text-3xl  lg:text-4xl self-center'>< FiArrowRightCircle/></div>*/}
            {/*                <div className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base md:text-lg lg:text-xl  self-center text-center'>مطالب بیشتر</div>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}