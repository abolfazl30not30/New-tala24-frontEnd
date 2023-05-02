import {useContext, useEffect, useState} from "react";
import React from "react";
import EditProfile from "./EditProfile"
import EditPassword from "./EditPassword"
import AddAddress from "./AddAddress"
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";

const CompleteRegistration = () => {

    const data = [
        {
            label: "مشخصات کاربری",
            value: "1",
            desc: <EditProfile/>,
        },
        {
            label: "آدرس",
            value: "2",
            desc: <AddAddress/> ,
        },
        {
            label: "فراموشی رمز",
            value: "3",
            desc: <EditPassword/>,
        },
    ];

    return (
        <>
            <div className={'flex justify-center flex-col mx-9 '}>
                <h3 className={'mx-9 my-6 font-bold text-white text-xl'}>
                    تکمیل مشخصات
                </h3>
                <div className={'container w-100 pb-4 bg-[#252525]'}>
                    <Tabs value="1">
                        <TabsHeader className="bg-[#252525]" indicatorProps={{
                                        className: "bg-gold text-black",}}>
                            {data.map(({ label, value }) => (
                                <Tab className="text-white" key={value} value={value}>
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                        <TabsBody>
                            {data.map(({ value, desc }) => (
                                <TabPanel key={value} value={value}>
                                    {desc}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default CompleteRegistration;