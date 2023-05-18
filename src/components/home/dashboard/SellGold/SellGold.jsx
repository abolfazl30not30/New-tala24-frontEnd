import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import StepSellType from "./StepSellType"
import StepSelectCard from "./StepSelectCard"
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
        1: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"/>
        </svg>

        ,
        2: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"/>
        </svg>

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

const steps = ['فروش طلا', ' ثبت درخواست فروش'];

function SellGold(props) {
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
        if (value === "price") {
            try {
                return await priceSchema.validate({price}, {abortEarly: false})
            } catch (error) {
                setPriceErrors(error.errors)
            }
        } else if (value === "weight") {
            try {
                return await weightSchema.validate({weight}, {abortEarly: false})
            } catch (error) {
                setWeightErrors(error.errors)
            }
        }
    }

    const [activeStep, setActiveStep] = React.useState(0);

    const [skipped, setSkipped] = React.useState(new Set());
    const [rialToWeightCoefficient, setRialToWeightCoefficient] = useState(50000000);
    const [type, setType] = useState("price");

    const [value, setValue] = React.useState('price');
    const [valueWeight, setValueWeight] = useState("");
    const [valuePrice, setValuePrice] = React.useState({
        numberformat: '',
    });

    const handleChangePrice = (event) => {
        setValuePrice({
            ...valuePrice,
            [event.target.name]: event.target.value,
        });
    };

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleChangeWeight = (event) => {
        setValueWeight(event.target.value)
        setValuePrice({
            ...valuePrice,
            numberformat: (parseInt(event.target.value) * rialToWeightCoefficient).toString(),
        });
    }

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleSubmit = async () => {
        await api.post("sellRequest", {
            weight: valueWeight,
            price: valuePrice.numberformat,
            accountId: localStorage.getItem("id")
        })
    }

    useEffect(() => {
        const getPrice = async () => {
            const getPriceRes = await api.get("goldPrice/latestPrice")
            setRialToWeightCoefficient(getPriceRes.price)
        }
        getPrice()
    }, [activeStep]);

    const handleNext = async () => {
        if (activeStep === steps.length - 1) {
            handleSubmit()
        }
        if (activeStep === 0) {
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
                <div className="mx-9 mt-5 w-full">
                    <Box sx={{width: '100%'}}>
                        <div className="md:w-3/4 w-full mx-auto">
                            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector/>}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                        </div>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <div
                                    className="text-white bg-[#252525] mt-10 rounded-[8px] p-5 font-bold text-center">
                                    <div className="text-sky-50">
                                        فروش با موفقیت انجام شد
                                    </div>
                                </div>
                                <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                    <Box sx={{flex: '1 1 auto'}}/>
                                    <Button onClick={handleReset}>فروش مجدد</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div className={'max-w-[1000px] mx-auto text-white bg-[#252525] mt-10 rounded-[8px] p-5'}>
                                    {(() => {
                                        if (activeStep == 0) {
                                            return <StepSellType
                                                priceErrors={priceErrors}
                                                weightErrors={weightErrors}
                                                value={value}
                                                handleChange={handleChange}
                                                valuePrice={valuePrice}
                                                handleChangePrice={handleChangePrice}
                                                valueWeight={valueWeight}
                                                handleChangeWeight={handleChangeWeight}
                                            />;
                                        } else if (activeStep == 1) {
                                            return <StepSelectCard valuePrice={valuePrice}/>;
                                        }
                                    })()}
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
    )
}

export default SellGold