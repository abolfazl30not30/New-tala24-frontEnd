import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import {MdOutlineWatchLater} from "react-icons/md";
import {FiArrowRightCircle} from "react-icons/fi";
import blog_1 from "../../../../images/blog_1.png";
import {BsCalendar4Week, BsFacebook, BsInstagram, BsTwitter} from "react-icons/bs";
import {IoShareSocialSharp} from "react-icons/io5";
import {AiFillLinkedin} from "react-icons/ai";
import {Link, useParams} from "react-router-dom";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import { RWebShare } from "react-web-share";
import { Markup } from 'interweave'

export default function Blog2() {
    const [blogs, setBlogs] = useState([])
    const [detailsOfBlog,setDetailsOfBlog] = useState({})
    const [currentURL,setCurrentURL] = useState("")
    const [popularBlog, setPopularBlog] = useState([])
    const [countOfBolg , setCountOfBlog] = useState(1)

    const params = useParams();

    const getDetailsOfBlog = async () => {
        const blogResponse = await api.get(`blog/${params.id}`)
        setDetailsOfBlog(blogResponse)
    }

    const getPopularBolg = async (count) => {
        const blogResponse = await api.get(`blog/popular/${count}`)
        setPopularBlog(blogResponse)
        setCountOfBlog(countOfBolg + 1)
    }

    useEffect(() => {
        getDetailsOfBlog();
        getPopularBolg(countOfBolg)
        setCurrentURL(window.location.href)
    }, []);

    return (
        <>
            <MainNavbar/>
            <div className='flex md:flex-row flex-col gap-8 mx-2 sm:mx-8  md:mx-7'>
                <div className='md:w-4/5 '>
                    <div className="p-10 bg-cardDark rounded-2xl">
                        <div
                            className="text-white text-sm sm:text-xl md:text-lg lg:text-xl xl:text-2xl mb-10 font-bold">تب
                            قیمت طلا فروکش کرد /نوسان محدود قیمت دلار
                        </div>
                        <div className="border mx-auto border-[#6F6F6F] h-0 border-solid"></div>
                        <div className="flex justify-between my-4 ">
                            <div className="text-neutral-300 flex my-auto">
                                <div className="sm:text-xl md:text-base lg:text-xl text-mainGold "><BsCalendar4Week/>
                                </div>

                                <div className="px-2 text-xs sm:text-sm lg:text-[0.9rem] ">{EnglishToPersian(detailsOfBlog.createAt)}</div>
                            </div>
                            <div className="pb-2"><span
                                className="text-neutral-300 text-xs sm:text-sm lg:text-[0.9rem] ">نویسنده : </span><span
                                className="text-[#DFAF3D] text-xs sm:text-sm lg:text-[0.9rem]">{detailsOfBlog.writer} </span>
                            </div>
                        </div>
                        <div className="">
                            <img src={blog_1} className='w-2/3 mx-auto rounded-xl' alt=""/>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <p className="text-white opacity-80 text-right  my-6 sm:text-base md:text-base lg:text-base text-sm mx-4">
                                    {<Markup content={detailsOfBlog.description}/> }
                                </p>
                            </div>
                            <div className="flex justify-between my-2 mx-1">
                                <RWebShare
                                    data={{
                                        text: "shate",
                                        url: currentURL,
                                        title: "tala24",
                                    }} onClick={() => console.log("shared successfully!")}>
                                    <button
                                        className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded">
                                        <IoShareSocialSharp fontSize="15px" className="transform"/>
                                        <spna className="mr-2">اشتراک گذاری</spna>
                                    </button>
                                </RWebShare>

                                <div className='flex'>
                                    <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a
                                        href=""><AiFillLinkedin/></a></div>
                                    <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a
                                        href=""><BsTwitter/></a></div>
                                    <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2 "><a
                                        href=""><BsInstagram/></a></div>
                                    <div className="text-[#6F6F6F] hover:text-mainGold text-2xl self-center mx-2"><a
                                        href=""><BsFacebook/></a></div>
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
                            <div
                                className="h-0 border-2 border-[#DFAF3D] border-solid opacity-10   mx-auto w-2/5 md:w-1/5 xl:w-1/3 my-auto"></div>

                        </div>
                        {
                            popularBlog.map((blog)=>(
                                <Link to={`/blog/${blog.id}`} className="hover:bg-mainGray rounded-xl">
                                    <div className="flex justify-start mx-1 my-2">
                                        <div className="rounded-2xl sm:mx-2 md:mx-3 w-[30%]">
                                            <img className="rounded-xl object-cover" src={blog_1} alt=""/>
                                        </div>
                                        <div className="flex flex-col mx-2 sm:mx-4 md:mx-1">
                                            <div className=" text-white  text-xs sm:text-sm md:text-[0.9rem]">
                                                <h4>
                                                    {blog.title}
                                                </h4>
                                            </div>
                                            <div>
                                                <div className="text-xs sm:text-sm md:text-[0.8rem]  text-[#B12323]">{blog.writer}<span className="mx-2 text-[#DFAF3D] rounded-full text-2xl">.</span>
                                                    {EnglishToPersian(blog.createAt.slice(0,9))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        <div className="flex justify-center mt-5">
                            <button
                                className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded">
                                <FiArrowRightCircle fontSize="15px" className="transform"/>
                                <span>
                                    <spna className="mr-2">مطالب بیشتر</spna>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}