import {IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import '../../../style/request.css'
import {FiFilter} from "react-icons/fi";
import {useContext, useEffect, useState} from "react";
import api from '../../../api/api'
import axios from "axios";
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

const Logs = () => {
    const [showErrorModal, setShowErrorModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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
            <h2 className={'text-white'}>
                درخواست ها
            </h2>

            <div className={'text-white bg-[#141414] mt-10 rounded-[8px] p-5'}>
                <div className={'flex items-center'}>
                    <FiFilter size={20}/>
                    <h2 className={'mr-1'}>
                        فیلتر
                    </h2>
                </div>
                <div className={'sm:flex justify-center text-[0.7rem] mt-6 pb-4'} style={{borderBottom: '1px solid #6F6F6F'}}>
                    <div className={'sm:flex'}>
                        <div className={'mt-2'}>
                            <div className={'mb-2'}>
                                از تاریخ
                            </div>
                            <div>
                                <input className={'field bg-[#212121] w-full sm:w-[150px] h-[48px] p-4 text-white'}/>
                            </div>
                        </div>
                        <div className={'sm:ml-5 sm:mx-5'}>
                            <div className={'mb-2 mt-4 sm:mt-2'}>
                                تا تاریخ
                            </div>
                            <div>
                                <input className={'field bg-[#212121] w-full sm:w-[150px] h-[48px] p-4 text-white'}/>
                            </div>
                        </div>
                    </div>
                    <div className={'md:flex'}>
                        <div className={''}>
                            <div className={'mt-6'}/>
                            <button className={'h-[50px] w-full sm:w-[150px] bg-[#DFAF3D] text-[0.9rem] text-black rounded-lg mt-2'}>
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
                                    سابقه واریزی ها
                                </h2>
                                <table>
                                    <tr>
                                        <th className={'p-4 text-center'}>شماره</th>
                                        <th className={'p-4 text-center'}>تاریخ</th>
                                        <th className={'p-4 text-center'}>وضعیت درخواست</th>
                                        <th className={'p-4 text-center'}>مبلغ</th>
                                        <th className={'p-4 text-center'}>وضعیت پرداخت</th>
                                        <th className={'p-4 text-center'}>پرداخت</th>
                                    </tr>

                                    {

                                        data?.filter(({status}) => status === "pending").map((data, index) => (
                                                <tr key={index}>
                                                    <td className={'p-3 text-center'}>{index + 1}</td>
                                                    <td className={'p-3 text-center'}>{data.date}</td>
                                                    <td className={'p-3 flex justify-center'}>
                                                        {
                                                            data.checked === undefined ? (
                                                                data.isAuthorized === undefined
                                                                    ? <small>&nbsp;</small>
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

                                                            )
                                                            : (data.status === "pending"
                                                                        ? <p className={'statusPending'}>
                                                                            در حال بررسی
                                                                        </p>
                                                                        : data.status === "failed"
                                                                            ? <p className={'authorizedFailed'}>
                                                                                تایید نشده
                                                                            </p>
                                                                            : data.status === "successful"
                                                                                ? <p className={'authorizedSuccessful'}>
                                                                                    تایید شده
                                                                                </p>
                                                                                : null
                                                                )

                                                        }
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
                                                                        : null
                                                        }
                                                    </td>
                                                    <td className={'p-3 text-center'}>
                                                        {
                                                            data.checked !== undefined ? "___" : <button className={"status disabled:bg-amber-200 disabled:text-gray-600 bg-gold text-black"} onClick={() => handleBuyGold(data)}>
                                                                خرید
                                                            </button>
                                                        }
                                                    </td>
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
                slots={{ backdrop: Backdrop }}
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
                            <Typography id="transition-modal-title" variant="h5" component="h2" color={"white"} className={'text-center'}>
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
                slots={{ backdrop: Backdrop }}
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
                            <Typography id="transition-modal-title" variant="h5" component="h2" color={"white"} className={'text-center'}>
                                خطا در پرداخت!
                            </Typography>
                            <p className={"text-center text-white mt-3 text-[0.8rem]"}>                                 در صورت کسر وجه از حساب شما، مبلغ کاسته شده تا حداکثر ۷۲ ساعت آینده به حساب شما بازگردانده می شود
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