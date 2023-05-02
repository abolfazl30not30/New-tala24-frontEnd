import React from "react";
import '../../../style/chart.css'
import person from '../../../images/person.svg'
import goldPrice from '../../../images/goldPriceChart.png'
import {Line, Bar} from "react-chartjs-2";
import {useEffect, useState} from "react";
import api from "../../../api/api";

const Chart24 = () => {
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

    return (
        <>
            <div className={'details-container w-100 md2:flex pb-[50px] md2:p-0'}>
                <div className={'md2:w-2/5 md2:justify-start md1:w-5/12 w-100 whitespace-nowrap flex justify-center'}>
                    <div className={'mr-5 mt-[60px] mb-[40px]'}>

                        <h2 className={'mb-5 text-center'}>
                            مشاهده قیمت طلا به صورت آنلاین
                        </h2>
                        <div className={''}>
                            <div className={'flex float-right'}>

                                <div className={''}>
                                    <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5'}>
                                        <p>مظنه خرید</p>
                                        <p className={'text-mainGold'}> 19,271,425 ریال</p>
                                    </div>

                                    <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5'}>
                                        <p>ساعت اخیر</p>
                                        <p className={'text-mainGold'}>۰.۵٪ +</p>
                                    </div>

                                    <button className={'register m-2.5 px-6 py-3 flex text-black hidden md2:flex'}>
                                        <img src={person} alt={'person'} className={'ml-2'}/>
                                        ثبت نام
                                    </button>
                                </div>

                                <div className={''}>
                                    <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5'}>
                                        <p>مظنه فروش</p>
                                        <p className={'text-mainGold'}> 19,271,425 ریال</p>
                                    </div>

                                    <div className={'details text-[0.62rem] p-2 pl-[50px] leading-5'}>
                                        <p>هفته اخیر</p>
                                        <p className={'text-mainGold'}>۰.۵٪ +</p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

                <div className={'md2:hidden flex justify-center -mt-[30px]'}>
                    <button className={'register px-[100px] py-3 flex text-black'}>
                        <img src={"https://cloud.tala24.co/images/person.svg"} alt={'person'} className={'ml-2'}/>
                        ثبت نام
                    </button>
                </div>

                <div
                    className={'xsm:pr-0 sm:pr-[20px] md2:w-3/5 md2:m-0 md2:p-0 md1:block md1:w-7/12 mr-[50px] mb-[50px] '}>
                    <div className={'main-chart mt-[30px] ml-[30px]'}>
                        <div className={'mainPrice mb-3 pb-5'}>
                            <p className={'text-[12px]'}>
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
        </>
    )
}

export default Chart24;