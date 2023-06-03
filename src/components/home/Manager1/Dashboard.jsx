import React, {useContext, useEffect, useState} from "react";
import {Link, Route, useNavigate} from "react-router-dom";
import "../../../style/dashboard.css";
import '../../../style/hamburger.css';
import signup from "../../../contexts/signup";
import axios from "axios";
import dashboard from "../../../contexts/dashboard"
import * as PropTypes from "prop-types";
import MainSection from "./MainSection";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Routes(props) {
    return null;
}

Routes.propTypes = {children: PropTypes.node};
const Dashboard = () => {

    const info = useContext(signup)

    const [selected, setSelected] = useState('bazaar');

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [completeRegistrationStatus, setCompleteRegistrationStatus] = useState(true);

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        axios.post("http://localhost:8090/login",
            {username: localStorage.getItem("username"), password: localStorage.getItem("password")}, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Headers': ['Set-Cookie', 'Content-Type', "x-xsrf-token"],
                }
            }
        ).then((response) => {
            localStorage.setItem("Authorization", response.headers["authorization"])
        }).catch((error) => {
            navigate("/")
        })
    }, [])

    return (
        <>
            <dashboard.Provider value={{completeRegistrationStatus:completeRegistrationStatus, setCompleteRegistrationStatus:setCompleteRegistrationStatus}}>
                <div className="d-flex flex-column" dir="rtl">
                    <Sidebar />
                    <Navbar />
                    <div className="main">
                        <MainSection/>
                    </div>
                </div>
            </dashboard.Provider>
        </>
    )
}

export default Dashboard;
