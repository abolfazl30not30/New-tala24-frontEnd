import {MenuItem, Select} from "@mui/material"
import React from "react";
import '../../../style/request.css'
import {FiFilter} from "react-icons/fi";
import {useContext, useEffect, useState} from "react";
import api from '../../../api/api'
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {useNavigate} from "react-router-dom";
import {VscError} from "react-icons/vsc"
import {IoClose} from "react-icons/io5";
import {AiOutlineCheck} from "react-icons/ai";
import signup from "../../../contexts/signup";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import FormControl from "@mui/material/FormControl";


const Logs = () => {
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedType, setSelectedType] = useState("all")

    const handleChangeType = (event) => {
        setSelectedType(event.target.value);
    };
    const handleDateStartInput = (value) => {
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year + '/' + month + '/' + day;
        setStartDate(convertDate)
    }

    const handleDateEndInput = (value) => {
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year + '/' + month + '/' + day;
        setEndDate(convertDate)
    }

    useEffect(() => {
        const getData = async () => {
            const getDataRes = await api.get(`account/${localStorage.getItem("id")}`)
            if (getDataRes) {
                setData([...getDataRes.payments, ...getDataRes.orders, ...getDataRes.sellReqs])
            }
        }
        getData()

        const zarinHandle = async () => {
            let currentURL = window.location.href;
            if (currentURL.slice(-3) === "NOK") {
                setShowErrorModal(true)
                console.log("Not OK")
            } else if (currentURL.slice(-3) === "=OK") {
                let authority = currentURL.slice(-46, -10)
                const verifyRes = await api.post("zarinpal/purchase/verify", {
                    Authority: authority,
                    Amount: parseInt(localStorage.getItem("price"))
                })
                if (verifyRes?.Status === 100 || verifyRes?.Status === 101) {
                    setShowSuccessModal(true)
                    await api.post(`zarinpal/purchase/verifySuccess/${localStorage.getItem("paymentID")}`, {...verifyRes})
                    console.log("OK")
                } else {
                    await api.post(`zarinpal/purchase/verifyFail/${localStorage.getItem("paymentID")}`, {})
                    setShowErrorModal(true)
                    console.log("Not OK")
                }
            }
        }
        zarinHandle()

    }, []);

    const navigate = useNavigate()

    const info = useContext(signup)

    const handleClose = () => {
        setShowErrorModal(false)
        setShowSuccessModal(false)
        navigate("")
    }

    useEffect(() => {
        // const zarinHandle = async () => {
        //     const getRes = await api.post(`payment/search/${localStorage.getItem("id")}`, {})
        //
        //     if (getRes) {
        //         setData(getRes)
        //     }
        //
        //     let currentURL = window.location.href;
        //     if (currentURL.slice(-3) === "NOK") {
        //         setShowErrorModal(true)
        //         console.log("Not OK")
        //     } else if (currentURL.slice(-3) === "=OK") {
        //         let authority = currentURL.slice(-46, -10)
        //         const verifyRes = await api.post("zarinpal/purchase/verify", {
        //             Authority: authority,
        //             Amount: parseInt(localStorage.getItem("price"))
        //         })
        //         if (verifyRes?.Status === 100 || verifyRes?.Status === 101) {
        //             setShowSuccessModal(true)
        //             await api.post(`zarinpal/purchase/verifySuccess/${localStorage.getItem("paymentID")}`, {...verifyRes})
        //             console.log("OK")
        //         } else {
        //             setShowErrorModal(true)
        //             console.log("Not OK")
        //         }
        //     }
        // }
        // zarinHandle()
    }, [])

    const successStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 300,
        borderRadius: 6,
        bgcolor: '#3c3c3c',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '15px'
    };

    const errorStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 250,
        height: 325,
        borderRadius: 6,
        bgcolor: '#3c3c3c',
        border: '2px solid #000',
        boxShadow: 24,
        padding: '15px'
    };

    const handleBuyGold = async (log) => {
        localStorage.setItem("paymentID", log.id)
        localStorage.setItem("price", log.price)
        const initRes = await api.post("zarinpal/purchase/init", {
            Amount: log.price,
            Description: "شارژ اکانت",
            CallbackURL: "http://localhost:3000/dashboard/request",
            accountId: localStorage.getItem("id")
        })
        if (initRes?.Status === "100") {
            window.location.replace(`https://sandbox.zarinpal.com/pg/StartPay/${initRes.Authority}`)
        } else {
            console.log("error")
        }
    }

    return (
        <div className={'mx-9 mt-5'}>
            <h2 className={'text-white text-[1.5rem]'}>
                گزارشات
            </h2>

            <div className={'text-white bg-[#141414] mt-10 rounded-[8px] p-5'}>
                <div className={'flex items-center'}>
                    <FiFilter size={20} className={"text-gold"}/>
                    <h2 className={'mr-1 text-gold'}>
                        فیلتر
                    </h2>
                </div>

                <div className={'sm:flex justify-center text-[0.7rem] mt-6 pb-4'}
                     style={{borderBottom: '1px solid #6F6F6F'}}>
                    <div className={'sm:flex'}>
                        <div className={'mt-2 mx-4'} >
                            <div className={'mb-2'}>
                                نوع گزارش
                            </div>
                            <div className={"w-[15rem]"}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedType}
                                        onChange={handleChangeType}>

                                        <MenuItem value={"all"}>همه</MenuItem>
                                        <MenuItem value={"buy"}>گزارش خرید</MenuItem>
                                        <MenuItem value={"sell"}>گزارش فروش</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className={'mt-2'}>
                            <div className={'mb-2'}>
                                از تاریخ
                            </div>
                            <div>
                                <DatePicker
                                    // fixMainPosition={false}
                                    calendarPosition={`bottom`}
                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                    format={`YYYY/MM/DD`}


                                    containerStyle={{
                                        width: "100%"
                                    }}

                                    inputClass={`field bg-[#212121] w-full sm:w-[15rem] h-[3.55rem] p-4 text-white border-gold rounded`}
                                    value={startDate}
                                    onChange={(value) => {
                                        handleDateStartInput(value)
                                    }}

                                    mapDays={({date}) => {
                                        let props = {}
                                        let isWeekend = [6].includes(date.weekDay.index)

                                        if (isWeekend)
                                            props.className = "highlight highlight-red";

                                        return props
                                    }}

                                    weekDays={
                                        [
                                            ["شنبه", "Sat"],
                                            ["یکشنبه", "Sun"],
                                            ["دوشنبه", "Mon"],
                                            ["سه شنبه", "Tue"],
                                            ["چهارشنبه", "Wed"],
                                            ["پنجشنبه", "Thu"],
                                            ["جمعه", "Fri"],
                                        ]
                                    }

                                    calendar={persian}
                                    locale={persian_fa}

                                >
                                    <button
                                        onClick={() => {
                                            setStartDate()
                                        }
                                        }
                                    >
                                        ریست
                                    </button>
                                </DatePicker>
                            </div>
                        </div>
                        <div className={'sm:ml-5 sm:mx-5'}>
                            <div className={'mb-2 mt-4 sm:mt-2'}>
                                تا تاریخ
                            </div>
                            <div>
                                <DatePicker
                                    // fixMainPosition={false}
                                    calendarPosition={`bottom`}
                                    digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                    format={`YYYY/MM/DD`}


                                    containerStyle={{
                                        width: "100%"
                                    }}

                                    inputClass={`field bg-[#212121] w-full sm:w-[15rem] h-[3.55rem] p-4 text-white border-gold rounded`}
                                    value={endDate}
                                    onChange={(value) => {
                                        handleDateEndInput(value)
                                    }}

                                    mapDays={({date}) => {
                                        let props = {}
                                        let isWeekend = [6].includes(date.weekDay.index)

                                        if (isWeekend)
                                            props.className = "highlight highlight-red";

                                        return props
                                    }}

                                    weekDays={
                                        [
                                            ["شنبه", "Sat"],
                                            ["یکشنبه", "Sun"],
                                            ["دوشنبه", "Mon"],
                                            ["سه شنبه", "Tue"],
                                            ["چهارشنبه", "Wed"],
                                            ["پنجشنبه", "Thu"],
                                            ["جمعه", "Fri"],
                                        ]
                                    }

                                    calendar={persian}
                                    locale={persian_fa}

                                >
                                    <button
                                        onClick={() => {
                                            setEndDate("")
                                        }
                                        }
                                    >
                                        ریست
                                    </button>
                                </DatePicker>
                            </div>
                        </div>
                    </div>
                    <div className={'md:flex'}>
                        <div className={''}>
                            <div className={'mt-6'}/>
                            <button
                                className={'h-[3.55rem] w-full sm:w-[150px] bg-gold text-[0.9rem] text-black rounded-lg mt-2'}>
                                جستجو
                            </button>
                        </div>
                    </div>
                </div>

                <div className={'overflow-scroll'}>

                    {
                        data ?
                            <>
                                <h2 className={'my-5'}>
                                    گزارشات
                                </h2>
                                <table>
                                    <tr>
                                        <th className={'p-4 text-center'}>شماره</th>
                                        <th className={'p-4 text-center'}>تاریخ</th>
                                        <th className={'p-4 text-center'}>وضعیت درخواست</th>
                                        <th className={'p-4 text-center'}>مبلغ</th>
                                        <th className={'p-4 text-center'}>وضعیت پرداخت</th>
                                        <th className={'p-4 text-center'}>کد رهگیری</th>
                                    </tr>

                                    {
                                        data?.filter(({status}) => status !== "pending").filter(({order}) => order === undefined || order === null).map((data, index) => (
                                            <tr key={index}>
                                                <td className={'p-3 text-center'}>{index + 1}</td>
                                                <td className={'p-3 text-center'}>{data.date}</td>
                                                <td className={'p-3 flex justify-center'}>
                                                    <OverlayTrigger
                                                        className={'p-3 flex justify-center'}
                                                        placement="bottom"
                                                        delay={{show: 250, hide: 400}}
                                                        overlay={<Tooltip id="button-tooltip">
                                                            {data.failureReason}
                                                        </Tooltip>
                                                        }
                                                    >
                                                        {
                                                            data.isAuthorized === undefined
                                                                ? <p className={'authorizedSuccessful'}>
                                                                    تایید شده
                                                                </p>
                                                                : data.isAuthorized === "pending"
                                                                    ? <p className={'statusPending'}>
                                                                        در حال بررسی
                                                                    </p>
                                                                    : data.isAuthorized === "failed"
                                                                        ? <p className={'authorizedFailed'}>
                                                                            تایید نشده
                                                            </p>
                                                            : data.isAuthorized === "successful"
                                                                            ? <p className={'authorizedSuccessful'}>
                                                                                تایید شده
                                                                            </p>
                                                                            : null
                                                        }
                                                    </OverlayTrigger>
                                                </td>
                                                <td className={'p-3 text-center'}>{EnglishToPersian(data.price?.toString()) + " ریال"}</td>
                                                <td className={'p-3 flex justify-center'}>
                                                    {
                                                        data.status === "pending"
                                                            ? <p className={'statusPending'}>
                                                                در حال بررسی
                                                            </p>
                                                            : data.status === "failed"
                                                                ? <p className={'statusFailed'}>
                                                                    رد شده
                                                                </p>
                                                                : data.status === "successful"
                                                                    ? <p className={'statusSuccessful'}>
                                                                        موفق
                                                                    </p>
                                                                    : <p className={'statusSuccessful'}>
                                                                        موفق
                                                                    </p>
                                                    }
                                                </td>
                                                <td className={'p-3 text-center'}>{data.refId === undefined ? "___" : data.refId}</td>
                                            </tr>
                                        ))
                                    }

                                </table>
                            </>
                            :
                            <h2 className={"text-[red] mt-5 text-[1.3rem] text-center"}>
                                تراکنشی انجام نشده!
                            </h2>
                    }
                </div>
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showSuccessModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={showSuccessModal}>
                    <Box sx={successStyle}>
                        <div className={'flex justify-end'} onClick={handleClose}>
                            <IoClose size={15} color={"#fff"}/>
                        </div>
                        <div className={'mt-5'}>
                            <Typography id="transition-modal-title" variant="h5" component="h2" color={"white"}
                                        className={'text-center'}>
                                پرداخت با موفقیت انجام شد!
                            </Typography>
                        </div>
                        <div className={'flex justify-center mt-[50px]'}>
                            <Typography id="transition-modal-description" variant="h5" component="h2" color={"#1ea000"}>
                                <AiOutlineCheck size={100}/>
                            </Typography>
                        </div>
                    </Box>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={showErrorModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={showErrorModal}>
                    <Box sx={errorStyle}>
                        <div className={'flex justify-end'} onClick={handleClose}>
                            <IoClose size={15} color={"#fff"}/>
                        </div>
                        <div className={'mt-5'}>
                            <Typography id="transition-modal-title" variant="h5" component="h2" color={"white"}
                                        className={'text-center'}>
                                خطا در پرداخت!
                            </Typography>
                            <p className={"text-center text-white mt-3 text-[0.8rem]"}> در صورت کسر وجه از حساب شما،
                                مبلغ کاسته شده تا حداکثر ۷۲ ساعت آینده به حساب شما بازگردانده می شود
                            </p>
                        </div>
                        <div className={'flex justify-center mt-[35px]'}>
                            <Typography id="transition-modal-description" variant="h5" component="h2" color={"#ff3030"}>
                                <VscError size={100}/>
                            </Typography>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}

export default Logs;