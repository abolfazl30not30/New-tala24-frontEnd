import React from "react";
import '../../../style/comments.css';
import Slider from "react-slick";
import blog_1 from "../../../images/blog_1.png";
import {Link} from "react-router-dom";
import {FiArrowRightCircle} from "react-icons/fi";
import api from "../../../api/api";
import {useEffect, useState} from "react";

const Comments = () => {

    const [popularBlog, setPopularBlog] = useState([])


    const getPopularBolg = async () => {
        const blogResponse = await api.get(`blog/popular/${4}`)
        setPopularBlog(blogResponse)
    }

    const handleDescription = (des) => {
        const regex = /(<([^>]+)>)/gi;
        let result = des.replace(regex, "");
        result = result.slice(0, 250) + "...."
        return (result)
    }

    useEffect(() => {
        getPopularBolg();
    }, []);

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
                    <h2 className={"heading-title-comment font-bold "}>مطالب پر بازدید</h2>
                </div>
                <div className="w-[70%] m-auto mt-14">
                    <Slider {...settings}>
                        {
                            popularBlog.map((blog) => (
                                <div className="p-4" >
                                    <div
                                        className="justify-between items-center bg-cardDark  box-border  shadow-[0_1rem_1rem_1rem]_rgba(0,0,0,0.09) rounded-3xl flex flex-col w-full md:my-0 my-2"
                                        style={{direction:'rtl'}}
                                    >
                                        <div className="w-[100%] h-[20rem] flex justify-center pt-4">
                                            <img src={blog.fileName} className='rounded-xl w-[90%] h-[100%] object-cover' alt=""/>
                                        </div>
                                        <div>
                                            <p className=" text-white text-center sm:text-base text-xl font-bold mx-4 my-4">{blog.title}</p>
                                        </div>
                                        <div>
                                            <p className="text-[#CECECE] my-4 mx-4 sm:text-sm text-xs">{
                                                handleDescription(blog.description)}</p>
                                        </div>
                                        <div className="flex justify-center mt-2 mb-5 mx-2 ">
                                            <Link to={`/blog/${blog.id}`}
                                                  className="flex items-center bg-transparent text-sm hover:bg-gold text-white  hover:text-bgGray py-2 px-4 border border-gold hover:border-transparent rounded"
                                                  style={{border: "1px solid #DFAF3D"}}>
                                                <FiArrowRightCircle fontSize="15px" className="transform"/>
                                                <span>
                                        <spna className="mr-2">ادامه مطلب</spna>
                                    </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </Slider>
                </div>
            </div>
        </>
    )
}

export default Comments;