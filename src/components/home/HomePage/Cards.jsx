import React, {useEffect, useState} from 'react';
import { GiSandsOfTime,GiTwoCoins} from "react-icons/gi";
import '../../../style/cards.css';
import {RiTimerLine} from "react-icons/ri"


const Cards = () => {

    return (
        <div className={'cards-style flex text-white p-5 flex-col md:flex-row text-center md1:text-right w-full'}>
            <div className={'items-center card1 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <div className="rounded-full bg-cardDark p-5">
                        <RiTimerLine className="text-6xl text-mainGold"/>
                    </div>
                </div>
                <div>
                    <h5 className={'text-[1.2rem] font-bold text-gold pb-3'}>
                        در لحظه زندگی کنید
                    </h5>
                    <p className={'text1 md1:text-right text-[0.9rem]'}>
                        در طلا۲۴ میتوانید به صورت لحظه ای از قیمت های مورد معامله طلا مطلع و در لحظه تصمیم گیری کنید.
                    </p>
                </div>
            </div>

            <div className={'items-center card2 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <div className="rounded-full bg-cardDark p-5">
                        <GiSandsOfTime className="text-6xl text-mainGold"/>
                    </div>
                </div>
                <div>
                    <h5 className={'text-[1.2rem] font-bold text-gold pb-3'}>
                        با ثانیه ها رقابت کنید
                    </h5>
                    <p className={'text1 md1:text-right text-[0.9rem]'}>
                        طلا۲۴ به صورت شبانه روزی در دسترس بوده و تمام فرایند ها به صورت آنلاین و در سریع ترین زمان انجام میشود.
                    </p>
                </div>
            </div>

            <div className={'items-center card3 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <div className="rounded-full bg-cardDark p-5">
                        <GiTwoCoins className="text-6xl text-mainGold"/>
                    </div>
                </div>
                <div>
                    <h5 className={'text-[1.2rem] font-bold text-gold pb-3'}>
                        از سرمایه گذاری خود لذت ببرید
                    </h5>
                    <p className={'text1 md1:text-right text-[0.9rem]'}>
                        در طلا۲۴ به هر میزان طلا بخرید و در آدرس خود تحویل بگیرید.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cards;