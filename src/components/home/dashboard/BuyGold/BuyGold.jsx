import React from "react";
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import StepBuyGold from "./StepBuyGold";
import StepReceiveType from "./StepReceiveType";
import StepPayment from "./StepPayment";
import "./../../../../style/BuyGold.css"
import {useContext, useEffect, useState} from "react";
import signup from "../../../../contexts/signup";
import api from "../../../../api/api";
import * as yup from "yup";


const ColorlibConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#DFAF3D;',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            background: '#DFAF3D;',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 0,
    color: '#000',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        background: '#DFAF3D;',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        background: '#DFAF3D;',
    }),
}));

function ColorlibStepIcon(props) {
    const {active, completed, className} = props;

    const icons = {
        /*1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>
        </svg>
        ,*/
        1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"/>
        </svg>
        ,
        2: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
        </svg>
        ,
    };

    return (
        <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
});


const steps = ['خرید طلا', 'ثبت درخواست'];

export default function BuyGold(props) {
    useEffect(() => {
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            props.history.push("/login")
        }
    }, [props.history]);

    const [constructorHasRun, setConstructorHasRun] = useState(false);
    const constructor = () => {
        if (constructorHasRun) return;
        if (localStorage.getItem('role') !== "USER") {
            localStorage.clear()
            window.location = ("/login")
        }
        setConstructorHasRun(true);
    };
    constructor()

    const [priceErrors, setPriceErrors] = useState([]);
    const [weightErrors, setWeightErrors] = useState([]);

    const validation = async () => {
        const priceSchema = yup.object().shape({
            price: yup.string().required("لطفا مبلغ مورد نظر خود را وارد کنید.").matches(/^[0-9]*$/, "لطفا عدد وارد کنید.")
        })
        const weightSchema = yup.object().shape({
            weight: yup.string().required("لطفا وزن مورد نظر خود را وارد کنید.").matches(/^[0-9]*$/, "لطفا عدد وارد کنید.")
        })
        const price = valuePrice.numberformat
        const weight = valueWeight
        if (type === "price") {
            try {
                return await priceSchema.validate({price}, {abortEarly: false})
            } catch (error) {
                setPriceErrors(error.errors)
            }
        } else if (type === "weight") {
            try {
                return await weightSchema.validate({weight}, {abortEarly: false})
            } catch (error) {
                setWeightErrors(error.errors)
            }
        }
    }

    const info = useContext(signup)

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [valuePrice, setValuePrice] = React.useState({
        numberformat: "",
    });
    const [valueWeight, setValueWeight] = useState("");
    const [rialToWeightCoefficient, setRialToWeightCoefficient] = useState(50000000);
    const [type, setType] = useState("price");
    const [shipmentType, setShipmentType] = useState("cash");
    const [value, setValue] = React.useState('cash');

    const handleChange = async (event) => {
        await setValue(event.target.value);
    };

    useEffect(() => {
        const getPrice = async () => {
            const getPriceRes = await api.get("goldPrice/latestPrice")
            setRialToWeightCoefficient(getPriceRes.price)
        }
        getPrice()
    }, [activeStep]);

    const handleChangePrice = (event) => {
        setValuePrice({
            ...valuePrice,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeWeight = (event) => {
        setValueWeight(event.target.value)
        setValuePrice({
            ...valuePrice,
            numberformat: parseInt(event.target.value) * rialToWeightCoefficient,
        });
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleSubmit = async () => {
        await api.post("payment", {
            weight: valueWeight,
            price: valuePrice.numberformat,
            status: "pending",
            isConverted: false,
            isStored: shipmentType === "cash" ? "true" : "false",
            accountId: localStorage.getItem("id")
        })
    }

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            handleSubmit()
        }
        if (activeStep === 1) {
            const valid = await validation()
            if (valid !== undefined) {
                setPriceErrors([])
                setWeightErrors([])
                let newSkipped = skipped;
                if (isStepSkipped(activeStep)) {
                    newSkipped = new Set(newSkipped.values());
                    newSkipped.delete(activeStep);
                }

                setActiveStep((prevActiveStep) => prevActiveStep + 1);
                setSkipped(newSkipped);

            }
        } else {
            let newSkipped = skipped;
            if (isStepSkipped(activeStep)) {
                newSkipped = new Set(newSkipped.values());
                newSkipped.delete(activeStep);
            }

            setActiveStep((prevActiveStep) => prevActiveStep + 1);
            setSkipped(newSkipped);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <div dir="rtl" className="mx-9 mt-5 mb-4 w-full">
                    <Box sx={{width: '100%'}}>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <div
                                    className="text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold text-center">
                                    <div className="text-sky-50">
                                        <h6 className={"mb-3 text-mainGold"}>درخواست خرید شما با موفقیت ارسال
                                            شد.</h6>
                                        <p className={"font-light text-[0.8rem]"}>پس از تایید توسط کارشناس سامانه
                                            امکان خرید برای شما ایجاد شده و با مراجعه به صفحه درخواست ها می توانید
                                            فرایند خرید را انجام دهید</p>
                                    </div>
                                </div>
                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                    <Box sx={{flex: '1 1 auto'}}/>
                                    <Button onClick={handleReset}>خرید مجدد</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className={'max-w-[1000px] mx-auto text-white bg-[#252525] mt-10 rounded-[8px] p-5'}>
                                    {(() => {
                                        if (activeStep === 0) {
                                            return <StepBuyGold
                                                priceErrors={priceErrors}
                                                weightErrors={weightErrors}
                                                valuePrice={valuePrice}
                                                handleChangePrice={handleChangePrice}
                                                valueWeight={valueWeight}
                                                handleChangeWeight={handleChangeWeight}
                                                type={type}
                                                setType={setType}
                                            />;
                                        } else if (activeStep === 1) {
                                            return <StepPayment valuePrice={valuePrice} value={value}
                                                                shipmentType={shipmentType}
                                                                handleChange={handleChange}/>;
                                        }
                                    })()}
                                    {/*{(() => {
                                        if (activeStep === 0) {
                                            return <StepReceiveType value={shipmentType}
                                                                    handleChange={setShipmentType}/>;
                                        } else if (activeStep === 1) {
                                            return <StepBuyGold
                                                priceErrors={priceErrors}
                                                weightErrors={weightErrors}
                                                valuePrice={valuePrice}
                                                handleChangePrice={handleChangePrice}
                                                valueWeight={valueWeight}
                                                handleChangeWeight={handleChangeWeight}
                                                type={type}
                                                setType={setType}
                                            />;
                                        } else if (activeStep === 2) {
                                            return <StepPayment valuePrice={valuePrice} value={value}
                                                                shipmentType={shipmentType}
                                                                handleChange={handleChange}/>;
                                        }
                                    })()}*/}
                                    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                        <button
                                            className={"bg-red-600 hover:bg-red-800 text-white py-2 w-[7.5rem] rounded disabled:bg-red-400 disabled:text-red-300 disabled:cursor-not-allowed"}
                                            disabled={activeStep === 0}
                                            onClick={handleBack}>
                                            بازگشت
                                        </button>
                                        <Box sx={{flex: '1 1 auto'}}/>
                                        <button onClick={handleNext} className="bg-[#21BA55] hover:bg-green-700 text-white py-2 w-[7.5rem] rounded">
                                            {activeStep === steps.length - 1 ? 'ثبت درخواست' : 'بعدی'}
                                        </button>
                                    </Box>
                                </div>
                            </React.Fragment>
                        )}
                    </Box>
                </div>
            </ThemeProvider>
        </CacheProvider>

    );
}