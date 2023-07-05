import React, {useEffect, useState, Fragment} from "react";
import {Dialog, Transition} from '@headlessui/react'
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";
import {CacheProvider} from "@emotion/react";
import {createTheme} from "@mui/material/styles";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'


// Create RTL MUI
const theme = createTheme({
    direction: 'rtl',
});

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function RTL(props) {
    return <CacheProvider value={cacheRtl}>{props.children}</CacheProvider>;
}

export default function Blogs(props) {
    useEffect(() => {
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (sessionStorage.getItem('role') !== "MANAGER") {
            sessionStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([])
    const [targetBlog, setTargetBlog] = useState();
    const [open, setOpen] = React.useState(false)
    const getBlogs = async () => {
        const blogResponse = await api.get("blog")
        console.log(blogResponse)
        setBlogs(blogResponse)
    }
    useEffect(() => {
        getBlogs()
    }, []);

    const openModal = (blogId) => {
        setTargetBlog(blogId)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
                <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
                    <div className="text-gold text-lg font-medium">بلاگ ها</div>
                    <button
                        onClick={() => navigate("/manager/new-blog")}
                        type="button"
                        className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" className="w-6 h-6 ml-1">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                        اضافه کردن بلاگ
                    </button>
                </div>
                <table className='mt-8 text-white'>
                    <thead>
                    <tr>
                        <th className={'p-4'}>شماره</th>
                        <th className={'p-4'}>نام</th>
                        <th className={'p-4'}>نویسنده</th>
                        <th className={'p-4'}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs?.map((blog, index) => (
                            <tr>
                                <td className={'p-3'}>{index + 1}</td>
                                <td className={'p-3'}>{blog?.title}</td>
                                <td className={'p-3'}>{blog?.writer}</td>
                                <td className={'p-3'}>
                                    <button
                                        type="button"
                                        className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                    >
                                        مشاهده
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}