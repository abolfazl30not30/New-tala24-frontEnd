import React, {Component} from "react";
import '../../../style/comments.css';
import Slider from "react-slick";
import {GrFormNext,GrFormPrevious} from "react-icons/gr"

class Comments extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            draggable: true,
            autoplay: true,
            arrows: true,
            autoplaySpeed: 2000,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <>
                <div className="comments-container mb-10">
                    <div className={"flex justify-center pt-7"}>
                        <h2 className={"heading-title-comment font-bold "}>نظرات مشتریان</h2>
                    </div>
                    <div className="w-[70%] m-auto mt-14">
                        <Slider {...settings}>
                            <div className="p-5">
                                <div className="flex flex-col items-center bg-bgGray bg-opacity-60 p-5  border rounded-2xl">

                                    <div className="flex justify-center">
                                        <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={"preson1"} className={'mb-4 w-[80px]'}/>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <h3 className="text-gold font-bold text-[0.8rem]">ایمان محمدی</h3>
                                    </div>

                                    <div className="flex justify-center">
                                        <p className={'text-[0.65rem] leading-5 px-3 text-white text-center'}>
                                            این یک پیام تستی است این یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی است
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex flex-col items-center bg-bgGray bg-opacity-60 p-5  border rounded-2xl">

                                    <div className="flex justify-center">
                                        <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={"preson1"} className={'mb-4 w-[80px]'}/>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <h3 className="text-gold font-bold text-[0.8rem]">ایمان محمدی</h3>
                                    </div>

                                    <div className="flex justify-center">
                                        <p className={'text-[0.65rem] leading-5 px-3 text-white text-center'}>
                                            این یک پیام تستی است این یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی است
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex flex-col items-center bg-bgGray bg-opacity-60 p-5  border rounded-2xl">

                                    <div className="flex justify-center">
                                        <img src={"https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={"preson1"} className={'mb-4 w-[80px]'}/>
                                    </div>

                                    <div className="flex justify-center mb-4">
                                        <h3 className="text-gold font-bold text-[0.8rem]">ایمان محمدی</h3>
                                    </div>

                                    <div className="flex justify-center">
                                        <p className={'text-[0.65rem] leading-5 px-3 text-white text-center'}>
                                            این یک پیام تستی است این یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی
                                            استاین یک پیام تستی استاین یک پیام تستی استاین یک پیام تستی است
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default Comments;