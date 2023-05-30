import React, {useState,useEffect,useContext} from 'react'
import {Tab} from '@headlessui/react'
import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Address from "./Address"
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import api from "../../../../api/api";
import signup from "../../../../contexts/signup";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

function UserProfile() {
    const context = useContext(signup);
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [dateOfBirth, setDateOfBirth] = useState()
    const [nationalCode, setNationalCode] = useState()
    const [nationalCardImage, setNationalCardImage] = useState();
    const [currentPassword, setCurrentPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [repeatNewPassword, setRepeatNewPassword] = useState()

    console.log(context)

    const getPersonalInformation = async () => {
        const getPersonalInformationResponse = await api.get(`info/show/personalInformation`)
        setFirstName(getPersonalInformationResponse.firstName)
        setLastName(getPersonalInformationResponse.lastName)
        setEmail(getPersonalInformationResponse.email)
        setPhoneNumber(getPersonalInformationResponse.telephoneNumber)
        setDateOfBirth(getPersonalInformationResponse.birthDate)
        setNationalCode(getPersonalInformationResponse.nationalCode)
        setNationalCardImage(getPersonalInformationResponse.nationalCardFileName)

        console.log(getPersonalInformationResponse)
    }
    useEffect(() => {
        getPersonalInformation()
    }, []);
    const handleRecordUserInfo = async () => {
        await api.post("info/personalInformation", {
            firstName:firstName,
            lastName:lastName,
            telephoneNumber:phoneNumber,
            nationalCode:nationalCode,
            nationalCardFileName:nationalCardImage,
            birthDate:dateOfBirth,
            email: email
        })
        getPersonalInformation()
    }
    const handleChaangePassword = () => {

    }
    const handleDateEndInput = (value) => {
        let month = value.month < 10 ? ('0' + value.month) : value.month;
        let day = value.day < 10 ? ('0' + value.day) : value.day;
        let convertDate = value.year + '/' + month + '/' + day;
        setDateOfBirth(convertDate)
    }
    const handleFileChange = (event) => {
        setNationalCardImage(event.target.files[0]);
    };

    return (
        <div className="mt-5 text-white bg-[#252525] rounded-2xl p-10 md:w-3/4">
            <div className="flex flex-row items-center mt-2 mb-7 ">
                <h3 className={'ml-3 font-bold text-white text-xl'}>
                    پروفایل کاربری
                </h3>
                {
                    context.accountInfo.verified
                        ? <div className='bg-labelGreen p-2 rounded text-[0.7rem]'>تایید شده</div>
                        : <div className='bg-red-600 p-2 rounded text-[0.7rem]'>تایید نشده</div>
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
                    <Tab.Panels className='mt-4 pt-4 border-dotted border-t-2 border-neutral-400'>
                        <Tab.Panel>
                            <div className="flex flex-col">
                                <CacheProvider value={cacheRtl}>
                                    <div className="flex flex-col space-y-6 justify-center">
                                        <TextField
                                            label={"نام"}
                                            required
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
                                            label={"ایمیل"}
                                            // error={errors.length !== 0}
                                            /* disabled={!firstNameAllowed}*/
                                            value={email}
                                            type={"text"}
                                            sx={{label: {color: '#fff !important'}, input: {color: '#fff !important'}}}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                        <div className="flex flex-col">
                                            <div className="text-white mb-3">تاریخ تولد</div>
                                            <DatePicker
                                                // fixMainPosition={false}
                                                calendarPosition={`bottom`}
                                                digits={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']}
                                                format={`YYYY/MM/DD`}
                                                label="Small picker"
                                                slotProps={{ textField: { size: 'تاریخ تولد' } }}
                                                containerStyle={{
                                                    width: "100%"
                                                }}
                                                inputClass={`field bg-[#212121] w-full h-[3.55rem] p-4 text-white border-gold rounded`}
                                                value={dateOfBirth}
                                                onChange={(value) => {
                                                    handleDateEndInput(value)
                                                }}
                                                mapDays={({date}) => {
                                                    let props = {}
                                                    let isWeekend = [6].includes(date.weekDay.index)

                                                    if (isWeekend)
                                                        props.className = "highlight highlight-red";

                                                    return props
                                                }}
                                                weekDays={
                                                    [
                                                        ["شنبه", "Sat"],
                                                        ["یکشنبه", "Sun"],
                                                        ["دوشنبه", "Mon"],
                                                        ["سه شنبه", "Tue"],
                                                        ["چهارشنبه", "Wed"],
                                                        ["پنجشنبه", "Thu"],
                                                        ["جمعه", "Fri"],
                                                    ]
                                                }
                                                calendar={persian}
                                                locale={persian_fa}
                                            >
                                            </DatePicker>
                                        </div>


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
                                                    <div className="flex flex-row text-sm text-labelGreen mb-2">
                                                        {
                                                            nationalCardImage?.name
                                                                ? <span className='ml-2'>فایل آپلود شده:</span>
                                                                : null
                                                        }

                                                        <span>{nationalCardImage?.name}</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG,
                                                        JPG or GIF (MAX. 800x400px)</p>
                                                </div>
                                                <input
                                                    id='dropzone-file'
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                        </div>
                                        <div className="w-full flex justify-center">
                                            <button
                                                className='mt-6 bg-[#DFAF3D] w-fit text-black px-4 py-2 rounded-md text-sm'
                                                onClick={handleRecordUserInfo}>ثبت تغیرات
                                            </button>
                                        </div>
                                    </div>
                                </CacheProvider>
                            </div>
                        </Tab.Panel>
                        <Tab.Panel><Address/></Tab.Panel>
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