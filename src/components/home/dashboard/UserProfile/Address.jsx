import React, {useState, Fragment} from "react";
import MenuItem from '@mui/material/MenuItem';
import {Dialog, Transition} from "@headlessui/react";
import {CacheProvider} from "@emotion/react";
import {TextField} from "@mui/material";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});

export default function Address() {
    const [addresses, setAddresses] = useState([
        {
            state: 'فارس',
            city: 'لار',
            address: '1',
            postalCode: '8916869479',
            phoneNumber: '09335137958',
            id: 1
        },
        {
            state: 'تهران',
            city: 'تهران',
            address: '2',
            postalCode: '8916869479',
            phoneNumber: '09335137958',
            id: 2
        },
        {
            state: 'یزد',
            city: 'یزد',
            address: '3',
            postalCode: '8916869479',
            phoneNumber: '09335137958',
            id: 3
        },
    ]);
    const [isOpenAddAddress, setIsOpenAddAddress] = useState(false)
    const [isOpenEditAddress, setIsOpenEditAddress] = useState(false)
    const [isOpenDeleteAddress, setIsOpenDeleteAddress] = useState(false)
    const [state, setState] = React.useState('');
    const [city, setCity] = React.useState('');
    const [addressContent, setAddressContent] = React.useState('');
    const [postalCode, setPostalCode] = React.useState('');
    const [targetAddress, setTargetAddress] = React.useState({
        state: '',
        city: '',
        address: '',
        postalCode: '',
        phoneNumber: '',
        id: null
    });
    const [targetAddressByDelete,setTargetAddressByDelete] = React.useState('');

    const stateList = {
        10: 'تهران',
        20: 'یزد',
        30: 'فارس'
    };
    const cityList = {
        10: 'لار',
        20: 'تهران',
        30: 'یزد'
    };

    function getStateByValue(value) {
        return Object.keys(stateList).filter(key => stateList[key] === value)
    }

    function getCityByValue(value) {
        return Object.keys(cityList).filter(key => cityList[key] === value)
    }

    function closeModalAddAddress() {
        setIsOpenAddAddress(false)
    }

    function openModalAddAddress() {
        setIsOpenAddAddress(true)
    }

    function closeModalEditAddress() {
        setIsOpenEditAddress(false)
    }

    async function openModalEditAddress(id) {
        const targetAddress = addresses.find(address => address.id === id)
        setTargetAddress(targetAddress);
        setIsOpenEditAddress(true)
    }

    function closeModalDeleteAddress() {
        setTargetAddressByDelete('');
        setIsOpenDeleteAddress(false)
    }

    async function openModalDeleteAddress(id) {
        setTargetAddressByDelete(id);
        setIsOpenDeleteAddress(true)
    }

    const handleChangeState = (event) => {
        setState(event.target.value);
    };

    const handleChangeCity = (event) => {
        setCity(event.target.value);
    };

    const addNewAddress = () => {
        console.log(state, city, addressContent, postalCode);
        setIsOpenAddAddress(false)
    }

    const onChangeInputEditAddress = (e) => {
        setTargetAddress({
            ...targetAddress,
            [e.target.name]: e.target.value
        })
    }

    const editAddress = () => {
        console.log(targetAddress)
        setIsOpenEditAddress(false)
    }

    const deleteAddress = () => {
        console.log(targetAddressByDelete)
        setIsOpenDeleteAddress(false)
    }

    return (
        <>
            <div className="flex flex-col space-y-4">
                <button
                    className="bg-gold text-black p-2 rounded-md w-fit flex flex-row items-center"
                    onClick={openModalAddAddress}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                         stroke="currentColor" className="w-4 h-4 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                    افزودن آدرس
                </button>
                <Transition appear show={isOpenAddAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalAddAddress}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            افزودن آدرس
                                        </Dialog.Title>
                                        <div className="mt-6" dir="rtl">
                                            <CacheProvider value={cacheRtl}>
                                                <div className="flex flex-col space-y-4 justify-center">
                                                    <Box sx={{minWidth: 120}}
                                                         className='flex flex-row space-x-4 space-x-reverse'>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="state-select-label" sx={{
                                                                color: '#fff',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>استان</InputLabel>
                                                            <Select
                                                                labelId="state-select-label"
                                                                id="state-select"
                                                                value={state}
                                                                label="استان"
                                                                onChange={handleChangeState}
                                                            >
                                                                <MenuItem value={10}>تهران</MenuItem>
                                                                <MenuItem value={20}>یزد</MenuItem>
                                                                <MenuItem value={30}>فارس</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="city-select-label" sx={{
                                                                color: '#fff',
                                                                textAlign: 'right',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>شهر</InputLabel>
                                                            <Select
                                                                labelId="city-select-label"
                                                                id="city-select"
                                                                value={city}
                                                                label="شهر"
                                                                onChange={handleChangeCity}
                                                                sx={{textAlign: 'right'}}
                                                            >
                                                                <MenuItem value={10}>لار</MenuItem>
                                                                <MenuItem value={20}>شیراز</MenuItem>
                                                                <MenuItem value={30}>بندرعباس</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <TextField
                                                        label={"آدرس"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={addressContent}
                                                        type={"text"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        onChange={(e) => setAddressContent(e.target.value)}
                                                    />
                                                    <TextField
                                                        label={"کد پستی"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={postalCode}
                                                        type={"number"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        onChange={(e) => setPostalCode(e.target.value)}
                                                    />
                                                </div>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                onClick={addNewAddress}
                                            >
                                                ثبت
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalAddAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {addresses.map((address, index) => (
                        <div
                            className="flex flex-col justify-between border-2 border-solid border-gold p-4 rounded space-y-2 text-xs">
                            <div className='font-semibold'>{address.address}</div>
                            <div className='flex flex-row'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                                </svg>
                                {address.city}
                            </div>
                            <div className='flex flex-row'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                                </svg>
                                {address.postalCode}
                            </div>
                            <div className='flex flex-row'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                                </svg>
                                {address.phoneNumber}
                            </div>
                            <div className="flex flex-row space-x-2 space-x-reverse">
                                <button className='flex flex-row bg-amber-400 text-black p-2 rounded'
                                        onClick={() => openModalEditAddress(address.id)}>
                                    ویرایش آدرس
                                </button>
                                <button
                                    className='flex flex-row bg-red-600 text-white p-2 rounded'
                                    onClick={() => openModalDeleteAddress(address.id)}>
                                    حذف آدرس
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <Transition appear show={isOpenEditAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalEditAddress}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            ویرایش آدرس
                                        </Dialog.Title>
                                        <div className="mt-6" dir="rtl">
                                            <CacheProvider value={cacheRtl}>
                                                <div className="flex flex-col space-y-4 justify-center">
                                                    <Box sx={{minWidth: 120}}
                                                         className='flex flex-row space-x-4 space-x-reverse'>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="state-select-label" sx={{
                                                                color: '#fff',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>استان</InputLabel>
                                                            <Select
                                                                labelId="state-select-label"
                                                                id="state-select"
                                                                value={getStateByValue(targetAddress.state)}
                                                                label="استان"
                                                                name='state'
                                                                onChange={onChangeInputEditAddress}
                                                            >
                                                                <MenuItem value={10}>تهران</MenuItem>
                                                                <MenuItem value={20}>یزد</MenuItem>
                                                                <MenuItem value={30}>فارس</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="city-select-label" sx={{
                                                                color: '#fff',
                                                                textAlign: 'right',
                                                                "&.Mui-focused": {color: '#fff'}
                                                            }}>شهر</InputLabel>
                                                            <Select
                                                                labelId="city-select-label"
                                                                id="city-select"
                                                                value={getCityByValue(targetAddress.city)}
                                                                label="شهر"
                                                                name='city'
                                                                onChange={onChangeInputEditAddress}
                                                                sx={{textAlign: 'right'}}
                                                            >
                                                                <MenuItem value={10}>لار</MenuItem>
                                                                <MenuItem value={20}>تهران</MenuItem>
                                                                <MenuItem value={30}>یزد</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                    <TextField
                                                        label={"آدرس"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={targetAddress.address}
                                                        type={"text"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        name='address'
                                                        onChange={onChangeInputEditAddress}
                                                    />
                                                    <TextField
                                                        label={"کد پستی"}
                                                        // error={errors.length !== 0}
                                                        /* disabled={!firstNameAllowed}*/
                                                        value={targetAddress.postalCode}
                                                        type={"number"}
                                                        sx={{
                                                            label: {color: '#fff !important'},
                                                            input: {color: '#fff !important'}
                                                        }}
                                                        name='postalCode'
                                                        onChange={onChangeInputEditAddress}
                                                    />
                                                </div>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-gold text-black px-4 py-2 text-sm font-medium"
                                                onClick={editAddress}
                                            >
                                                ثبت
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalEditAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                <Transition appear show={isOpenDeleteAddress} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModalDeleteAddress}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25"/>
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel
                                        className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#303030] p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-center text-lg font-medium leading-6 text-white"
                                        >
                                            حذف آدرس
                                        </Dialog.Title>
                                        <div className="mt-6 text-center text-white">
                                            آیا از حذف آدرس مطئن هستید؟
                                        </div>
                                        <div className="mt-4 flex flex-row justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent ml-4 bg-red-600 text-white px-4 py-2 text-sm font-medium"
                                                onClick={deleteAddress}
                                            >
                                                حذف
                                            </button>
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-dark text-white px-4 py-2 text-sm font-medium"
                                                onClick={closeModalDeleteAddress}
                                            >
                                                بستن
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    );
}