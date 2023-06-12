import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiArrowRightCircle } from "react-icons/fi";
import {AiFillHeart} from "react-icons/ai";
import goldImage1 from "../../../../images/goldmg.png";
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
                <div className="flex flex-col xl:flex-row mx-4">
                    <div className="md:grid md:grid-cols-2 my-4">
                        <div className="bg-cardDark w-3/4 md:w-4/5 xl:w-11/12  mx-auto  my-4 box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col justify-evenly ">
                            <div className="card bg-no-repeat bg-cover w-4/5 xl:w-11/12 h-48 xl:h-64 mt-4 rounded-2xl" ></div>
                            <div>
                                <p className=" w-auto h-5  my-4  mr-4 text-[#CECECE] not-italic font-medium  text-xl lg:text-2xl   font-roboto" >جهش خیره کننده نرخ طلای جهانی</p>
                            </div>
                            <div>
                                <p className="text-[#CECECE]  h-16 mx-4 my-16 not-italic font-normal text-base lg:text-xl mr-[1.07rem]   font-roboto">در ۲ روز پایانی هفته قبل یک جزر و مد قیمتی را تجربه کرد. بامداد پنجشنبه در واکنش  توسط فدرال رزرو جهش خیره کننده ای را در کارنامه خود ثبت کرد</p>
                            </div>
                            <div className="flex justify-evenly my-4">
                                <button className='flex box-border w-3/6  h-12  mt-4 border border-solid border-[#6F6F6F] rounded-xl justify-evenly'>
                                    <div className='pr-2 my-auto text-[#6F6F6F] text-3xl lg:text-4xl'>< FiArrowRightCircle/></div>
                                    <p className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base lg:text-lg  xl:text-xl  my-auto text-center px-2'>مطالعه مطلب </p>
                                </button>
                                <button className="flex w-2/6  bg-[#373737] rounded-xl  mt-4 justify-center">
                                    <p className=" text-base md:text-lg lg:text-xl font-Roboto not-italic font-medium text-[rgb(206,206,206)] self-center pb-1 px-1">21.3K</p>
                                    <div className=" text-[#FC545E] opacity-90  self-center text-3xl lg:text-4xl px-2"><AiFillHeart/></div>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className=" bg-cardDark rounded-2xl flex-col w-3/4 md:w-3/5 lg:w-3/6 xl:w-5/6 2xl:w-4/6   mx-auto xl:mx-0 md:flex  md:justify-evenly my-8">
                        <div className="flex justify-evenly h-12 mt-4 xl:mr-4">
                            <div className="text-[#DFAF3D]  mr-2 text-4xl"><MdOutlineWatchLater/></div>
                            <h3 className="  text-white font-Roboto not-italic font-medium text-xl px-2  w-60">آخرین مطالب</h3>
                            <div className="w-3/5 h-0 border-[0.2rem] border-[#DFAF3D]  border-solid opacity-10 ml-4 mt-4"></div>
                        </div>
                        <div className="flex justify-around mt-4 mx-2">
                            <div className="w-2/5 rounded-2xl ml-2">
                                <img className="w-full rounded-2xl ml-2" src={goldImage1} alt=""/>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="  font-Roboto not-italic font-normal text-base  text-white">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                </div>
                                <div>
                                    <p className=" font-Roboto not-italic font-medium text-base  text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-[3.12rem] text-3xl ">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-around mt-4 mx-2">
                            <div className=" w-2/5 rounded-2xl ml-2">
                                <img className="rounded-2xl" src={goldImage2} alt=""/>
                            </div>
                            <div className="flex flex-col justify-center">
                                <div className="  font-Roboto not-italic font-normal text-base  text-white">
                                    <p>
                                        ثبت رکورد تاریخی طلا و اوج‌گیری بیت کوین  ثبت رکورد
                                        تاریخی طلا و اوج‌گیری بیت کوین
                                    </p>
                                </div>
                                <div>
                                    <p className=" font-Roboto not-italic font-medium text-base  text-[#B12323]">غزاله فراهانی  <span className=" text-[#DFAF3D] rounded-[3.12rem] text-3xl ">.</span> ۱۶ اردیبهشت ۱۴۰۲</p>
                                </div>
                            </div>
                        </div>
                        <button className='flex box-border mt-16 border border-solid border-[#6F6F6F] rounded-xl justify-evenly mx-auto h-12 w-2/5 mb-6'>
                            <div className='  text-[#6F6F6F]  text-3xl  lg:text-4xl self-center'>< FiArrowRightCircle/></div>
                            <div className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base md:text-lg lg:text-xl  self-center text-center'>مطالب بیشتر</div>
                        </button>
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