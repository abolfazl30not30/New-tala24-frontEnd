import React, {useState,useEffect,useContext} from 'react'
import {Tab} from '@headlessui/react'
import Address from "./Address"
import api from "../../../../api/api";
import signup from "../../../../contexts/signup";
import ChangePassword from "./ChangePassword";
import Information from "./Information";


function UserProfile() {
    const context = useContext(signup);
    return (
        <div className="mt-5 text-white bg-[#252525] rounded-2xl p-10 md:w-3/4">
            <div className="flex flex-row items-center mt-2 mb-7 ">
                <h3 className={'ml-3 font-bold text-white text-xl'}>
                    پروفایل کاربری
                </h3>
                {
                    context.accountInfo.verified === "accept"
                        ? (<div className='bg-labelGreen px-4 py-2 rounded text-[0.7rem]'>تایید شده</div>)
                        : (context.accountInfo.verified === "notAccept" ? (
                            <div className='bg-red-600 px-4 py-2 rounded text-[0.7rem]'>تایید نشده</div>
                        ) : (
                            <div className='bg-neutral-400 px-4 py-2 rounded text-[0.7rem]'>ثبت نشده</div>
                        ))
                }
            </div>

            <div>
                <Tab.Group>
                    <Tab.List>
                        <Tab className='ml-4'>
                            {({selected}) => (
                                <button
                                    className={
                                        selected ? 'bg-[#DFAF3D] text-black rounded-md px-4 py-2' : 'bg-transparent text-white px-4 py-2'
                                    }>
                                    مشخصات کاربری
                                </button>
                            )}
                        </Tab>
                        <Tab className='ml-4'>
                            {({selected}) => (
                                <button
                                    className={
                                        selected ? 'bg-[#DFAF3D] text-black rounded-md px-4 py-2' : 'bg-transparent text-white px-4 py-2'
                                    }>
                                    آدرس ها
                                </button>
                            )}
                        </Tab>
                        <Tab className='ml-4'>
                            {({selected}) => (
                                <button
                                    className={
                                        selected ? 'bg-[#DFAF3D] text-black rounded-md px-4 py-2' : 'bg-transparent text-white px-4 py-2'
                                    }
                                >
                                    تغییر رمز عبور
                                </button>
                            )}
                        </Tab>
                    </Tab.List>

                    <Tab.Panels className='mt-4 pt-4 border-dotted border-t-2 border-neutral-400'>
                        <Tab.Panel>
                            <Information/>
                        </Tab.Panel>
                        <Tab.Panel><Address/></Tab.Panel>
                        <Tab.Panel>
                            <ChangePassword/>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}

export default UserProfile