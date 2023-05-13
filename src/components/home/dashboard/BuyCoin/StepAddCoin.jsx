import React, {Fragment,useState} from 'react'
import "../../../../style/buycoin.css"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {InputAdornment, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import * as yup from "yup";
import coins from "../../../../images/icons.svg"
import {RiAddFill, RiHandCoinFill} from "react-icons/ri";
import {BsTrashFill} from "react-icons/bs"
import {Dialog, Transition} from '@headlessui/react'
import {CacheProvider} from "@emotion/react";
import api from "../../../../api/api";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'


const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const {onChange, ...other} = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    }
                );
            }}
            thousandSeparator
            valueIsNumericString
            // className={}
            prefix="ريال "
        />
    );
});

NumericFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


function StepAddCoin() {
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    const[isOpenCoin,setIsOpenCoin] = useState(false)
    const [Coin, setCoin] = useState(["test"])
    const [coinWight, setCoinWight] = useState("")
    const [selectedCoin, setSelectedCoin] = useState("")

    const handleOpenCoin = () => {
        setIsOpenCoin(true);
    }

    const handleChangeCoin = (event) => {
        setSelectedCoin(event.target.value);
    };

    const closeAddCoin = () => {
        setIsOpenCoin(false)
    };

    const handleAddNewCoin =  () => {
        // await api.post(`info`, {
        //     accountId: localStorage.getItem("id"),
        //     value: new,
        //     infoType: "Coin"
        // })
        //
        // await getCoin()
        setNewCoin("")
        setIsOpenCoin(false)
    };

    return (
        <>
            <div className="container">
                <div className="my-2 px-4">
                    <h2 className="text-white text-l font-bold" >تعیین تعداد سکه</h2>
                </div>
                <div className="inventory-box bg-mainGray rounded-xl p-5 flex justify-center mx-10 mt-3 mb-4">
                    <div className="flex flex-col rounded-xl justify-center p-3 border-dashed border-2 border-neutral-700 ">
                        <div className="flex justify-center mb-3"><RiHandCoinFill className="text-gold" fontSize="2rem"/></div>
                        <h5 className="mb-3 text-[1rem] text-gold">موجودی طلایی</h5>
                        <div className="text-[0.8rem] flex justify-center"><span className="ml-2">14.5222</span>گرم</div>
                    </div>
                </div>
                        <div className="coins flex justify-center items-center flex-col border-dashed border-2 border-neutral-700 p-3 mx-10 rounded-xl " >
                            <div className="coin bg-mainGray rounded-2xl py-3 w-[55%] flex border-5 border-sky-100 mb-3">
                            <div className="icons flex justify-center items-center">
                            <img src={coins} className="w-3/4" alt="coins"/>
                        </div>
                        <div className="text-section flex items-center">
                            <h4 className="text-white">سکه طلای 1 گرمی</h4>
                        </div>
                        <div className="mr-10 flex justify-around flex-col w-[40%] p-1 rounded-xl" style={{border:"1px solid #666666"}}>
                            <div className="flex p-[0.3rem]" style={{borderBottom:"1px solid #666666"}}>
                                <div className=" flex-auto w-2/3 flex items-center">
                                    <span className="text-[0.8rem] font-thin text-gold">وزن</span>
                                </div>
                                <div className="flex-auto w-1/3 flex justify-between">
                                    <span className="text-[0.8rem] font-thin">000.2</span>
                                    <span className="text-[0.8rem] font-thin ">گرم</span>
                                </div>
                            </div>
                            <div className="flex p-[0.3rem]">
                                <div className="flex-auto w-2/3 flex items-center">
                                    <span className="text-[0.8rem] font-thin text-gold">قیمت</span>
                                </div>
                                <div className="flex-auto w-1/3 flex justify-between">
                                    <span className="text-[0.8rem] font-thin">200000</span>
                                    <span className="text-[0.8rem] font-thin">تومان</span>
                                </div>
                            </div>
                        </div>
                        <div className="grow flex justify-center items-center">
                            <button>
                                <BsTrashFill className="text-red-600" fontSize="1.5rem"/>
                            </button>
                        </div>
                    </div>

                    <div className="coin bg-mainGray rounded-2xl py-3 w-[55%] flex border-5 border-sky-100 mb-3">
                        <div className="icons flex justify-center items-center">
                            <img src={coins} className="w-3/4" alt="coins"/>
                        </div>
                        <div className="text-section flex items-center">
                            <h4 className="text-white">سکه طلای 1 گرمی</h4>
                        </div>
                        <div className="mr-10 flex justify-around flex-col w-[40%] p-1 rounded-xl" style={{border:"1px solid #666666"}}>
                            <div className="flex p-[0.3rem]" style={{borderBottom:"1px solid #666666"}}>
                                <div className=" flex-auto w-2/3 flex items-center">
                                    <span className="text-[0.8rem] font-thin text-gold">وزن</span>
                                </div>
                                <div className="flex-auto w-1/3 flex justify-between">
                                    <span className="text-[0.8rem] font-thin">000.2</span>
                                    <span className="text-[0.8rem] font-thin ">گرم</span>
                                </div>
                            </div>
                            <div className="flex p-[0.3rem]">
                                <div className="flex-auto w-2/3 flex items-center">
                                    <span className="text-[0.8rem] font-thin text-gold">قیمت</span>
                                </div>
                                <div className="flex-auto w-1/3 flex justify-between">
                                    <span className="text-[0.8rem] font-thin">200000</span>
                                    <span className="text-[0.8rem] font-thin">تومان</span>
                                </div>
                            </div>
                        </div>
                        <div className="grow flex justify-center items-center">
                            <button>
                                <BsTrashFill className="text-red-600" fontSize="1.5rem"/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-7">
                    <button className="bg-gold rounded text-black py-2 px-16 hover:opacity-70 flex items-center" onClick={handleOpenCoin}>
                        <RiAddFill/>
                         افـزودن سـکـه جدید
                    </button>
                </div>

                <Transition appear show={isOpenCoin} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeAddCoin} dir="rtl">
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
                            <div
                                className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95">
                                    <Dialog.Panel
                                        className="w-full max-w-md transform rounded-2xl bg-mainGray p-6 align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg  font-medium leading-6 text-white">
                                            افزودن سکه جدید
                                        </Dialog.Title>
                                        <div className="flex flex-col mt-6">
                                            <CacheProvider value={cacheRtl}>
                                                <TextField id="outlined-basic" className="w-100 " label=" وزن سکه را وارد کنید..."
                                                           variant="outlined"
                                                           value={coinWight}
                                                           onChange={(e) => setCoinWight(e.target.value)}
                                                           fullWidth
                                                           multiline
                                                           InputLabelProps={{style: {fontFamily: "dana", fontSize: "0.9rem"}}}
                                                           InputProps={{
                                                               style: {fontFamily: "dana"},endAdornment: <InputAdornment position="end">گرم</InputAdornment>,
                                                           }}/>

                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="bg-[#21BA55] hover:bg-green-700 text-white py-2 w-[7.5rem] rounded"
                                                    onClick={()=>{handleAddNewCoin()}}>
                                                    ثبت
                                                </button>
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gary-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeAddCoin}>
                                                    بستن
                                                </button>
                                            </div>

                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>

    )
}

export default StepAddCoin