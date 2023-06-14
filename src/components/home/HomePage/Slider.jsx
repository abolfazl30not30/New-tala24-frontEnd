import React, {useEffect, useRef, useState} from 'react';
import "../../../style/slider.css"

const Slider = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {

        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount(count + 1);
            next()
        }, 3000);

        //Clearing the interval
        return () => clearInterval(interval);
    }, [count]);

    const carouselContainer = useRef(null)
    const [carouselData, setCarouselData] = useState([
        {
            'id': '1',
            'src': "https://cloud.tala24.co/images/1744263.jpg",
        },
        {
            'id': '2',
            'src': "https://cloud.tala24.co/images/GettyImages-1130532216.jpg",
        },
        {
            'id': '3',
            'src': "https://cloud.tala24.co/images/1744263.jpg",
        },
    ])
    const [carouselInView, setCarouselInView] = useState([3, 2, 1])

    return (
        <>
            <div className="flex  flex-col items-center md:items-start md:flex-row  justify-center">
                <div className="w-[85%] md:w-[30%] flex justify-center items-center mr-0 md:mr-6 text-center md:text-right">
                        <div className="mt-16 md:mt-20">
                            <h2 className={'font-bold text-white whitespace-nowrap lg:text-[2rem] md:text-[1.5rem] mb-10 xsm:text-center xsm:text-[1.5rem] xsm:mt-3'}>
                                مطمئن ترین راه برای <span className={"text-span text-gold"}>سرمایه گذاری در طلا </span>
                            </h2>
                            <p className={'text-white lg:text-[1rem] md:text-[0.8rem] leading-7 font-thin xsm:text-[0.9rem]'}>
                                در طلا۲۴ میتوانید به صورت ۲۴ ساعته و با حداقل سرمایه و نقدیتگی ، کلیه درخواست های خود را ثبت و به صورت آنی و لحظه ای معامله طلایی بدون دستمزد داشته و پس انداز طلایی داشته باشید.
                            </p>
                        </div>
                </div>
                <div className="carousel mt-5 mb-10">
                    <div className="carousel-container" ref={carouselContainer}>
                        {carouselData.map((item, index) => {
                            return (
                                <img key={index} src={item.src}
                                     className={`gradient-box carousel-item carousel-item-${carouselInView[index]}`}
                                     data-index={`${index + 1}`}/>
                            )
                        })}
                    </div>
                    <div className="carousel-dots flex justify-center mt-20">
                        <div className={carouselInView[0] == 1 ? "dot active-dot" :"dot"}></div>
                        <div className={carouselInView[0] == 2 ? "dot active-dot" :"dot"}></div>
                        <div className={carouselInView[0] == 3 ? "dot active-dot" :"dot"}></div>
                    </div>
                </div>
            </div>
        </>
    )

    function next() {
        let updateCarouselInView = [...carouselInView]
        updateCarouselInView.unshift(updateCarouselInView.pop());
        setCarouselInView(updateCarouselInView)
    }
}
export default Slider;