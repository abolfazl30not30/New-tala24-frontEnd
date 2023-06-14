import React, {useEffect, useState} from 'react';
import {BsTelephone} from 'react-icons/bs'
import {IoLocationOutline} from 'react-icons/io5'
import {HiOutlineMail} from 'react-icons/hi'
import '../../../style/footer.css'

const Footer = () => {

    return (
        <div className={'bg-footerColor xsm:mt-5 pt-16'}>
            <div className={'footer-style flex justify-around flex-col md:flex-row items-start md:flex justify-center text-white text-right'}>
                <div className={'w-full md:w-1/3'}>
                    <div>
                        <h2 className={'footer-title text-sm mb-3'}>
                            درباره ما
                        </h2>
                        <p className={'text-xs leading-5'}>
                            شرکت بنیان طلای بیست و چهار معاملات طلا فعالیت خود را در پارک علم وار به عنوان اولین استارت
                            فناوری دانشگاه شهیدبهشتی آغاز نموده است و با راه‌اندازی سامانه آنلاین خرید و فروش طلا ،
                            فعالیت‌های خود را به دنیای کسب‌وکارهای آنلاین و مبتنی بر اینترنت نیز گسترش داده و افراد با پس
                            اندازکردن طلا، در بازار طلا و جواهر کشور سرمایه گذاری می کنند و در بلند مدت باعث رشد اقتصادی
                            فردی و اجتماعی شخصیت های حقیقی و حقوقی ، اشتغال زایی و حمایت از تولید ملی می شوند؛ همچنین طلا24
                            در نظر دارد که بازار طلای پناور کشور ایران را با استراتژی تعیین شده به هم متصل و معاملات کاذب که
                            باعث اختلاف در قیمت های عرضه شده میشود را حذف نماید.
                        </p>
                    </div>
                    <div className={'f1 mt-4'}></div>
                </div>
                <div className={''}>
                    <div>
                        <h2 className={'footer-title text-sm md:mb-3 xsm:mb-5'}>
                            ارتباط با ما
                        </h2>
                        <div className={'text-xs md:leading-8 flex flex-col'}>
                            <div className={'flex md:float-right'}>
                                <BsTelephone color={'#DFAF3D'} className={'md:ml-2 md:mt-2 xsm:-mt-1 xsm:mb-3 xsm:ml-2'} size={"16px"}/>
                                <p>
                                    شماره تلفن : ۲۹۹۰۲۹۳۰-۰۲۱
                                </p>
                            </div>
                            <div className={'flex md:float-right'}>
                                <IoLocationOutline color={'#DFAF3D'} className={'md:ml-2 md:mt-2 xsm:mb-3 xsm:ml-2'} size={"18px"}/>
                                <p>
                                    آدرس: تهران-دانشگاه شهید بهشتی-پارک علم و فناوری
                                </p>
                            </div>
                            <div className={'flex md:float-right'}>
                                <HiOutlineMail color={'#DFAF3D'} className={'md:ml-2 md:mt-2 xsm:mb-3 xsm:ml-2'} size={"18px"}/>
                                <span >
                                    پست اکترونیک:
                                </span>
                                <span>
                                    park@sbu.ac.ir
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={'f1 mt-4'}></div>
                </div>

                <div className={''}>
                    <div>
                        <h2 className={'footer-title text-sm mb-3'}>
                            لینک های مفید
                        </h2>
                        <div className={'text-xs md:leading-8 xsm:leading-8'}>
                            <div className={'flex'}>
                                <a className="hover:text-gold" href="https://www.sbu.ac.ir" target="_blank">دانشگاه شهید بهشتی</a>
                            </div>
                            <div className={'flex'}>
                                <a className="hover:text-gold" href="https://park.sbu.ac.ir/" target="_blank">پارک علم و فناوری شهید بهشتی</a>
                            </div>
                            <div className={'flex'}>
                                <a className="hover:text-gold" href="https://www.estjt.ir/" target="_blank">اتحادیه طلا و جواهر استان تهران</a>
                            </div>
                            <div className={'flex'}>
                                <a className="hover:text-gold" href="https://isti.ir/" target="_blank">معاونت علمی ریاست جمهوری</a>
                            </div>
                        </div>
                    </div>
                    <div className={'f1 mt-4'}></div>
                </div>

                {/*<div className={'flex xsm:p-3 justify-center md:items-center'}>*/}
                {/*    <div>*/}

                {/*        <img  src={"https://cloud.tala24.co/images/etemad1.png"}*/}
                {/*              className={'xsm:w-[8rem] sm:w-[10rem] md:w-[17rem] lg:w-[17rem]'}*/}
                {/*              alt={'etemad1'}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <img src={"https://cloud.tala24.co/images/etemad2.png"}*/}
                {/*             className={'xsm:w-[8rem] sm:w-[10rem] md:w-[17rem] lg:w-[15rem]'}*/}
                {/*             alt={'etemad2'}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</div>*/}

            </div>

            <div className={'flex justify-center text-white text-xs p-5'}>
                تمامی حقوق این وبسایت، متعلق به <span className={'text-mainGold mx-2'}>طلا ۲۴</span> است
            </div>

        </div>
    )
}

export default Footer;