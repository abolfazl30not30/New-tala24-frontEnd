import React, {useEffect, useState} from 'react';
import {GiGoldBar} from "react-icons/gi";
import '../../../style/cards.css'
import image1 from '../../../images/image1.svg'
import image2 from '../../../images/Frame 10.svg'
import image3 from '../../../images/image3.svg'

const Cards = () => {
    const [pictures, setPictures] = useState([
        {
            fileName: '../../images/image3.svg',
        }
    ]);

    useEffect(() => {
        pictures.forEach((picture) => {
            const img = new Image();
            img.src = picture.fileName;
        });
    }, [])

    return (
        <div className={'cards-style flex text-white p-5 flex-col md:flex-row text-center md1:text-right w-full'}>
            <div className={'items-start card1 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <img className={'image md1:w-[150px] w-[60px] md1:m-0 mb-3'} src={image3} alt={'image3'}/>
                </div>
                <div>
                    <h5 className={'text-[1rem] font-bold text-gold pb-3'}>
                        سرمایه گذاری با کمترین مبلغ
                    </h5>
                    <p className={'text1 md1:text-right text-[0.65rem]'}>
                        این یک پیام مربوط به عنوان است این یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان است
                    </p>
                </div>
            </div>

            <div className={'items-start card2 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <img className={'image md1:w-[150px] w-[60px] md1:m-0 mb-3'} src={image3} alt={'image3'}/>
                </div>
                <div>
                    <h5 className={'text-[1rem] font-bold text-gold pb-3'}>
                        حفظ ارزش سرمایه شما
                    </h5>
                    <p className={'text1 md1:text-right text-[0.65rem]'}>
                        این یک پیام مربوط به عنوان است این یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان است
                    </p>
                </div>
            </div>

            <div className={'items-start card3 md1:flex p-2 mb-4 xsm:pb-[1rem] md:w-1/3 md:mr-4'}>
                <div className={'justify-center flex mt-2 ml-5 mr-4'}>
                    <img className={'image md1:w-[150px] w-[60px] md1:m-0 mb-3'} src={image3} alt={'image3'}/>
                </div>
                <div>
                    <h5 className={'text-[1rem] font-bold text-gold pb-3'}>
                        سرعت در انجام معامله
                    </h5>
                    <p className={'text1 md1:text-right text-[0.65rem]'}>
                        این یک پیام مربوط به عنوان است این یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان استاین یک پیام مربوط به عنوان است
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Cards;