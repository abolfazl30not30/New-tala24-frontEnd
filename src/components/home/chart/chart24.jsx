import React, {useEffect, useState} from "react";
import '../../../style/chart.css'
import {Line} from "react-chartjs-2";
import api from "../../../api/api";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {Link} from "react-router-dom";
import {SeparateNumber} from "../../../helper/SeparateNumber";
import {EnglishToPersian} from "../../../helper/EnglishToPersian";
import {MdSell} from "react-icons/md";
import {BiCartDownload} from "react-icons/bi";

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

const Chart24 = () => {
    const [userData, setUserData] = useState({
        labels: null,
        datasets: [
            {}
        ],
    })

    const [lastQuote, setLastQuote] = useState({
        sellPricePerShekel: "",
        purchasePricePerShekel: ""
    });

    const [lastGoldPrice,setLastGoldPrice] = useState({
        purchasePricePerGram:""
    })

    useEffect(() => {
        const getPriceData = async () => {
            const priceDataRes = await api.get("goldPrice/chart")
            let labelData = []
            let priceData = []
            for (let i = 9; i >= 0; i--) {
                labelData.push(priceDataRes[i]?.date)
                priceData.push(priceDataRes[i]?.sellPricePerGram)
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
            /*const getLatestQuoteReq = await api.get("quote/latestQuote")
            if (getLatestQuoteReq) {
                setLastQuote(getLatestQuoteReq)
            }*/
            const getGoldPriceReq = await api.get("goldPrice/latestPrice")
            if (getGoldPriceReq) {
                setLastGoldPrice(getGoldPriceReq)
                setLastQuote(getGoldPriceReq)
            }
        }

        getQouteData()
        getPriceData()
    }, []);

    return (
        <>
            <div className={'details-container rounded-3xl p-10 mx-0 md:mx-10'}>
                <div className="flex justify-center my-5">
                    <h2 className={' text-mainGold mb-4 text-center text-2xl font-bold'}>
                        مشاهده قیمت طلا به صورت آنلاین
                    </h2>
                </div>
                <div className="flex justify-around flex-col md:flex-row">
                    <div className={'w-full md:w-[35%] p-5'}>
                        <div className="flex flex-col items-center md:flex-row">
                            <div className={'w-full md:w-[50%] bg-mainGray flex flex-col items-center px-10 py-4 mx-2 rounded-2xl my-2 md:my-0'}>
                                <div className="text-labelGreen mb-2 flex items-center">
                                    <span className="ml-2"><BiCartDownload/></span>
                                    <h2 className="text-[0.9rem]">مظنه خرید</h2>
                                </div>
                                <div className={'text-white'}>
                                    <span>{EnglishToPersian(SeparateNumber(lastQuote.purchasePricePerShekel.toString()))}</span>
                                    <span className="mr-2">ریال</span>
                                </div>
                            </div>
                            <div className={'w-full md:w-[50%] bg-mainGray flex flex-col items-center px-10 py-4 mx-2 rounded-2xl my-2 md:my-0'}>
                                <div className="text-red-600 mb-2 flex items-center">
                                    <span className="ml-2"><MdSell/></span>
                                    <h2 className="text-[0.9rem]" >مظنه فروش</h2>
                                </div>
                                <div className={'text-white'}>
                                    <span>{EnglishToPersian(SeparateNumber(lastQuote?.sellPricePerShekel))}</span>
                                    <span className="mr-2">ریال</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <Link to="/login"
                                  className="w-full py-3 text-center bg-mainGold rounded-2xl text-black hover:opacity-80">ثبت
                                نام در سامانه</Link>
                        </div>
                    </div>
                    <div className={'w-full md:w-[65%] p-5'}>
                        <div className={'mainPrice mb-3 pb-5'}>
                        <span className={'text-2xl text-white'}>
                            آخرین قیمت طلا
                        </span>
                            <p className={'text-mainGold text-[2rem]'}>
                                {
                                    EnglishToPersian(SeparateNumber(lastGoldPrice?.purchasePricePerGram.toString()))
                                }
                            </p>
                        </div>
                        <Line className={'md1:p-0 mb-12'} options={options} data={userData} type={'line'}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chart24;