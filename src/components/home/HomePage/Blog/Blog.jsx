import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import { MdOutlineWatchLater } from "react-icons/md";
import { FiArrowRightCircle } from "react-icons/fi";

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
            <div className="px-4 flex flex-col">
                <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">بلاگ</h2></div>
                <div className="bg-[#303030] flex justify-center  flex-col xl:flex-row ">
                    <div className="md:grid md:grid-cols-2 my-4 self-center ">
                        {
                            blogs?.map((blog, index) => (
                                <div
                                    className="bg-[#232224] w-3/4 md:w-4/5 xl:w-11/12  mx-auto  my-4 box-border border-solid border border-[#6F6F6F] shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col justify-evenly ">
                                    <div>
                                        <p className=" w-auto h-5  my-4  mr-4 text-[#CECECE] not-italic font-medium  text-xl lg:text-2xl   font-roboto">{blog.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#CECECE]  h-16 mx-4 my-16 not-italic font-normal text-base lg:text-xl mr-[1.07rem] font-roboto">{blog.description}</p>
                                    </div>
                                    {/*<div className="flex justify-evenly my-4">
                                        <button
                                            className='flex box-border w-3/6  h-12  mt-4 border border-solid border-[#6F6F6F] rounded-xl justify-evenly'>
                                            <div className='pr-2 my-auto text-[#6F6F6F] text-3xl lg:text-4xl'>
                                                < FiArrowRightCircle/></div>
                                            <p className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base lg:text-lg  xl:text-xl  my-auto text-center px-2'>مطالعه
                                                مطلب </p>
                                        </button>
                                    </div>*/}
                                </div>
                            ))
                        }
                    </div>
                    <div className="bg-[#141414] rounded-2xl flex-col w-3/4 md:w-3/5 lg:w-3/6 xl:w-5/6 2xl:w-4/6   mx-auto xl:mx-0 md:flex h-auto md:justify-evenly my-8 self-center xl:h-[119rem]">
                        <div className="flex justify-evenly h-12 mt-4 xl:mr-4">
                            <div className="text-[#DFAF3D]  mr-2 text-4xl"><MdOutlineWatchLater/></div>
                            <h3 className="  text-white font-Roboto not-italic font-medium text-xl px-2  w-60">آخرین مطالب</h3>
                            <div className="w-3/5 h-0 border-[0.2rem] border-[#DFAF3D]  border-solid opacity-10 ml-4 mt-4"></div>
                        </div>
                        {
                            blogs?.map((blog,index) => (
                                <div className="flex justify-around mt-4 mx-2">
                                    <div className="flex flex-col justify-center">
                                        <div className="  font-Roboto not-italic font-normal text-base  text-white">
                                            <p>{blog.title}</p>
                                        </div>
                                        <div>
                                            <p className=" font-Roboto not-italic font-medium text-base  text-[#B12323]">{blog.writer}  <span className=" text-[#DFAF3D] rounded-[3.12rem] text-3xl ">.</span></p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <button className='flex box-border mt-16 border border-solid border-[#6F6F6F] rounded-xl justify-evenly mx-auto h-12 w-2/5 mb-6'>
                            <div className='  text-[#6F6F6F]  text-3xl  lg:text-4xl self-center'>< FiArrowRightCircle/></div>
                            <div className='text-[#DFAF3D]   font-roboto not-italic font-medium text-base md:text-lg lg:text-xl  self-center text-center'>مطالب بیشتر</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}