import React, {useContext, useEffect, useState} from "react";
import Bazaar from "./Bazaar";
import BuyGold from './BuyGold/BuyGold'
import {IoCalendarOutline} from "react-icons/io5";
import {RxHamburgerMenu} from "react-icons/rx";
import Hamburger from "./Hamburger";
import {Link, Route, useNavigate} from "react-router-dom";
import "../../../style/dashboard.css";
import '../../../style/hamburger.css';
import signup from "../../../contexts/signup";
import axios from "axios";
import api from "../../../api/api";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
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

     function getProfile () {
         api.get(`info/profile/${localStorage.getItem("id")}`).then((response) => {
            if (response.firstName !== null && response.lastName !== null && response.nationalCode !== null) {
                setCompleteRegistrationStatus(true)
            }
        })
    }

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

        async function test() {
            const res = await api.get(`account/user/${localStorage.getItem("username")}`)
            localStorage.setItem("id", res.id)
            info.setInformation(res.infos)
        }
        test()
        getProfile()
    }, [])
    useEffect(()=>{

    },[])
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