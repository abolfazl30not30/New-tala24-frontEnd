import React, {useEffect, useState} from 'react';
import MainNavbar from "./MainNavbar";
import Slider from "./Slider";
import Cards from "./Cards";
import Stream from "./Stream";
import Footer from "./Footer";
import HomePageChart from "../chart/HomePageChart";
import Comments from "./Comments";
import MyComponent from 'react-fullpage-custom-loader'
import BallPulseSync from "../../Loading/BallPulseSync";


const Home = () => {
    const [showLoader, setShowLoader] = useState(true);
    const props = {
        sentences: ['لطفا منتظر بمانید...'],
        fadeIn: true,
        wrapperBackgroundColor: "#303030",
        textStyles: {color: "#DFAF3D"}
    }

    useEffect(() => {
        setInterval(setShowLoaderFalse,2000)
    }, []);

    const setShowLoaderFalse = () =>{
        setShowLoader(false)
    }

    return (
        <>
            {
                showLoader ? (<MyComponent {...props} customLoader={<BallPulseSync />} />):(<div>
                    <MainNavbar/>
                    <Slider/>
                    <Cards/>
                    <Stream/>
                    <HomePageChart/>
                    <Comments/>
                    <Footer/>
                </div>)
            }


        </>
    )
}

export default Home;