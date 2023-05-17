import React, {useEffect, useState,Fragment} from "react";
import {Dialog, Transition} from '@headlessui/react'
import api from "../../../api/api";
import {useNavigate} from "react-router-dom";
import {CacheProvider, ThemeProvider} from "@emotion/react";
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
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            props.history.push("/sign-in")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (localStorage.getItem('role') !== "ADMIN") {
            localStorage.clear()
            window.location = ("/sign-in")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const navigate = useNavigate();

    const [blogs,setBlogs] = useState([
        {
            title: 'اولین',
            description: ' توضیحات اولین',
            id: 1
        },
        {
            title: 'دومین',
            description: ' توضیحات دومین',
            id: 2
        },
        {
            title: 'سومین',
            description: ' توضیحات سومین',
            id: 3
        },
    ])
    const [targetBlog, setTargetBlog] = useState();
    const [open, setOpen] = React.useState(false)
    const [projects, setProjects] = useState([]);
    const getProjects = async () => {
        const projectsResponse = await api.get("project")
        setProjects(projectsResponse.data)
    }
    useEffect(() => {
        getProjects()
    }, []);

    const openModal = (blogId) => {
        setTargetBlog(blogId)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleRemoveProject = () => {
       /* api.delete(`project/${targetBlog}`).then(() => getProjects())*/
        console.log(targetBlog)
        setTargetBlog('')
        setOpen(false);
    }

    return (
        <>
            <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
                <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0">
                    <div className="text-gold text-lg font-medium">بلاگ ها</div>
                    <button
                        onClick={()=>navigate("/admin/new-blog")}
                        type="button"
                        className="rounded-md flex flex-row items-center bg-gold text-black px-4 py-2 text-sm font-medium  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
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
                        <th className={'p-4'}>توضیحات</th>
                        <th className={'p-4'}>عملیات</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.map((blog, index) => (
                            <tr>
                                <td className={'p-3'}>{index + 1}</td>
                                <td className={'p-3'}>{blog.title}</td>
                                <td className={'p-3'}>{blog.description}</td>
                                <td className={'p-3'}>
                                    <button className='text-sm bg-rose-600 p-2 rounded' onClick={() => openModal(blog.id)}>
                                        حذف
                                    </button>
                                    <Transition appear show={open} as={Fragment}>
                                        <Dialog as="div" className="relative z-10" onClose={handleClose} dir="rtl">
                                            <Transition.Child
                                                as={Fragment}
                                                enter="ease-out duration-300"
                                                enterFrom="opacity-0"
                                                enterTo="opacity-100"
                                                leave="ease-in duration-200"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                            >
                                                <div className="fixed inset-0 bg-black bg-opacity-25"/>
                                            </Transition.Child>

                                            <div className="fixed inset-0 overflow-y-auto">
                                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                                    <Transition.Child
                                                        as={Fragment}
                                                        enter="ease-out duration-300"
                                                        enterFrom="opacity-0 scale-95"
                                                        enterTo="opacity-100 scale-100"
                                                        leave="ease-in duration-200"
                                                        leaveFrom="opacity-100 scale-100"
                                                        leaveTo="opacity-0 scale-95"
                                                    >
                                                        <Dialog.Panel
                                                            className="w-full max-w-md transform overflow-hidden rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                                            <Dialog.Title
                                                                as="h3"
                                                                className="text-lg font-medium leading-6 text-gold"
                                                            >
                                                                حذف بلاگ
                                                            </Dialog.Title>
                                                            <div className="mt-6 text-white">
                                                                آیا از حذف این بلاگ مطمئن هستید؟
                                                            </div>
                                                            <div className="mt-4">
                                                                <div className="flex flex-row justify-evenly">
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white"
                                                                        onClick={handleRemoveProject}
                                                                    >
                                                                        حذف
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                                        onClick={handleClose}
                                                                    >
                                                                        بستن
                                                                    </button>
                                                                </div>

                                                            </div>
                                                        </Dialog.Panel>
                                                    </Transition.Child>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </Transition>
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