import '../../../style/chart.css';
import React, {useContext, useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {useNavigate} from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import api from "../../../api/api";
import {BiErrorCircle} from "react-icons/bi";
import dashboard from "../../../contexts/dashboard";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {SeparateNumber} from "../../../helper/SeparateNumber";
import {BiCartDownload} from "react-icons/bi";
import {BsCashCoin} from "react-icons/bs";
import {GiTwoCoins,} from "react-icons/gi"
import {MdSell} from  "react-icons/md"
import signup from "../../../contexts/signup";

Chart.register(CategoryScale);

export const options = {
    scales: {
        responsive: true,
        x: {
            ticks: {
                autoSkip: false,
                maxRotation: 90,
                minRotation: 90
            }
        }
    }
}

const Bazaar = () => {

    const context = useContext(signup)
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [lastQuote, setLastQuote] = useState({
        sell: "",
        purchase: ""
    });

    const handleClose = () => setOpen(false);

    const [userData, setUserData] = useState({
        labels: null,
        datasets: [
            {}
        ],
    })

    useEffect(() => {
        const getPriceData = async () => {
            const priceDataRes = await api.get("goldPrice/chart")
            let labelData = []
            let priceData = []
            for (let i = 9; i >= 0; i--) {
                labelData.push(priceDataRes[i]?.date)
                priceData.push(priceDataRes[i]?.price)
            }
            setUserData({
                labels: labelData, // years;
                datasets: [
                    {
                        label: "قیمت طلا",
                        data: priceData,
                        backgroundColor: ["#d0a94d"],
                        borderColor: ["#d0a94d"],
                        tension: 0.1,
                        // borderDash: [3],
                        // borderDashOffset: 5
                        // borderJoinStyle: 'round'
                        // clip: 4,
                        // fill: true,
                    }
                ],
            })
        }

        const getQouteData = async () => {
            const getGoldPriceReq = await api.get("quote/latestQuote")
            if (getGoldPriceReq) {
                setLastQuote(getGoldPriceReq)
            }
        }

        getPriceData()
        getQouteData()
    }, []);

    const handleBuy = () => {
        if (info.completeRegistrationStatus === false) {
            setOpen(true)
        } else {
            navigate("/dashboard/buy-gold")
        }
    }

    const handleSell = () => {
        if (info.completeRegistrationStatus === false) {
            setOpen(true)
        } else {
            navigate("/dashboard/buy-gold")
        }
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: '#303030',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: "1rem",
        p: 4,
    };

    return (
        <>
            <div className="mt-5 text-white  w-3/4 flex items-center  flex-col">

                <div className="w-full flex justify-between">
                    <div className={'bg-bgGray flex flex-col items-center px-12 py-4 rounded-2xl'}>
                        <div className="text-labelGreen mb-2 flex items-center">
                            <span className="ml-2"><BiCartDownload/></span>
                            <h2>مظنه خرید</h2>
                        </div>
                        <div className={'text-white'}>
                            <span>{EnglishToPersian(SeparateNumber(lastQuote.purchase))}</span>
                            <span className="mr-2">ریال</span>
                        </div>
                    </div>
                    <div className={'bg-bgGray flex flex-col items-center px-12 py-4 rounded-2xl'}>
                        <div className="text-red-600 mb-2 flex items-center">
                            <span className="ml-2"><MdSell/></span>
                            <h2>مظنه فروش</h2>
                        </div>
                        <div className={'text-white'}>
                            <span>{EnglishToPersian(SeparateNumber(lastQuote.sell))}</span>
                            <span className="mr-2">ریال</span>
                        </div>
                    </div>
                    <div className={'bg-bgGray flex flex-col items-center px-12 py-4 rounded-2xl'}>
                        <div className="text-labelGreen mb-2 flex items-center">
                            <span className="ml-2"><BsCashCoin/></span>
                            <h2>موجودی کیف پول</h2>
                        </div>
                        <div className={'text-white'}>
                            <span>{EnglishToPersian(SeparateNumber(context.accountInfo.wallet.inventory))}</span>
                            <span className="mr-2">ریال</span>
                        </div>
                    </div>
                    <div className={'bg-bgGray flex flex-col items-center px-12 py-4 rounded-2xl'}>
                        <div className="text-gold mb-2 flex items-center">
                            <span className="ml-2"><GiTwoCoins/></span>
                            <h2>موجودی طلایی</h2>
                        </div>
                        <div className={'text-white'}>
                            <span>{EnglishToPersian(context.accountInfo.wallet.weight.toString())}</span>
                            <span className="mr-2">گرم</span>
                        </div>
                    </div>
                </div>

                <div className="w-full rounded-xl bg-bgGray p-10 mt-3">
                    <div className={'mainPrice mb-3 pb-5'}>
                        <p className={'text-[12px] text-white'}>
                            طلای ۲۴ عیار
                        </p>
                        <p className={'text-mainGold text-[32px]'}>
                            5.987,34
                        </p>
                    </div>

                    <Line className={'md1:p-0 mb-12'} options={options} data={userData} type={'line'}/>
                </div>
            </div>

            {/*<div className={'details-container w-full md:w-3/4 md2:flex pb-[50px] md2:p-0 mt-5 rounded-2xl '}>*/}
            {/*    <div className={'md2:w-2/5 md2:justify-start md1:w-5/12 w-100 whitespace-nowrap flex justify-center'}>*/}
            {/*        <div className={'mr-5 mt-[40px] mb-[40px]'}>*/}
            {/*            <h2 className={'md2:text-right font-bold text-center md2:mb-[60px] mb-[20px] text-white text-[1.5rem]'}>*/}
            {/*                نمای بازار*/}
            {/*            </h2>*/}
            {/*            <div>*/}
            {/*                <div className={'flex float-right'}>*/}
            {/*                    <div className={''}>*/}
            {/*                        <div className={'details text-[0.8rem] p-2 pl-[50px] leading-5 text-white'}>*/}
            {/*                            <p>مظنه خرید</p>*/}
            {/*                            <p className={'text-mainGold'}> {EnglishToPersian(SeparateNumber(lastQuote.purchase))}<span*/}
            {/*                                className="mr-2">ریال</span></p>*/}
            {/*                        </div>*/}

            {/*                        <button*/}
            {/*                            onClick={handleBuy}*/}
            {/*                            className={'flex justify-center items-center rounded-[10px] text-white py-2 w-[135px]'}*/}
            {/*                            style={{border: '1px solid green'}}>*/}
            {/*                            خرید*/}
            {/*                        </button>*/}
            {/*                    </div>*/}

            {/*                    <div className={''}>*/}
            {/*                        <div className={'details text-[0.8rem] p-2 pl-[50px] leading-5 text-white'}>*/}
            {/*                            <p>مظنه فروش</p>*/}
            {/*                            <p className={'text-mainGold'}>{EnglishToPersian(SeparateNumber(lastQuote.sell))}<span*/}
            {/*                                className="mr-2">ریال</span></p>*/}
            {/*                        </div>*/}

            {/*                        <button*/}
            {/*                            onClick={handleSell}*/}
            {/*                            className={'flex justify-center items-center rounded-[10px] text-white py-2 w-[135px]'}*/}
            {/*                            style={{border: '1px solid red'}}>*/}
            {/*                            فروش*/}
            {/*                        </button>*/}
            {/*                    </div>*/}

            {/*                </div>*/}

            {/*            </div>*/}

            {/*        </div>*/}

            {/*    </div>*/}

            {/*    <div*/}
            {/*        className={'xsm:pr-0 sm:pr-[20px] md2:w-3/5 md2:m-0 md2:p-0 md1:block md1:w-7/12 mr-[50px] mb-[50px] '}>*/}
            {/*        <div className={'main-chart md2:mt-[30px] ml-[30px]'}>*/}


            {/*            <Line className={'md1:p-0 mb-12'} options={options} data={userData} type={'line'}/>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{backdrop: Backdrop}}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <BiErrorCircle fontSize={'9rem'} color="#c0392b"/>
                        <Typography id="transition-modal-title" variant="h6" component="h2" color={"#fff"}>
                            براي انجام فرايند خريد و فروش بايد مشخصات خود را تكميل كنيد
                        </Typography>
                        <Typography id="transition-modal-description" sx={{mt: 2}}>
                            <button className={"bg-gold py-2 px-5 rounded-2xl"} onClick={() => {
                                navigate("/dashboard/complete-info")
                                info.setSelected("complete-info")
                            }}
                            >
                                رفتن به صفحه تكميل مشخصات
                            </button>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default Bazaar;