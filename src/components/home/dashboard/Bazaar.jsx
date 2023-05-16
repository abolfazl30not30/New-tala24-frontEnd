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

const Bazaar = () => {
    const info = useContext(dashboard)
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
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
                labelData.push(priceDataRes[i]?.date.slice(10, 16))
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
        getPriceData()
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
                <div className={'details-container w-3/4 md2:flex pb-[50px] md2:p-0 mt-5 rounded-2xl '}>
                    <div className={'md2:w-2/5 md2:justify-start md1:w-5/12 w-100 whitespace-nowrap flex justify-center'}>
                        <div className={'mr-5 mt-[40px] mb-[40px]'}>
                            <h2 className={'md2:text-right font-bold text-center md2:mb-[60px] mb-[20px] text-white text-[1.5rem]'}>
                                نمای بازار
                            </h2>
                            <div>
                                <div className={'flex float-right'}>
                                    <div className={''}>
                                        <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5 text-white'}>
                                            <p>مظنه خرید</p>
                                            <p className={'text-mainGold'}> 19,271,425 ریال</p>
                                        </div>

                                        <button
                                            onClick={handleBuy}
                                            className={'flex justify-center items-center rounded-[10px] text-white py-2 w-[135px]'}
                                            style={{border: '1px solid green'}}>
                                            خرید
                                        </button>
                                    </div>

                                    <div className={''}>
                                        <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5 text-white'}>
                                            <p>مظنه فروش</p>
                                            <p className={'text-mainGold'}> 19,271,425 ریال</p>
                                        </div>

                                        <button
                                            onClick={handleSell}
                                            className={'flex justify-center items-center rounded-[10px] text-white py-2 w-[135px]'}
                                            style={{border: '1px solid red'}}>
                                            فروش
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div
                        className={'xsm:pr-0 sm:pr-[20px] md2:w-3/5 md2:m-0 md2:p-0 md1:block md1:w-7/12 mr-[50px] mb-[50px] '}>
                        <div className={'main-chart md2:mt-[30px] ml-[30px]'}>
                            <div className={'mainPrice mb-3 pb-5'}>
                                <p className={'text-[12px] text-white'}>
                                    طلای ۲۴ عیار
                                </p>
                                <p className={'text-mainGold text-[32px]'}>
                                    5.987,34
                                </p>
                            </div>

                            <Line className={'md1:p-0 mb-12'} data={userData} type={'line'}/>

                        </div>
                    </div>
                </div>

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