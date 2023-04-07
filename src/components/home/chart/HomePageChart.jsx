import React from "react";
import Chart24 from "./chart24";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

import '../../../style/chart.css';

const HomePageChart = () => {

    return (
        <>
            <div className={'chart text-white mx-5'}>
                <Chart24 />
            </div>
        </>
    )
}

export default HomePageChart;