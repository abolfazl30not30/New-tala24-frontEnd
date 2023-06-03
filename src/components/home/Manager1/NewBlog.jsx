import React, {useEffect, useState} from "react";
import {useRef} from "react"
import {Editor} from '@tinymce/tinymce-react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import Button from '@mui/material/Button';
import api from "../../../api/api";
import {MdCloudUpload, MdDelete} from "react-icons/md";
import {RiFileUploadFill} from "react-icons/ri";
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";
import {TextField} from "@mui/material";

const theme = createTheme({
    direction: 'rtl'
});
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});
const calendarStyles = {
    calendarContainer: 'calendarContainer',
    dayPickerContainer: 'dayPickerContainer',
    monthsList: 'monthsList',
    daysOfWeek: 'daysOfWeek',
    dayWrapper: 'dayWrapper',
    selected: 'selected',
    heading: 'heading',
    next: 'next',
    prev: 'prev',
    title: 'title',
}


export default function NewBlog(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            props.history.push("/sign-in")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        // const navigate = useNavigate();
        if (localStorage.getItem('role') !== "MANAGER") {
            localStorage.clear()
            window.location = ("/sign-in")
        }
        setConstructorHasRun(true);
    };
    constructor()
    const [projectTitle, setProjectTitle] = useState('')
    const [projectContent, setProjectContent] = useState('')
    const [projectType, setProjectType] = useState('low')
    const [projectPrice, setProjectPrice] = useState('')
    const [projectStartDate, setProjectStartDate] = useState("")
    const [projectEndDate, setProjectEndDate] = useState("")

    const [fileId, setFileId] = useState("");
    const [uploadLoading, setUploadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isUpload, setIsUpload] = useState(false);
    const [uploadFile, setUploadFile] = useState([]);
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState('');
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            setProjectContent(editorRef.current.getContent())
        }
    };

    const [blogTitle,setBlogTitle] = useState();
    const [blogContent, setBlogContent] = useState();
    const [blogImage, setBlogImage] = useState();
    const handleReleaseProject = async () => {
        const newProject = {
            title: projectTitle,
            description: description,
            status: "preparingBudge",
            expectedBudge: parseInt(projectPrice),
            prepareBudge: 0,
            startDate: projectStartDate,
            endDate: projectEndDate,
            priority: projectType,
            profileId: fileId
        }
        await api.post("project", newProject)
    }
    const handleInputFile = async (event) => {
        setUploadFile(event.target.files)
        setFileName(event.target.files[0].name)
    }
    const handleUpload = async () => {
        setUploadLoading(true)
        let formData = new FormData();
        formData.append('file', uploadFile[0]);
        await api.post("file", formData)
            .then((response) => {
                console.log("post successful")
                setFileId(response.data.message.id)
                setIsUpload(true)
                setHasError(false)
                setUploadLoading(false)
            }).catch(() => {
                    console.log("error occurred")
                    setIsUpload(true)
                    setHasError(true)
                    setUploadLoading(false)
                }
            )
    }
    const handleDeleteFile = async () => {
        setDeleteLoading(true)
        await api.delete(`file/${fileId}`)
        setFileId("");
        setIsUpload(false);
        setDeleteLoading(false);
    }

    const handleFileChange = (event) => {
        setBlogImage(event.target.files[0]);
    };
    const handleAddBlog = async () => {
        await api.post("blog", {
            title: blogTitle,
            description: description,
        })
    }


    return (
        <>
            <div className="w-full bg-[#252525] mx-8 mt-8 p-4 rounded-lg overflow-scroll">
                <div className="text-gold text-lg font-medium mb-8">اضافه کردن بلاگ</div>
                <div className="flex flex-col space-y-8">
                    <CacheProvider value={cacheRtl}>
                        <ThemeProvider theme={theme}>
                            <div dir="rtl">
                                <TextField
                                    id="outlined-end-adornment"
                                    name="title"
                                    label="عنوان"
                                    className='w-full'
                                    value={blogTitle}
                                    onChange={(e) => setBlogTitle(e.target.value)}
                                    sx={{
                                        label: {color: '#fff !important'},
                                        input: {color: '#fff !important'}
                                    }}
                                />
                            </div>
                        </ThemeProvider>
                    </CacheProvider>
                    <Editor
                        apiKey='your-api-key'
                        onInit={(evt, editor) => editorRef.current = editor}
                        init={{
                            height: 500,
                            language: 'fa',
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:dana,Arial,sans-serif; font-size:16px;color:#fff }'
                        }}
                        onChange={log}
                        onInit={(evt, editor) => {
                            setText(editor.getContent({format: 'text'}));
                        }}
                        value={description}
                        onEditorChange={(newValue, editor) => {
                            setDescription(newValue)
                            setText(editor.getContent({format: 'text'}));
                        }}
                    />
                    <div className="flex items-center justify-center w-full">
                        <label htmlFor="dropzone-file"
                               className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#DFAF3D] border-solid rounded-lg cursor-pointer hover:bg-[#2a2a2a]">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400"
                                     fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2"
                                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                    className="font-semibold">برای آپلود تصویر بلاگ کلیک کنید</span> یا
                                    بکشید و رها کنید</p>
                                <div className="flex flex-row text-sm text-labelGreen mb-2">
                                    {
                                        blogImage?.name
                                            ? <span className='ml-2 text-labelGreen'>فایل آپلود شده:</span>
                                            : <span className='ml-2 text-red-600'>فایلی آپلود نشده</span>
                                    }

                                    <span>{blogImage?.name}</span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG,
                                    JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input
                                id='dropzone-file'
                                type="file"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                    <div className="w-full flex justify-center">
                        <button
                            className='mt-6 bg-[#DFAF3D] w-fit text-black px-4 py-2 rounded-md text-sm'
                            onClick={handleAddBlog}>ثبت
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}






