import React, {useEffect, useState} from 'react';
import '../../../style/stream.css'

const Stream = () => {
    return (
        <div>
            <div className={'highlight4 flex justify-start md:mb-[50px] lg:mb-0 mr-[100px] mt-[20px]'}>
                <img src={"https://cloud.tala24.co/images/Highlight_04.svg"} alt={'highlight4'}/>
            </div>
            <div className={'stream-style xsm:block md1:flex justify-center text-white text-right ' +
                ' xsm:content-center mb-16'}>

                <div className={'flex items-center lg:mt-0 sm:mx-[50px] xsm:ml-5 justify-center xsm:text-center md1:text-right xsm:mr-[0.8rem]'}>
                    <div>
                        <h2 className={'heading-title font-bold xsm:text-center xsm:text-[1.200rem] xsm:mt-3 md:text-[1.600rem] mb-4 whitespace-nowrap md:mr-10'}>
                            طلای خودتون رو آنلاین ببینید
                        </h2>
                        <p className={'text-[0.8rem] leading-7 font-thin'}>
                            اینجا یک متن درباره توضیحات وبسایت قرار میگیرد اینجا
                            یک متن درباره توضیحات وبسایت قرار میگیرداینجا یک متن درباره توضیحات
                        </p>
                    </div>
                </div>
                <div className={'highlight5 flex items-end md:mr-4 md:mb-[0.2rem] md:-ml-[50px] xsm:hidden md1:flex'}>
                    <img src={"https://cloud.tala24.co/images/Highlight_05.svg"} alt={'highlight5'}/>
                </div>

                <div className={'mx-10 xsm:mt-14 md:mt-10'}>
                    <video className={'w-[70rem]'} controls>
                        <source src={"https://cloud.tala24.co/videos/videoTest.mp4"} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

            </div>
        </div>
    )
}

export default Stream;