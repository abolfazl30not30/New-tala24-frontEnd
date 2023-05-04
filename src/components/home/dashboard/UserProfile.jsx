import React, {Fragment, useState} from 'react'
import {Tab} from '@headlessui/react'
import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Button from "@mui/material/Button";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function UserProfile() {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [nationalCode, setNationalCode] = useState()
    const [nationalCardImage, setNationalCardImage] = useState()
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatNewPassword, setRepeatNewPassword] = useState()


    const handleRecordUserInfo = () => {
        console.log(nationalCardImage)
    }
    const handleChaangePassword = () => {

    }

    return (
        <div className="flex flex-col mx-4 mb-8">
            <h3 className={'mr-6 my-6 font-bold text-gold text-xl'}>
                پروفایل کاربری
            </h3>
            <div className="mt-4 text-white bg-[#252525] rounded-[8px] p-4 w-full">
                <Tab.Group>
                    <Tab.List>
                        <Tab className='ml-4'>
                            {({selected}) => (
                                <button
                                    className={
                                        selected ? 'bg-[#DFAF3D] text-black rounded-md px-4 py-2' : 'bg-transparent text-white px-4 py-2'
                                    }
                                >
                                    مشخصات کاربری
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
                                    تغیر رمز عبور
                                </button>
                            )}
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className='mt-4 pt-4 border-t-[1px] border-solid border-white'>
                        <Tab.Panel>
                            <div className="flex flex-col">
                                <CacheProvider value={cacheRtl}>
                                    <div className="flex flex-col space-y-6 justify-center">
                                        <TextField
                                            label={"نام"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={firstName}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <TextField
                                            label={"نام خانوادگی"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={lastName}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <TextField
                                            label={"شماره تلفن"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={phoneNumber}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <TextField
                                            label={"کد ملی"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={nationalCode}
                                            type='number'
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setNationalCode(e.target.value)}
                                        />
                                        <TextField
                                            label={"تاریخ تولد"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={dateOfBirth}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                        />

                                        <div className="flex items-center justify-center w-full">
                                            <label htmlFor="dropzone-file"
                                                   className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#DFAF3D] border-solid rounded-lg cursor-pointer hover:bg-[#2a2a2a]">
                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400"
                                                         fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                                         xmlns="http://www.w3.org/2000/svg">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                              stroke-width="2"
                                                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                                                        className="font-semibold">برای آپلود کارت ملی کلیک کنید</span> یا
                                                        بکشید و رها کنید</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG,
                                                        JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    id="dropzone-file"
                                                    type="file"
                                                    className="hidden"
                                                    value={nationalCardImage}
                                                    onChange={(e) => setNationalCardImage(e.target.value)}
                                                />
                                            </label>
                                        </div>

                                        <button
                                            className='mt-6 bg-[#DFAF3D] w-fit text-black px-4 py-2 rounded-md text-sm'
                                            onClick={handleRecordUserInfo}>ثبت تغیرات
                                        </button>

                                    </div>
                                </CacheProvider>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel>Content 2</Tab.Panel>
                        <Tab.Panel>
                            <div className="flex flex-col">
                                <CacheProvider value={cacheRtl}>
                                    <div className="flex flex-col space-y-6 justify-center">
                                        <TextField
                                            label={"رمز عبور فعلی"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={currentPassword}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                        <TextField
                                            label={"رمز عبور جدید"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={newPassword}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        <TextField
                                            label={"تکرار رمز عبور جدید"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={repeatNewPassword}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setRepeatNewPassword(e.target.value)}
                                        />
                                        <button
                                            className='mt-6 bg-[#DFAF3D] w-fit text-black px-4 py-2 rounded-md text-sm'
                                            onClick={handleChaangePassword}>ثبت تغیرات
                                        </button>

                                    </div>
                                </CacheProvider>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    );
}

export default UserProfile