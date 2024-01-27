import React, {useEffect, useState} from 'react';
import MainNavbar from "../MainNavbar";


const Rules = () =>{
    return(
        <>
            <MainNavbar/>
            <div className="px-2 md:px-10">
                <div className="flex justify-center"><h2 className="heading-title-comment text-[2rem]">قوانين و مقررات</h2></div>
                <div className="flex justify-center m-0 md:m-10">
                    <p className="text-[0.8rem] md:text-[1rem] text-white items-center bg-mainGray bg-opacity-60 p-5  border rounded-2xl w-full md:w-2/3">
                    </p>
                </div>
            </div>
        </>
    )
}

export default Rules;