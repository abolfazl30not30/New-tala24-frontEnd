import React, {Suspense} from 'react';
import MyComponent from 'react-fullpage-custom-loader'
import BallPulseSync from "../../Loading/BallPulseSync";
const Home = React.lazy(() => import("./Home.jsx"));


const MainHomePage = () => {

    const props = {
        sentences: ['لطفا منتظر بمانید...'],
        fadeIn: true,
        wrapperBackgroundColor: "#303030",
        textStyles: {color: "#DFAF3D"}
    }

    return (
        <>
            <Suspense fallback={<MyComponent {...props} customLoader={<BallPulseSync />} />}>
                <Home/>
            </Suspense>
        </>
    )
}

export default MainHomePage;