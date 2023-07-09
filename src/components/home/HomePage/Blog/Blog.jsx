import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";
import api from "../../../../api/api";
import {MdOutlineWatchLater} from "react-icons/md";
import {FiArrowRightCircle} from "react-icons/fi";
import blog_1 from "../../../../images/blog_1.png";
import {Link} from "react-router-dom";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import {Filter} from 'interweave'

class LinkFilter extends Filter {

    node(name, node) {
        if (name === "p") {
            if (node.textContent.length > 100) {
                return node;
            }
        }
    }
}

export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [popularBlog, setPopularBlog] = useState([])
    const [countOfBolg, setCountOfBlog] = useState(1)

    const getBlogs = async () => {
        const blogResponse = await api.get("blog")
        console.log(blogResponse)
        setBlogs(blogResponse)
    }
    const getPopularBolg = async (count) => {
        const blogResponse = await api.get(`blog/popular/${count}`)
        setPopularBlog(blogResponse)
        setCountOfBlog(countOfBolg + 1)
    }
    const handleDescription = (des) => {
        const regex = /(<([^>]+)>)/gi;
        let result = des.replace(regex, "");
        result = result.slice(0, 250) + "...."
        return (result)
    }
    useEffect(() => {
        getBlogs()
        getPopularBolg(countOfBolg);
    }, []);

    return (
        <>
            <MainNavbar/>
            <div className="p-3 md:p-10">
                <div className="flex mx-4 md:flex-row gap-5 flex-col">
                    <div className="w-full md:w-[72%] md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {
                            blogs.map((blog) => (
                                <div className="justify-between bg-cardDark  box-border  shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full md:my-0 my-2">
                                    <img src={blog_1} className='mx-4 my-4' alt=""/>
                                    <div>
                                        <p className=" text-white text-center sm:text-base text-xl font-bold mx-4 my-4">{blog.title}</p>
                                    </div>
                                    <div>
                                        <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs">{
                                            handleDescription(blog.description)
                                        }</p>
                                    </div>
                                    <div className="flex justify-center mt-2 mb-5 mx-2 ">
                                        <Link to={`/blog/${blog.id}`}
                                              className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded"
                                              style={{border: "1px solid #DFAF3D"}}>
                                            <FiArrowRightCircle fontSize="15px" className="transform"/>
                                            <span>
                                        <spna className="mr-2">ادامه مطلب</spna>
                                    </span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="w-full md:w-[28%]">
                        <div className="bg-cardDark rounded-2xl flex flex-col p-5">
                            <div className="flex my-2">
                                <div className="text-[#DFAF3D] text-3xl px-2 my-auto"><MdOutlineWatchLater/></div>
                                <h3 className=" text-white sm:text-base   px-2 md:px-4 my-auto">مطالب پربازدید </h3>
                                <div
                                    className="h-0 border-2 border-[#DFAF3D] border-solid opacity-10   mx-auto w-2/5 md:w-1/5 xl:w-1/3 my-auto"></div>
                            </div>
                            {
                                popularBlog.map((blog) => (
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
                                                    <div
                                                        className="text-xs sm:text-sm md:text-[0.8rem]  text-[#B12323]">{blog.writer}<span
                                                        className="mx-2 text-[#DFAF3D] rounded-full text-2xl">.</span>
                                                        {EnglishToPersian(blog.createAt.slice(0, 9))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            <div className="flex justify-center mt-5">
                                <button
                                    onClick={() => getPopularBolg(countOfBolg)}
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
            </div>

        </>
    )
}