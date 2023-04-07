import React from 'react';
import MainNavbar from "../MainNavbar";
import {BsTelephone} from "react-icons/bs";
import {IoLocationOutline} from "react-icons/io5";
import {HiOutlineMail} from "react-icons/hi";


const ContactUs = () => {
    return (
        <>
            <MainNavbar/>
            <div className="px-10">
                <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">تماس با ما</h2>
                </div>
                <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                    <div className="rounded-2xl p-2 bg-[#141414] text-white p-7">
                        <div className={"flex justify-center"}>
                            <BsTelephone color={'#FFC800'} className={'md:ml-2 md:mt-2 xsm:-mt-1 xsm:mb-3 xsm:ml-2'} size={"2rem"}/>
                        </div>
                        <div className={"flex justify-center my-2"}>
                            <h3 className="heading-title-comment text-[1.5rem]">شماره تماس</h3>
                        </div>
                        <div className={"flex justify-center mt-2"}>
                            <p className="text-[1.3rem]">02112500563</p>
                        </div>
                    </div>
                    <div className="rounded-2xl p-2 bg-[#141414] text-white p-7">
                        <div className={"flex justify-center"}>
                            <HiOutlineMail color={'#FFC800'} className={'md:ml-2 md:mt-2 xsm:mb-3 xsm:ml-2'} size={"2rem"}/>
                        </div>
                        <div className={"flex justify-center my-2"}>
                            <h3 className="heading-title-comment text-[1.5rem]">آدرس ایمیل</h3>
                        </div>
                        <div className={"flex justify-center mt-2"}>
                            <p className="text-[1.1rem]">info@gmail.com</p>
                        </div>
                    </div>
                    <div className="rounded-2xl p-2 bg-[#141414] text-white p-7">
                        <div className={"flex justify-center"}>
                            <IoLocationOutline color={'#FFC800'} className={'md:ml-2 md:mt-2 xsm:mb-3 xsm:ml-2'} size={"2rem"}/>
                        </div>
                        <div className={"flex justify-center my-2"}>
                            <h3 className="heading-title-comment text-[1.5rem]">آدرس شرکت</h3>
                        </div>
                        <div className={"flex justify-center mt-2"}>
                            <p className="text-[1rem]">دانشگاه شهید بهشتی - پارک علم و فناوری</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactUs;