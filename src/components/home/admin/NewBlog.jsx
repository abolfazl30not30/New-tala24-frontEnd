import React, {useEffect, useState} from "react";
import { useRef } from "react"
import { Editor } from '@tinymce/tinymce-react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
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
const calendarStyles= {
    calendarContainer: 'calendarContainer',
    dayPickerContainer: 'dayPickerContainer',
    monthsList: 'monthsList',
    daysOfWeek: 'daysOfWeek',
    dayWrapper: 'dayWrapper',
    selected: 'selected',
    heading: 'heading',
    next:'next',
    prev:'prev',
    title:'title',
}


export default function NewBlog(props) {
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
    const [projectTitle,setProjectTitle] = useState('')
    const [projectContent,setProjectContent] = useState('')
    const [projectType,setProjectType] = useState('low')
    const [projectPrice,setProjectPrice] = useState('')
    const [projectStartDate,setProjectStartDate] = useState("")
    const [projectEndDate,setProjectEndDate] = useState("")

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

    const handleSetStartDate = (date) => {
        const convertedDate = date.getFullYear().toString() + "/" + date.getMonth().toString() + "/" + date.getDate().toString()
        setProjectStartDate(convertedDate)
    }
    const handleSetEndDate = (date) => {
        const convertedDate = date.getFullYear().toString() + "/" + date.getMonth().toString() + "/" + date.getDate().toString()
        setProjectEndDate(convertedDate)
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
                                    /*value={newGoldPrice}
                                    onChange={getPrice}*/
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
                            content_style: 'body { font-family:dana,Arial,sans-serif; font-size:16px }'
                        }}
                        onChange={log}
                        onInit={(evt, editor) => {
                            setText(editor.getContent({format: 'text'}));
                        }}
                        /*value={description}
                        onEditorChange={(newValue, editor) => {
                            setDescription(newValue)
                            setText(editor.getContent({format: 'text'}));
                        }}*/
                    />
                    <input className="form-control form-control " id="formFileLg" type="file"
                           onChange={(e) => {
                               handleInputFile(e)
                           }}/>
                </div>

            </div>

        </>
    );
}






