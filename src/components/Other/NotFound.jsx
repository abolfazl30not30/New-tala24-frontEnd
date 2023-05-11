import React from "react"
import {Link} from "react-router-dom";
import {IoIosArrowRoundBack} from "react-icons/io";

const NotFound  = () =>{
    return(
       <div className="flex justify-center items-center w-full h-[90vh]">
           <div className="text-center">
               <h2 className="text-gold font-bold text-[10rem]">404</h2>
               <p className="text-white font-bold text-2xl">صفحه مورد نظر یافت نشد</p>
               <div className="mt-10">
                   <Link to="/" className="bg-gold rounded-2xl px-4 py-2 hover:opacity-80 flex justify-center items-center"> بازگشت به خانه<IoIosArrowRoundBack fontSize="1.5rem"/></Link>
               </div>
           </div>
       </div>
    )
}

export default NotFound