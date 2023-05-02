import logo from "../../../images/lastLogo.png";
import React from "react"
import {AiOutlineClose, AiOutlineStock} from "react-icons/ai";
import {Link} from "react-router-dom"
import '../../../style/hamburger.css';
import {useContext} from "react";
import signup from "../../../contexts/signup";


const Hamburger = ({selected, setSelected}) => {
    const info = useContext(signup)

    return (
        <div className={'w-[250px] h-screen bg-[#252525] rounded-l-[35px]'}>
            <div className={'flex justify-end text-white pl-4 pt-4 md1:hidden'}>
                <AiOutlineClose className={'cursor-pointer'} onClick={() => {
                    document.getElementById('ham').className = 'slide-right absolute top-0 block'
                    // document.getElementById('ham1').className = 'md1:block'
                    document.getElementById('main-container').className = 'flex'

                }}/>
            </div>

            <div className={'flex justify-center md1:pt-8'}>
                <img src={logo} alt={'logo'} className={'w-1/2'}/>
            </div>

            <div className={'text-white'}>
                {/*<Link to="/manager">*/}
                {/*    <div className={`flex cursor-pointer mt-2*/}
                {/*                    ${info.selected === 'GoldPriceRecord' ? "bg-[#DFAF3D] text-black" : "text-white"} mx-3 rounded-lg`}*/}
                {/*         onClick={() => info.setSelected('GoldPriceRecord')}*/}
                {/*    >*/}
                {/*        <div className={'pr-5 py-2'}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"*/}
                {/*                 stroke="currentColor" className="w-6 h-6">*/}
                {/*                <path stroke-linecap="round" stroke-linejoin="round"*/}
                {/*                      d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div className={'py-2 mr-1'}>قیمت طلا</div>*/}
                {/*    </div>*/}
                {/*</Link>*/}
                {/*<Link to="/manager/confirm-buy">*/}
                {/*    <div className={`flex cursor-pointer mt-2*/}
                {/*                    ${info.selected === 'ConfirmBuyGold' ? "bg-[#DFAF3D] text-black" : "text-white"} mx-3 rounded-lg`}*/}
                {/*         onClick={() => info.setSelected('ConfirmBuyGold')}*/}
                {/*    >*/}
                {/*        <div className={'pr-5 py-2'}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
                {/*                 stroke="currentColor" className="w-6 h-6">*/}
                {/*                <path strokeLinecap="round" strokeLinejoin="round"*/}
                {/*                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>*/}
                {/*            </svg>*/}

                {/*        </div>*/}
                {/*        <div className={'py-2 mr-1'}>خرید طلا</div>*/}
                {/*    </div>*/}
                {/*</Link>*/}
                {/*<Link to="/manager/confirm-sell">*/}
                {/*    <div className={`flex cursor-pointer mt-2*/}
                {/*                    ${info.selected === 'ConfirmSellGold' ? "bg-[#DFAF3D] text-black" : "text-white"} mx-3 rounded-lg`}*/}
                {/*         onClick={() => info.setSelected('ConfirmSellGold')}*/}
                {/*    >*/}
                {/*        <div className={'pr-5 py-2'}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
                {/*                 stroke="currentColor" className="w-6 h-6">*/}
                {/*                <path strokeLinecap="round" strokeLinejoin="round"*/}
                {/*                      d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div className={'py-2 mr-1'}>فروش طلا</div>*/}
                {/*    </div>*/}
                {/*</Link>*/}
                {/*<Link to="/manager/ticket">*/}
                {/*    <div className={`flex cursor-pointer mt-2*/}
                {/*                    ${info.selected === 'ticket' ? "bg-[#DFAF3D] text-black" : "text-white"} mx-3 rounded-lg`}*/}
                {/*         onClick={() => info.setSelected('ticket')}*/}
                {/*    >*/}
                {/*        <div className={'pr-5 py-2'}>*/}
                {/*            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}*/}
                {/*                 stroke="currentColor" className="w-6 h-6">*/}
                {/*                <path strokeLinecap="round" strokeLinejoin="round"*/}
                {/*                      d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>*/}
                {/*            </svg>*/}
                {/*        </div>*/}
                {/*        <div className={'py-2 mr-1'}>تیکت</div>*/}
                {/*    </div>*/}
                {/*</Link>*/}
                <Link to="/manager/add-admin">
                    <div className={`flex cursor-pointer mt-2
                                    ${info.selected === 'add-admin' ? "bg-[#DFAF3D] text-black" : "text-white"} mx-3 rounded-lg`}
                         onClick={() => info.setSelected('add-admin')}
                    >
                        <div className={'pr-5 py-2'}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                            </svg>

                        </div>
                        <div className={'py-2 mr-1'}>ادمین ها</div>
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Hamburger;