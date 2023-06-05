import React, {Fragment, useContext, useEffect, useState} from 'react'
import "../../../../style/buycoin.css"
import {InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import PropTypes from 'prop-types';
import {NumericFormat} from 'react-number-format';
import coinsImage from "../../../../images/icons.svg"
import {RiAddFill, RiHandCoinFill} from "react-icons/ri";
import {BsTrashFill} from "react-icons/bs"
import {Dialog, Transition} from '@headlessui/react'
import {CacheProvider} from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import {prefixer} from 'stylis'
import FormControl from "@mui/material/FormControl";
import {EnglishToPersian} from "../../../../helper/EnglishToPersian";
import signup from "../../../../contexts/signup";
import api from "../../../../api/api";
import * as yup from "yup";


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


function StepAddCoin(props) {
    const getCoinsWeight = async () =>{
        const respond = await api.get("coin/activeCoin");
        let listOfWeight = [];
        for (const element of respond) {
            listOfWeight.push(element.weight);
        }
        setCoinsWight(listOfWeight)
    }

    useEffect(()=>{
        getCoinsWeight()
    },[]);

    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });
    const context = useContext(signup)
    const [isOpenCoin, setIsOpenCoin] = useState(false)

    const [coinsWight, setCoinsWight] = useState(["0.05", "0.100", "0.150", "0.200", "0.300", "0.400", "0.500", "0.600", "0.700", "0.800", "0.900", "1.00", "1.100", "1.200", "1.300", "1.400", "1.500", "2.00"])
    const [selectedCoin, setSelectedCoin] = useState(coinsWight[0])
    const [countOfCoin,setCountOfCoin] = useState();
    const [paymentData,paymentDate] = useState()
    const [countErrors,setCountErrors] = useState([])

    const handleOpenCoin = () => {
        setIsOpenCoin(true);
    }

    const calculateTotalWage = async () =>{
        const wage = await api.get(`coin/wage/${selectedCoin}`);
        let newTotalWage = props.totalWage;
        newTotalWage += (countOfCoin * wage);
        props.setTotalWage(newTotalWage);
    }

    const calculateTotalWeight = () =>{
        let newTotalWeight = props.totalWeight;
        newTotalWeight += (countOfCoin * selectedCoin)
        props.setTotalWeight(newTotalWeight)
    }

    const handleCountOfCoin = (event) =>{
        console.log(typeof (event.target.value))
        setCountOfCoin(event.target.value)
    }


    const handleAddNewCoin = async () => {
        const valid = await validation()
        console.log(valid)
        if (valid !== undefined){
            setCountErrors([])
            let updatedCoins = [...props.coins]
            let updatedCoinsWight = [...coinsWight]

            const newCoin = {
                count: countOfCoin,
                weight:selectedCoin
            }

            calculateTotalWeight();
            calculateTotalWage();

            updatedCoins.push(newCoin)
            props.setCoins(updatedCoins)

            updatedCoinsWight = updatedCoinsWight.filter(c => c !== selectedCoin)
            setCoinsWight(updatedCoinsWight)
            setCountOfCoin(null)
            setIsOpenCoin(false)
        }

    };

    const handleDeleteCoin = (coin) =>{

        let newTotalWeight = props.totalWeight;
        newTotalWeight -= (coin.weight * coin.count)
        props.setTotalWeight(newTotalWeight)

        let updateCoinsWeight = [...coinsWight];
        updateCoinsWeight.push(coin.weight);
        updateCoinsWeight.sort();
        setCoinsWight(updateCoinsWeight)

        let updatedCoin = [...props.coins]
        updatedCoin = updatedCoin.filter(c => c !== coin)
        props.setCoins(updatedCoin)

    }


    const handleChangeCoin = (event) => {
        setSelectedCoin(event.target.value);
    };

    const closeAddCoin = () => {
        setCountErrors([])
        setIsOpenCoin(false)
    };

    const validation = async () => {
        const priceSchema = yup.object().shape({
            count: yup.number().required("لطفا تعداد مورد نظر خود را وارد کنید.").min(1,"تعداد نمی تواند کمتر از 1 باشد")
        })
        const count = parseInt(countOfCoin)
        try {
            return await priceSchema.validate({count}, {abortEarly: false})
        } catch (error) {
            setCountErrors(error.errors)
        }
    }

    return (
        <>
            <div className="container">
                <div className="my-2 px-4">
                    <h2 className="text-white text-l font-bold">تعیین تعداد سکه</h2>
                </div>
                <div className="inventory-box bg-mainGray rounded-xl p-3 flex justify-center mx-4 md:mx-10 mt-3 mb-4">
                    <div
                        className="flex flex-col rounded-xl justify-center p-2 border-dashed border-2 border-neutral-700 ">
                        <div className="flex justify-center mb-3"><RiHandCoinFill className="text-gold" fontSize="2rem"/></div>
                        <h5 className="mb-3 text-[1rem] text-gold">موجودی طلایی</h5>
                        <div className="text-[0.8rem] flex justify-center"><span className="ml-2">{EnglishToPersian((context.accountInfo.wallet.weight - props.totalWeight).toString())}</span>گرم</div>
                    </div>
                </div>
                <div className="coins flex justify-center items-center flex-col border-dashed border-2 border-neutral-700 p-3 mx-2 md:mx-10 rounded-xl ">
                    {
                        props.coins.map((coin,index)=>(
                            <div className="coin bg-mainGray rounded-2xl py-2  w-full md:w-[70%] flex flex-col md:flex-row items-center border-5 border-sky-100 mb-3" >
                                <div className="icons flex justify-center items-center">
                                    <img src={coinsImage} className="w-2/3 md:w-3/4" alt="coins"/>
                                </div>
                                <div className="text-section flex items-center">
                                    <h4 className="text-white">سکه طلای {EnglishToPersian(coin.weight.toString())} گرمی</h4>
                                </div>
                                <div className="mt-3 md:mt-0 md:mr-10 flex justify-around flex-col w-[90%] md:w-[40%] p-1 rounded-xl"
                                     style={{border: "1px solid #666666"}}>
                                    <div className="flex p-[0.3rem]" style={{borderBottom: "1px solid #666666"}}>
                                        <div className=" flex-auto w-2/3 flex items-center">
                                            <span className="text-[0.8rem] font-thin text-gold">وزن</span>
                                        </div>
                                        <div className="flex-auto w-1/3 flex justify-between">
                                            <span className="text-[1rem] font-thin">{EnglishToPersian(coin.weight.toString())}</span>
                                            <span className="text-[1rem] font-thin ">گرم</span>
                                        </div>
                                    </div>
                                    <div className="flex p-[0.3rem]">
                                        <div className="flex-auto w-2/3 flex items-center">
                                            <span className="text-[0.8rem] font-thin text-gold">تعداد</span>
                                        </div>
                                        <div className="flex-auto w-1/3 flex justify-between">
                                            <span className="text-[1rem] font-thin">{EnglishToPersian(coin.count.toString())}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grow flex justify-center items-center">
                                    <button onClick={()=>{handleDeleteCoin(coin)}} className="p-5" style={{zIndex:"1"}}>
                                        <BsTrashFill className="text-red-600" fontSize="1.5rem"/>
                                    </button>
                                </div>
                            </div>))}
                    {
                        props.coins.length !== 0 && (
                            <div className="border-dotted border-t-2 border-neutral-700 flex justify-around w-full md:w-[70%] p-2">
                                <div className="text-[0.9rem]">
                                    <span className="text-gold">وزن کل :</span>
                                    <span className="mr-2">{EnglishToPersian(props.totalWeight.toString())} گرم </span>
                                </div>
                                <div className="text-[0.9rem]">
                                    <span className="text-gold">کارمزد کل :</span>
                                    <span className="mr-2">{EnglishToPersian(props.totalWage.toString())} ریال </span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="flex justify-center mt-7 z-10">
                    <button className="bg-gold rounded text-black py-2 px-16 hover:opacity-70 flex items-center" style={{zIndex:"1"}}
                            onClick={handleOpenCoin}>
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
                            leaveTo="opacity-0">
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
                                                <div>
                                                    <FormControl fullWidth>
                                                        <InputLabel id="demo-simple-select" style={{color: "#fff"}}>انتخاب وزن سکه</InputLabel>
                                                        <Select
                                                            label="انتخاب وزن سکه"
                                                            id="demo-simple-select"
                                                            value={selectedCoin}
                                                            sx={{label: {color: '#fff !important'}}}
                                                            onChange={handleChangeCoin}
                                                            InputProps={{
                                                                endAdornment: <InputAdornment position="start">گرم</InputAdornment>,
                                                            }}
                                                        >
                                                            {
                                                                coinsWight?.map((coinsWight) => (
                                                                    <MenuItem value={coinsWight}>{EnglishToPersian(coinsWight)} گرم </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                                <div className="my-3">
                                                    <TextField
                                                        fullWidth
                                                        label="تعداد"
                                                        error={countErrors.length !== 0}
                                                        value={countOfCoin}
                                                        onChange={handleCountOfCoin}
                                                        sx={{input: {color: '#fff !important'}}}
                                                        type="number"
                                                        name="numberformat"
                                                        id="formatted-numberformat-input"/>

                                                    {
                                                        countErrors.map((error, index) =>
                                                            <small key={index}
                                                                   className={"text-red-600 mt-1 text-[0.6rem]"}>{error}</small>
                                                        )
                                                    }
                                                </div>
                                            </CacheProvider>
                                        </div>
                                        <div className="mt-4">
                                            <div className="flex flex-row justify-evenly">
                                                <button
                                                    type="button"
                                                    className="bg-[#21BA55] hover:bg-green-700 text-white py-2 w-[7.5rem] rounded"
                                                    onClick={() => {
                                                        handleAddNewCoin()
                                                    }}>
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